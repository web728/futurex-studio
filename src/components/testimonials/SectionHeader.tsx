import React from "react";
import { SectionHeaderProps } from "./types";

export function SectionHeader({ eyebrow, title, copy }: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="eyebrow inline-block font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent,#3b82f6)]">
        {eyebrow}
      </span>
      <h2 className="title mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="copy mt-4 text-base leading-relaxed text-white/60">
        {copy}
      </p>
    </div>
  );
}