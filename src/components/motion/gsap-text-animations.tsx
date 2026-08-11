"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE_APPLE = "power3.out";

/**
 * Universal Wrapper Component (Fixes red line error)
 */
interface GSAPCinematicRevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "splitWord" | "staggerList" | "clipReveal";
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

      gsap.set(element, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      if (variant === "splitWord") {
        const split = new SplitType(element, { types: "words" });

        if (split.words && split.words.length > 0) {
          gsap.set(split.words, {
            display: "inline-block",
            willChange: "transform, opacity",
          });

          gsap.fromTo(
            split.words,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              stagger: 0.04,
              delay,
              ease: EASE_APPLE,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      }

      if (variant === "staggerList") {
        const items = element.children;

        gsap.fromTo(
          items,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            delay,
            ease: EASE_APPLE,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (variant === "fadeUp") {
        gsap.fromTo(
          element,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: EASE_APPLE,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

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

/**
 * Hero Heading
 */
export function HeroTextReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(el, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      const split = new SplitType(el, { types: "words" });

      if (split.words && split.words.length > 0) {
        gsap.set(split.words, {
          display: "inline-block",
          willChange: "transform, opacity",
        });

        gsap.fromTo(
          split.words,
          {
            opacity: 0,
            y: "100%",
            scale: 0.95,
          },
          {
            opacity: 1,
            y: "0%",
            scale: 1,
            duration: 1.2,
            stagger: 0.04,
            ease: EASE_APPLE,
            delay: 0.1,
          }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={textRef} className={`opacity-0 ${className}`}>
      {children}
    </h1>
  );
}

/**
 * Section Headings
 */
export function SectionHeadingReveal({
  children,
  className = "",
  as: Component = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const headingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(el, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      const split = new SplitType(el, { types: "words" });

      if (split.words && split.words.length > 0) {
        gsap.set(split.words, {
          display: "inline-block",
          willChange: "transform, opacity",
        });

        gsap.fromTo(
          split.words,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.03,
            ease: EASE_APPLE,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
              onRefresh: (self) =>
                self.progress && self.animation?.progress(1),
            },
          }
        );
      }
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return React.createElement(
    Component,
    {
      ref: headingRef,
      className: `opacity-0 ${className}`,
    },
    children
  );
}

/**
 * Paragraphs Reveal
 */
export function ParagraphReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(el, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay,
          ease: EASE_APPLE,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, pRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <p ref={pRef} className={`opacity-0 ${className}`}>
      {children}
    </p>
  );
}

/**
 * Button Reveal
 */
export function ButtonReveal({
  children,
  className = "",
  delay = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(el, { autoAlpha: 1 });

      if (prefersReducedMotion) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay,
          ease: EASE_APPLE,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, btnRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={btnRef} className={`opacity-0 inline-block ${className}`}>
      {children}
    </div>
  );
}