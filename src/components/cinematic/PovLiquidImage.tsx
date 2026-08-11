// components/cinematic/PovLiquidImage.tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface PovLiquidImageProps {
  src: string;
  alt?: string;
}

export function PovLiquidImage({
  src,
  alt = "Studio Showcase",
}: PovLiquidImageProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Follow mouse cursor with a soft glowing spotlight
    overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,90,42,0.15), transparent 40%)`;
  };

  const handleMouseLeave = () => {
    if (!overlayRef.current) return;
    overlayRef.current.style.background = "transparent";
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full w-full min-h-[320px] overflow-hidden rounded-xl bg-neutral-950 cursor-pointer select-none"
    >
      {/* 1. Base Image with Smooth Scale, Grayscale to Full Color Reveal */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority
        className="object-cover grayscale brightness-90 contrast-105 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
      />

      {/* 2. Interactive Spotlight Glow Overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
      />

      {/* 3. Subtle Gradient Vignette for Depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-0" />

      {/* 4. Bottom Corner Badge */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md transition-transform duration-500 group-hover:translate-x-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">
          Interactive View
        </span>
      </div>
    </div>
  );
}