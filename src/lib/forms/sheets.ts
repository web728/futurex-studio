import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

function getCredentials() {
 const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 || process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!b64) throw new Error("Missing Base64 Service Account Credentials");
  
  const json = Buffer.from(b64, "base64").toString("utf-8");
  const parsed = JSON.parse(json) as { client_email: string; private_key: string };

  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, "\n"), // FIX 1
  };
}

export async function appendToSheet(fields: Record<string, unknown>, submissionId: string) {
  const creds = getCredentials();
  
  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets", // Spreadsheet edit scope
      "https://www.googleapis.com/auth/drive.file",  // Drive file scope (FIX 2)
    ],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, jwt);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    Timestamp: new Date().toISOString(),
    SubmissionID: submissionId,
    ...fields,
  });
}