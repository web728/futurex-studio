"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function AmbientParticles({ count = 14 }: { count?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    { id: number; left: number; top: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 9 + Math.random() * 12,
        delay: Math.random() * 5,
      }))
    );
  }, [count]);

  useEffect(() => {
    if (!particles.length || !wrapRef.current) return;
    const ctx = gsap.context(() => {
      const nodes = wrapRef.current!.querySelectorAll<HTMLElement>("[data-particle]");
      nodes.forEach((node) => {
        const duration = parseFloat(node.dataset.duration || "12");
        const delay = parseFloat(node.dataset.delay || "0");
        gsap.set(node, { opacity: 0.12 });
        gsap.to(node, {
          y: -24 - Math.random() * 26,
          x: (Math.random() - 0.5) * 18,
          opacity: 0.4,
          duration,
          delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    });
    return () => ctx.revert();
  }, [particles]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          data-particle
          data-duration={p.duration}
          data-delay={p.delay}
          className="absolute rounded-full bg-white/30"
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
  );
}