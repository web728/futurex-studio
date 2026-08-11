import type { MetadataRoute } from "next"; import { siteUrl } from "@/data/site";
export default function robots():MetadataRoute.Robots{const staging=process.env.NEXT_PUBLIC_NOINDEX==="true";return{rules:staging?{userAgent:"*",disallow:"/"}:{userAgent:"*",allow:"/",disallow:["/api/"]},sitemap:`${siteUrl}/sitemap.xml`}}
