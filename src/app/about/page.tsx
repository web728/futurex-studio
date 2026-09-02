"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Users, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/data/site-images";
import { ProcessMotion } from "@/components/motion";
import { HowWeWorkSection } from "@/components/HowWeWorkSection";
import { PovStatsSection } from "@/components/sections/PovStatsSection";
import { MissionStrip } from "@/components/about/MissionStrip";
import { CTA } from "@/components/CTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const principles = [
  {
    icon: Users,
    title: "Listen before drawing",
    copy: "The brief, brand rules, audience and venue conditions set the direction before a single line is drawn.",
  },
  {
    icon: Sparkles,
    title: "Make the idea visible",
    copy: "3D visualisation helps teams review the space before production decisions are locked in.",
  },
  {
    icon: Wrench,
    title: "Coordinate the build",
    copy: "Design intent is carried into fabrication, installation and on-site execution without dilution.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = heroContentRef.current?.querySelectorAll(".about-hero-node");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.1,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[var(--background,#0b0c0d)] text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
   {/* ========================================================================= */}
      {/* 1. LUXURY ABOUT HERO (ARCHITECTURAL PAVILION RIBS & SPATIAL STAGE)        */}
      {/* ========================================================================= */}
      <section className="relative flex min-h-[75vh] lg:min-h-[85vh] w-full items-center justify-center overflow-hidden border-b border-[var(--border,rgba(241,239,233,0.12))] px-6 py-20 lg:py-28">
        
        {/* Layer 1: Darkened Spatial Studio Architecture Backdrop */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <Image
            src={siteImages.aboutHero?.src || "/gallery/project-1.jpg"}
            alt="Spatial Architectural Studio Backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.11] filter grayscale contrast-150 scale-105"
          />
          {/* Deep Obsidian Radial Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,12,13,0.45)_0%,rgba(11,12,13,0.96)_85%)]" />
        </div>

        {/* Layer 2: Apple/Linear Precision Micro Dot Matrix */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-25 bg-[radial-gradient(rgba(241,239,233,0.22)_1px,transparent_1px)] bg-[size:36px_36px]"
          aria-hidden="true"
        />

        {/* Layer 3: Top Volumetric Stage Beam (Warm Showroom Spotlight) */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-[2] -translate-x-1/2 h-[520px] w-[900px] bg-[radial-gradient(ellipse_at_top,rgba(255,90,42,0.18)_0%,rgba(255,90,42,0.03)_55%,transparent_75%)] blur-[100px]"
          aria-hidden="true"
        />

        {/* Layer 4: 3D Curved Pavilion Structural Ribs (Architectural Depth) */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 h-full w-[1200px] max-w-none opacity-30"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M100 550 C 350 150, 850 150, 1100 550"
            stroke="url(#about-rib-grad)"
            strokeWidth="1.5"
          />
          <path
            d="M200 550 C 400 230, 800 230, 1000 550"
            stroke="url(#about-rib-grad)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M300 550 C 460 300, 740 300, 900 550"
            stroke="url(#about-rib-grad)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="600"
            y1="80"
            x2="600"
            y2="550"
            stroke="rgba(241,239,233,0.15)"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
          <circle cx="600" cy="205" r="3" fill="var(--accent,#ff5a2a)" />
          <defs>
            <linearGradient id="about-rib-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(241,239,233,0.05)" />
              <stop offset="50%" stopColor="rgba(255,90,42,0.6)" />
              <stop offset="100%" stopColor="rgba(241,239,233,0.05)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layer 5: Left & Right Studio Elevation Markers (Desktop Flanks) */}
        <div className="pointer-events-none absolute inset-y-0 left-8 z-[2] hidden xl:flex flex-col justify-between py-20 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)] opacity-35">
          <span>ATELIER // 01</span>
          <span>STUDIO ORIGIN</span>
          <span>+0.00 M LEVEL</span>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-8 z-[2] hidden xl:flex flex-col justify-between py-20 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)] text-right opacity-35">
          <span>PHYSICAL // 3D</span>
          <span>FABRICATION SLA</span>
          <span>AXIS // A-01</span>
        </div>

        {/* Layer 6: Horizontal Horizon Laser Datum */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[2] -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)]/30 to-transparent" />

        {/* Main Content: Strictly Centered & 2-Line Punchy Headline */}
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div
            ref={heroContentRef}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            {/* Eyebrow Pill */}
            <div className="about-hero-node mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--surface,#121416)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent,#ff5a2a)] backdrop-blur-md shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>About Futurex Studio</span>
            </div>

            {/* Exactly 2-Line Headline Matching Home Hero Cadence */}
            <h1 className="about-hero-node text-[clamp(2.4rem,5.6vw,4.75rem)] font-extrabold tracking-tight text-[var(--text,#f1efe9)] leading-[1.1]">
              <span className="relative inline-block pb-1">
                Visionary design.
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-95 shadow-[0_0_12px_rgba(255,90,42,0.65)]"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                Built for reality.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="about-hero-node mt-5 max-w-xl text-base font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-lg">
              We bridge visionary architectural concepts, 3D visualization, and workshop fabrication to deliver world-class exhibition structures.
            </p>

            {/* Architectural Metric Pill */}
            <div className="about-hero-node mt-9 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)]/60 px-6 py-3 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
                <span>Spatial Architecture</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--focus,#ffd2c3)]" />
                <span>3D Visualisation</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success,#66d19e)]" />
                <span>Turnkey Build</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. POV & Key Stats */}
      <PovStatsSection imageSrc={siteImages.aboutHero.src} />

      {/* 3. Principles / How We Work */}
      <HowWeWorkSection principles={principles} />

      {/* 4. Structured Process Workflow */}
      <section className="relative overflow-hidden bg-[#090a0b] py-16 lg:py-24 border-t border-[var(--border,rgba(241,239,233,0.12))]">
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <ProcessMotion />
        </div>
      </section>

      {/* 5. Studio Mission Strip */}
      <MissionStrip />

      {/* 6. Call To Action */}
      <CTA />
    </div>
  );
}