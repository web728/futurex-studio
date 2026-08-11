"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { AmbientBackgroundProps } from "./types";

export function AmbientBackground({
  blobARef,
  blobBRef,
  raysRef,
  particlesWrapRef,
}: AmbientBackgroundProps) {
  const particleCount = 18;

  // Render zero particles on server-pass to avoid hydration mismatch
  const [particles, setParticles] = useState<
    { id: number; left: number; top: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  // Drift animation client-side
  useEffect(() => {
    if (!particles.length || !particlesWrapRef.current) return;

    const ctx = gsap.context(() => {
      const nodes = particlesWrapRef.current!.querySelectorAll<HTMLElement>("[data-particle]");
      nodes.forEach((node) => {
        const duration = parseFloat(node.dataset.duration || "12");
        const delay = parseFloat(node.dataset.delay || "0");
        gsap.set(node, { opacity: 0.15 });
        gsap.to(node, {
          y: -30 - Math.random() * 30,
          x: (Math.random() - 0.5) * 20,
          opacity: 0.5,
          duration,
          delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    });

    return () => ctx.revert();
  }, [particles, particlesWrapRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Drifting ambient blobs */}
      <div
        ref={blobARef}
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--accent,rgba(59,130,246,0.12))] blur-[128px]"
      />
      <div
        ref={blobBRef}
        className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-[var(--accent,rgba(147,51,234,0.1))] blur-[128px]"
      />

      {/* Light rays */}
      <div
        ref={raysRef}
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.6) 10deg, transparent 40deg, transparent 180deg, rgba(255,255,255,0.4) 190deg, transparent 220deg)",
        }}
      />

      {/* Floating particles */}
      <div ref={particlesWrapRef} className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            data-particle
            data-duration={p.duration}
            data-delay={p.delay}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Noise texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
        <filter id="testimonialsNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#testimonialsNoise)" />
      </svg>
    </div>
  );
}