"use client";
import { useEffect, useState, useRef } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/site";
import { projectMedia } from "@/data/site-images";
import Image from "next/image";
import Link from "next/link";
import { motion as motionCursor, useMotionValue, useSpring } from "framer-motion";


export function FAQAccordion({ items }: { items: string[][] }) {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="border-t border-white/15">
      {items.map((x, i) => (
        <div key={x[0]} className="border-b border-white/15">
          <button
            className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold"
            aria-expanded={active === i}
            onClick={() => setActive(active === i ? null : i)}
          >
            {x[0]}
            <Plus
              className={`shrink-0 transition ${active === i ? "rotate-45" : ""}`}
            />
          </button>
          {active === i && (
            <p className="max-w-3xl pb-7 leading-7 text-white/60">{x[1]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function ServiceRail({
  items,
}: {
  items: { slug: string; title: string; number: string }[];
}) {
  const [active, setActive] = useState(items[0]?.slug);
  useEffect(() => {
    const observers = items.map((item) => {
      const el = document.getElementById(item.slug);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.slug);
        },
        { rootMargin: "-35% 0px -55%" },
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [items]);
  return (
    <nav
      aria-label="Service sections"
      className="sticky top-20 z-30 overflow-x-auto border-y border-white/10 bg-[#0b0c0d]/90 backdrop-blur-xl"
    >
      <div className="container flex min-w-max">
        {items.map((x) => (
          <a
            key={x.slug}
            href={`#${x.slug}`}
            aria-current={active === x.slug ? "location" : undefined}
            className={`flex items-center gap-2 border-r border-white/10 px-5 py-4 text-xs transition ${active === x.slug ? "text-[var(--accent)]" : "text-white/45 hover:text-white"}`}
          >
            <span>{x.number}</span>
            <span>{x.title}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}





const PREVIEW_W = 288;
const PREVIEW_H = 200;

export function CursorFollowProjectList({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 320, damping: 32, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 320, damping: 32, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - PREVIEW_W / 2);
    mouseY.set(e.clientY - rect.top - PREVIEW_H / 2);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(null)}
      className="relative overflow-hidden border-t border-white/15"
    >
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/portfolio/${project.slug}`}
          onMouseEnter={() => setActiveIndex(index)}
          className="group relative z-10 grid grid-cols-[3rem_1fr_auto] items-center gap-5 border-b border-white/15 py-6"
        >
          <span
            className={`text-xs transition-colors duration-300 ${
              activeIndex === index ? "text-[var(--accent)]" : "text-white/40"
            }`}
          >
            0{index + 1}
          </span>
          <span
            className={`display text-2xl font-semibold transition-all duration-300 group-hover:translate-x-2 ${
              activeIndex !== null && activeIndex !== index
                ? "opacity-35"
                : "opacity-100"
            }`}
          >
            {project.title}
          </span>
          <span className="text-sm text-white/45 transition group-hover:text-white">
            View project →
          </span>
        </Link>
      ))}

      <motion.div
        style={{
          x: springX,
          y: springY,
          width: PREVIEW_W,
          height: PREVIEW_H,
        }}
        animate={{
          opacity: activeIndex !== null ? 1 : 0,
          scale: activeIndex !== null ? 1 : 0.85,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-0 top-0 z-0 overflow-hidden rounded-xl shadow-2xl"
      >
        {activeIndex !== null && (
          <Image
            src={projects[activeIndex].thumbnailImage}
            alt={projectMedia[projects[activeIndex].slug].thumbnail.alt}
            fill
            sizes={`${PREVIEW_W}px`}
            className="object-cover"
          />
        )}
      </motion.div>
    </div>
  );
}