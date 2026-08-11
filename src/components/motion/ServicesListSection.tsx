"use client";

import React, { useEffect, useRef } from "react";
import { Layers, Compass, ArrowUpRight } from "lucide-react";
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

export function ServicesListSection({ services, serviceIcons }: ServicesListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Lightweight scale-down animation on active cards as you scroll past them
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Skip animation for the very last card
        if (i === services.length - 1) return;

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.6,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 120px", // Trigger active threshold
            end: "bottom 120px",
            scrub: 0.3, // Ultra-fast smooth responsiveness
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-20 px-4 border-y border-dashed border-white/10 bg-[var(--background,#0b0c0d)] text-[var(--text,#f1efe9)]"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[160px]" />

      {/* Section Header */}
      <div className="max-w-2xl mx-auto mb-16 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface,rgba(255,255,255,0.03))] px-3.5 py-1">
          <Layers size={13} className="text-[var(--accent,#ff5a2a)]" />
          <span className="text-sm">Services</span>
        </div>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight lg:text-5xl">
          Six disciplines, one accountable team.
        </h2>

        <div className="mt-5 mx-auto h-[2px] w-14 rounded-full bg-[var(--accent,#ff5a2a)] shadow-[0_0_10px_rgba(255,90,42,0.5)]" />
      </div>

      {/* Stacked Cards Container */}
      <div className="max-w-3xl mx-auto relative z-10 space-y-10">
        {services.map((s, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];

          return (
            <div
              key={s.slug}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              // Pure CSS Sticky behavior (GPU compositor level offset stacking)
              className="sticky top-28 w-full transform-gpu will-change-transform"
              style={{
                top: `${100 + i * 20}px`, // Dynamic stack offset based on index
              }}
            >
              <article
                id={s.slug}
                className="group relative grid gap-8 rounded-2xl border border-white/10 bg-[#0d0e10]/95 p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/40 lg:grid-cols-[0.85fr_1.15fr] lg:p-10"
              >
                {/* Watermark Number */}
                <span className="pointer-events-none absolute right-6 top-2 select-none text-8xl font-semibold leading-none text-white/[0.03] group-hover:text-[var(--accent,#ff5a2a)]/[0.06] lg:text-9xl transition-colors duration-300">
                  {s.number}
                </span>

                {/* Left Column */}
                <div className="relative z-10 flex flex-col justify-between">
                  <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs">
                      <span className="font-medium text-[var(--accent,#ff5a2a)]">
                        {s.number}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="uppercase tracking-wider text-white/40">
                        Module 0{i + 1}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mt-6 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black">
                      {Icon && <Icon size={24} />}
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-3xl font-semibold tracking-tight lg:text-4xl">
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                    {s.description}
                  </p>
                </div>

                {/* Right Column - Deliverables */}
                <div className="relative z-10 flex flex-col justify-center">
                  <h4 className="mb-4 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-white/40">
                    <Compass size={14} className="text-[var(--accent,#ff5a2a)]" />
                    Deliverables & Key Assets
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {s.includes.map((x) => (
                      <div
                        key={x}
                        className="group/card relative flex min-h-[90px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-white/[0.05]"
                      >
                        <span className="text-sm font-medium text-white">
                          {x}
                        </span>

                        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
                          <span className="font-mono text-xs font-medium uppercase tracking-widest text-white/40 group-hover/card:text-[var(--accent,#ff5a2a)]">
                            VERIFIED
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="text-white/40 transition-all duration-200 group-hover/card:text-[var(--accent,#ff5a2a)] group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}