// components/motion/gsap-reveal.tsx
"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPRevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "fadeIn" | "scaleIn" | "stagger" | "parallaxImage";
  delay?: number;
  duration?: number;
  className?: string;
  speed?: number; // for parallax
}

export function GSAPReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.8,
  className = "",
  speed = 0.2,
}: GSAPRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (variant === "parallaxImage") {
        gsap.fromTo(
          el,
          { yPercent: -10 * speed },
          {
            yPercent: 10 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        return;
      }

      if (variant === "stagger") {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        return;
      }

      const initialStates = {
        fadeUp: { opacity: 0, y: 35, scale: 1 },
        fadeIn: { opacity: 0, y: 0, scale: 1 },
        scaleIn: { opacity: 0, y: 0, scale: 0.94 },
      };

      const startState = initialStates[variant] || initialStates.fadeUp;

      gsap.fromTo(
        el,
        startState,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [variant, delay, duration, speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}