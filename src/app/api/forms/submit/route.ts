import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { Readable } from "stream";

// Safe Base64 Credentials Parser
function getCredentialsFromBase64(envVar: string | undefined) {
  if (!envVar) return null;
  try {
    const decoded = Buffer.from(envVar, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Base64 Parse Error:", err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = (formData.get("fields[fullName]") as string) || "Client";
    const company = (formData.get("fields[company]") as string) || "N/A";
    const email = formData.get("fields[email]") as string;
    const phone = formData.get("fields[phone]") as string;
    const services = formData.get("fields[services]") as string;
    const description = formData.get("fields[description]") as string;
    const file = formData.get("fields[file]") as File | null;

    let driveFileUrl = "";
    let fileBuffer: Buffer | null = null;
    let customFileName = "";

    // -------------------------------------------------------------
    // A. GOOGLE DRIVE UPLOAD LOGIC
    // -------------------------------------------------------------
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      fileBuffer = Buffer.from(bytes);

      const extension = file.name.split(".").pop();
      const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, "_");
      customFileName = `${sanitizedName}_${Date.now()}.${extension}`;

      // Environment variable fallback check
      const driveB64 = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_BASE64 || process.env.GOOGLE_DRIVE_PRIVATE_KEY;
      const driveCreds = getCredentialsFromBase64(driveB64);

      if (driveCreds && process.env.GOOGLE_DRIVE_FOLDER_ID) {
        const driveAuth = new google.auth.GoogleAuth({
          credentials: {
            client_email: driveCreds.client_email,
            private_key: driveCreds.private_key,
          },
          // Scope FIXED to full drive access
          scopes: ["https://www.googleapis.com/auth/drive"],
        });

        const drive = google.drive({ version: "v3", auth: driveAuth });
        const fileStream = Readable.from(fileBuffer);

        const driveResponse = await drive.files.create({
          requestBody: {
            name: customFileName,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
          },
          media: {
            mimeType: file.type || "application/octet-stream",
            body: fileStream,
          },
          fields: "id, webViewLink",
        });

        driveFileUrl = driveResponse.data.webViewLink || "";
      }
    }

    // -------------------------------------------------------------
    // B. GOOGLE SHEETS APPEND LOGIC
    // -------------------------------------------------------------
    const sheetsCreds = getCredentialsFromBase64(process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64);

    if (sheetsCreds && process.env.GOOGLE_SPREADSHEET_ID) {
      const sheetsAuth = new google.auth.GoogleAuth({
        credentials: {
          client_email: sheetsCreds.client_email,
          private_key: sheetsCreds.private_key,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth: sheetsAuth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: `${process.env.GOOGLE_SHEET_NAME || "Sheet1"}!A:G`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
              fullName,
              company,
              email,
              phone,
              services,
              driveFileUrl || "No File Attached",
            ],
          ],
        },
      });
    }

    // -------------------------------------------------------------
    // C. NODEMAILER EMAIL LOGIC
    // -------------------------------------------------------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${fullName}" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL_1 || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Project Proposal from ${fullName} - ${company}`,
      html: `
        <h2>New Project Proposal Enquiry</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Required:</strong> ${services}</p>
        <p><strong>Description:</strong> ${description}</p>
        <br/>
        ${
          driveFileUrl
            ? `<p><strong>📁 Google Drive Link:</strong> <a href="${driveFileUrl}">${customFileName}</a></p>`
            : "<p><em>No file attached.</em></p>"
        }
      `,
      attachments: fileBuffer
        ? [{ filename: customFileName, content: fileBuffer }]
        : [],
    });

    return NextResponse.json({
      success: true,
      message: "Submission successful",
    });
  } catch (error: any) {
    console.error("Submission Error Details:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Submission failed" },
      { status: 500 }
    );
  }
}