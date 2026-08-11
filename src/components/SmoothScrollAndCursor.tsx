"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollAndCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoverStateRef = useRef<"default" | "hover" | "text">("default");
  const prevHoverRef = useRef<"default" | "hover" | "text">("default");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let targetRingX = -100;
    let targetRingY = -100;

    const ringClasses = {
      default: "h-8 w-8 border-[var(--accent)]/60 bg-transparent scale-100",
      hover: "h-14 w-14 border-[var(--accent)] bg-[var(--accent)]/15 scale-110 shadow-[0_0_20px_rgba(255,90,42,0.3)]",
      text: "h-10 w-10 border-[var(--accent)]/50 bg-transparent scale-95",
    };
    const dotClasses = {
      default: "h-2 w-2 opacity-100 scale-100 shadow-[0_0_8px_var(--accent)]",
      hover: "h-2 w-2 opacity-0 scale-0",
      text: "h-2.5 w-2.5 opacity-90 shadow-[0_0_12px_var(--accent)]",
    };

    const applyHoverClasses = (state: "default" | "hover" | "text") => {
      if (state === prevHoverRef.current) return;
      prevHoverRef.current = state;

      if (ringRef.current) {
        const base = "pointer-events-none fixed left-0 top-0 rounded-full border transition-all duration-300 ease-out will-change-transform";
        ringRef.current.className = `${base} ${ringClasses[state]}`;
      }
      if (dotRef.current) {
        const base = "pointer-events-none fixed left-0 top-0 rounded-full bg-[var(--accent)] transition-all duration-200 ease-out will-change-transform";
        dotRef.current.className = `${base} ${dotClasses[state]}`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0px) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      const interactiveTarget = target?.closest(
        "a, button, input, select, textarea, [role='button'], .data-cursor-hover"
      ) as HTMLElement | null;
      const isText = Boolean(target?.closest("p, h1, h2, h3, h4, h5, h6, span, li"));

      if (interactiveTarget) {
        hoverStateRef.current = "hover";
        const rect = interactiveTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetRingX = mouseX + (centerX - mouseX) * 0.3;
        targetRingY = mouseY + (centerY - mouseY) * 0.3;
      } else {
        targetRingX = mouseX;
        targetRingY = mouseY;
        hoverStateRef.current = isText ? "text" : "default";
      }

      applyHoverClasses(hoverStateRef.current);
    };

    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;
    const animateRing = () => {
      ringX += (targetRingX - ringX) * 0.18;
      ringY += (targetRingY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateRing);
    };

    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block overflow-hidden">
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 rounded-full border transition-all duration-300 ease-out will-change-transform h-8 w-8 border-[var(--accent)]/60 bg-transparent scale-100"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 rounded-full bg-[var(--accent)] transition-all duration-200 ease-out will-change-transform h-2 w-2 opacity-100 scale-100 shadow-[0_0_8px_var(--accent)]"
      />
    </div>
  );
}
