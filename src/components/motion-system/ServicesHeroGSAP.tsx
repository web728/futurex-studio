"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import { HeroScene } from "../motion/hero-scene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesHeroGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleMask1Ref = useRef<HTMLSpanElement>(null);
  const titleMask2Ref = useRef<HTMLSpanElement>(null);
  const titleInner1Ref = useRef<HTMLSpanElement>(null);
  const titleInner2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Background and SVG Graphic Refs
  const svgGridRef = useRef<SVGSVGElement>(null);
  const orbitalRingsRef = useRef<SVGGElement>(null);
  const lightBeamRef = useRef<HTMLDivElement>(null);
  const parallaxGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          badgeRef.current,
          titleInner1Ref.current,
          titleInner2Ref.current,
          subtitleRef.current,
          ctaRef.current,
          statsRef.current,
        ],
        { opacity: 1, y: 0 }
      );
      return;
    }

    const start = () => {
      const ctx = gsap.context(() => {
        // Initial state
        gsap.set(badgeRef.current, {
          opacity: 0,
          y: 16,
          scale: 0.95,
        });
        gsap.set([titleInner1Ref.current, titleInner2Ref.current], {
          yPercent: 115,
        });
        gsap.set([subtitleRef.current, ctaRef.current, statsRef.current], {
          opacity: 0,
          y: 24,
        });
        gsap.set(scrollCueRef.current, { opacity: 0, y: -8 });

        // Entrance timeline
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: 0.05,
          ease: "back.out(1.4)",
        })
          .to(
            titleInner1Ref.current,
            { yPercent: 0, duration: 0.85, ease: "power4.out" },
            "-=0.3"
          )
          .to(
            titleInner2Ref.current,
            { yPercent: 0, duration: 0.85, ease: "power4.out" },
            "-=0.7"
          )
          .to(
            subtitleRef.current,
            { opacity: 1, y: 0, duration: 0.75 },
            "-=0.5"
          )
          .to(
            ctaRef.current,
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.55"
          )
          .to(
            statsRef.current,
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
            "-=0.45"
          )
          .to(
            scrollCueRef.current,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.25"
          );

        gsap.to(scrollCueRef.current, {
          y: 6,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: tl.duration(),
        });

        // Continuous ambient SVG & light animations
        if (orbitalRingsRef.current) {
          gsap.to(orbitalRingsRef.current, {
            rotate: 360,
            transformOrigin: "center center",
            duration: 45,
            repeat: -1,
            ease: "none",
          });
        }

        if (lightBeamRef.current) {
          gsap.to(lightBeamRef.current, {
            x: "10%",
            y: "8%",
            scale: 1.1,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.easeInOut",
          });
        }

        gsap.to(".svg-node-pulse", {
          scale: 1.4,
          opacity: 0.8,
          transformOrigin: "center center",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          stagger: 0.25,
          ease: "power1.inOut",
        });

        // Mouse parallax on background SVG group
        const xTo = gsap.quickTo(parallaxGroupRef.current, "x", {
          duration: 0.7,
          ease: "power2.out",
        });
        const yTo = gsap.quickTo(parallaxGroupRef.current, "y", {
          duration: 0.7,
          ease: "power2.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xOffset = (clientX / innerWidth - 0.5) * 25;
          const yOffset = (clientY / innerHeight - 0.5) * 25;
          xTo(xOffset);
          yTo(yOffset);
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Magnetic hover for CTA Button
        if (ctaButtonRef.current) {
          const btn = ctaButtonRef.current;
          const btnX = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" });
          const btnY = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" });

          const onBtnMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            btnX(relX * 0.25);
            btnY(relY * 0.25);
          };
          const onBtnMouseLeave = () => {
            btnX(0);
            btnY(0);
          };
          btn.addEventListener("mousemove", onBtnMouseMove);
          btn.addEventListener("mouseleave", onBtnMouseLeave);
        }

        // Scroll exit trigger
        if (containerRef.current) {
          gsap.to([titleMask1Ref.current, titleMask2Ref.current], {
            y: -30,
            opacity: 0.6,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=50%",
              scrub: 1,
            },
          });

          gsap.to(scrollCueRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=15%",
              scrub: true,
            },
          });
        }
      }, containerRef);

      return () => ctx.revert();
    };

    if (typeof document !== "undefined" && "fonts" in document) {
      let cleanup: (() => void) | undefined;
      document.fonts.ready.then(() => {
        cleanup = start();
      });
      return () => cleanup?.();
    } else {
      return start();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] lg:min-h-[85vh] w-full flex-col justify-between overflow-hidden bg-[#0a0a0c] px-4 py-10 sm:px-6 lg:px-12 border-b border-white/10 text-white"
    >
      {/* WebGL Canvas Background */}
      <HeroScene />

      {/* Dynamic Light Beams */}
      <div
        ref={lightBeamRef}
        className="pointer-events-none absolute -left-20 -top-20 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[var(--accent,#d4af37)]/15 via-purple-600/10 to-transparent blur-[120px] z-[1]"
      />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-gradient-to-tl from-[var(--accent,#d4af37)]/10 via-blue-600/5 to-transparent blur-[140px] z-[1]" />

      {/* Radial Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.85)_100%)]" />

      {/* Interactive Layered SVG Wireframes */}
      <div
        ref={parallaxGroupRef}
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center opacity-30"
      >
        <svg
          ref={svgGridRef}
          className="h-full w-full max-w-6xl"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 0 V 800 M 300 0 V 800 M 500 0 V 800 M 700 0 V 800 M 900 0 V 800 M 1100 0 V 800"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <path
            d="M 0 150 H 1200 M 0 350 H 1200 M 0 550 H 1200 M 0 750 H 1200"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          <path
            d="M -100 600 C 300 400, 600 750, 1300 200"
            stroke="url(#gradient-line)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          />

          <g ref={orbitalRingsRef} transform="translate(950, 250)">
            <circle
              r="180"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="12 12"
            />
            <circle
              r="130"
              stroke="url(#accent-ring-grad)"
              strokeWidth="1.5"
              strokeDasharray="180 60"
            />
            <circle r="5" fill="var(--accent,#d4af37)" className="svg-node-pulse" cy="-130" cx="0" />
            <circle r="4" fill="#ffffff" className="svg-node-pulse" cy="180" cx="0" />
          </g>

          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="var(--accent,#d4af37)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="accent-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent,#d4af37)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content Area - Compact Padding */}
      <div className="relative z-[2] my-auto max-w-4xl pt-12 pb-8 text-left">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-md transition-shadow duration-300 hover:border-[var(--accent,#d4af37)]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        >
          <Sparkles size={12} className="text-[var(--accent,#d4af37)] animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#d4af37)]">
            What We Do
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight text-white">
          <span ref={titleMask1Ref} className="block overflow-hidden">
            <span ref={titleInner1Ref} className="block will-change-transform">
              Ideas, engineered
            </span>
          </span>
          <span ref={titleMask2Ref} className="block overflow-hidden">
            <span
              ref={titleInner2Ref}
              className="block font-light bg-gradient-to-r from-white/90 via-white/60 to-white/30 bg-clip-text text-transparent will-change-transform"
            >
              into experience.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base lg:text-lg"
        >
          From stand design and fabrication to events, branding, and digital —
          one team carries your brand from concept to the show floor, and beyond.
        </p>

        {/* Action Button */}
        <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-3">
          <a
            ref={ctaButtonRef}
            href="#services-list"
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-6 py-3 text-xs font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] sm:text-sm"
          >
            <span className="relative z-10">Explore Services</span>
            <ArrowUpRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-white via-amber-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            No two shows are the same
          </span>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div
        ref={statsRef}
        className="relative z-[2] grid grid-cols-2 gap-4 pt-5 border-t border-white/10 max-w-3xl sm:grid-cols-4 text-[10px] uppercase tracking-widest text-white/50"
      >
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <span className="block font-mono text-xl font-bold text-white">06</span>
          <span>Service Pillars</span>
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <span className="block font-mono text-xl font-bold text-white">360°</span>
          <span>Brand Execution</span>
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <span className="block font-mono text-xl font-bold text-white">In-House</span>
          <span>Fabrication</span>
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5">
          <span className="block font-mono text-xl font-bold text-white">Global</span>
          <span>Delivery</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="pointer-events-none absolute bottom-4 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-0.5 text-white/30"
      >
        <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={12} />
      </div>
    </section>
  );
}