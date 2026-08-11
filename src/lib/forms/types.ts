export type IntegrationStatus = "pending" | "success" | "failed";
export type DeliveryStatus = "pending" | "completed" | "partially_completed" | "failed";
export type IntegrationResult = { status: IntegrationStatus; attempts: number; attemptedAt?: Date; completedAt?: Date; error?: string };
export type SubmissionDelivery = { mongodb: IntegrationResult; googleSheets: IntegrationResult; email: IntegrationResult };
export type RequestMetadata = {
  ipAddress?: string; userAgent?: string; referer?: string; pathname?: string;
  utmSource?: string; utmMedium?: string; utmCampaign?: string; utmTerm?: string; utmContent?: string;
};
export type FormSubmission = {
  submissionId:string; idempotencyKey:string; formType:string; websiteName:string; source:string; submittedAt:Date;
  fields:Record<string,unknown>; metadata:RequestMetadata; status:DeliveryStatus; delivery:SubmissionDelivery;
  createdAt:Date; updatedAt:Date;
};
export type SubmissionRequest = { formType:string; source?:string; pathname?:string; captchaToken:string; idempotencyKey:string; startedAt?:number; fields:Record<string,unknown> };
export type SuccessResponse = { success:true; submissionId:string; message:string };
export type ErrorCode = "VALIDATION_ERROR"|"CAPTCHA_REQUIRED"|"CAPTCHA_FAILED"|"RATE_LIMITED"|"DATABASE_ERROR"|"SHEETS_ERROR"|"EMAIL_ERROR"|"PARTIAL_DELIVERY"|"SERVER_ERROR"|"DUPLICATE";
export type ErrorResponse = { success:false; code:ErrorCode; message:string; fieldErrors?:Record<string,string[]>; submissionId?:string };
