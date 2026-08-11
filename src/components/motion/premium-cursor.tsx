"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const y = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 border border-white/60 rounded-full pointer-events-none mix-blend-screen transition-all duration-75"
        style={{
          boxShadow: "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      />

      {/* Inner dot */}
      <div
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none"
        style={{
          transform: `translate3d(${x.current - 2}px, ${y.current - 2}px, 0)`,
          transition: "all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Trailing glow */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none opacity-0"
        style={{
          transform: `translate3d(${x.current - 16}px, ${y.current - 16}px, 0)`,
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </div>
  );
}