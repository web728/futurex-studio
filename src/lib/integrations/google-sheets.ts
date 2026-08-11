import "server-only";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import type { FormSubmission } from "@/lib/forms/types";

function getCredentials() {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!b64) throw new Error("CONFIG_GOOGLE_SHEETS");
  const json = Buffer.from(b64, "base64").toString("utf-8");
  return JSON.parse(json) as { client_email: string; private_key: string };
}

export const sheetHeaders = [
  "Submission ID",
  "Form Type",
  "Website",
  "Source",
  "Submitted At",
  "Full Name",
  "Company",
  "Email",
  "Phone",
  "Preferred Contact",
  "Event",
  "Venue",
  "Dates",
  "Services",
  "Budget",
  "Description",
  "Extra Fields (JSON)",
  "Pathname",
] as const;

const mappedKeys = new Set([
  "fullName",
  "company",
  "email",
  "phone",
  "preferred",
  "eventName",
  "venue",
  "dates",
  "services",
  "budget",
  "description",
]);

export function sheetRow(submission: FormSubmission): string[] {
  const f = submission.fields;
  const extra = Object.fromEntries(
    Object.entries(f).filter(([key]) => !mappedKeys.has(key))
  );

  return [
    submission.submissionId,
    submission.formType,
    submission.websiteName,
    submission.source,
    submission.submittedAt.toISOString(),
    String(f.fullName ?? ""),
    String(f.company ?? ""),
    String(f.email ?? ""),
    String(f.phone ?? ""),
    String(f.preferred ?? ""),
    String(f.eventName ?? ""),
    String(f.venue ?? ""),
    String(f.dates ?? ""),
    String(f.services ?? ""),
    String(f.budget ?? ""),
    String(f.description ?? ""),
    Object.keys(extra).length ? JSON.stringify(extra) : "",
    String(submission.metadata.pathname ?? ""),
  ];
}

let cachedDoc: GoogleSpreadsheet | null = null;

async function getSheet() {
  if (!cachedDoc) {
    const creds = getCredentials();
    const jwt = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) throw new Error("CONFIG_GOOGLE_SHEET_ID");
    cachedDoc = new GoogleSpreadsheet(sheetId, jwt);
    await cachedDoc.loadInfo();
  }
  return cachedDoc.sheetsByIndex[0];
}

export async function appendSubmission(submission: FormSubmission) {
  const sheet = await getSheet();
  await sheet.setHeaderRow([...sheetHeaders]);
  await sheet.addRow(sheetRow(submission));
}

// ⬇️ ADDED THIS FUNCTION TO FIX THE TYPESCRIPT BUILD ERROR ⬇️
export async function verifySheetHeaders() {
  const sheet = await getSheet();
  await sheet.setHeaderRow([...sheetHeaders]);
}