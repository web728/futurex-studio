"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { company } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------------------------
// MAGNETIC BUTTON WRAPPER
// ----------------------------------------------------------------------
function MagneticElement({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block will-change-transform"
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPACT HIGH-IMPACT CTA STRIP (#ff5a2a BG & DARK SPOTLIGHT)
// ----------------------------------------------------------------------
export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Smooth Cursor Light Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // GSAP Animation Entrance
  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let splitHeadline: SplitType | null = null;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        splitHeadline = new SplitType(headlineRef.current, {
          types: ["words", "chars"] as const,
          tagName: "span",
        });

        gsap.set(splitHeadline.chars, {
          opacity: 0,
          y: 28,
          willChange: "transform, opacity",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      if (splitHeadline && splitHeadline.chars) {
        tl.to(
          splitHeadline.chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.015,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => {
      if (splitHeadline) splitHeadline.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden bg-[#ff5a2a] py-12 lg:py-16 text-white select-none"
    >
      {/* 1. Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-black/25 blur-[90px]" />

      {/* 2. TOP RIGHT SVG: Ultra-Luxury Spatial Interlocking Curves & Nodes */}
      <svg
        className="pointer-events-none absolute -right-16 -top-16 opacity-20 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:-rotate-3"
        width="460"
        height="460"
        viewBox="0 0 580 580"
        fill="none"
      >
        <circle cx="400" cy="180" r="140" stroke="white" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="400" cy="180" r="220" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <circle cx="400" cy="180" r="300" stroke="white" strokeWidth="1" opacity="0.25" />
        
        <path
          d="M 100,450 C 250,200 450,400 550,100"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 150,500 C 300,250 500,450 580,180"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="8 8"
          fill="none"
          opacity="0.5"
        />

        <circle cx="400" cy="180" r="6" fill="white" />
        <circle cx="280" cy="285" r="4" fill="white" opacity="0.8" />
        <circle cx="475" cy="225" r="5" fill="white" opacity="0.9" />
      </svg>

      {/* 3. BOTTOM LEFT SVG: Architectural Depth Overlay */}
      <svg
        className="pointer-events-none absolute -left-12 -bottom-12 opacity-15 transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-2"
        width="320"
        height="320"
        viewBox="0 0 420 420"
        fill="none"
      >
        <rect x="40" y="80" width="220" height="280" rx="24" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <rect x="100" y="40" width="220" height="280" rx="24" stroke="white" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
        <rect x="160" y="120" width="220" height="280" rx="24" stroke="white" strokeWidth="1.5" opacity="0.3" />
        
        <line x1="40" y1="80" x2="160" y2="120" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="260" y1="360" x2="380" y2="400" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* 4. Interactive Cursor Spotlight (Dark Tinted Glow Instead of White) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.22), transparent 50%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-16 grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
        {/* Text Section */}
        <div className="flex flex-col items-start text-left">
          {/* Eyebrow with Pulsing Live Status Dot */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 rounded-full bg-black/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Your next exhibition</span>
          </div>
          
          {/* Headline with Black & White Visual Contrast */}
          <h2
            ref={headlineRef}
            className="display mt-4 max-w-4xl text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[1.05] tracking-tight text-white transition-all duration-300"
          >
            Let’s build a{" "}
            <span className="text-black transition-colors duration-500 group-hover:text-neutral-900">
              space people remember.
            </span>
          </h2>
        </div>

        {/* Buttons Section */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap gap-4 lg:justify-end items-center"
        >
          {/* Primary CTA Button */}
          <MagneticElement>
            <Link
              href="/contact"
              className="group/btn flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-neutral-900 hover:shadow-2xl active:scale-95"
            >
              <span>Request a proposal</span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
              />
            </Link>
          </MagneticElement>

          {/* Clean Premium White "Call the studio" Button */}
          <MagneticElement>
            <a
              href={company.phoneHref}
              className="group/call flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-neutral-100 hover:shadow-xl active:scale-95"
            >
              <PhoneCall size={16} className="text-black transition-transform duration-300 group-hover/call:rotate-12" />
              <span>Call the studio</span>
            </a>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
}