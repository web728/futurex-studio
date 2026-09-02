"use client";

import { useEffect, useRef } from "react";
import { ProposalForm } from "@/components/proposal-form";
import { Sparkles, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = cardRef.current?.querySelectorAll(".form-anim-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardRef.current,
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
    <section ref={sectionRef} className="relative w-full">
      {/* 1. Ambient Background Glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,90,42,0.12)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* 2. Main Luxury Architectural Card Frame */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/40 md:p-10 lg:p-12"
      >
        {/* Corner Precision Crosshairs (+) */}
        <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] text-[var(--muted,#7d807e)]/30">
          +
        </span>
        <span className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] text-[var(--muted,#7d807e)]/30">
          +
        </span>

        {/* Header Block */}
        <div className="form-anim-item mb-8 border-b border-[var(--border,rgba(241,239,233,0.08))] pb-6 lg:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--background,#0b0c0d)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
            <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
            <span>Project Intake Brief</span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--text,#f1efe9)] sm:text-3xl lg:text-4xl">
            <span className="relative inline-block pb-1">
              Tell us about your space.
              <span
                className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent shadow-[0_0_10px_rgba(255,90,42,0.5)]"
                aria-hidden="true"
              />
            </span>
          </h2>

          <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] sm:text-base">
            Share your upcoming event, booth dimensions, and timeline. Our spatial engineering team reviews your brief within 24 hours.
          </p>

          {/* Quick SLA Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--secondary,#b8b6af)]">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[var(--accent,#ff5a2a)]" />
              <span>&lt; 24h Initial Proposal</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[var(--success,#66d19e)]" />
              <span>Confidentiality Guaranteed</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--focus,#ffd2c3)]" />
              <span>Turnkey Scope</span>
            </div>
          </div>
        </div>

        {/* Form Container with High-End Input Field Styling */}
        <div className="form-anim-item relative z-10 w-full [&_button]:!rounded-xl [&_input]:!rounded-xl [&_select]:!rounded-xl [&_textarea]:!rounded-xl [&_.field-wrapper]:!rounded-xl">
          <ProposalForm />
        </div>
      </div>
    </section>
  );
}