import "server-only"; import { Collection } from "mongodb"; import { database } from "./mongodb"; import type { FormSubmission, IntegrationResult } from "@/lib/forms/types";
async function collection():Promise<Collection<FormSubmission>>{return(await database()).collection<FormSubmission>(process.env.MONGODB_COLLECTION||"form_submissions")}
export async function ensureSubmissionIndexes(){const c=await collection();await Promise.all([c.createIndex({submissionId:1},{unique:true}),c.createIndex({idempotencyKey:1},{unique:true}),c.createIndex({formType:1}),c.createIndex({submittedAt:-1}),c.createIndex({status:1}),c.createIndex({createdAt:-1})])}
export async function findByIdempotencyKey(key:string){return(await collection()).findOne({idempotencyKey:key})}
export async function insertSubmission(value:FormSubmission){await ensureSubmissionIndexes();await(await collection()).insertOne(value)}
export async function updateIntegration(submissionId:string,integration:"googleSheets"|"email",result:IntegrationResult,status:FormSubmission["status"]){await(await collection()).updateOne({submissionId},{$set:{[`delivery.${integration}`]:result,status,updatedAt:new Date()}})}
export async function updateFinalStatus(submissionId:string,status:FormSubmission["status"]){await(await collection()).updateOne({submissionId},{$set:{status,updatedAt:new Date()}})}
export async function failedSubmissions(limit=50){return(await collection()).find({$or:[{"delivery.googleSheets.status":"failed"},{"delivery.email.status":"failed"}]}).sort({createdAt:1}).limit(limit).toArray()}
