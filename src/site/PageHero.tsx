"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  copy?: string;
}

// Helper function to split text into individual characters
function splitTextIntoCharacters(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="inline-block"
      style={{ perspective: "1000px" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export function PageHero({ eyebrow, title, copy }: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Eyebrow animation - fade in and slide up
    if (eyebrowRef.current) {
      gsap.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // Title split text animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll("span");
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 80,
          rotationX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            amount: 0.5,
            ease: "power2.inOut",
          },
          delay: 0.3,
        }
      );
    }

    // Copy text animation
    if (copyRef.current) {
      gsap.fromTo(
        copyRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }

    return () => {
      // Cleanup
      gsap.killTweensOf([titleRef.current, copyRef.current, eyebrowRef.current]);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0b0c0d] pt-32 pb-20 flex items-center"
    >
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--accent)]/[0.08] blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--accent)]/[0.05] blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          {eyebrow && (
            <p
              ref={eyebrowRef}
              className="mb-6 text-xs font-bold uppercase tracking-[.15em] text-[var(--accent)]"
            >
              {eyebrow}
            </p>
          )}

          {/* Title with split text animation */}
          <h1
            ref={titleRef}
            className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            style={{
              perspective: "1200px",
            }}
          >
            {splitTextIntoCharacters(title)}
          </h1>

          {/* Copy text */}
          {copy && (
            <p
              ref={copyRef}
              className="text-lg leading-relaxed text-white/70 md:text-xl"
            >
              {copy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}