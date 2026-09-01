"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilityFeature {
  id: string;
  badge: string;
  title: string;
  description: string;
  statNumber: string;
  statLabel: string;
}

const defaultCapabilities: CapabilityFeature[] = [
  {
    id: "speed",
    badge: "Execution Speed",
    title: "Zero-Delay On-Site Deployment",
    description:
      "Precision pre-fabrication combined with modular rapid-assembly protocols ensures seamless delivery ahead of exhibition deadlines.",
    statNumber: "< 12h",
    statLabel: "Average Setup Time",
  },
  {
    id: "quality",
    badge: "Material Standards",
    title: "Surgical Attention to Detail",
    description:
      "Premium tactile finishes, high-tensile structural framework, and calibrated lighting engineered for complete structural integrity.",
    statNumber: "100%",
    statLabel: "QC Inspection Pass Rate",
  },
  {
    id: "scale",
    badge: "Global Scalability",
    title: "Adaptive Modular Footprints",
    description:
      "From compact 9m² bespoke shells to complex multi-tier 500m² country pavilions, our design language scales without compromise.",
    statNumber: "20+",
    statLabel: "Pavilions Built",
  },
];

export function ExecutionPromiseSection({
  customCapabilities,
}: {
  customCapabilities?: CapabilityFeature[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const list = customCapabilities || defaultCapabilities;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      const headerNodes = headerRef.current?.querySelectorAll(".exec-head-node");
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

      // 2. Capability Cards Batch Stagger + Counter Animation
      const cards = cardsGridRef.current?.querySelectorAll(".capability-card-item");
      if (cards && cards.length > 0) {
        cards.forEach((card, idx) => {
          const statEl = card.querySelector(".exec-stat-val") as HTMLElement;
          const targetValue = statEl?.getAttribute("data-val") || "";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
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

          if (statEl) {
            if (targetValue.includes("%")) {
              const counter = { val: 0 };
              tl.to(
                counter,
                {
                  val: 100,
                  duration: 1.4,
                  ease: "power2.out",
                  onUpdate: () => {
                    statEl.textContent = `${Math.round(counter.val)}%`;
                  },
                },
                "-=0.3"
              );
            } else if (targetValue.includes("+")) {
              const numericVal = parseInt(targetValue, 10) || 20;
              const counter = { val: 0 };
              tl.to(
                counter,
                {
                  val: numericVal,
                  duration: 1.4,
                  ease: "power2.out",
                  onUpdate: () => {
                    statEl.textContent = `${Math.round(counter.val)}+`;
                  },
                },
                "-=0.3"
              );
            }
          }
        });
      }

      // 3. Bottom Guarantee Banner Reveal
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 88%",
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
      id="operational-excellence"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white border-t border-[var(--border,rgba(241,239,233,0.12))]"
    >
      {/* Ambient Accent Radial Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.07)_0%,transparent_75%)] blur-[140px]"
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
            <div className="exec-head-node inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Operational Excellence</span>
            </div>

            <h2 className="exec-head-node mt-4 text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1">
                Engineered to perform.
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent shadow-[0_0_10px_rgba(255,90,42,0.5)]"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                Built to captivate.
              </span>
            </h2>
          </div>

          {/* Right Lead Description */}
          <div className="lg:col-span-5 lg:pb-1">
            <p className="exec-head-node max-w-md text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] lg:text-base">
              We bridge conceptual architectural design with rigorous engineering guarantees—giving your brand an unmissable physical presence on the show floor.
            </p>
          </div>
        </div>

        {/* 3-Column Luxury Capability Cards */}
        <div
          ref={cardsGridRef}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {list.map((item, idx) => (
            <article
              key={item.id}
              className="capability-card-item group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-7 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-1 shadow-lg sm:p-8"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[var(--accent,#ff5a2a)]/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Watermark Index Number */}
              <span className="pointer-events-none absolute right-4 top-2 select-none font-mono text-6xl font-extrabold text-white/[0.02] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]/[0.07] sm:text-7xl">
                0{idx + 1}
              </span>

              {/* Top Block: Badge & Title */}
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-[var(--border,rgba(241,239,233,0.08))] pb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--background,#0b0c0d)] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                    <Zap size={11} />
                    {item.badge}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] animate-pulse" />
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-[var(--text,#f1efe9)] transition-colors duration-200 group-hover:text-[var(--accent,#ff5a2a)] sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                  {item.description}
                </p>
              </div>

              {/* Bottom Stat Block */}
              <div className="relative z-10 mt-7 flex items-end justify-between border-t border-[var(--border,rgba(241,239,233,0.08))] pt-5">
                <div>
                  <span
                    className="exec-stat-val block font-mono text-3xl font-extrabold tracking-tight text-[var(--text,#f1efe9)] sm:text-4xl"
                    data-val={item.statNumber}
                  >
                    {item.statNumber}
                  </span>
                  <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--muted,#7d807e)]">
                    {item.statLabel}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--background,#0b0c0d)] text-[var(--secondary,#b8b6af)] transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black group-hover:scale-105">
                  <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div
          ref={bannerRef}
          className="mt-12 overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] p-6 shadow-xl lg:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 text-[var(--accent,#ff5a2a)] shadow-md">
                <ShieldCheck size={24} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[var(--text,#f1efe9)] sm:text-lg">
                    100% Turnkey Delivery Guarantee
                  </h4>
                  <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-[var(--success,#66d19e)] font-semibold">
                    <CheckCircle2 size={11} /> Verified
                  </span>
                </div>
                <p className="mt-1 max-w-2xl text-xs font-normal leading-relaxed text-[var(--secondary,#b8b6af)] sm:text-sm">
                  Full logistics, assembly engineering, venue compliance sign-offs, and post-event dismantling included. We assume total operational accountability.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2.5 rounded-full bg-[var(--text,#f1efe9)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--background,#0b0c0d)] transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-[0_0_25px_rgba(241,239,233,0.3)] active:scale-95"
            >
              <span>Start Project Brief</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 