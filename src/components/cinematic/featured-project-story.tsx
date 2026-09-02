"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fallbackProjects = [
  {
    title: "R.K Steel Pavilion",
    category: "Turnkey Pavilion",
    image: "/gallery/project-1.jpg",
  },
  {
    title: "Kajaria Laminates Exhibit",
    category: "Modular Structure",
    image: "/gallery/1.3.jpg",
  },
  {
    title: "HVAC Solution Bengaluru",
    category: "Bespoke Exhibition",
    image: "/gallery/4.png",
  },
  {
    title: "Q Green Expo Stand",
    category: "Sustainable Architecture",
    image: "/gallery/project-4.jpeg",
  },
];

export function FeaturedProjectStory({ projects }: { projects?: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Type-Safe Items Extraction
  const rawItems = (projects && projects.length > 0 ? projects : fallbackProjects).map(
    (item: any, i) => {
      const fallback = fallbackProjects[i % fallbackProjects.length];
      return {
        title: item.title || fallback.title,
        category: item.category || fallback.category,
        image:
          item.thumbnailImage ||
          item.featuredImage ||
          item.image ||
          fallback.image,
      };
    }
  );

  // Repeat for continuous seamless loop (3x for better flow)
  const displayItems = [...rawItems, ...rawItems, ...rawItems];

  // 1. Header Entrance Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerElements = headerRef.current?.querySelectorAll(".feat-anim-node");
      if (headerElements && headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Butter-Smooth Continuous Marquee with Perfect Loop
  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Wait for images to load for accurate width
      const timer = setTimeout(() => {
        const totalWidth = track.scrollWidth;
        const itemCount = rawItems.length;
        const singleCycleWidth = totalWidth / 3; // Since we have 3 repeats

        tweenRef.current = gsap.to(track, {
          x: -singleCycleWidth,
          ease: "none",
          duration: 75,
          repeat: -1,
          repeatRefresh: true, // Recalculate on each repeat for perfect loop
          modifiers: {
            x: gsap.utils.unitize(x => {
              const val = parseFloat(x);
              return val % singleCycleWidth;
            })
          }
        });
      }, 500);

      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, [rawItems.length]);

  // Smooth Momentum Pause & Resume with ease
  const handleMouseEnter = useCallback(() => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: "power3.inOut" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: "power3.inOut" });
  }, []);

  // Smooth Gentle Step on Arrow Click
  const manualNudge = useCallback((direction: "left" | "right") => {
    if (!tweenRef.current) return;
    const shift = direction === "left" ? 0.05 : -0.05;
    const newProgress = gsap.utils.wrap(0, 1, tweenRef.current.progress() - shift);
    gsap.to(tweenRef.current, {
      progress: newProgress,
      duration: 0.7,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white border-b border-[var(--border,rgba(241,239,233,0.12))]"
    >
      {/* Ambient Radial Depth Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.06)_0%,transparent_75%)] blur-[140px]"
        aria-hidden="true"
      />

      {/* STRICT CONTAINER FOR ENTIRE SECTION: Aligned to Page Grid Lines */}
      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex flex-col justify-between gap-8 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-10 lg:flex-row lg:items-end"
        >
          {/* Left Title */}
          <div>
            <div className="feat-anim-node inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Selected Works</span>
            </div>

            <h2 className="feat-anim-node mt-4 text-[clamp(2.2rem,4.2vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1.5">
                Spaces shaped around
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent shadow-[0_0_10px_rgba(255,90,42,0.5)]"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                the brand presence.
              </span>
            </h2>
          </div>

          {/* Right Lead & Manual Smooth Arrows */}
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="feat-anim-node max-w-sm text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] lg:text-right">
              Curated spatial installations executed worldwide. Hover over any frame to inspect details in the archive.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => manualNudge("left")}
                aria-label="Previous exhibit"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] text-[var(--text,#f1efe9)] transition-all duration-200 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95 cursor-pointer shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => manualNudge("right")}
                aria-label="Next exhibit"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] text-[var(--text,#f1efe9)] transition-all duration-200 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95 cursor-pointer shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Track Window */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative mt-12 w-full overflow-hidden rounded-2xl py-2 select-none"
        >
          {/* GPU-Accelerated Smooth Motion Track */}
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ 
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayItems.map((project, idx) => (
              <Link
                key={`${project.title}-${idx}`}
                href="/portfolio"
                aria-label={`View ${project.title} in portfolio`}
                className="group relative flex w-[300px] sm:w-[380px] lg:w-[440px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] shadow-xl transition-colors duration-300 hover:border-[var(--accent,#ff5a2a)]/60 cursor-pointer"
              >
                {/* Corner Precision Crosshairs (+) */}
                <span className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-[9px] text-white/30 group-hover:text-[var(--accent,#ff5a2a)] transition-colors">
                  +
                </span>
                <span className="pointer-events-none absolute right-3 top-3 z-20 font-mono text-[9px] text-white/30 group-hover:text-[var(--accent,#ff5a2a)] transition-colors">
                  +
                </span>

                {/* Pure Visual Aspect Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070809]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 300px, 440px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx < 4}
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                  {/* Top Category Badge */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text,#f1efe9)] backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-lg transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black group-hover:scale-105">
                    <span>Explore in Portfolio</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section Bottom Strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border,rgba(241,239,233,0.12))] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--secondary,#b8b6af)]">
            Continuous Spatial Exhibit Archive
          </p>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--text,#f1efe9)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95"
          >
            <span>Explore All Exhibition Stalls</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}