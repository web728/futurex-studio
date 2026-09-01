"use client";

import React, { useEffect, useRef } from "react";
import { Compass, Sparkles, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  description: string;
  includes: string[];
}

interface ServicesListProps {
  services: ServiceItem[];
  serviceIcons: React.ComponentType<{ size?: number; className?: string }>[];
}

export function ServicesListSection({
  services,
  serviceIcons,
}: ServicesListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      const headerNodes = headerRef.current?.querySelectorAll(".serv-head-node");
      if (headerNodes && headerNodes.length > 0) {
        gsap.fromTo(
          headerNodes,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 2. Service Cards Batch Stagger
      const cards = gridRef.current?.querySelectorAll(".service-module-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="services-list"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* Top Divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border,rgba(241,239,233,0.18))] to-transparent opacity-60" />

      {/* Ambient Accent Radial Backdrop Glows */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.08)_0%,transparent_75%)] blur-[150px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Strictly Center-Aligned Section Header */}
        <div
          ref={headerRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center pb-14 lg:pb-18"
        >
          <div className="serv-head-node inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
            <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
            <span>Core Disciplines</span>
          </div>

          <h2 className="serv-head-node mt-4 text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
            <span className="relative inline-block pb-1">
              Six disciplines.
              {/* Glowing Accent Underline */}
              <span
                className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent shadow-[0_0_12px_rgba(255,90,42,0.6)]"
                aria-hidden="true"
              />
            </span>
            <br />
            <span className="text-[var(--secondary,#b8b6af)]">
              One accountable team.
            </span>
          </h2>

          <p className="serv-head-node mt-4 max-w-xl text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-base">
            From initial concept architecture to live show-floor execution, every stage operates under a unified line of technical control.
          </p>
        </div>

        {/* 2-Column Luxury Technical Modules Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {services.map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];

            return (
              <article
                key={s.slug}
                id={s.slug}
                className="service-module-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-7 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-1 shadow-xl sm:p-9"
              >
                {/* Architectural Corner Crosshairs (+) */}
                <span className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] text-[var(--muted,#7d807e)]/30 group-hover:text-[var(--accent,#ff5a2a)]/50 transition-colors">
                  +
                </span>
                <span className="pointer-events-none absolute right-3 top-3 font-mono text-[9px] text-[var(--muted,#7d807e)]/30 group-hover:text-[var(--accent,#ff5a2a)]/50 transition-colors">
                  +
                </span>

                {/* Ambient Corner Glow on Hover */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[var(--accent,#ff5a2a)]/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Big Watermark Index Number */}
                <span className="pointer-events-none absolute right-5 top-3 select-none font-mono text-6xl font-extrabold text-white/[0.02] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]/[0.07] sm:text-7xl">
                  {s.number}
                </span>

                {/* Card Main Body */}
                <div className="relative z-10">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-[var(--border,rgba(241,239,233,0.08))] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent,#ff5a2a)] font-mono text-[10px] font-bold text-black">
                        {s.number}
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--secondary,#b8b6af)]">
                        Phase 0{i + 1}
                      </span>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--background,#0b0c0d)] text-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)]/50 group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,90,42,0.4)]">
                      {Icon && <Icon size={18} />}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-[var(--text,#f1efe9)] transition-colors duration-200 group-hover:text-[var(--accent,#ff5a2a)] sm:text-2xl">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                    {s.description}
                  </p>
                </div>

                {/* Deliverables Matrix */}
                <div className="relative z-10 mt-7 border-t border-[var(--border,rgba(241,239,233,0.08))] pt-5">
                  <div className="mb-3.5 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--muted,#7d807e)]">
                      <Compass size={12} className="text-[var(--accent,#ff5a2a)]" />
                      Key Deliverables & Specifications
                    </h4>
                    <span className="font-mono text-[9px] text-[var(--muted,#7d807e)]">
                      {s.includes.length} Modules
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {s.includes.map((asset, assetIdx) => (
                      <div
                        key={asset}
                        className="group/item flex items-center justify-between rounded-xl border border-[var(--border,rgba(241,239,233,0.08))] bg-[var(--background,#0b0c0d)]/60 px-3 py-2.5 transition-all duration-200 hover:border-[var(--accent,#ff5a2a)]/40 hover:bg-[var(--background,#0b0c0d)]"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="font-mono text-[9px] font-semibold text-[var(--muted,#7d807e)] group-hover/item:text-[var(--accent,#ff5a2a)] transition-colors">
                            0{assetIdx + 1}
                          </span>
                          <span className="text-xs font-medium text-[var(--text,#f1efe9)]/90 truncate">
                            {asset}
                          </span>
                        </div>

                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/5 text-[var(--muted,#7d807e)] group-hover/item:bg-[var(--accent,#ff5a2a)]/20 group-hover/item:text-[var(--accent,#ff5a2a)] transition-colors">
                          <Check size={10} strokeWidth={2.5} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Line Indicator */}
                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--border,rgba(241,239,233,0.06))] pt-3 text-[10px] font-mono tracking-wider text-[var(--muted,#7d807e)]">
                  <span>STANDARD EXECUTION SPEC</span>
                  <div className="flex items-center gap-1 text-[var(--accent,#ff5a2a)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-semibold">
                    <span>Verified Scope</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}