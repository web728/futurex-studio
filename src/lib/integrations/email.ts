import "server-only";
import nodemailer from "nodemailer";
import type { FormSubmission } from "@/lib/forms/types";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("CONFIG_GMAIL");
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

export function emailContent(submission: FormSubmission) {
  const rows = Object.entries(submission.fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">${escapeHtml(
          key,
        )}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="margin-bottom:4px;">New ${escapeHtml(submission.formType)}</h2>
      <p style="color:#666;margin-top:0;">Reference: <strong>${escapeHtml(
        submission.submissionId,
      )}</strong></p>
      <p style="color:#666;">Source: ${escapeHtml(submission.source)} · Submitted: ${submission.submittedAt.toISOString()}</p>
      <table style="border-collapse:collapse;width:100%;margin-top:16px;">${rows}</table>
    </div>
  `;

  const text = Object.entries(submission.fields)
    .map(([key, value]) => `${key}: ${String(value ?? "")}`)
    .join("\n");

  return {
    subject: `New ${submission.formType} — Ref ${submission.submissionId}`,
    html,
    text,
  };
}

export async function sendNotification(submission: FormSubmission) {
  const recipients = [
    process.env.NOTIFICATION_EMAIL_1,
    process.env.NOTIFICATION_EMAIL_2,
  ].filter(Boolean) as string[];

  if (recipients.length === 0) throw new Error("CONFIG_NOTIFICATION_EMAILS");

  const { subject, html, text } = emailContent(submission);
  const from = process.env.EMAIL_FROM || process.env.GMAIL_USER!;

  await getTransporter().sendMail({
    from: `"${submission.websiteName}" <${from}>`,
    to: recipients,
    subject,
    html,
    text,
  });
}