"use client";

import { useState, useEffect, useRef, useTransition, useCallback, memo } from "react";
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
    const categories = [
      "All",
      ...Array.from(new Set(projects.map((project) => project.category))),
    ];
    const [activeCategory, setActiveCategory] = useState("All");
    const [, startTransition] = useTransition();

    const filteredProjects =
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [zoomScale, setZoomScale] = useState<number>(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [cursorHovered, setCursorHovered] = useState(false);
    const [cursorText, setCursorText] = useState("");

    const sectionRef = useRef<HTMLDivElement>(null);
    const galleryGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleCategoryChange = (cat: string) => {
      startTransition(() => {
        setActiveCategory(cat);
      });
    };

    useEffect(() => {
      if (!galleryGridRef.current) return;

      const ctx = gsap.context(() => {
        const items = galleryGridRef.current?.querySelectorAll("[data-gallery-item]");
        if (!items || items.length === 0) return;

        items.forEach((item) => {
          const speed = parseFloat(item.getAttribute("data-parallax") || "0.05");
          const cardInner = item.querySelector("[data-card-inner]");

          if (cardInner) {
            gsap.to(cardInner, {
              y: () => -15 * speed,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }, [filteredProjects]);

    const openLightbox = useCallback((index: number) => {
      setSelectedIndex(index);
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    }, []);

    const closeLightbox = useCallback(() => {
      setSelectedIndex(null);
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
      document.body.style.overflow = "";
    }, []);

    const nextImage = useCallback(() => {
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => ((prev! + 1) % filteredProjects.length));
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
    }, [selectedIndex, filteredProjects.length]);

    const prevImage = useCallback(() => {
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev! - 1 + filteredProjects.length) % filteredProjects.length);
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
    }, [selectedIndex, filteredProjects.length]);

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

    const toggleZoom = () => {
      if (zoomScale > 1) {
        setZoomScale(1);
        setPanPosition({ x: 0, y: 0 });
      } else {
        setZoomScale(2);
      }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (zoomScale <= 1) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    };

    const handleMouseMovePan = (e: React.MouseEvent) => {
      if (!isDragging || zoomScale <= 1) return;
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUpPan = () => {
      setIsDragging(false);
    };

    const handlePointerMoveScreen = (e: React.PointerEvent) => {
      if (isTouchDevice) return;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    return (
      <section
        ref={sectionRef}
        onPointerMove={handlePointerMoveScreen}
        className="relative min-h-screen bg-[#070809] text-white py-20 lg:py-32 overflow-hidden selection:bg-[var(--accent)] selection:text-black"
      >
        {/* Architectural Background Grid Layer */}
        <SpatialArchitecturalGrid />

        {/* Custom Dynamic Cursor */}
        {!isTouchDevice && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50 rounded-full flex items-center justify-center font-mono text-[10px] tracking-widest uppercase font-bold text-black bg-[var(--accent,white)] shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            animate={{
              x: cursorPos.x - (cursorHovered ? 40 : 8),
              y: cursorPos.y - (cursorHovered ? 40 : 8),
              width: cursorHovered ? 80 : 16,
              height: cursorHovered ? 80 : 16,
              opacity: cursorPos.x < 0 ? 0 : 1,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.4 }}
          >
            {cursorHovered && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 text-center"
              >
                {cursorText || "View"}
              </motion.span>
            )}
          </motion.div>
        )}

        {/* Glow Orbs for Ambiance */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-48 h-[500px] w-[500px] rounded-full bg-[var(--accent)]/[0.04] blur-[140px]" />
          <div className="absolute bottom-1/4 -right-48 h-[600px] w-[600px] rounded-full bg-blue-600/[0.03] blur-[160px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section with Geometric Accent Line */}
          <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs uppercase font-mono tracking-[0.25em] text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>SPATIAL ENVIRONMENT ARCHIVE</span>
              </div>
              <h2 className="display text-3xl font-black tracking-tight sm:text-6xl lg:text-5xl">
                Exhibition Work
              </h2>
            </div>

            {/* Clean Category Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    onMouseEnter={() => {
                      setCursorHovered(true);
                      setCursorText("Filter");
                    }}
                    onMouseLeave={() => setCursorHovered(false)}
                    className={`relative px-4 py-2 rounded-full text-xs uppercase font-mono tracking-wider font-semibold transition-all duration-300 border ${
                      isActive
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean, Gapless Uniform Grid Layout (3-Column Desktop, 2-Column Tablet) */}
          <div
            ref={galleryGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <PortfolioCard
                  key={project.slug || idx}
                  project={project}
                  idx={idx}
                  openLightbox={openLightbox}
                  setCursorHovered={setCursorHovered}
                  setCursorText={setCursorText}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && filteredProjects[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl select-none"
              onClick={closeLightbox}
            >
              <div
                className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-white/50">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                  </span>
                  <span className="hidden sm:inline-block h-3 w-[1px] bg-white/20" />
                  <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                    {filteredProjects[selectedIndex].category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleZoom}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/20"
                  >
                    {zoomScale > 1 ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-colors hover:bg-white/30"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-black"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-black"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div
                className="relative h-full w-full max-w-7xl max-h-[85vh] p-4 sm:p-10 flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={filteredProjects[selectedIndex].slug || selectedIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onDoubleClick={toggleZoom}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMovePan}
                  onMouseUp={handleMouseUpPan}
                  onMouseLeave={handleMouseUpPan}
                  className={`relative max-h-full max-w-full overflow-hidden rounded-md ${
                    zoomScale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: zoomScale,
                      x: panPosition.x,
                      y: panPosition.y,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="relative max-h-[75vh] w-auto h-auto flex items-center justify-center"
                  >
                    <img
                      src={filteredProjects[selectedIndex].thumbnailImage}
                      alt={filteredProjects[selectedIndex].title || "Project preview"}
                      className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl rounded"
                      draggable={false}
                    />
                    
                  </motion.div>
                </motion.div>

                <div className="mt-6 text-center">
                  <h3 className="display text-2xl font-bold tracking-tight text-white">
                    {filteredProjects[selectedIndex].title}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-white/50 tracking-wider uppercase">
                    {filteredProjects[selectedIndex].category}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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