"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilityFeature {
  id: string;
  badge: string;
  title: string;
  description: string;
  statNumber: string;
  statLabel: string;
}

const defaultCapabilities: CapabilityFeature[] = [
  {
    id: "speed",
    badge: "Execution Speed",
    title: "Zero-Delay On-Site Deployment",
    description:
      "Precision pre-fabrication combined with modular rapid-assembly protocols ensures seamless delivery before exhibition deadlines.",
    statNumber: "< 12h",
    statLabel: "Average Setup Time",
  },
  {
    id: "quality",
    badge: "Material Standards",
    title: "Surgical Attention to Details",
    description:
      "Premium tactile finishes, structural frames, and flawless illumination engineered for maximum structural integrity.",
    statNumber: "100%",
    statLabel: "QC Inspection Pass Rate",
  },
  {
    id: "scale",
    badge: "Global Scalability",
    title: "Adaptive Modular Footprints",
    description:
      "From compact 9m² shells to massive multi-tier 500m² pavilions, our design system retains high visual impact.",
    statNumber: "20+",
    statLabel: "Pavilions Built",
  },
];

/* ============================================================================
   Interactive 3D Card Component (Compact Layout + Mouse Spotlight)
   ============================================================================ */
function InteractiveCapabilityCard({
  item,
  idx,
}: {
  item: CapabilityFeature;
  idx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="promise-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-5 backdrop-blur-lg transition-colors duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--elevated)] perspective-1000 lg:p-6"
    >
      {/* 1. Dynamic Mouse Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,90,42,0.06), transparent 80%)",
        }}
      />

      {/* 2. Glass Specular Highlight Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(255,255,255,0.02) 100%)",
          translateX: useTransform(x, [-0.5, 0.5], [-15, 15]),
          translateY: useTransform(y, [-0.5, 0.5], [-15, 15]),
        }}
      />

      {/* 3. Watermark Index */}
      <span
        className="font-display pointer-events-none absolute -right-1 top-0 select-none text-[6.5rem] font-bold leading-none text-[var(--text)]/[0.015] transition-colors duration-300 group-hover:text-[var(--accent)]/10"
        style={{ transform: "translateZ(-10px)" }}
      >
        0{idx + 1}
      </span>

      {/* 4. Top Content */}
      <div className="relative z-20" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--accent)]">
            <Zap size={10} />
            {item.badge}
          </span>

          <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        </div>

        {/* Title with Descender Cutoff Fix */}
        <h3 className="card-title font-display mt-4 text-lg font-semibold leading-snug tracking-tight text-[var(--text)] sm:text-xl pb-0.5">
          {item.title}
        </h3>

        <p className="card-desc mt-2 text-xs leading-relaxed text-[var(--secondary)] font-normal opacity-90 sm:text-sm">
          {item.description}
        </p>
      </div>

      {/* 5. Bottom Stat Block */}
      <div
        className="relative z-20 mt-6 border-t border-[var(--border)] pt-4"
        style={{ transform: "translateZ(10px)" }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <span className="stat-number font-display text-3xl font-semibold text-[var(--text)] sm:text-4xl">
              {item.statNumber}
            </span>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
              {item.statLabel}
            </p>
          </div>

          <MagneticWrapper>
            <div className="rounded-full border border-[var(--border)] bg-[var(--background)] p-2.5 text-[var(--secondary)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
              <ArrowRight size={15} />
            </div>
          </MagneticWrapper>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   Magnetic Wrapper Component
   ============================================================================ */
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================================
   Main Section Component (Compact execution)
   ============================================================================ */
export function ExecutionPromiseSection({
  customCapabilities,
}: {
  customCapabilities?: CapabilityFeature[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);

  const list = customCapabilities || defaultCapabilities;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
      const splitHeading = new SplitType(headingRef.current, {
  types: ["chars", "words"],
});

        if (splitHeading.chars) {
          gsap.from(splitHeading.chars, {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 30,
            stagger: 0.015,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      }

      if (svgLinesRef.current) {
        gsap.to(svgLinesRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
          yPercent: -12,
          ease: "none",
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".promise-card");
      cards.forEach((card) => {
        const statNumber = card.querySelector(".stat-number");
        if (statNumber) {
          const targetValue = statNumber.textContent || "";
          if (targetValue.includes("%")) {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: 100,
              scrollTrigger: { trigger: card, start: "top 85%" },
              duration: 1.8,
              ease: "expo.out",
              onUpdate: () => {
                statNumber.textContent = `${Math.round(obj.value)}%`;
              },
            });
          } else if (targetValue.includes("+")) {
            const numericValue = parseInt(targetValue, 10) || 0;
            const obj = { value: 0 };
            gsap.to(obj, {
              value: numericValue,
              scrollTrigger: { trigger: card, start: "top 85%" },
              duration: 1.8,
              ease: "expo.out",
              onUpdate: () => {
                statNumber.textContent = `${Math.round(obj.value)}+`;
              },
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[var(--background)] py-14 text-[var(--text)] font-body lg:py-20"
    >
      {/* Background Glow & SVGs */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[120px]" />

      <svg
        ref={svgLinesRef}
        className="pointer-events-none absolute inset-0 h-[115%] w-full opacity-20 transform-gpu will-change-transform"
        viewBox="0 0 1440 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 200 H1540 M-100 400 H1540 M-100 600 H1540 M-100 800 H1540"
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="6 10"
        />
        <path
          d="M200 -100 V1100 M400 -100 V1100 M600 -100 V1100 M800 -100 V1100 M1000 -100 V1100 M1200 -100 V1100"
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="6 10"
        />
        <circle cx="400" cy="400" r="3" fill="var(--accent)" className="animate-pulse" />
        <circle cx="800" cy="600" r="3" fill="var(--accent)" className="animate-pulse" />
        <circle cx="1000" cy="200" r="3" fill="var(--accent)" className="animate-pulse" />
      </svg>

      <div className="noise pointer-events-none absolute inset-0 opacity-15" />

      {/* Main Content Area */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 backdrop-blur-md">
              <Sparkles size={13} className="text-[var(--accent)] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--accent)]">
                Operational Excellence
              </span>
            </div>

            {/* Heading with Descender Fix */}
            <h2
              ref={headingRef}
              className="font-display mt-3 text-3xl font-semibold leading-snug tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl pb-1"
            >
              Engineered to perform. <br />
              <span className="text-[var(--secondary)] font-light">
                Built to captivate.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end md:max-w-xs">
            <p className="text-xs leading-relaxed text-[var(--secondary)] font-light opacity-90 sm:text-sm">
              We bridge conceptual architectural design with rigorous engineering
              guarantees—giving your brand an unmissable physical presence on the show floor.
            </p>
            <div className="mt-3 h-[1px] w-16 bg-[var(--accent)] rounded-full shadow-[0_0_8px_rgba(255,90,42,0.4)]" />
          </div>
        </div>

        {/* Bento Cards Grid */}
        <div
          ref={containerRef}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {list.map((item, idx) => (
            <InteractiveCapabilityCard key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* Compact Guarantee Banner */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/30 p-1.5 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-between gap-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:p-6 sm:gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] shadow-inner">
                <Shield size={22} />
              </div>
              <div>
                <h4 className="font-display text-base font-semibold text-[var(--text)] sm:text-lg">
                  100% Turnkey Delivery Guarantee
                </h4>
                <p className="mt-0.5 text-xs text-[var(--secondary)] font-light leading-relaxed max-w-xl">
                  Full logistics, build-up, electrical compliance, and post-event
                  dismantle included. We assume total operational responsibility.
                </p>
              </div>
            </div>

            <MagneticWrapper>
              <a
                href="/contact"
                className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(255,90,42,0.25)]"
              >
                <span className="relative z-10">Start Project Brief</span>
                <ArrowRight
                  size={14}
                  className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}