"use client";

import { useState, useEffect, useRef, useTransition, useCallback, memo, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Sparkles,
  Layers,
  Box,
  Compass,
  Maximize2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ExtendedProject {
  slug: string;
  title: string;
  category: string;
  thumbnailImage: string;
  [key: string]: any;
}

interface PortfolioProps {
  projects: ExtendedProject[];
}

// Architectural SVG Background Accent Grid Component
function SpatialArchitecturalGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-25 select-none">
      {/* Structural SVG Grid Pattern */}
      <svg className="absolute h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
        <defs>
          <pattern id="arch-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse" x="50%" y="-1">
            <path d="M.5 60V.5H60" fill="none" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#arch-grid-pattern)" />
      </svg>

   

      <div className="absolute bottom-20 right-10 hidden xl:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="text-white/15">
          <circle cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="110" cy="110" r="60" stroke="currentColor" strokeWidth="1" />
          <line x1="110" y1="0" x2="110" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="0" y1="110" x2="220" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
    </div>
  );
}

// Memoized Premium Card Component
const PortfolioCard = memo(({ 
  project, 
  idx, 
  openLightbox, 
  setCursorHovered, 
  setCursorText 
}: {
  project: ExtendedProject;
  idx: number;
  openLightbox: (idx: number) => void;
  setCursorHovered: (val: boolean) => void;
  setCursorText: (val: string) => void;
}) => {
  const parallaxSpeed = 0.02 + (idx % 3) * 0.02;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: idx * 0.04, ease: "easeOut" }}
      data-gallery-item
      data-parallax={parallaxSpeed}
      className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3] bg-neutral-900/80 border border-white/10 shadow-2xl transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
      onClick={() => openLightbox(idx)}
      onMouseEnter={() => {
        setCursorHovered(true);
        setCursorText("Expand");
      }}
      onMouseLeave={() => setCursorHovered(false)}
    >
      <InteractiveTiltCard className="h-full w-full">
        <div data-card-inner className="relative h-full w-full overflow-hidden">
          
       

          {/* Optimized Next Image */}
          <Image
            src={project.thumbnailImage}
            alt={project.title || "Exhibition Spatial Design"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={idx < 4}
            loading={idx < 4 ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:filter group-hover:contrast-[1.05]"
          />

          {/* Cinematic Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

          {/* Bottom Card Meta Details */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 flex flex-col justify-end translate-y-1 transition-transform duration-300 ease-out group-hover:translate-y-0">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase font-semibold tracking-[0.2em] text-[var(--accent)]">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-black group-hover:border-transparent">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          </div>

        </div>
      </InteractiveTiltCard>
    </motion.div>
  );
});

PortfolioCard.displayName = "PortfolioCard";

export function CinematicPortfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Extract Unique Categories Cleanly
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return ["All", ...cats];
  }, [projects]);

  // Filtered List
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // Lightbox Handlers
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % filteredProjects.length);
  }, [selectedIndex, filteredProjects.length]);

  const prevImage = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + filteredProjects.length) % filteredProjects.length);
  }, [selectedIndex, filteredProjects.length]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section className="relative min-h-screen bg-[var(--background,#0b0c0d)] py-16 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white lg:py-24">
      
      {/* Ambient Accent Radial Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.06)_0%,transparent_75%)] blur-[150px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        
        {/* Top Filter Bar & Counter */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[var(--border,rgba(241,239,233,0.1))] pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Curation Index</span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--text,#f1efe9)] sm:text-3xl lg:text-4xl">
              Spatial Exhibits
            </h2>
          </div>

          {/* Minimal Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[var(--accent,#ff5a2a)] text-black shadow-[0_0_15px_rgba(255,90,42,0.35)]"
                      : "border border-[var(--border,rgba(241,239,233,0.1))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] hover:border-[var(--accent,#ff5a2a)]/40 hover:text-[var(--text,#f1efe9)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Performance Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredProjects.map((project, idx) => {
            const imgSrc = project.thumbnailImage || project.image || "/gallery/project-1.jpg";

            return (
              <article
                key={project.slug || idx}
                onClick={() => openLightbox(idx)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-1 shadow-lg"
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070809]">
                  <Image
                    src={imgSrc}
                    alt={project.title || "Exhibition Project"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background,#0b0c0d)]/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                  

                  {/* Corner Expand Action Icon */}
                  <div className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                    <ArrowUpRight size={14} />
                  </div>
                </div>


              </article>
            );
          })}
        </div>

      </div>

      {/* Lightweight Instant Lightbox Modal */}
      {selectedIndex !== null && filteredProjects[selectedIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 select-none"
        >
          {/* Header Controls */}
          <div
            className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[var(--accent,#ff5a2a)]">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredProjects.length).padStart(2, "0")}
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
                {filteredProjects[selectedIndex].category}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-95 sm:left-8"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-95 sm:right-8"
          >
            <ChevronRight size={20} />
          </button>

          {/* Modal Image Box */}
          <div
            className="relative flex max-h-[82vh] max-w-5xl flex-col items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                filteredProjects[selectedIndex].thumbnailImage ||
                filteredProjects[selectedIndex].image ||
                "/gallery/project-1.jpg"
              }
              alt={filteredProjects[selectedIndex].title}
              className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                {filteredProjects[selectedIndex].title}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-widest text-[var(--accent,#ff5a2a)]">
                {filteredProjects[selectedIndex].category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 3D Tilt Card Container
function InteractiveTiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}