"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const glow1OuterRef = useRef<HTMLDivElement>(null);
  const glow2OuterRef = useRef<HTMLDivElement>(null);
  const frameOuterRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);
  const pillOuterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Smooth GSAP-driven mouse parallax — replaces React-state-per-mousemove,
    // which forces a re-render on every pixel and reads as janky/non-smooth.
    const parallaxTargets = [
      { el: glow1OuterRef.current, strength: -35 },
      { el: glow2OuterRef.current, strength: 25 },
      { el: frameOuterRef.current, strength: 20 },
      { el: ringOuterRef.current, strength: -40 },
      { el: pillOuterRef.current, strength: 50 },
    ];

    const movers = parallaxTargets
      .filter((t) => t.el)
      .map(({ el, strength }) => ({
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        strength,
      }));

    if (!prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        movers.forEach(({ x, y, strength }) => {
          x(px * strength);
          y(py * strength);
        });
      };

      const node = containerRef.current;
      node?.addEventListener("mousemove", handleMouseMove);

      // Slow background grid drift — continuous, independent of mouse
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPosition: "4rem 4rem",
          duration: 18,
          repeat: -1,
          ease: "none",
        });
      }

      return () => node?.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[var(--background,#0a0a0c)]"
    >
      {/* Self-contained keyframes — doesn't depend on tailwind.config having
          these utilities defined, so it always animates. */}
      <style>{`
        @keyframes heroFloatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-22px) scale(1.03); }
        }
        @keyframes heroFloatReverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(18px) translateX(-12px); }
        }
        @keyframes heroPulseGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes heroBeamDrift {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .hero-float-slow { animation: heroFloatSlow 7s ease-in-out infinite; }
        .hero-float-reverse { animation: heroFloatReverse 9s ease-in-out infinite; }
        .hero-pulse-glow { animation: heroPulseGlow 3.2s ease-in-out infinite; }
        .hero-beam-drift { animation: heroBeamDrift 6s ease-in-out infinite; }
      `}</style>

      {/* Ambient Accent Glow (Mouse Parallax outer, CSS float inner) */}
      <div ref={glow1OuterRef} className="pointer-events-none absolute -top-20 right-10 will-change-transform">
        <div className="hero-beam-drift h-[550px] w-[550px] rounded-full bg-[var(--accent,#d4af37)] opacity-20 blur-[140px]" />
      </div>

      <div ref={glow2OuterRef} className="pointer-events-none absolute bottom-0 -left-20 will-change-transform">
        <div className="hero-beam-drift h-[450px] w-[450px] rounded-full bg-[var(--elevated,#1a1a1f)] opacity-60 blur-[120px]" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Floating Animated Geometric Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Main Floating Glass Frame */}
        <div ref={frameOuterRef} className="absolute will-change-transform">
          <div className="hero-float-slow h-[380px] w-[260px] rounded-3xl border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface,rgba(255,255,255,0.04))] backdrop-blur-md shadow-2xl">
            <div className="absolute inset-x-6 top-6 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent,#d4af37)] to-transparent opacity-60" />
          </div>
        </div>

        {/* Floating Ring - Left */}
        <div ref={ringOuterRef} className="absolute -left-12 top-1/4 will-change-transform">
          <div className="hero-float-reverse h-48 w-48 rounded-full border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--elevated,rgba(255,255,255,0.03))]/30 backdrop-blur-sm" />
        </div>

        {/* Small Accent Pill - Right */}
        <div ref={pillOuterRef} className="absolute right-16 bottom-1/4 will-change-transform">
          <div className="hero-pulse-glow h-16 w-32 rounded-full border border-[var(--accent,#d4af37)]/30 bg-[var(--accent,#d4af37)]/10 backdrop-blur-sm" />
        </div>
      </div>

      {/* Modern Grid Texture — now with slow drift so it reads as "alive" */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border, rgba(255,255,255,0.08)) 1px, transparent 1px), linear-gradient(to bottom, var(--border, rgba(255,255,255,0.08)) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          backgroundPosition: "0rem 0rem",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
        }}
      />

      {/* Vignette Overlay for Depth — inline gradient, no dependency on a custom utility class */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}