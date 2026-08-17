"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Layers, Compass, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  description: string;
  includes: string[];
}

interface ServicesListProps {
  services: ServiceItem[];
  serviceIcons: React.ComponentType<{ size?: number; className?: string }>[];
}

export function ServicesListSection({ services, serviceIcons }: ServicesListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ---------- DESKTOP: Original sticky-stack scroll effect (EXACT SAME UNCHANGED) ----------
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        if (!isDesktop) return;

        const ctx = gsap.context(() => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            if (i === services.length - 1) return;

            gsap.to(card, {
              scale: 0.92,
              opacity: 0.6,
              ease: "power1.out",
              scrollTrigger: {
                trigger: card,
                start: "top 120px",
                end: "bottom 120px",
                scrub: 0.3,
                invalidateOnRefresh: true,
              },
            });
          });
        }, containerRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [services.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 px-4 border-y border-dashed border-white/10 bg-[var(--background,#0b0c0d)] text-[var(--text,#f1efe9)] sm:py-20 overflow-x-clip"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[160px]" />

      {/* Section Header */}
      <div className="max-w-2xl mx-auto mb-10 relative z-10 text-center sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--surface,rgba(255,255,255,0.03))] px-3.5 py-1">
          <Layers size={13} className="text-[var(--accent,#ff5a2a)]" />
          <span className="text-xs font-mono uppercase tracking-wider">Services</span>
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Six disciplines, one accountable team.
        </h2>

        <div className="mt-5 mx-auto h-[2px] w-14 rounded-full bg-[var(--accent,#ff5a2a)] shadow-[0_0_10px_rgba(255,90,42,0.5)]" />
      </div>

      {/* ---------------- DESKTOP: sticky stacking cards (Original Unchanged) ---------------- */}
      <div className="hidden max-w-3xl mx-auto relative z-10 space-y-10 lg:block">
        {services.map((s, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];

          return (
            <div
              key={s.slug}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="sticky top-28 transform-gpu will-change-transform"
              style={{ top: `calc(100px + ${i} * 20px)` }}
            >
              <ServiceCard s={s} i={i} Icon={Icon} />
            </div>
          );
        })}
      </div>

      {/* ---------------- MOBILE / TABLET: Premium swipeable card deck ---------------- */}
      <div className="lg:hidden">
        <MobileSwipeDeck services={services} serviceIcons={serviceIcons} />
      </div>
    </div>
  );
}

/* ============================================================
   Shared card markup (Desktop and Mobile styling)
   ============================================================ */
