"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface StallTypeItem {
  label: string;
  image: string; // path relative to /public, e.g. "/hdri/modular.jfif"
}

interface StallTypeSelectorProps {
  items: StallTypeItem[];
}

export function StallTypeSelector({ items }: StallTypeSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
      
      {/* 1. Left List Controls (5 Columns) */}
      <div
        role="tablist"
        aria-label="Common exhibition formats"
        className="divide-y divide-black/10 rounded-2xl border border-black/15 bg-[#dad3c8]/60 p-2 shadow-sm backdrop-blur-sm lg:col-span-5"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-lg"
                  : "text-black/70 hover:bg-black/5 hover:text-black"
              }`}
            >
              {/* Left Accent Dot & Title */}
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--accent,#ff5a2a)] shadow-[0_0_8px_rgba(255,90,42,0.8)]"
                      : "bg-black/20 group-hover:bg-black/40"
                  }`}
                />
                <span className="text-sm font-bold tracking-tight sm:text-base">
                  {item.label}
                </span>
              </div>

              {/* Index Number & Action Arrow */}
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs font-bold transition-colors ${
                    isActive ? "text-[var(--accent,#ff5a2a)]" : "text-black/35"
                  }`}
                >
                  0{index + 1}
                </span>
                
                <ArrowUpRight
                  size={16}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "text-[var(--accent,#ff5a2a)] translate-x-0.5 -translate-y-0.5"
                      : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Right Interactive Preview Frame (7 Columns) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/15 bg-[#121416] shadow-2xl lg:col-span-7">
        
        {/* Smooth Crossfade Image Stack (Zero Frame Lag) */}
        {items.map((item, index) => {
          const isCurrent = activeIndex === index;

          return (
            <div
              key={item.label}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                isCurrent
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority={index === 0}
              />
              
              {/* Bottom Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            </div>
          );
        })}

        {/* Bottom Floating Glass Details Badge */}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-5 py-3.5 backdrop-blur-md">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent,#ff5a2a)]">
              FORMAT SPECIFICATION
            </span>
            <p className="mt-0.5 text-base font-bold text-white">
              {items[activeIndex]?.label}
            </p>
          </div>

          <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] font-bold text-white/80">
            0{activeIndex + 1} / 0{items.length}
          </span>
        </div>

      </div>

    </div>
  );
}