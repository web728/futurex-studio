"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE_CINEMATIC = "power3.out";

interface GSAPCinematicRevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "splitWord" | "staggerList" | "clipReveal" | "stagger" | "3dCardHover";
  delay?: number;
  className?: string;
}

export function GSAPCinematicReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
}: GSAPCinematicRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // GSAP autoAlpha handles visibility & prevents flicker
      gsap.set(element, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      // VARIANT 1: Word-by-Word Split Reveal (Premium Apple-style Title Entrance)
      if (variant === "splitWord") {
        const split = new SplitType(element, { types: "words" });

        if (split.words && split.words.length > 0) {
          gsap.set(split.words, {
            display: "inline-block",
            willChange: "transform, opacity",
          });

          gsap.fromTo(
            split.words,
            {
              opacity: 0,
              y: 40,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              stagger: 0.04,
              delay,
              ease: EASE_CINEMATIC,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      }

      // VARIANT 2: Staggered List Items (Smooth Cascade Reveal for Features/Cards)
      if (variant === "staggerList") {
        const items = element.children;

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            delay,
            ease: EASE_CINEMATIC,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // VARIANT 3: Fade Up (Eyebrows & Subtitles)
      if (variant === "fadeUp") {
        gsap.fromTo(
          element,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: EASE_CINEMATIC,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // VARIANT 4: Smooth Curtain Clip Reveal
      if (variant === "clipReveal") {
        gsap.fromTo(
          element,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.3,
            delay,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, elRef);

    return () => ctx.revert();
  }, [variant, delay]);

  return (
    <div ref={elRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}