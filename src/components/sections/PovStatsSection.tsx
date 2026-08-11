"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { PovLiquidImage } from "@/components/cinematic/PovLiquidImage";

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
  { value: 850, suffix: "+", label: "Exhibition stands delivered globally" },
  { value: 98, suffix: "%", label: "On-time execution & site handover" },
  { value: 11, suffix: "+", label: "Years of spatial design experience" },
  { value: 2000, suffix: "+", label: "Brand partners across industries" },
];

export function PovStatsSection({
  stats = DEFAULT_STATS,
  imageSrc = "/gallery/img-2.jpeg",
}: PovStatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // 1. High-End Text Reveal Animation
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "words,chars" });
        if (split.chars) {
          gsap.fromTo(
            split.chars,
            { opacity: 0, y: 20, rotateX: -30 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              stagger: 0.012,
              ease: "power4.out",
              onComplete: () => {
                gsap.set(split.chars, { clearProps: "willChange" });
              },
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

      // 2. Animated Counter Numbers & Card Reveal
      if (statsContainerRef.current) {
        const statCards = statsContainerRef.current.querySelectorAll(".stat-card");

        statCards.forEach((card, idx) => {
          const numberEl = card.querySelector(".counter-value") as HTMLElement;
          const targetValue = parseInt(numberEl?.getAttribute("data-value") || "0", 10);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });

          // Card Reveal Animation
          tl.fromTo(
            card,
            { opacity: 0, y: 30, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: idx * 0.08,
              ease: "power3.out",
            }
          );

          // Counter Numbers Animation
          if (numberEl) {
            const counterObj = { val: 0 };
            
            gsap.set(numberEl, { opacity: 1 });

            tl.to(
              counterObj,
              {
                val: targetValue,
                duration: 1.8,
                ease: "power2.out",
                onUpdate: () => {
                  numberEl.textContent = Math.floor(counterObj.val).toString();
                },
                onComplete: () => {
                  numberEl.textContent = targetValue.toString();
                  gsap.set(numberEl, { clearProps: "all" });
                },
              },
              "-=0.5"
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pov-section relative overflow-hidden bg-[#0a0b0d] py-12 lg:py-20 text-white border-t border-white/10"
    >
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[350px] w-[350px] rounded-full bg-[var(--accent,#ff5a2a)]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-[300px] w-[300px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header - Compact */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent,#ff5a2a)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[var(--accent,#ff5a2a)]" />
            <span>Our point of view</span>
          </div>

          <h2
            ref={titleRef}
            className="mt-3 text-[clamp(1.8rem,3.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-sm"
          >
            An exhibition stand is a temporary space with a permanent job.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base font-normal">
            It must communicate quickly, support real conversations and represent the brand under pressure. Futurex Studio’s role is to translate that requirement into a spatial concept that can be reviewed, refined and built.
          </p>
        </div>

        {/* Animated Stats Grid - Tight & Dense Layout */}
        <div
          ref={statsContainerRef}
          className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:p-5 backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/40 hover:bg-white/[0.04] hover:shadow-[0_8px_20px_rgba(255,90,42,0.08)]"
            >
              <span className="absolute right-3 top-2.5 select-none font-mono text-[11px] font-bold text-white/10 group-hover:text-[var(--accent,#ff5a2a)]/40 transition-colors">
                0{i + 1}
              </span>

              <div className="flex items-baseline font-extrabold text-white text-[clamp(2rem,3vw,2.8rem)] tracking-tight">
                <span className="counter-value inline-block text-white" data-value={s.value}>
                  0
                </span>
                <span className="text-[var(--accent,#ff5a2a)] ml-0.5">{s.suffix}</span>
              </div>
              <p className="mt-1 text-xs font-medium leading-normal text-white/60 group-hover:text-white/90 transition-colors duration-200">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Left Side Image + Right Side Content Grid Split */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">
          
          {/* Left Side: Interactive Image Canvas Frame */}
          <div className="lg:col-span-7 overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-xl transition-transform duration-500 hover:border-[var(--accent,#ff5a2a)]/30 min-h-[280px]">
            <PovLiquidImage src={imageSrc} alt="Studio Showcase" />
          </div>

          {/* Right Side: Concept to Execution Detailed Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 backdrop-blur-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
                <span>Concept to execution</span>
              </div>

              <h3 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-white">
                One idea, carried through.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70 font-normal">
                The process connects discovery, concept development, three-dimensional review, technical planning, fabrication and installation. Scope is shaped around each event and confirmed in the proposal.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40">
              <span>PRECISION DESIGN</span>
              <span className="text-[var(--accent,#ff5a2a)] font-semibold">100% EXECUTED</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}