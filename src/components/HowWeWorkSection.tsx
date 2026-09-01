"use client";

import React, { useEffect, useRef } from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PrincipleItem {
  icon: LucideIcon;
  title: string;
  copy: string;
}

interface HowWeWorkSectionProps {
  principles: PrincipleItem[];
}

export function HowWeWorkSection({ principles }: HowWeWorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      const headerNodes = headerRef.current?.querySelectorAll(".hww-anim-node");
      if (headerNodes && headerNodes.length > 0) {
        gsap.fromTo(
          headerNodes,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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

      // 2. Cards Batch Reveal
      const cards = cardsContainerRef.current?.querySelectorAll(".principle-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsContainerRef.current,
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
      id="how-we-work"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-16 lg:py-24 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white border-t border-[var(--border,rgba(241,239,233,0.12))]"
    >
      {/* Ambient Accent Glows */}
      <div
        className="pointer-events-none absolute -left-28 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header Grid: Strictly Balanced */}
        <div
          ref={headerRef}
          className="grid gap-8 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-10 lg:grid-cols-12 lg:items-end"
        >
          {/* Left Title Column */}
          <div className="lg:col-span-7">
            <div className="hww-anim-node inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)]" />
              <span>Studio Philosophy</span>
            </div>

            <h2 className="hww-anim-node mt-3 text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1">
                Collaborative in design.
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                Decisive in execution.
              </span>
            </h2>
          </div>

          {/* Right Lead Description */}
          <div className="lg:col-span-5 lg:pb-1">
            <p className="hww-anim-node max-w-md text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] lg:text-base">
              Every stage of our process is engineered to keep your brand intent intact from the first sketch to the finished exhibition floor.
            </p>
          </div>
        </div>

        {/* 3-Column Luxury Principle Cards */}
        <div
          ref={cardsContainerRef}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="principle-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-7 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-1 shadow-lg"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--accent,#ff5a2a)]/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Watermark Step Number */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-mono text-7xl font-extrabold text-white/[0.02] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]/10">
                  0{index + 1}
                </span>

                <div>
                  {/* Icon Badge */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--elevated,#191c1f)] text-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)]/50 group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,90,42,0.4)]">
                    <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Card Title */}
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-[var(--text,#f1efe9)] transition-colors duration-200 group-hover:text-[var(--accent,#ff5a2a)]">
                    {principle.title}
                  </h3>

                  {/* Card Body */}
                  <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                    {principle.copy}
                  </p>
                </div>

                {/* Footer Principle Tag */}
                <div className="mt-7 flex items-center justify-between border-t border-[var(--border,rgba(241,239,233,0.08))] pt-4">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--muted,#7d807e)] transition-colors duration-200 group-hover:text-[var(--accent,#ff5a2a)]">
                    Principle 0{index + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}