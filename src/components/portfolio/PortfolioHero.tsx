"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { siteImages } from "@/data/site-images";

interface PortfolioHeroProps {
  totalCount?: number;
}

export function PortfolioHero({ totalCount = 24 }: PortfolioHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = heroContentRef.current?.querySelectorAll(".port-hero-node");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.05,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[72vh] lg:min-h-[80vh] w-full items-center justify-center overflow-hidden border-b border-[var(--border,rgba(241,239,233,0.12))] px-6 py-20 lg:py-28"
    >
      {/* Layer 1: Darkened Spatial Archive Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <Image
          src={siteImages.homeHero?.src || "/gallery/project-1.jpg"}
          alt="Spatial Archive Gallery Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.08] filter grayscale contrast-150 scale-105"
        />
        {/* Deep Horizon Linear Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background,#0b0c0d)] via-[var(--background,#0b0c0d)]/80 to-[var(--background,#0b0c0d)]" />
      </div>

      {/* Layer 2: Gallery Diagonal Cross-Hatch Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-15 bg-[radial-gradient(circle_at_center,rgba(241,239,233,0.15)_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      {/* Layer 3: Curatorial Viewfinder Optical Crop Markers */}
      <div className="pointer-events-none absolute inset-8 z-[2] hidden md:block select-none opacity-40">
        {/* Top-Left Bracket */}
        <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[var(--accent,#ff5a2a)]" />
        <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
          CAM // 01
        </span>

        {/* Top-Right Bracket */}
        <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-white/30" />
        <span className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
          REC ● 4K
        </span>

        {/* Bottom-Left Bracket */}
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/30" />
        <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
          ARCHIVE // 2026
        </span>

        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--accent,#ff5a2a)]" />
        <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
          SCALE 1:1
        </span>
      </div>

      {/* Layer 4: Wide Anamorphic Horizontal Optical Flare Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 h-28 w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(255,90,42,0.14)_0%,rgba(255,90,42,0.02)_60%,transparent_80%)] blur-[50px]"
        aria-hidden="true"
      />

      {/* Main Content: Strictly Centered & 2-Line Punchy Headline */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div
          ref={heroContentRef}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Eyebrow Pill */}
          <div className="port-hero-node mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--surface,#121416)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent,#ff5a2a)] backdrop-blur-md shadow-sm">
            <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
            <span>Curated Exhibition Archive</span>
          </div>

          {/* Exactly 2-Line Headline Matching Cadence */}
          <h1 className="port-hero-node text-[clamp(2.4rem,5.6vw,4.75rem)] font-extrabold tracking-tight text-[var(--text,#f1efe9)] leading-[1.1]">
            <span className="relative inline-block pb-1">
              Selected spatial archive.
              {/* Glowing Accent Underline */}
              <span
                className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-95 shadow-[0_0_12px_rgba(255,90,42,0.65)]"
                aria-hidden="true"
              />
            </span>
            <br />
            <span className="text-[var(--secondary,#b8b6af)]">
              Built to be experienced.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="port-hero-node mt-5 max-w-xl text-base font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-lg">
            A curated collection of turnkey exhibition stands, custom brand pavilions, and immersive spatial environments executed worldwide.
          </p>

          {/* Architectural Metric Pill */}
          <div className="port-hero-node mt-9 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)]/60 px-6 py-3 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
              <span>{totalCount}+ Verified Builds</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--focus,#ffd2c3)]" />
              <span>Photorealistic 3D to Floor</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success,#66d19e)]" />
              <span>Global Venues</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}