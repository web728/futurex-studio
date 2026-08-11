"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface PrincipleItem {
  icon: LucideIcon;
  title: string;
  copy: string;
}

interface HowWeWorkSectionProps {
  principles: PrincipleItem[];
}

export function HowWeWorkSection({ principles }: HowWeWorkSectionProps) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0b0d] py-12 lg:py-20 text-white">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -left-28 top-1/4 h-[300px] w-[300px] rounded-full bg-[var(--accent,#ff5a2a)]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-28 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[130px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent,#ff5a2a)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[var(--accent,#ff5a2a)]" />
            <span>How we work</span>
          </div>

          <h2 className="display mt-3 text-[clamp(1.8rem,3.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight text-white">
            Collaborative where it matters.{" "}
            <span className="text-[var(--accent,#ff5a2a)]">
              Decisive when it counts.
            </span>
          </h2>
        </motion.div>

        {/* Interactive 3D Glass Cards Grid - Tight & Dense */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {principles.map((principle, index) => (
            <Glass3DCard
              key={principle.title}
              item={principle}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Glass3DCard({
  item,
  index,
}: {
  item: PrincipleItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth & Refined 3D Spring Physics
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig
  );

  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  // Dynamic Radial Spotlight
  const backgroundRadial = useMotionTemplate`radial-gradient(350px circle at ${spotlightX}% ${spotlightY}%, rgba(255, 90, 42, 0.15), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="perspective-1000"
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 lg:p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:shadow-[0_12px_30px_rgba(255,90,42,0.12)]"
      >
        {/* Dynamic Cursor Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: backgroundRadial }}
        />

        {/* Top-Left Ambient Accent Glow */}
        <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-full w-full bg-gradient-to-b from-[var(--accent,#ff5a2a)]/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

        {/* Watermark Index Number */}
        <span
          style={{ transform: "translateZ(10px)" }}
          className="absolute -right-1 -top-4 select-none font-mono text-7xl font-extrabold text-white/[0.03] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]/12"
        >
          0{index + 1}
        </span>

        {/* Icon Container */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="relative inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] p-3 text-[var(--accent,#ff5a2a)] shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)]/50 group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,90,42,0.5)]"
        >
          <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Card Title */}
        <h3
          style={{ transform: "translateZ(20px)" }}
          className="relative mt-5 text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-white"
        >
          {item.title}
        </h3>

        {/* Card Description */}
        <p
          style={{ transform: "translateZ(10px)" }}
          className="relative mt-2 text-xs leading-relaxed text-white/60 transition-colors duration-200 group-hover:text-white/80 sm:text-sm"
        >
          {item.copy}
        </p>

        {/* Footer Pill Tag */}
        <div 
          style={{ transform: "translateZ(15px)" }}
          className="relative mt-5 flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[var(--accent,#ff5a2a)] opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] animate-ping" />
          <span>PRINCIPLE 0{index + 1}</span>
        </div>
      </motion.article>
    </motion.div>
  );
}