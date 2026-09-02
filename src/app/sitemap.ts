export const revalidate = 0;
export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import { projects, siteUrl as rawSiteUrl } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  // Normalize base URL (ensure no trailing slash)
  const baseUrl = (rawSiteUrl || "https://studiofuturex.com").replace(/\/+$/, "");
  const currentDate = new Date();

  // Core Static Routes with Precision SEO Weights
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/exhibition-solutions`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Portfolio / Case Study Detail Pages
  const dynamicProjectRoutes: MetadataRoute.Sitemap = (projects || [])
    .filter((project) => Boolean(project.slug))
    .map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...dynamicProjectRoutes];
}