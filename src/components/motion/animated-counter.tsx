// src/components/motion/animated-counter.tsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const motionVal = useMotionValue(0);

  // High-End Smooth Spring Config (Coda/Kononenko Style)
  const spring = useSpring(motionVal, {
    damping: 30,
    stiffness: 70,
    mass: 1,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        if (ref.current) ref.current.textContent = `${value}${suffix}`;
      } else {
        motionVal.set(value);
      }
    }
  }, [inView, value, motionVal, shouldReduceMotion, suffix]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Direct DOM Mutation for 60/120fps smooth performance without React re-renders
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [spring, suffix, shouldReduceMotion]);

  return (
    <p ref={ref} className={className}>
      0{suffix}
    </p>
  );
}