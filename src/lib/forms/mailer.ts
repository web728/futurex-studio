import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // e.g. yourstudio@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password, NOT your real password
  },
});

export async function sendEnquiryEmail(fields: Record<string, unknown>, submissionId: string) {
  const recipients = [
    process.env.NOTIFY_EMAIL_1,
    process.env.NOTIFY_EMAIL_2,
  ].filter(Boolean) as string[];

  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;">${k}</td><td style="padding:6px 12px;">${String(v ?? "")}</td></tr>`)
    .join("");

  await transporter.sendMail({
    from: `"Futurex Studio Website" <${process.env.GMAIL_USER}>`,
    to: recipients,
    subject: `New enquiry — Ref ${submissionId}`,
    html: `<h2>New project enquiry</h2><p>Reference: <strong>${submissionId}</strong></p><table>${rows}</table>`,
  });
}