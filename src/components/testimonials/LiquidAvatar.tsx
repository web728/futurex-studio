import React from "react";
import { LiquidAvatarProps } from "./types";

export function LiquidAvatar({ src, alt }: LiquidAvatarProps) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}