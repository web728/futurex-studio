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
      {/* 1. LUXURY EDITORIAL ABOUT HERO SECTION (MATCHED TO HOME HERO CADENCE)     */}
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
            className="object-cover opacity-[0.14] filter grayscale contrast-125 scale-105"
          />
          {/* Radial Dark Mask to focus light at center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,12,13,0.65)_0%,rgba(11,12,13,0.98)_80%)]" />
        </div>

        {/* Layer 2: Precision Architectural Gridlines */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-20 bg-[linear-gradient(rgba(241,239,233,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(241,239,233,0.06)_1px,transparent_1px)] bg-[size:60px_60px]"
          aria-hidden="true"
        />

        {/* Layer 3: Architectural Crosshair Concentric Radar Rings */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 opacity-15"
          width="700"
          height="700"
          viewBox="0 0 700 700"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="350" cy="350" r="180" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="350" cy="350" r="280" stroke="white" strokeWidth="1.2" opacity="0.6" />
          <circle cx="350" cy="350" r="340" stroke="white" strokeWidth="1" opacity="0.3" strokeDasharray="8 8" />
          <line x1="350" y1="50" x2="350" y2="650" stroke="white" strokeWidth="1" opacity="0.2" />
          <line x1="50" y1="350" x2="650" y2="350" stroke="white" strokeWidth="1" opacity="0.2" />
        </svg>

        {/* Layer 4: Multi-Stop Atmospheric Ambient Orange Glows */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.12)_0%,rgba(255,90,42,0.02)_55%,transparent_75%)] blur-[120px]"
          aria-hidden="true"
        />

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
      <section className="relative overflow-hidden bg-[var(--surface,#121416)] py-16 lg:py-24 border-t border-[var(--border,rgba(241,239,233,0.12))]">
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