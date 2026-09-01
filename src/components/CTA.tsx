"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animItems = contentRef.current?.querySelectorAll(".cta-anim-item");
      if (animItems && animItems.length > 0) {
        gsap.fromTo(
          animItems,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
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
      className="group relative overflow-hidden bg-[#ff5a2a] py-16 lg:py-24 text-white selection:bg-black selection:text-white"
    >
      {/* 1. Ambient Background Atmosphere */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-white/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/25 blur-[90px]" />

      {/* 2. Top-Right Architectural Decorative SVG */}
      <svg
        className="pointer-events-none absolute -right-16 -top-16 opacity-15 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:-rotate-2"
        width="440"
        height="440"
        viewBox="0 0 580 580"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="400" cy="180" r="140" stroke="white" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="400" cy="180" r="220" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <circle cx="400" cy="180" r="300" stroke="white" strokeWidth="1" opacity="0.25" />
        <path d="M 100,450 C 250,200 450,400 550,100" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
        <circle cx="400" cy="180" r="6" fill="white" />
        <circle cx="280" cy="285" r="4" fill="white" opacity="0.8" />
      </svg>

      {/* 3. Bottom-Left Grid Line SVG */}
      <svg
        className="pointer-events-none absolute -bottom-10 -left-10 opacity-15 transition-transform duration-700 ease-out group-hover:translate-x-2"
        width="300"
        height="300"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        <rect x="40" y="80" width="220" height="280" rx="24" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <rect x="100" y="40" width="220" height="280" rx="24" stroke="white" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
        <line x1="40" y1="80" x2="160" y2="120" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* 4. Strictly Centered Content Block */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div
          ref={contentRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {/* Eyebrow Pill */}
          <div className="cta-anim-item inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span>Your Next Exhibition</span>
          </div>

          {/* Display Heading with Contrast */}
          <h2 className="cta-anim-item mt-5 text-[clamp(2.2rem,4.8vw,4.2rem)] font-extrabold leading-[1.08] tracking-tight text-white">
            Let’s build a{" "}
            <span className="text-[#0b0c0d] drop-shadow-sm">
              space people remember.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="cta-anim-item mt-4 max-w-xl text-sm font-normal leading-relaxed text-white/85 sm:text-base">
            Turn your brand footprint into an architectural experience. Design, technical engineering, and physical fabrication under one roof.
          </p>

          {/* Centered CTA Buttons */}
          <div className="cta-anim-item mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#0b0c0d] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-black hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] active:scale-95"
            >
              <span>Request a Proposal</span>
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <a
              href={company.phoneHref || "tel:+919810855697"}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white px-7 py-3.5 text-sm font-bold text-[#0b0c0d] transition-all duration-300 hover:scale-[1.03] hover:bg-white/95 hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <PhoneCall
                size={15}
                className="text-[#0b0c0d] transition-transform duration-300 group-hover:rotate-12"
              />
              <span>Call the Studio</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="cta-anim-item mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/20 pt-6 text-xs font-medium text-white/90">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-white" />
              <span>24h Discovery Turnaround</span>
            </div>
            <span className="hidden sm:inline text-white/40">·</span>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-white" />
              <span>Dedicated Project Architect</span>
            </div>
            <span className="hidden sm:inline text-white/40">·</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>Turnkey Build Execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}