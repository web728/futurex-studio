"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { siteImages } from "@/data/site-images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
}

export function ContactHero({
  eyebrow,
  title,
  copy,
  image,
  primaryCtaText = "Let's Talk",
  primaryCtaHref = "#contact-form",
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const svgPathsRef = useRef<SVGSVGElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const imageAlt = image
    ? Object.values(siteImages).find((item) => item.src === image)?.alt ?? ""
    : "";

  useEffect(() => {
    let titleSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          [eyebrowRef.current, headingRef.current, copyRef.current, ctaRef.current, imageContainerRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      requestAnimationFrame(() => {
        if (headingRef.current) {
          titleSplit = new SplitType(headingRef.current, { types: ["words", "chars"] });
        }

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1. Eyebrow Reveal
        if (eyebrowRef.current) {
          tl.fromTo(eyebrowRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6 });
        }

        // 2. Ultra-Kinetic 3D Drop Heading Animation
        if (titleSplit && titleSplit.chars) {
          gsap.set(headingRef.current, { opacity: 1 });
          tl.fromTo(
            titleSplit.chars,
            {
              opacity: 0,
              y: 50,
              rotateX: -75,
              scale: 0.8,
              filter: "drop-shadow(0 0 20px rgba(255,90,42,0))",
              willChange: "transform, opacity",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              filter: "drop-shadow(0 0 0px rgba(255,90,42,0))",
              duration: 1.1,
              stagger: 0.018,
              ease: "back.out(1.4)",
            },
            "-=0.4"
          );
        }

        // 3. Subtitle Fade Up
        if (copyRef.current) {
          tl.fromTo(copyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.7");
        }

        // 4. Elastic Button Pulse Entrance
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current, { opacity: 0, y: 25, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");
        }

        // 5. Side Image Smooth Sweep
        if (imageContainerRef.current) {
          tl.fromTo(
            imageContainerRef.current,
            { opacity: 0, scale: 1.15, filter: "brightness(0.5)" },
            { opacity: 0.35, scale: 1, filter: "brightness(1)", duration: 1.3, ease: "power2.out" },
            "-=1.2"
          );
        }

        // 6. SVG Lines Draw
        if (svgPathsRef.current) {
          const paths = svgPathsRef.current.querySelectorAll("path, circle");
          gsap.fromTo(
            paths,
            { strokeDasharray: 800, strokeDashoffset: 800, opacity: 0 },
            { strokeDashoffset: 0, opacity: 0.5, duration: 2, stagger: 0.2, ease: "power2.inOut" }
          );
        }
      });

      // Mouse Parallax & Dynamic Lighting
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

        if (bgGlowRef.current) {
          gsap.to(bgGlowRef.current, { x: xNorm * 40, y: yNorm * 40, duration: 1.6, ease: "power2.out" });
        }
        if (svgPathsRef.current) {
          gsap.to(svgPathsRef.current, { x: xNorm * -20, y: yNorm * -20, duration: 1.4, ease: "power2.out" });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => {
      if (titleSplit) titleSplit.revert();
      ctx.revert();
    };
  }, []);

  // Magnetic CTA Physics
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    gsap.to(ctaRef.current, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.4,
      y: (e.clientY - rect.top - rect.height / 2) * 0.4,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCtaMouseLeave = () => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b border-white/10 bg-[#08090a] py-12 lg:py-16">
      {/* Noise Texture */}
      <div className="noise pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />

      {/* Ambient Radial Lighting */}
      <div ref={bgGlowRef} className="pointer-events-none absolute -left-16 -top-16 h-[350px] w-[350px] rounded-full bg-[var(--accent,#ff5a2a)]/20 blur-[100px] will-change-transform" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-[var(--accent,#ff5a2a)]/10 blur-[100px]" />

      {/* Vector Motion Lines SVG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <svg ref={svgPathsRef} className="h-full w-full will-change-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 800">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
          <path d="M -100 200 C 300 50, 700 450, 1540 150" stroke="var(--accent, #ff5a2a)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M -50 600 C 400 300, 800 700, 1500 400" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Side Image Overlay */}
      {image && (
        <div ref={imageContainerRef} className="absolute right-0 top-0 hidden h-full w-[45%] opacity-0 lg:block will-change-transform">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="45vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090a] via-[#08090a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-transparent" />
        </div>
      )}

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-16">
        <p ref={eyebrowRef} className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] opacity-0">
          {eyebrow}
        </p>

        <h1 ref={headingRef} className="display mt-4 max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1] tracking-tight text-white opacity-0 [perspective:1000px]">
          {title}
        </h1>

        <p ref={copyRef} className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 opacity-0 lg:text-base">
          {copy}
        </p>

        <div className="mt-6 flex items-center">
          <a
            ref={ctaRef}
            href={primaryCtaHref}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--accent,#ff5a2a)] px-7 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(255,90,42,0.3)] opacity-0 transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(255,90,42,0.6)] will-change-transform"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">{primaryCtaText}</span>
            <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </section>
  );
}