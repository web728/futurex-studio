"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroSceneWave as HeroScene } from "./hero-scene-wave";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 40,
      });

      // Cinematic staggered entrance sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        delay: 0.2,
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          "-=0.9"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      /* CHANGED: 'min-h-screen' ko 'min-h-[70vh]' ya fit-content 'h-auto' kar diya aur section padding kam ki */
      className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden bg-[#0a0a0c] px-6 py-8 text-white lg:px-16"
    >
      {/* WebGL Background Scene */}
      <HeroScene />

      {/* Dynamic Animated Radial Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.85)_100%)]" />

      {/* Hero Content Container */}
      {/* CHANGED: 'py-24' ko kam karke 'py-8' / 'py-12' kar diya */}
      <div className="relative z-[2] my-auto max-w-5xl py-8 lg:py-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent,#d4af37)]">
          Spatial & Spatial Experience Studio
        </p>
        <h1
          ref={titleRef}
          className="text-[clamp(2.25rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-tight text-white"
        >
          Architectural depth. <br />
          <span className="text-white/60">Flawless execution.</span>
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 max-w-2xl text-base font-light text-white/70 lg:text-lg"
        >
          We bridge physical craftsmanship and visionary spatial design to turn brand presence into unforgettable, immersive environments.
        </p>
        <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            <span>Explore Work</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-[2] flex items-center gap-3 text-xs uppercase tracking-widest text-white/40"
      >
        <div className="h-8 w-[1px] overflow-hidden bg-white/20">
          <div className="h-full w-full animate-pulse bg-white" />
        </div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}