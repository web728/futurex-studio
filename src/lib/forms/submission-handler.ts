import "server-only";
import { randomUUID } from "crypto";
import { formRegistry, isFormKey } from "./registry";
import { normalizeFields, normalizedPhone, publicFields } from "./normalize";
import { requestSchema } from "./schemas";
import type {
  FormSubmission,
  IntegrationResult,
  SubmissionRequest,
} from "./types";
import { requestMetadata } from "@/lib/security/metadata";
import { safeLog } from "@/lib/security/safe-log";
import {
  findByIdempotencyKey,
  insertSubmission,
  updateFinalStatus,
  updateIntegration,
} from "@/lib/database/submission-repository";
import { verifyRecaptcha } from "@/lib/integrations/recaptcha";
import { appendSubmission } from "@/lib/integrations/google-sheets";
import { sendNotification } from "@/lib/integrations/email";
import { rateLimit } from "@/lib/security/rate-limit";

export type Dependencies = {
  verifyCaptcha: typeof verifyRecaptcha;
  limit: typeof rateLimit;
  findDuplicate: typeof findByIdempotencyKey;
  insert: typeof insertSubmission;
  updateIntegration: typeof updateIntegration;
  updateFinal: typeof updateFinalStatus;
  appendSheet: typeof appendSubmission;
  sendEmail: typeof sendNotification;
};
const defaults: Dependencies = {
  verifyCaptcha: verifyRecaptcha,
  limit: rateLimit,
  findDuplicate: findByIdempotencyKey,
  insert: insertSubmission,
  updateIntegration,
  updateFinal: updateFinalStatus,
  appendSheet: appendSubmission,
  sendEmail: sendNotification,
};
const pending = (): IntegrationResult => ({ status: "pending", attempts: 0 });
const failed = (attemptedAt: Date, category: string): IntegrationResult => ({
  status: "failed",
  attempts: 1,
  attemptedAt,
  error: category,
});
const succeeded = (attemptedAt: Date): IntegrationResult => ({
  status: "success",
  attempts: 1,
  attemptedAt,
  completedAt: new Date(),
});
export type HandlerResult = {
  kind:
    | "success"
    | "validation"
    | "captcha"
    | "rate"
    | "database"
    | "partial"
    | "server";
  submissionId?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  duplicate?: boolean;
};

export async function handleSubmission(
  raw: unknown,
  request: Request,
  deps: Dependencies = defaults,
): Promise<HandlerResult> {
  const envelope = requestSchema.safeParse(raw);
  if (!envelope.success)
    return {
      kind: "validation",
      fieldErrors: envelope.error.flatten().fieldErrors,
    };
  const body = envelope.data as SubmissionRequest;
  if (!isFormKey(body.formType))
    return {
      kind: "validation",
      fieldErrors: { formType: ["Unknown form type"] },
    };
  const metadata = requestMetadata(request, body.pathname);
  let rate;
  try {
    rate = await deps.limit(
      `${metadata.ipAddress || "unknown"}:${body.formType}`,
    );
  } catch {
    safeLog({
      formType: body.formType,
      step: "rate_limit",
      result: "failed",
      category: "provider",
    });
    return { kind: "server" };
  }
  if (!rate.allowed) return { kind: "rate" };
  if (body.startedAt && Date.now() - body.startedAt < 1500)
    return {
      kind: "validation",
      message: "Please take a moment to review the form before submitting.",
    };
  let captcha = false;
  try {
    captcha = await deps.verifyCaptcha(body.captchaToken, metadata.ipAddress);
  } catch {
    safeLog({
      formType: body.formType,
      step: "captcha",
      result: "failed",
      category: "provider",
    });
    return { kind: "captcha" };
  }
  if (!captcha) return { kind: "captcha" };
  const registry = formRegistry[body.formType];
  const normalized = normalizeFields(body.fields);
  const parsed = registry.schema.safeParse(normalized);
  if (!parsed.success)
    return {
      kind: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  const sanitized = publicFields(parsed.data as Record<string, unknown>);
  const phone = normalizedPhone(sanitized.phone);
  if (phone) sanitized.phoneNormalized = phone;
  try {
    const duplicate = await deps.findDuplicate(body.idempotencyKey);
    if (duplicate)
      return duplicate.status === "completed"
        ? {
            kind: "success",
            submissionId: duplicate.submissionId,
            duplicate: true,
          }
        : {
            kind: "partial",
            submissionId: duplicate.submissionId,
            duplicate: true,
          };
  } catch {
    return { kind: "database" };
  }
  const now = new Date(),
    submissionId = `FXS-${now.toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const submission: FormSubmission = {
    submissionId,
    idempotencyKey: body.idempotencyKey,
    formType: registry.displayName,
    websiteName: process.env.WEBSITE_NAME || "Futurex Studio",
    source: body.source || "Website",
    submittedAt: now,
    fields: sanitized,
    metadata,
    status: "pending",
    delivery: {
      mongodb: {
        status: "success",
        attempts: 1,
        attemptedAt: now,
        completedAt: now,
      },
      googleSheets: pending(),
      email: pending(),
    },
    createdAt: now,
    updatedAt: now,
  };
  try {
    await deps.insert(submission);
    safeLog({
      submissionId,
      formType: registry.displayName,
      step: "mongodb",
      result: "success",
      attempt: 1,
    });
  } catch {
    safeLog({
      submissionId,
      formType: registry.displayName,
      step: "mongodb",
      result: "failed",
      attempt: 1,
      category: "write",
    });
    return { kind: "database" };
  }
  let sheetOk = false,
    emailOk = false;
  const sheetAt = new Date();
  try {
    await deps.appendSheet(submission);
    sheetOk = true;
    await deps.updateIntegration(
      submissionId,
      "googleSheets",
      succeeded(sheetAt),
      "pending",
    );
    safeLog({
      submissionId,
      formType: registry.displayName,
      step: "google_sheets",
      result: "success",
      attempt: 1,
    });
  } catch {
    await deps.updateIntegration(
      submissionId,
      "googleSheets",
      failed(sheetAt, "delivery_failed"),
      "partially_completed",
    );
    safeLog({
      submissionId,
      formType: registry.displayName,
      step: "google_sheets",
      result: "failed",
      attempt: 1,
      category: "delivery",
    });
  }
  const emailAt = new Date();
  try {
    await deps.sendEmail(submission);
    emailOk = true;
    await deps.updateIntegration(
      submissionId,
      "email",
      succeeded(emailAt),
      sheetOk ? "completed" : "partially_completed",
    );
    safeLog({
      submissionId,
      formType: registry.displayName,
      step: "email",
      result: "success",
      attempt: 1,
    });
  } catch {
    await deps.updateIntegration(
      submissionId,
      "email",
      failed(emailAt, "delivery_failed"),
      "partially_completed",
    );
    safeLog({
      submissionId,
      formType: registry.displayName,
      step: "email",
      result: "failed",
      attempt: 1,
      category: "delivery",
    });
  }
  const status = sheetOk && emailOk ? "completed" : "partially_completed";
  await deps.updateFinal(submissionId, status);
  return status === "completed"
    ? { kind: "success", submissionId }
    : { kind: "partial", submissionId };
}
