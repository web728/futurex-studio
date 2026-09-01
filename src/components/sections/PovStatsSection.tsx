"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

interface PovStatsSectionProps {
  stats?: StatItem[];
  imageSrc?: string;
}

const DEFAULT_STATS: StatItem[] = [
  { value: 850, suffix: "+", label: "Stands delivered globally" },
  { value: 98, suffix: "%", label: "On-time execution & handover" },
  { value: 11, suffix: "+", label: "Years of spatial expertise" },
  { value: 2000, suffix: "+", label: "Brand partners worldwide" },
];

export function PovStatsSection({
  stats = DEFAULT_STATS,
  imageSrc = "/gallery/project-1.jpg",
}: PovStatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Elements Lightweight Entrance
      const headerNodes = headerRef.current?.querySelectorAll(".pov-anim-node");
      if (headerNodes && headerNodes.length > 0) {
        gsap.fromTo(
          headerNodes,
          { opacity: 0, y: 22 },
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

      // 2. Stats Counter & Card Stagger
      if (statsContainerRef.current) {
        const statCards = statsContainerRef.current.querySelectorAll(".stat-card-item");

        statCards.forEach((card, idx) => {
          const numberEl = card.querySelector(".counter-val") as HTMLElement;
          const targetValue = parseInt(numberEl?.getAttribute("data-val") || "0", 10);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "top 85%",
              once: true,
            },
          });

          tl.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay: idx * 0.08,
              ease: "power2.out",
            }
          );

          if (numberEl) {
            const counterObj = { val: 0 };
            tl.to(
              counterObj,
              {
                val: targetValue,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  numberEl.textContent = Math.floor(counterObj.val).toString();
                },
                onComplete: () => {
                  numberEl.textContent = targetValue.toString();
                },
              },
              "-=0.4"
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="point-of-view"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-16 lg:py-24 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white border-t border-[var(--border,rgba(241,239,233,0.12))]"
    >
      {/* Ambient Accent Radial Glow */}
      <div
        className="pointer-events-none absolute -left-28 top-1/3 h-[450px] w-[450px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[140px]"
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
            <div className="pov-anim-node inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)]" />
              <span>Our Point of View</span>
            </div>

            <h2 className="pov-anim-node mt-3 text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1">
                A temporary space
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                with a permanent job.
              </span>
            </h2>
          </div>

          {/* Right Lead Description */}
          <div className="lg:col-span-5 lg:pb-1">
            <p className="pov-anim-node max-w-md text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] lg:text-base">
              An exhibition booth must communicate instantly, support meaningful B2B engagement, and represent your brand with unflinching quality under high-traffic show floor pressure.
            </p>
          </div>
        </div>

        {/* Stats 4-Column Grid: Clean Luxury Metric Boxes */}
        <div
          ref={statsContainerRef}
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card-item group relative overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-6 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-1 shadow-md"
            >
              {/* Corner Index */}
              <span className="absolute right-4 top-4 font-mono text-xs font-bold text-[var(--muted,#7d807e)]/40 transition-colors group-hover:text-[var(--accent,#ff5a2a)]">
                0{i + 1}
              </span>

              {/* Number Value */}
              <div className="flex items-baseline font-extrabold text-[clamp(2rem,3.2vw,3rem)] tracking-tight text-[var(--text,#f1efe9)]">
                <span className="counter-val inline-block" data-val={s.value}>
                  0
                </span>
                <span className="ml-0.5 text-[var(--accent,#ff5a2a)]">{s.suffix}</span>
              </div>

              {/* Metric Label */}
              <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--secondary,#b8b6af)] transition-colors duration-200 group-hover:text-[var(--text,#f1efe9)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* 2-Column Split: Image Showcase (Left) + Architectural Precision Box (Right) */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left: Showcase Image Frame */}
          <div className="group relative min-h-[340px] w-full overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] shadow-xl transition-all duration-500 hover:border-[var(--accent,#ff5a2a)]/50 lg:col-span-7">
            <Image
              src={imageSrc}
              alt="Studio Showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background,#0b0c0d)]/80 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--secondary,#b8b6af)]">
              Turnkey Production & Precision Build
            </p>
          </div>

          {/* Right: Detailed Execution Box */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-8 shadow-xl lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
                <span>Concept to Execution</span>
              </div>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--text,#f1efe9)] sm:text-3xl">
                One vision, carried through.
              </h3>

              <p className="mt-4 text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                Our methodology connects spatial briefing, concept iteration, 3D visualization review, structural CAD engineering, factory fabrication, and on-site assembly into a single seamless line of accountability.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--border,rgba(241,239,233,0.1))] pt-5 font-mono text-xs text-[var(--secondary,#b8b6af)]">
              <span>PRECISION DISCIPLINE</span>
              <span className="font-bold text-[var(--accent,#ff5a2a)]">100% EXECUTED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}