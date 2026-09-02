"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Compass, 
  Layers, 
  Box, 
  Cpu, 
  Hammer, 
  CheckCircle2, 
  ArrowRight,
  Sparkles 
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [
  Compass,
  Layers,
  Box,
  Cpu,
  Hammer,
  CheckCircle2
];

const STEP_DETAILS = [
  {
    title: "Brief & Discovery",
    desc: "Stakeholder alignment, spatial footprint auditing, and commercial requirement scoping to anchor the project foundation.",
    tag: "Phase 01"
  },
  {
    title: "Concept Development",
    desc: "Translating brand guidelines into structural narratives, thematic forms, and fluid visitor circulation pathways.",
    tag: "Phase 02"
  },
  {
    title: "3D Visualisation",
    desc: "Photorealistic spatial renders, accurate material & lighting simulations, and structural walkthroughs.",
    tag: "Phase 03"
  },
  {
    title: "Technical Planning",
    desc: "CAD blueprints, structural weight calculations, MEP power maps, and rigorous exhibition venue approvals.",
    tag: "Phase 04"
  },
  {
    title: "Fabrication & Production",
    desc: "In-house precision carpentry, CNC metalworks, modular assemblies, and custom luxury architectural finishes.",
    tag: "Phase 05"
  },
  {
    title: "Installation & Handover",
    desc: "On-site build orchestration, AV/Lighting tuning, flawless snag-clearance, and final show-floor handover.",
    tag: "Phase 06"
  },
];

export function ProcessMotion({ steps }: { steps?: string[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.querySelectorAll(".process-card-item");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full">
      
      {/* Header with 2-Line Display & Accent Glow */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[#090a0b] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] animate-pulse" />
            Execution Methodology
          </div>

          <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
            <span className="relative inline-block pb-1.5">
              A structured roadmap
              <span
                className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                aria-hidden="true"
              />
            </span>
            <br />
            <span className="text-[var(--secondary,#b8b6af)]">
              from initial brief to build.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-[var(--secondary,#b8b6af)]">
          Every spatial commission moves through a disciplined engineering lifecycle to guarantee that design intent matches physical perfection.
        </p>
      </div>

      {/* Modern 6-Step Editorial Process Grid */}
      <div
        ref={cardsContainerRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {STEP_DETAILS.map((step, idx) => {
          const Icon = STEP_ICONS[idx] || Sparkles;
          const isSelected = activeTab === idx;

          return (
            <div
              key={step.title}
              onMouseEnter={() => setActiveTab(idx)}
              className={`process-card-item group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
                isSelected
                  ? "border-[var(--accent,#ff5a2a)]/60 bg-[var(--elevated,#191c1f)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] -translate-y-1"
                  : "border-[var(--border,rgba(241,239,233,0.12))] bg-[#090a0b] hover:border-[var(--border,rgba(241,239,233,0.3))] hover:bg-[var(--elevated,#191c1f)]/70"
              }`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent,#ff5a2a)]/15 blur-2xl transition-opacity duration-300 ${
                  isSelected ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Card Header: Stage Number & Icon */}
              <div className="flex items-center justify-between border-b border-[var(--border,rgba(241,239,233,0.08))] pb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors duration-300 ${
                      isSelected
                        ? "bg-[var(--accent,#ff5a2a)] text-black"
                        : "bg-white/10 text-[var(--text,#f1efe9)]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--secondary,#b8b6af)] uppercase">
                    {step.tag}
                  </span>
                </div>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "border-[var(--accent,#ff5a2a)]/50 bg-[var(--accent,#ff5a2a)]/15 text-[var(--accent,#ff5a2a)]"
                      : "border-white/10 bg-white/5 text-[var(--secondary,#b8b6af)] group-hover:text-[var(--text,#f1efe9)]"
                  }`}
                >
                  <Icon size={18} />
                </div>
              </div>

              {/* Title & Body */}
              <div className="mt-5">
                <h3
                  className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                    isSelected
                      ? "text-[var(--accent,#ff5a2a)]"
                      : "text-[var(--text,#f1efe9)]"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--secondary,#b8b6af)]">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--border,rgba(241,239,233,0.08))] pt-4">
                <span className="text-[11px] font-mono tracking-wider text-[var(--muted,#7d807e)]">
                  Standard Milestone
                </span>
                <ArrowRight
                  size={15}
                  className={`transition-all duration-300 ${
                    isSelected
                      ? "text-[var(--accent,#ff5a2a)] translate-x-1"
                      : "text-[var(--muted,#7d807e)] opacity-40 group-hover:opacity-100"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}