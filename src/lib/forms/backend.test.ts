import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { handleSubmission, type Dependencies } from "./submission-handler";
import { emailContent, sendNotification } from "@/lib/integrations/email";
import { sheetHeaders, sheetRow } from "@/lib/integrations/google-sheets";
import { proposalSchema } from "./schemas";
import type { FormSubmission } from "./types";

const validFields = {
  fullName: "Test User",
  company: "Test Company",
  email: "test@example.com",
  phone: "+91 98765 43210",
  preferred: "Email",
  eventName: "Expo",
  city: "Delhi",
  venue: "Venue",
  dates: "2027-01-01",
  boothSize: "20 sqm",
  openSides: "2",
  services: "Design and fabrication",
  budget: "₹5–10 lakh",
  description: "A detailed exhibition project brief for automated testing.",
  consent: true,
  website: "",
};
const envelope = (overrides: Record<string, unknown> = {}) => ({
  formType: "proposal",
  source: "Contact Page",
  pathname: "/contact",
  captchaToken: "captcha-test-token",
  idempotencyKey: "d7fc824d-bc0a-4d77-9da0-8426b83d44bf",
  startedAt: Date.now() - 5000,
  fields: validFields,
  ...overrides,
});
const request = new Request("https://futurexstudio.com/api/forms/submit", {
  method: "POST",
  headers: {
    "user-agent": "Vitest",
    referer: "https://futurexstudio.com/contact?utm_source=test",
  },
});
function deps(overrides: Partial<Dependencies> = {}) {
  return {
    verifyCaptcha: vi.fn().mockResolvedValue(true),
    limit: vi.fn().mockResolvedValue({
      allowed: true,
      remaining: 4,
      reset: Date.now() + 1000,
    }),
    findDuplicate: vi.fn().mockResolvedValue(null),
    insert: vi.fn().mockResolvedValue(undefined),
    updateIntegration: vi.fn().mockResolvedValue(undefined),
    updateFinal: vi.fn().mockResolvedValue(undefined),
    appendSheet: vi.fn().mockResolvedValue(undefined),
    sendEmail: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  } as Dependencies;
}
beforeEach(() => vi.restoreAllMocks());
describe("shared form backend", () => {
  it("accepts a valid proposal and stores no captcha token", async () => {
    let stored: FormSubmission | undefined;
    const d = deps({
      insert: vi.fn(async (s) => {
        stored = s;
      }),
    });
    const result = await handleSubmission(envelope(), request, d);
    expect(result.kind).toBe("success");
    expect(stored?.fields).not.toHaveProperty("captchaToken");
    expect(stored?.fields).not.toHaveProperty("website");
    expect(stored?.fields).toHaveProperty("phoneNormalized", "+919876543210");
  });
  it("accepts a valid contact form through the registry", async () => {
    const body = envelope({
      formType: "contact",
      fields: {
        fullName: "A User",
        email: "a@example.com",
        phone: "+44 20 7946 0958",
        message: "Please contact me about an exhibition project.",
        consent: true,
        website: "",
      },
    });
    expect((await handleSubmission(body, request, deps())).kind).toBe(
      "success",
    );
  });
  it("rejects invalid captcha", async () =>
    expect(
      (
        await handleSubmission(
          envelope(),
          request,
          deps({ verifyCaptcha: vi.fn().mockResolvedValue(false) }),
        )
      ).kind,
    ).toBe("captcha"));
  it("rejects an unknown form type", async () =>
    expect(
      (
        await handleSubmission(
          envelope({ formType: "unknown" }),
          request,
          deps(),
        )
      ).kind,
    ).toBe("validation"));
  it("rejects invalid email, phone, missing and unexpected fields", () => {
    const result = proposalSchema.safeParse({
      ...validFields,
      email: "bad",
      phone: "abc",
      fullName: "",
      unexpected: "value",
    });
    expect(result.success).toBe(false);
  });
  it("enforces rate limiting", async () =>
    expect(
      (
        await handleSubmission(
          envelope(),
          request,
          deps({
            limit: vi.fn().mockResolvedValue({
              allowed: false,
              remaining: 0,
              reset: Date.now() + 1000,
            }),
          }),
        )
      ).kind,
    ).toBe("rate"));
  it("rejects when MongoDB fails", async () =>
    expect(
      (
        await handleSubmission(
          envelope(),
          request,
          deps({ insert: vi.fn().mockRejectedValue(new Error("db")) }),
        )
      ).kind,
    ).toBe("database"));
  it("records partial delivery when Sheets fails", async () => {
    const d = deps({
      appendSheet: vi.fn().mockRejectedValue(new Error("sheets")),
    });
    const result = await handleSubmission(envelope(), request, d);
    expect(result.kind).toBe("partial");
    expect(d.updateFinal).toHaveBeenCalledWith(
      expect.any(String),
      "partially_completed",
    );
  });
  it("records partial delivery when email fails", async () =>
    expect(
      (
        await handleSubmission(
          envelope(),
          request,
          deps({ sendEmail: vi.fn().mockRejectedValue(new Error("email")) }),
        )
      ).kind,
    ).toBe("partial"));
  it("returns the original completed duplicate", async () => {
    const duplicate = {
      submissionId: "FXS-OLD",
      status: "completed",
    } as FormSubmission;
    const d = deps({ findDuplicate: vi.fn().mockResolvedValue(duplicate) });
    const result = await handleSubmission(envelope(), request, d);
    expect(result).toMatchObject({
      kind: "success",
      submissionId: "FXS-OLD",
      duplicate: true,
    });
    expect(d.insert).not.toHaveBeenCalled();
  });
});
describe("provider formatting", () => {
  const submission = {
    submissionId: "FXS-1",
    idempotencyKey: "key",
    formType: "Proposal Form",
    websiteName: "Futurex Studio",
    source: "Contact Page",
    submittedAt: new Date("2026-07-30T10:00:00Z"),
    fields: {
      fullName: "<User>",
      company: "Company",
      email: "a@example.com",
      phone: "+91 9999999999",
      description: "<script>alert(1)</script>",
      extra: "value",
    },
    metadata: { pathname: "/contact" },
    status: "pending",
    delivery: {} as FormSubmission["delivery"],
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies FormSubmission;
  it("uses the stable Google Sheets mapping", () => {
    expect(sheetHeaders).toHaveLength(18);
    const row = sheetRow(submission);
    expect(row[0]).toBe("FXS-1");
    expect(row[1]).toBe("Proposal Form");
    expect(row[16]).toContain('"extra":"value"');
  });
  it("escapes user HTML in notification emails", () => {
    const content = emailContent(submission);
    expect(content.html).toContain("&lt;script&gt;");
    expect(content.html).not.toContain("<script>");
  });
  it("sends to both configured recipients", async () => {
    process.env.GMAIL_USER = "studio@example.com";
    process.env.GMAIL_APP_PASSWORD = "test-app-password";
    process.env.EMAIL_FROM = "studio@example.com";
    process.env.NOTIFICATION_EMAIL_1 = "one@example.com";
    process.env.NOTIFICATION_EMAIL_2 = "two@example.com";
    const sendMailMock = vi.fn().mockResolvedValue({});
    vi.doMock("nodemailer", () => ({
      default: { createTransport: () => ({ sendMail: sendMailMock }) },
    }));
    const { sendNotification } = await import("@/lib/integrations/email");
    await sendNotification(submission);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: ["one@example.com", "two@example.com"] }),
    );
  });
});
