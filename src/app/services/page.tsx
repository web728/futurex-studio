"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Boxes,
  Hammer,
  Layers,
  PenTool,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA } from "@/components/CTA";
import { services } from "@/data/site";
import { siteImages } from "@/data/site-images";
import { ServicesListSection } from "@/components/motion/ServicesListSection";
import { ExecutionPromiseSection } from "@/components/motion/ExecutionPromiseSection";
import { FAQSection } from "@/components/motion/FAQSection";
import { ServiceRail } from "@/components/motion/ServiceRail";
import { StallTypeSelector } from "@/components/StallTypeSelector";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceIcons = [Layers, PenTool, Boxes, Hammer, Sparkles];

const stallFormats = [
  { label: "Modular booths", image: "/hdri/modular.jfif" },
  { label: "Custom-built stands", image: "/hdri/sec.jfif" },
  { label: "Double-deck structures", image: "/hdri/double-deck.jfif" },
  { label: "Portable & pop-up displays", image: "/hdri/pop-up.jfif" },
];

const servicesData = [
  {
    slug: "spatial-design",
    number: "01",
    title: "Spatial & Exhibition Design",
    description:
      "Translating brand identities into immersive physical environments that captivate audiences and maximize foot traffic.",
    includes: [
      "3D Visualizations & Walkthroughs",
      "Structural Layout Planning",
      "Material & Finish Selections",
      "Lighting & Acoustic Design",
    ],
  },
  {
    slug: "fabrication-build",
    number: "02",
    title: "Custom Fabrication & Build",
    description:
      "Precision engineering and modular construction built in-house with sustainable materials under strict quality control.",
    includes: [
      "Modular Aluminum Frameworks",
      "Custom Joinery & Millwork",
      "Eco-friendly Materials",
      "Pre-assembly Inspection",
    ],
  },
  {
    slug: "event-graphics",
    number: "03",
    title: "Brand Graphics & Signage",
    description:
      "High-impact large format printing, illuminated typography, and dynamic media integration that commands attention.",
    includes: [
      "Large Format Vinyl Printing",
      "3D LED Illuminated Logos",
      "Wayfinding Signage Systems",
      "Fabric Tension Displays",
    ],
  },
  {
    slug: "tech-integration",
    number: "04",
    title: "Interactive Tech Integration",
    description:
      "Seamlessly embedding digital experiences, touchscreens, and interactive displays to drive deeper engagement.",
    includes: [
      "Interactive Touch Walls",
      "AR / VR Experience Stations",
      "LED Video Wall Configuration",
      "Custom Event Analytics Software",
    ],
  },
  {
    slug: "logistics-handover",
    number: "05",
    title: "Turnkey Logistics & On-site Handover",
    description:
      "End-to-end management handling transport, venue permits, rapid installation, and complete handover before deadlines.",
    includes: [
      "Global Shipping & Customs Handling",
      "Venue Permit Management",
      "Overnight Site Installation",
      "Dedicated On-site Manager",
    ],
  },
  {
    slug: "dismantling-storage",
    number: "06",
    title: "Dismantling & Warehousing",
    description:
      "Careful dismantling post-event with secure storage and refurbishment options for future exhibitions globally.",
    includes: [
      "Damage-free Dismantling",
      "Climate-controlled Storage",
      "Inventory Management",
      "Asset Refurbishment",
    ],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Lightweight Hero Entrance
      const heroNodes = heroContentRef.current?.querySelectorAll(".serv-hero-node");
      if (heroNodes && heroNodes.length > 0) {
        gsap.fromTo(
          heroNodes,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.1,
          }
        );
      }

      // 2. Visual Break Image Reveal
      if (imageRevealRef.current) {
        gsap.fromTo(
          imageRevealRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRevealRef.current,
              start: "top 80%",
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
      {/* 1. LUXURY SERVICES HERO (ARCHITECTURAL STAGE & LASER MATRIX BACKDROP)    */}
      {/* ========================================================================= */}
      <section className="relative flex min-h-[75vh] lg:min-h-[82vh] w-full items-center justify-center overflow-hidden border-b border-[var(--border,rgba(241,239,233,0.12))] px-6 py-20 lg:py-28">
        
        {/* Layer 1: Darkened Spatial Studio Backdrop */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <Image
            src={siteImages.servicesHero?.src || "/gallery/project-1.jpg"}
            alt="Spatial Services Architecture Backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.09] filter grayscale contrast-125 scale-105"
          />
          {/* Deep Obsidian Radial Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,12,13,0.5)_0%,rgba(11,12,13,0.98)_85%)]" />
        </div>

        {/* Layer 2: Apple/Linear-Style Micro Precision Dot Matrix */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-25 bg-[radial-gradient(rgba(241,239,233,0.2)_1px,transparent_1px)] bg-[size:36px_36px]"
          aria-hidden="true"
        />

        {/* Layer 3: Top Volumetric Stage Spotlight Cone */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-[2] -translate-x-1/2 h-[520px] w-[850px] bg-[radial-gradient(ellipse_at_top,rgba(255,90,42,0.16)_0%,rgba(255,90,42,0.03)_50%,transparent_75%)] blur-[90px]"
          aria-hidden="true"
        />

        {/* Layer 4: Architectural Horizontal Laser Datum & Coordinate Ticks */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[2] -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)]/30 to-transparent" />
        
        <div className="pointer-events-none absolute inset-y-0 left-8 z-[2] hidden lg:flex flex-col justify-between py-16 opacity-30 text-[10px] font-mono text-[var(--secondary,#b8b6af)]">
          <span>+0.00 M</span>
          <span>ELEV. 01</span>
          <span>AXIS // A</span>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-8 z-[2] hidden lg:flex flex-col justify-between py-16 opacity-30 text-[10px] font-mono text-[var(--secondary,#b8b6af)] text-right">
          <span>SPEC 100%</span>
          <span>CAD // 3D</span>
          <span>+4.50 M</span>
        </div>

        {/* Layer 5: Subtle Bottom Edge Ambient Glow */}
        <div
          className="pointer-events-none absolute -bottom-24 left-1/2 z-[2] -translate-x-1/2 h-48 w-[600px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[100px]"
          aria-hidden="true"
        />

        {/* Main Content: Strictly Centered & 2-Line Punchy Headline */}
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div
            ref={heroContentRef}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            {/* Eyebrow Pill */}
            <div className="serv-hero-node mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--surface,#121416)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent,#ff5a2a)] backdrop-blur-md shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Full-Service Exhibition Studio</span>
            </div>

            {/* Exactly 2-Line Headline Matching Home Hero Cadence */}
            <h1 className="serv-hero-node text-[clamp(2.4rem,5.6vw,4.75rem)] font-extrabold tracking-tight text-[var(--text,#f1efe9)] leading-[1.1]">
              <span className="relative inline-block pb-1">
                End-to-end execution.
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-95 shadow-[0_0_12px_rgba(255,90,42,0.65)]"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                Built to convert.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="serv-hero-node mt-5 max-w-xl text-base font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-lg">
              From concept sketches and 3D architectural renders to structural engineering, custom fabrication, and turnkey on-site handover.
            </p>

            {/* Architectural Metric Pill */}
            <div className="serv-hero-node mt-9 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)]/60 px-6 py-3 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
                <span>Turnkey Oversight</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--focus,#ffd2c3)]" />
                <span>Custom Fabrication</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success,#66d19e)]" />
                <span>On-Site Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY INTERACTIVE SERVICE RAIL */}
      <ServiceRail
        items={services.map(({ slug, title, number }) => ({
          slug,
          title,
          number,
        }))}
      />

      {/* 3. ULTRA-MODERN SERVICE CARDS LIST */}
      <ServicesListSection
        services={servicesData}
        serviceIcons={serviceIcons}
      />

     {/* 4. COMMON FORMATS - COMPACT LUXURY SAND SECTION */}
<section className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-[#e2ddd5] py-16 text-[#0b0c0d] shadow-2xl selection:bg-black selection:text-white lg:py-24">
  <div className="container mx-auto max-w-7xl px-6 lg:px-12">
    
    {/* Section Header */}
    <div className="flex flex-col items-start justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black/75 shadow-sm">
          <ShieldCheck size={13} className="text-[var(--accent,#ff5a2a)]" />
          <span>Standard Formats</span>
        </div>

        <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#0b0c0d]">
          <span className="relative inline-block pb-1">
            Whatever the footprint,
            <span
              className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[var(--accent,#ff5a2a)] shadow-[0_0_8px_rgba(255,90,42,0.4)]"
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="text-black/60">the execution holds.</span>
        </h2>
      </div>

      <p className="max-w-md text-xs font-normal leading-relaxed text-black/60 sm:text-sm">
        Our fabrication facility supports an exhaustive array of modular
        assemblies, custom heights, double-deck engineering, and rapid pop-up displays.
      </p>
    </div>

    {/* Interactive Format Selector */}
    <div className="mt-10">
      <StallTypeSelector items={stallFormats} />
    </div>

  </div>
</section>

      {/* 5. MODERN ANIMATED EXECUTION PROMISE SECTION */}
      <ExecutionPromiseSection />

      {/* 6. FAQ SECTION */}
      <FAQSection />

      {/* 8. CALL TO ACTION */}
      <CTA />
    </div>
  );
}