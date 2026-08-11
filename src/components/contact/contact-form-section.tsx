"use client";

import { useEffect, useRef } from "react";
import { ProposalForm } from "@/components/proposal-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (formWrapperRef.current) {
        gsap.fromTo(
          formWrapperRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: formWrapperRef.current, start: "top 90%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Glow Backdrop */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-[var(--accent,#ff5a2a)]/20 via-transparent to-transparent opacity-30 blur-2xl transition-opacity duration-500 hover:opacity-60" />

      {/* Main Glassmorphic Container */}
      <div className="relative transform-gpu overflow-hidden rounded-3xl border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface,rgba(255,255,255,0.02))] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/40 md:p-10 lg:p-14">
        {/* Ambient Inner Light */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[var(--accent,#ff5a2a)]/15 blur-3xl" />

        {/* Header */}
        <div ref={headerRef} className="will-change-transform mb-8 border-b border-white/5 pb-6 lg:mb-10">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent,#ff5a2a)]">
            Start a project
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            Project brief
          </h2>
          <p className="mt-2 text-sm text-white/60 md:text-base">
            Tell us about your idea, timeline, and budget. We’ll get back to you within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div
          ref={formWrapperRef}
          className="will-change-transform relative z-10 w-full [&_button]:!rounded-xl [&_input]:!rounded-xl [&_select]:!rounded-xl [&_textarea]:!rounded-xl [&_.field-wrapper]:!rounded-xl"
        >
          <ProposalForm />
        </div>
      </div>
    </section>
  );
}