import type { MetadataRoute } from "next";
import { siteUrl as rawSiteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Normalize base URL
  const baseUrl = (rawSiteUrl || "https://futurexstudio.com").replace(/\/+$/, "");

  // Staging safe check: only block if explicitly defined
  const isNoIndex = process.env.NEXT_PUBLIC_NOINDEX === "true";

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
          "/admin/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}