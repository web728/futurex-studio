"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HeroSceneWave as HeroScene } from "./hero-scene-wave";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROTATING_WORDS = [
  "Architectural depth.",
  "Spatial innovation.",
  "Immersive design.",
  "Visionary structures.",
];

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // 3D Flip Text Transition Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsFlipping(false);
      }, 420);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  // GSAP Smooth Reveal & Scroll Exit
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".hero-animate-item");
      if (!items || items.length === 0) return;

      // 1. Initial State
      gsap.set(items, { autoAlpha: 0, y: 30 });

      // 2. Entrance Timeline
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });

      // 3. Scroll Exit
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "65% top",
          scrub: 0.6,
        },
        y: -40,
        autoAlpha: 0,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[90vh] lg:min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--background,#0b0c0d)] px-6 py-20 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* 1. WebGL Canvas Scene */}
      <HeroScene />

      {/* 2. Backdrop Radial Gradient with Accent Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,90,42,0.03)_0%,rgba(11,12,13,0.95)_85%)]"
        aria-hidden="true"
      />

      {/* 3. Centered Content Container */}
      <div
        ref={contentRef}
        className="relative z-[10] mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* Eyebrow / Tagline */}
        <p className="hero-animate-item mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent,#ff5a2a)]">
          Spatial Experience & Exhibition Studio
        </p>

        {/* Display Heading with Dynamic 3D Rolling Text & Glow Underline */}
        <h1 className="hero-animate-item text-[clamp(2.25rem,5.5vw,4.75rem)] font-bold tracking-tight text-[var(--text,#f1efe9)] leading-[1.15]">
          <span className="relative inline-block overflow-hidden [perspective:800px] align-top py-1">
            <span
              className="inline-block transition-transform transition-opacity duration-[420ms] will-change-transform"
              style={{
                transitionTimingFunction: "var(--motion-ease, cubic-bezier(0.22, 1, 0.36, 1))",
                transform: isFlipping
                  ? "rotateX(75deg) translateY(-22px)"
                  : "rotateX(0deg) translateY(0)",
                opacity: isFlipping ? 0 : 1,
                transformOrigin: "50% 50% -20px",
              }}
            >
              {ROTATING_WORDS[index]}
            </span>

            {/* Glowing Accent Underline */}
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--accent,#ff5a2a)] to-transparent opacity-90 shadow-[0_0_12px_rgba(255,90,42,0.6)]"
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="text-[var(--secondary,#b8b6af)]">
            Flawless execution.
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="hero-animate-item mt-6 max-w-2xl text-base font-normal leading-relaxed text-[var(--secondary,#b8b6af)] md:text-lg">
          We bridge physical craftsmanship and visionary spatial design to turn
          brand presence into unforgettable, immersive environments.
        </p>

        {/* Action Buttons */}
        <div className="hero-animate-item mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/projects"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--text,#f1efe9)] px-8 py-3.5 text-sm font-semibold text-[var(--background,#0b0c0d)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(241,239,233,0.3)]"
          >
            Explore Work
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] px-8 py-3.5 text-sm font-medium text-[var(--text,#f1efe9)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:text-[var(--accent,#ff5a2a)] hover:bg-[var(--elevated,#191c1f)]"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}