import type { Metadata } from "next";
import { CinematicPortfolio } from "@/components/cinematic-sections";
import { PremiumHero } from "@/components/premium-hero";
import { siteImages } from "@/data/site-images";
import { projects } from "@/data/site";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Exhibition Portfolio | Futurex Studio Archive",
  description:
    "Explore selected exhibition stalls and branded environments from Futurex Studio's public project archive.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Exhibition Portfolio | Futurex Studio Archive",
    description:
      "Explore selected exhibition stalls and branded environments from Futurex Studio's public project archive.",
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
      "Explore selected exhibition stalls and branded environments from Futurex Studio's public project archive.",
    images: [siteImages.homeHero.src],
  },
};

export default function PortfolioPage() {
  // Hero Carousel Images Array
  const heroImages = [
    siteImages.homeHero,
    siteImages.homeServices,
    siteImages.homeCta,
  ];

  // Schema.org Structured Data for Portfolio Items
  // Schema.org Structured Data for Portfolio Items
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Futurex Studio Exhibition Portfolio",
  description: "Selected exhibition stalls and branded environments",
  itemListElement: projects.map((project: any, index: number) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title || project.name || `Exhibition Project ${index + 1}`,
      description: project.description || project.copy || project.summary || "Branded spatial exhibit build",
      image: typeof project.image === "string" ? project.image : siteImages.homeHero.src,
    },
  })),
};

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Search Engine Rich Results Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cinematic Hero Section */}
      <PremiumHero
        eyebrow="Selected project imagery"
        title="Work designed to be experienced, not scrolled past."
        copy="Every image shown here comes from Futurex Studio's public archive. Pure spatial execution built for high-impact brand presence."
        backgroundImages={heroImages}
        enableParallax={true}
        enable3D={true}
      />

      {/* Portfolio Grid Section */}
      <CinematicPortfolio projects={projects} />

      {/* Primary Call To Action */}
      <CTA />
    </main>
  );
}