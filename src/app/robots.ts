import type { MetadataRoute } from "next";
import { siteUrl as rawSiteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Normalize base URL (ensure no double slashes)
  const baseUrl = (rawSiteUrl || "https://studiofuturex.com").replace(/\/+$/, "");
  
  // Staging / Preview environment safeguard
  const isNoIndex =
    process.env.NEXT_PUBLIC_NOINDEX === "true" ||
    process.env.VERCEL_ENV === "preview";

  if (isNoIndex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/*.json$", // API payloads crawl waste na karein
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}