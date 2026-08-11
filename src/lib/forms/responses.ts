import { NextResponse } from "next/server"; import type { ErrorCode, ErrorResponse, SuccessResponse } from "./types";
export function success(submissionId:string){return NextResponse.json<SuccessResponse>({success:true,submissionId,message:"Thank you. Your enquiry has been received successfully. Our team will review it and contact you shortly."},{status:201})}
export function failure(status:number,code:ErrorCode,message:string,extra:Partial<ErrorResponse>={}){return NextResponse.json<ErrorResponse>({success:false,code,message,...extra},{status})}
