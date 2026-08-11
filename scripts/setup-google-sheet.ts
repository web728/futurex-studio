import { verifySheetHeaders } from "../src/lib/integrations/google-sheets";
verifySheetHeaders().then(()=>{console.info("Website Enquiries headers verified.")}).catch(error=>{console.error("Google Sheet setup failed:",error instanceof Error?error.message:"unknown");process.exitCode=1});
