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

    let splitInstance: SplitType | null = null;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Prevent Layout Shift / Flash of Unstyled Content
      gsap.set(element, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      // VARIANT 1: Word-by-Word Split Reveal (Apple-style Title Entrance)
      if (variant === "splitWord") {
        splitInstance = new SplitType(element, { types: "words" });

        if (splitInstance.words && splitInstance.words.length > 0) {
          gsap.set(splitInstance.words, {
            display: "inline-block",
            willChange: "transform, opacity",
          });

          gsap.fromTo(
            splitInstance.words,
            {
              opacity: 0,
              y: 32,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              stagger: 0.035,
              delay,
              ease: EASE_CINEMATIC,
              clearProps: "willChange",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
                fastScrollEnd: true,
              },
            }
          );
        }
      }

      // VARIANT 2 & "stagger": Staggered List Items
      if (variant === "staggerList" || variant === "stagger") {
        const items = element.children;

        gsap.set(items, { willChange: "transform, opacity" });

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.07,
            delay,
            ease: EASE_CINEMATIC,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      }

      // VARIANT 3: Fade Up
      if (variant === "fadeUp") {
        gsap.set(element, { willChange: "transform, opacity" });

        gsap.fromTo(
          element,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay,
            ease: EASE_CINEMATIC,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      }

      // VARIANT 4: Clip Reveal
      if (variant === "clipReveal") {
        gsap.fromTo(
          element,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.2,
            delay,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      }
    }, elRef);

    return () => {
      if (splitInstance) splitInstance.revert();
      ctx.revert();
    };
  }, [variant, delay]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}