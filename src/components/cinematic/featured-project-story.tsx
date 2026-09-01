"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredCardImages = [
  "/gallery/project-1.jpg",
  "/gallery/1.3.jpg",
  "/gallery/4.png",
  "/gallery/project-4.jpeg",
];

const featuredCardTitles = [
  "R.K Steel",
  "Kajaria Laminates",
  "Hvac Solution Bengaluru",
  "Q Green",
];

const featuredCategories = [
  "Pavilion Architecture",
  "Exhibition Space",
  "Industrial Experiential",
  "Modular Structure",
];

export function FeaturedProjectStory({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clean Staggered Header Reveal
      const headerElements = headerRef.current?.querySelectorAll(".feat-anim-node");
      if (headerElements && headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 2. Smooth Batch Card Reveal
      const cards = gridRef.current?.querySelectorAll(".project-card-node");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="relative overflow-hidden  bg-[#0d0e0e] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >


      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header Section: Editorial Balanced Grid */}
        <div
          ref={headerRef}
          className="grid gap-8 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-10 lg:grid-cols-12 lg:items-end"
        >
          {/* Left: 2-Line Headline */}
          <div className="lg:col-span-7">
            <p className="feat-anim-node text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              Selected Projects
            </p>

            <h2 className="feat-anim-node mt-3 text-[clamp(2.2rem,4.2vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1.5">
                Spaces shaped around
                {/* Clean Glowing Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                the brand presence.
              </span>
            </h2>
          </div>

          {/* Right: Sharp Editorial Paragraph */}
          <div className="lg:col-span-5 lg:pb-1">
            <p className="feat-anim-node max-w-md text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] lg:text-base">
              A curated archive of experiential spatial builds, engineering
              clarity, and bespoke fabrication crafted for modern exhibition
              environments.
            </p>
          </div>
        </div>

        {/* Projects 2x2 Grid: Clean, Equal & Balanced */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
        >
          {featured.map((project, index) => (
            <article
              key={project.slug || index}
              className="project-card-node group flex flex-col"
            >
              <Link href={`/portfolio/${project.slug}`} className="block w-full">
                {/* Equal Aspect Ratio Image Card with Luxury Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--elevated,#191c1f)] shadow-xl transition-all duration-500 group-hover:border-[var(--accent,#ff5a2a)]/60 group-hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                  <Image
                    src={featuredCardImages[index] || "/gallery/project-1.jpg"}
                    alt={featuredCardTitles[index] || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background,#0b0c0d)]/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                  {/* Top Floating Badge */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3.5 py-1 backdrop-blur-md">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text,#f1efe9)]/90">
                      {featuredCategories[index] || project.category || "Exhibition"}
                    </span>
                  </div>
                </div>

                {/* Card Title & Link Line */}
                <div className="mt-4 flex items-center justify-between border-b border-[var(--border,rgba(241,239,233,0.1))] pb-3 transition-colors duration-300 group-hover:border-[var(--accent,#ff5a2a)]/40">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--text,#f1efe9)] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)] sm:text-xl">
                      {featuredCardTitles[index] || project.title}
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-white">
                    <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Section Bottom Footer Link */}
        <div className="mt-14 flex items-center justify-between border-t border-[var(--border,rgba(241,239,233,0.12))] pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--secondary,#b8b6af)]">
            Archive 01 — 04
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--elevated,#191c1f)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text,#f1efe9)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)]/10 hover:text-[var(--accent,#ff5a2a)]"
          >
            <span>View Full Archive</span>
            <ArrowRight
              size={14}
              className="text-[var(--accent,#ff5a2a)] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}