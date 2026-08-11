"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StallTypeSelectorProps {
  items: string[];
}

export function StallTypeSelector({ items }: StallTypeSelectorProps) {
  const [active, setActive] = useState(items[0] || "");

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      {/* 1. Left List Controls - Compact Padding */}
      <div
        role="group"
        aria-label="Common exhibition formats"
        className="border-t border-black/15"
      >
        {items.map((x, i) => {
          const isActive = active === x;
          return (
            <button
              key={x}
              onClick={() => setActive(x)}
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
                {x}
              </span>

              {/* Number Badge */}
              <span className="font-mono text-[11px] font-semibold opacity-50">
                0{i + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Right Preview Display - Compact Height */}
      <div className="relative grid min-h-[220px] place-items-center overflow-hidden rounded-xl border border-black/15 bg-[#d9d2c7]/80 p-6 shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-5 grid place-items-center rounded-lg border border-black/30 bg-black/[0.02] transform-gpu will-change-transform"
          >
            <div className="absolute inset-2 rounded border border-dashed border-black/20 pointer-events-none" />

            {/* Display Label with Text Cutoff Fix */}
            <p className="relative rounded-md bg-[#d9d2c7] px-6 py-2.5 text-center text-xl font-semibold leading-normal tracking-tight text-black shadow-sm pb-1">
              {active}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}