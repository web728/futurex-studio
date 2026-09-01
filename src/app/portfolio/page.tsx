import type { Metadata } from "next";
import { siteImages } from "@/data/site-images";
import { projects } from "@/data/site";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { CinematicPortfolio } from "@/components/cinematic-sections";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Exhibition Portfolio | Futurex Studio Archive",
  description:
    "Explore selected exhibition pavilions, modular stands, and branded environments from Futurex Studio's spatial project archive.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Exhibition Portfolio | Futurex Studio Archive",
    description:
      "Explore selected exhibition pavilions, modular stands, and branded environments from Futurex Studio's spatial project archive.",
    url: "/portfolio",
    type: "website",
    images: [
      {
        url: siteImages.homeHero.src,
        width: 1200,
        height: 630,
        alt: siteImages.homeHero.alt || "Futurex Studio Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exhibition Portfolio | Futurex Studio Archive",
    description:
      "Explore selected exhibition pavilions, modular stands, and branded environments from Futurex Studio's spatial project archive.",
    images: [siteImages.homeHero.src],
  },
};

export default function PortfolioPage() {
  // Schema.org Structured Data for Portfolio Items
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Futurex Studio Exhibition Portfolio",
    description: "Selected exhibition stalls, country pavilions, and branded spaces",
    itemListElement: projects.map((project: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title || project.name || `Exhibition Project ${index + 1}`,
        description:
          project.description ||
          project.copy ||
          project.summary ||
          "Turnkey exhibition pavilion build",
        image: typeof project.image === "string" ? project.image : siteImages.homeHero.src,
      },
    })),
  };

  return (
    <main className="relative min-h-screen w-full bg-[var(--background,#0b0c0d)] text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white">
      {/* Search Engine Rich Results Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Ultra-Clean Architectural Portfolio Hero */}
      <PortfolioHero totalCount={projects.length} />

      {/* 2. Structured Portfolio Grid Showcase */}
      <CinematicPortfolio projects={projects} />

      {/* 3. Primary Call To Action */}
      <CTA />
    </main>
  );
}