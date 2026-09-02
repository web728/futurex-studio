import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

export async function GET() {
  const items = await sitemap();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items
    .map(
      (item) => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${item.changeFrequency || "monthly"}</changefreq>
      <priority>${item.priority || 0.7}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}