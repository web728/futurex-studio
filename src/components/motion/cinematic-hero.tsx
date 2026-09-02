"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSceneWave as HeroScene } from "./hero-scene-wave";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROTATING_WORDS = [
  "Architectural depth.",
  "Spatial precision.",
  "Immersive design.",
  "Visionary builds.",
];

export function CinematicHero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Smooth Kinetic Word Flip Cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsFlipping(false);
      }, 350);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  // Lightweight GSAP Entrance & Scroll Parallax Exit
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".home-hero-node");
      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.1,
        }
      );

      // Scroll Fade-Out Exit
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "65% top",
          scrub: 0.6,
        },
        y: -40,
        opacity: 0,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[88vh] lg:min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--background,#0b0c0d)] px-6 py-24 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* 1. LAYER: Original WebGL Wave Canvas Animation */}
      <HeroScene />

      {/* 2. LAYER: Backdrop Radial Depth Overlay - OPTIMIZED */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,90,42,0.03)_0%,rgba(11,12,13,0.94)_80%)]"
        aria-hidden="true"
        style={{ willChange: "opacity" }}
      />

      {/* 3. LAYER: Studio Coordinate Ticks (Desktop Flanks) */}
      <div className="pointer-events-none absolute inset-y-0 left-8 z-[2] hidden xl:flex flex-col justify-between py-24 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)] opacity-35">
        <span>GRID // 01</span>
        <span>LAT // 28.4595° N</span>
        <span>ELEV // +0.00 M</span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-8 z-[2] hidden xl:flex flex-col justify-between py-24 font-mono text-[9px] uppercase tracking-widest text-[var(--secondary,#b8b6af)] text-right opacity-35">
        <span>SCALE // 1:1</span>
        <span>LONG // 77.0266° E</span>
        <span>STAGE // ACTIVE</span>
      </div>

      {/* 4. MAIN CENTERED EDITORIAL HERO CONTENT */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div
          ref={contentRef}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Eyebrow Pill */}
          <div className="home-hero-node mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--surface,#121416)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent,#ff5a2a)] backdrop-blur-md shadow-sm">
            <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
            <span>Spatial Experience &amp; Exhibition Studio</span>
          </div>

          {/* 2-Line Punchy Display Headline with 3D Flip Transition */}
          <h1 className="home-hero-node text-[clamp(2.4rem,5.6vw,4.8rem)] font-extrabold tracking-tight text-[var(--text,#f1efe9)] leading-[1.1]">
            <span className="relative inline-block overflow-hidden [perspective:900px] align-top pb-1">
              <span
                className="inline-block transition-transform duration-300 will-change-transform"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isFlipping
                    ? "rotateX(70deg) translateY(-20px)"
                    : "rotateX(0deg) translateY(0)",
                  opacity: isFlipping ? 0 : 1,
                  transformOrigin: "50% 50% -18px",
                }}
              >
                {ROTATING_WORDS[index]}
              </span>

              {/* Radiant Orange Glow Underline */}
              <span
                className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-95 shadow-[0_0_12px_rgba(255,90,42,0.65)]"
                aria-hidden="true"
              />
            </span>

            <br />

            <span className="text-[var(--secondary,#b8b6af)]">
              Built to scale.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="home-hero-node mt-5 max-w-xl text-base font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-lg">
            We bridge physical craftsmanship and visionary spatial architecture to turn brand presence into unforgettable, immersive exhibition environments.
          </p>

          {/* CTA Action Buttons */}
          <div className="home-hero-node mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[var(--text,#f1efe9)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--background,#0b0c0d)] transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-[0_0_25px_rgba(241,239,233,0.3)] active:scale-95"
            >
              <span>Explore Archive</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--text,#f1efe9)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:text-[var(--accent,#ff5a2a)] hover:bg-[var(--elevated,#191c1f)] active:scale-95"
            >
              Start Project Brief
            </Link>
          </div>

          {/* Architectural Metric Pill */}
          <div className="home-hero-node mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)]/60 px-6 py-3 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
              <span>Turnkey Build</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--focus,#ffd2c3)]" />
              <span>Photorealistic 3D</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success,#66d19e)]" />
              <span>Zero-Delay Handover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}