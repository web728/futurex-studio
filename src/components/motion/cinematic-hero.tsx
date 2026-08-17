"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HeroSceneWave as HeroScene } from "./hero-scene-wave";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial hidden state with autoAlpha (combines opacity & visibility)
      gsap.set(
        [
          taglineRef.current,
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
          scrollIndicatorRef.current,
        ],
        {
          autoAlpha: 0,
          y: 45,
        }
      );

      // 2. Cinematic entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });

      tl.to(taglineRef.current, {
        autoAlpha: 1,
        y: 0,
        delay: 0.1,
      })
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
          },
          "-=0.9"
        )
        .to(
          subtitleRef.current,
          {
            autoAlpha: 1,
            y: 0,
          },
          "-=0.9"
        )
        .to(
          ctaRef.current,
          {
            autoAlpha: 1,
            y: 0,
          },
          "-=0.8"
        )
        .to(
          scrollIndicatorRef.current,
          {
            autoAlpha: 1,
            y: 0,
          },
          "-=0.8"
        );

      // 3. Scroll Parallax effect as user scrolls past the hero
      gsap.to(
        [
          taglineRef.current,
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
        ],
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -50,
          opacity: 0,
          ease: "none",
        }
      );
    }, containerRef);

    // Refresh GSAP on DOM ready
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[75vh] w-full flex-col justify-between overflow-hidden bg-[#0a0a0c] px-6 py-10 text-white lg:px-16"
    >
      {/* WebGL Background Scene */}
      <HeroScene />

      {/* Dynamic Radial Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.85)_100%)]" />

      {/* Hero Main Content Area */}
      <div className="relative z-[10] my-auto max-w-5xl py-8 lg:py-12">
        <p
          ref={taglineRef}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent,#d4af37)]"
        >
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

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-[10] flex items-center gap-3 text-xs uppercase tracking-widest text-white/40"
      >
        <div className="h-8 w-[1px] overflow-hidden bg-white/20">
          <div className="h-full w-full animate-pulse bg-white" />
        </div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}