"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function ContactAmbientBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const parallaxGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spotlightXTo = gsap.quickTo(spotlightRef.current, "xPercent", { duration: 1.2, ease: "power3.out" });
    const spotlightYTo = gsap.quickTo(spotlightRef.current, "yPercent", { duration: 1.2, ease: "power3.out" });
    const parallaxXTo = gsap.quickTo(parallaxGroupRef.current, "x", { duration: 1.8, ease: "power2.out" });
    const parallaxYTo = gsap.quickTo(parallaxGroupRef.current, "y", { duration: 1.8, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      spotlightXTo(nx * 30);
      spotlightYTo(ny * 30);
      parallaxXTo(nx * 20);
      parallaxYTo(ny * 20);
    };

    const ctx = gsap.context(() => {
      gsap.to(".bg-node", {
        y: "+=25",
        opacity: 0.6,
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        stagger: { amount: 2, from: "random" },
        ease: "sine.inOut",
      });
    }, containerRef);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-[var(--background)] selection:bg-[var(--accent)]">
      <div className="noise absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      {/* Lighting Spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 flex items-center justify-center will-change-transform">
        <div className="h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-10 blur-[130px]" />
      </div>

      {/* Grid & Constellation Nodes */}
      <div ref={parallaxGroupRef} className="absolute inset-0 h-full w-full will-change-transform">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:5rem_5rem]"
          style={{
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)",
          }}
        />

        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 1000">
          <circle className="bg-node" cx="15%" cy="30%" r="2" fill="var(--accent)" opacity="0.8" />
          <circle cx="15%" cy="30%" r="6" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" className="animate-pulse" />

          <circle className="bg-node" cx="80%" cy="20%" r="1.5" fill="var(--text)" opacity="0.6" />
          <circle cx="80%" cy="20%" r="5" stroke="var(--border)" strokeWidth="0.5" opacity="0.2" className="animate-pulse" />

          <circle className="bg-node" cx="50%" cy="80%" r="2.5" fill="var(--accent)" opacity="0.9" />
          <circle cx="50%" cy="80%" r="8" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />

          <circle className="bg-node" cx="90%" cy="75%" r="1" fill="var(--secondary)" opacity="0.5" />

          <path d="M 15% 30% L 80% 20% L 50% 80% Z" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="6 10" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}