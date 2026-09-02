"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/data/site-images";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { ContactFormSection } from "@/components/contact/contact-form-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Lightweight Hero Reveal
      const heroNodes = heroContentRef.current?.querySelectorAll(".contact-hero-node");
      if (heroNodes && heroNodes.length > 0) {
        gsap.fromTo(
          heroNodes,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.08,
            delay: 0.05,
          }
        );
      }

      // 2. Form & Sidebar Grid Reveal
      const gridItems = containerRef.current?.querySelectorAll(".contact-grid-anim");
      if (gridItems && gridItems.length > 0) {
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".contact-main-grid",
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
    <div
      ref={containerRef}
      className="relative w-full bg-[var(--background,#0b0c0d)] text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* ========================================================================= */}
      {/* 1. LUXURY CONTACT HERO (COMMUNICATION MATRIX BACKDROP)                   */}
      {/* ========================================================================= */}
      <section className="relative flex min-h-[70vh] lg:min-h-[78vh] w-full items-center justify-center overflow-hidden border-b border-[var(--border,rgba(241,239,233,0.12))] px-6 py-20 lg:py-28">
        
        {/* Layer 1: Darkened Spatial Studio Architecture Backdrop */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <Image
            src={siteImages.contactHero?.src || "/gallery/project-1.jpg"}
            alt="Studio Contact Architecture Backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.08] filter grayscale contrast-150 scale-105"
          />
          {/* Deep Obsidian Radial Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,12,13,0.55)_0%,rgba(11,12,13,0.98)_85%)]" />
        </div>

        {/* Layer 2: Architectural Precision Dot Matrix Texture */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-20 bg-[radial-gradient(rgba(241,239,233,0.2)_1px,transparent_1px)] bg-[size:38px_38px]"
          aria-hidden="true"
        />

        {/* Layer 3: Top Volumetric Spot Beam */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-[2] -translate-x-1/2 h-[480px] w-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,90,42,0.14)_0%,rgba(255,90,42,0.02)_55%,transparent_75%)] blur-[100px]"
          aria-hidden="true"
        />

        {/* Layer 4: Architectural Datum Lines */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[2] -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)]/25 to-transparent" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div
            ref={heroContentRef}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            {/* Eyebrow Pill */}
            <div className="contact-hero-node mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--surface,#121416)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent,#ff5a2a)] backdrop-blur-md shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Project Brief Intake</span>
            </div>

            {/* Exactly 2-Line Headline Matching Cadence */}
            <h1 className="contact-hero-node text-[clamp(2.4rem,5.6vw,4.75rem)] font-extrabold tracking-tight text-[var(--text,#f1efe9)] leading-[1.1]">
              <span className="relative inline-block pb-1">
                Start your project brief.
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-95 shadow-[0_0_12px_rgba(255,90,42,0.65)]"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                Built for the live floor.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="contact-hero-node mt-5 max-w-xl text-base font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-lg">
              Tell us what needs to happen in your space. Share your upcoming exhibition, booth footprint, timeline, and brand vision.
            </p>

            {/* Architectural Status Pill */}
            <div className="contact-hero-node mt-9 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)]/60 px-6 py-3 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] animate-pulse" />
                <span>24-Hour Scoping Turnaround</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success,#66d19e)]" />
                <span>NDA Protected</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--focus,#ffd2c3)]" />
                <span>Direct Engineer Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE BRIEF & DETAILS SPLIT GRID SECTION                    */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Subtle Accent Glow behind grid */}
        <div
          className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.05)_0%,transparent_70%)] blur-[140px]"
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          {/* Asymmetrical 12-Col Split: Form on Right (7), Details on Left (5) */}
          <div className="contact-main-grid grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            
            {/* Left Column: Direct Contacts & Operating Channels (5 Cols) */}
            <div className="contact-grid-anim lg:col-span-5 order-2 lg:order-1">
              <ContactSidebar />
            </div>

            {/* Right Column: Interactive Project Intake Brief Form (7 Cols) */}
            <div className="contact-grid-anim lg:col-span-7 order-1 lg:order-2">
              <ContactFormSection />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}