import "server-only";
export async function verifyRecaptcha(token:string,remoteip?:string){
  const secret=process.env.RECAPTCHA_SECRET_KEY;if(!secret)throw new Error("CONFIG_RECAPTCHA");
  const body=new URLSearchParams({secret,response:token});if(remoteip)body.set("remoteip",remoteip);
  const response=await fetch("https://www.google.com/recaptcha/api/siteverify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body,signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error("RECAPTCHA_PROVIDER");
  const result=await response.json() as {success:boolean;hostname?:string;"error-codes"?:string[]};
  const expected=process.env.RECAPTCHA_EXPECTED_HOSTNAME;if(expected&&result.hostname!==expected)return false;
  return result.success===true;
}
