"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { motionTokens } from "./tokens";

export function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.12);
    y.set((e.clientY - r.top - r.height / 2) * 0.12);
  };
  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={motionTokens.spring}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
