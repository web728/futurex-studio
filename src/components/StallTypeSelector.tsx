"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface StallTypeItem {
  label: string;
  image: string; // path relative to /public, e.g. "/hdri/modular-booth.jpg"
}

interface StallTypeSelectorProps {
  items: StallTypeItem[];
}

export function StallTypeSelector({ items }: StallTypeSelectorProps) {
  const [active, setActive] = useState(items[0]?.label || "");

  const activeItem = items.find((x) => x.label === active) || items[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      {/* 1. Left List Controls - Compact Padding */}
      <div
        role="group"
        aria-label="Common exhibition formats"
        className="border-t border-black/15"
      >
        {items.map((x, i) => {
          const isActive = active === x.label;
          return (
            <button
              key={x.label}
              onClick={() => setActive(x.label)}
              aria-pressed={isActive}
              className={`relative flex w-full items-center justify-between border-b border-black/15 px-3 py-2.5 text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-black/[0.04] text-[var(--accent,#ff5a2a)] font-medium"
                  : "text-black/60 hover:bg-black/[0.02] hover:text-black"
              }`}
            >
              {/* Active Left Pill Accent Indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent,#ff5a2a)]" />
              )}

              {/* Text with Descender Cutoff Fix ('g', 'p', 'y') */}
              <span className="text-sm tracking-tight leading-normal pb-0.5">
                {x.label}
              </span>

              {/* Number Badge */}
              <span className="font-mono text-[11px] font-semibold opacity-50">
                0{i + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Right Preview Display - Image on active click */}
      <div className="relative grid min-h-[220px] place-items-center overflow-hidden rounded-xl border border-black/15 bg-[#d9d2c7]/80 shadow-inner">
      <AnimatePresence mode="wait">
  {activeItem && (
    <motion.div
      key={activeItem.label}
      initial={{ opacity: 0, scale: 0.96, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -4 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-8 overflow-hidden rounded-lg border border-black/20 transform-gpu will-change-transform"
    >
      <Image
        src={activeItem.image}
        alt={activeItem.label}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
        priority
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-10">
        <p className="pb-1 text-base font-semibold leading-normal tracking-tight text-white">
          {activeItem.label}
        </p>
      </div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </div>
  );
}