import "server-only";
export function safeLog(event:{submissionId?:string;formType?:string;step:string;result:"success"|"failed";attempt?:number;category?:string}){console.info(JSON.stringify({timestamp:new Date().toISOString(),...event}))}
