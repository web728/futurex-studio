// components/ProcessSection.tsx
"use client";

import React from "react";
import { SectionHeader } from "./site";
import { ProcessMotion } from "./motion";


export interface ProcessSectionProps {
  eyebrow?: string;
  title?: string;
  steps?: string[];
}

const DEFAULT_STEPS = [
  "Brief & discovery",
  "Concept development",
  "3D visualisation",
  "Technical planning",
  "Fabrication & production",
  "Installation & execution",
];

export function ProcessSection({
  eyebrow = "The process",
  title = "From brief to build, one coordinated line.",
  steps = DEFAULT_STEPS,
}: ProcessSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0a0b0d] py-24 lg:py-36">
      {/* Background Subtle Mesh Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[160px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Wrapper */}
        <div className="max-w-3xl">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
          />
        </div>

        {/* Process Motion Interactive Sticky Layout */}
        <div className="mt-16 lg:mt-24">
          <ProcessMotion steps={steps} />
        </div>

      </div>
    </section>
  );
}