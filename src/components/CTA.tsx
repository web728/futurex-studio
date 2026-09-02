"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, PhoneCall, Sparkles, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const animItems = cardRef.current?.querySelectorAll(".cta-anim-item");
      if (animItems && animItems.length > 0) {
        gsap.fromTo(
          animItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 82%",
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
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-16 lg:py-24 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Luxury Architectural Vault Frame */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] p-8 shadow-2xl backdrop-blur-2xl sm:p-12 lg:p-16"
        >
          {/* Layer 1: Ambient Orange Volumetric Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[380px] w-[700px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,90,42,0.18)_0%,rgba(255,90,42,0.03)_55%,transparent_75%)] blur-[100px]"
            aria-hidden="true"
          />

          {/* Layer 2: Precision Micro-Dot Grid */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-20 bg-[radial-gradient(rgba(241,239,233,0.2)_1px,transparent_1px)] bg-[size:32px_32px]"
            aria-hidden="true"
          />

          {/* Layer 3: Architectural Crosshairs (+) */}
          <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] text-[var(--muted,#7d807e)]/35">
            +
          </span>
          <span className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] text-[var(--muted,#7d807e)]/35">
            +
          </span>
          <span className="pointer-events-none absolute left-4 bottom-4 font-mono text-[10px] text-[var(--muted,#7d807e)]/35">
            +
          </span>
          <span className="pointer-events-none absolute right-4 bottom-4 font-mono text-[10px] text-[var(--muted,#7d807e)]/35">
            +
          </span>

          {/* Layer 4: Laser Horizontal Datum Line */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)]/20 to-transparent" />

          {/* Content Block */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Eyebrow Badge */}
            <div className="cta-anim-item inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--background,#0b0c0d)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Commission an Exhibition Build</span>
            </div>

            {/* Display Headline */}
            <h2 className="cta-anim-item mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1">
                Let’s build a space
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-95 shadow-[0_0_12px_rgba(255,90,42,0.65)]"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)] font-normal text-[clamp(1.8rem,4vw,3.2rem)]">
                that commands the exhibition floor.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="cta-anim-item mt-5 max-w-xl text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] sm:text-base">
              Turn your brand footprint into a living architectural experience. From initial 3D visualization and engineering sign-offs to physical on-site handover.
            </p>

            {/* Action Buttons */}
            <div className="cta-anim-item mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[var(--text,#f1efe9)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--background,#0b0c0d)] transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-[0_0_25px_rgba(241,239,233,0.3)] active:scale-95"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href={company.phoneHref || "tel:+919810855697"}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--background,#0b0c0d)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--text,#f1efe9)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:text-[var(--accent,#ff5a2a)] hover:bg-[var(--elevated,#191c1f)] active:scale-95"
              >
                <PhoneCall size={14} className="transition-transform duration-300 hover:rotate-12" />
                <span>Call the Studio</span>
              </a>
            </div>

            {/* Trust SLA Highlights */}
            <div className="cta-anim-item mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-[var(--border,rgba(241,239,233,0.1))] pt-6 text-xs font-mono text-[var(--secondary,#b8b6af)]">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-[var(--accent,#ff5a2a)]" />
                <span>&lt; 24h Discovery Turnaround</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[var(--success,#66d19e)]" />
                <span>Dedicated Spatial Architect</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[var(--focus,#ffd2c3)]" />
                <span>Turnkey Build Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}