function ServiceCard({
  s,
  i,
  Icon,
}: {
  s: ServiceItem;
  i: number;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <article
      id={s.slug}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e10]/95 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/40 sm:p-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 lg:p-10"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--accent,#ff5a2a)]/10 blur-xl group-hover:bg-[var(--accent,#ff5a2a)]/20 transition-all duration-500" />

      {/* Watermark Number */}
      <span className="pointer-events-none absolute right-3 top-0 select-none font-mono text-5xl font-extrabold leading-none text-white/[0.03] group-hover:text-[var(--accent,#ff5a2a)]/[0.08] sm:right-6 sm:top-2 sm:text-8xl lg:text-9xl transition-colors duration-300">
        {s.number}
      </span>

      {/* Left Column */}
      <div className="relative z-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] sm:text-xs">
              <span className="font-semibold text-[var(--accent,#ff5a2a)]">
                {s.number}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="uppercase tracking-wider text-white/40">
                Module 0{i + 1}
              </span>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black sm:h-10 sm:w-10">
              {Icon && <Icon size={18} />}
            </div>
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:mt-5 sm:text-3xl lg:text-4xl">
            {s.title}
          </h3>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-base">
          {s.description}
        </p>
      </div>

      {/* Right Column - Deliverables */}
      <div className="relative z-10 mt-4 border-t border-white/10 pt-3.5 sm:mt-6 sm:pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
        <h4 className="mb-2 flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/40">
          <Compass size={12} className="text-[var(--accent,#ff5a2a)]" />
          Deliverables & Key Assets
        </h4>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {s.includes.map((x) => (
            <div
              key={x}
              className="group/card relative flex min-h-[54px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.02] p-2.5 backdrop-blur-md transition-all duration-200 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-white/[0.05]"
            >
              <span className="text-xs font-medium text-white/90 line-clamp-1">{x}</span>

              <div className="mt-1 flex items-center justify-between border-t border-white/5 pt-1">
                <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-white/30 group-hover/card:text-[var(--accent,#ff5a2a)]">
                  VERIFIED
                </span>
                <ArrowUpRight
                  size={12}
                  className="text-white/30 transition-all duration-200 group-hover/card:text-[var(--accent,#ff5a2a)] group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   Mobile Swipe Deck (Slight Rotated Dynamic Visual Angle)
   ============================================================ */
function MobileSwipeDeck({
  services,
  serviceIcons,
}: {
  services: ServiceItem[];
  serviceIcons: React.ComponentType<{ size?: number; className?: string }>[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragState = useRef({ startX: 0, dragging: false, deltaX: 0 });
  const animating = useRef(false);

  const total = services.length;

  const stackOrder = useCallback(
    (count: number) => {
      const arr: number[] = [];
      for (let k = 0; k < Math.min(count, total); k++) {
        arr.push((activeIndex + k) % total);
      }
      return arr;
    },
    [activeIndex, total]
  );

  const layoutStack = useCallback(() => {
    const order = stackOrder(3);
    order.forEach((idx, depth) => {
      const el = cardRefs.current[idx];
      if (!el) return;

      // Depth tilt rotation gives natural stacked deck effect
      const tiltDegree = depth === 0 ? 0 : depth % 2 === 1 ? 3.5 : -3.5;

      gsap.to(el, {
        x: 0,
        y: depth * 12,
        scale: 1 - depth * 0.04,
        rotate: tiltDegree,
        opacity: depth === 2 ? 0.4 : 1 - depth * 0.2,
        zIndex: 10 - depth,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    services.forEach((_, idx) => {
      if (!order.includes(idx)) {
        const el = cardRefs.current[idx];
        if (el) gsap.set(el, { opacity: 0, zIndex: 0 });
      }
    });
  }, [services, stackOrder]);

  useEffect(() => {
    layoutStack();
  }, [layoutStack]);

  const goTo = useCallback(
    (direction: "left" | "right") => {
      if (animating.current) return;
      animating.current = true;

      const currentEl = cardRefs.current[activeIndex];
      const exitX = direction === "left" ? -window.innerWidth * 0.85 : window.innerWidth * 0.85;
      const exitRotate = direction === "left" ? -12 : 12;

      if (currentEl) {
        gsap.to(currentEl, {
          x: exitX,
          rotate: exitRotate,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(currentEl, { x: 0, rotate: 0 });
            setActiveIndex((prev) => (prev + 1) % total);
            animating.current = false;
          },
        });
      } else {
        setActiveIndex((prev) => (prev + 1) % total);
        animating.current = false;
      }
    },
    [activeIndex, total]
  );

  const goBack = useCallback(() => {
    if (animating.current) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (animating.current) return;
    dragState.current.dragging = true;
    dragState.current.startX = e.clientX;
    dragState.current.deltaX = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    dragState.current.deltaX = delta;
    const el = cardRefs.current[activeIndex];
    if (el) {
      gsap.set(el, {
        x: delta,
        rotate: delta / 18,
      });
    }
  };

  const onPointerUp = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;

    const delta = dragState.current.deltaX;
    const threshold = 70;
    const el = cardRefs.current[activeIndex];

    if (delta < -threshold) {
      goTo("left");
    } else if (delta > threshold) {
      goTo("right");
    } else if (el) {
      gsap.to(el, { x: 0, rotate: 0, duration: 0.25, ease: "power2.out" });
    }
  };

  return (
    <div className="max-w-sm mx-auto relative z-10 px-1">
      <div className="relative min-h-[415px]">
        {services.map((s, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          const isTop = i === activeIndex;

          return (
            <div
              key={s.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 touch-pan-y transform-gpu"
              style={{
                cursor: isTop ? "grab" : "default",
                pointerEvents: isTop ? "auto" : "none",
              }}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <ServiceCard s={s} i={i} Icon={Icon} />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={goBack}
          aria-label="Previous service"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all active:scale-95 active:border-[var(--accent,#ff5a2a)]"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {services.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-4 bg-[var(--accent,#ff5a2a)]"
                  : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo("left")}
          aria-label="Next service"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all active:scale-95 active:border-[var(--accent,#ff5a2a)]"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="mt-2.5 text-center font-mono text-[10px] tracking-wider uppercase text-white/30">
        Swipe card left or right
      </p>
    </div>
  );
}