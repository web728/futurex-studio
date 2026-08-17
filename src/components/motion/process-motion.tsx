"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function ProcessMotion({ steps }: { steps: string[] }) {
  const [active, setActive] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const rightCardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!mainContainerRef.current || !leftPanelRef.current) return;

      // matchMedia ensures pinning ONLY runs on desktop (lg breakpoint = 1024px),
      // matching the lg:grid-cols-12 layout. On mobile the columns stack, so
      // pinning the left panel there was causing it to overlap/jump over
      // the right column instead of just scrolling normally.
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          const cardTriggers: ScrollTrigger[] = [];
          let pinTrigger: ScrollTrigger | null = null;

          if (isDesktop) {
            // 1. PIN THE LEFT SIDE — desktop only
            pinTrigger = ScrollTrigger.create({
              trigger: mainContainerRef.current,
              start: "top 15%",
              end: "bottom 85%",
              pin: leftPanelRef.current,
              anticipatePin: 1,
              pinSpacing: false,
              markers: false,
            });
          }

          // 2. DETECT ACTIVE STEP during scrolling — runs on both, but
          // thresholds are gentler on mobile since the left summary card
          // sits above the steps instead of being pinned beside them.
          rightCardsRefs.current.forEach((card, index) => {
            if (!card) return;

            const trigger = ScrollTrigger.create({
              trigger: card,
              start: isDesktop ? "top center+=100" : "top 75%",
              end: isDesktop ? "bottom center+=100" : "bottom 25%",
              onToggle: (self) => {
                if (self.isActive) {
                  setActive(index);
                }
              },
              markers: false,
            });
            cardTriggers.push(trigger);
          });

          // cleanup for this matchMedia branch (runs automatically when the
          // breakpoint flips, e.g. rotating a tablet or resizing a window)
          return () => {
            pinTrigger?.kill();
            cardTriggers.forEach((t) => t.kill());
          };
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: mainContainerRef, dependencies: [steps] }
  );

  const scrollToStep = (index: number) => {
    const targetStep = rightCardsRefs.current[index];
    if (targetStep) {
      window.scrollTo({
        top: targetStep.getBoundingClientRect().top + window.scrollY - 120,
        behavior: "smooth",
      });
    }
  };

  const activeProgressPercent = Math.round(((active + 1) / steps.length) * 100);

  return (
    <div ref={mainContainerRef} className="relative w-full">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
        {/* =================================================================== */}
        {/* LEFT COLUMN: GSAP PINNED PANEL (desktop) / STATIC SUMMARY (mobile) */}
        {/* =================================================================== */}
        <div ref={leftPanelRef} className="lg:col-span-5 h-fit">
          <div className="space-y-6 py-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent,#ff5a2a)] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[var(--accent,#ff5a2a)]" />
              <span>How a project moves</span>
            </div>

            <h2 className="text-[clamp(1.8rem,2.8vw,2.8rem)] font-bold leading-[1.1] tracking-tight text-white">
              A clear route from <br /> brief to build.
            </h2>

            <p className="text-xs leading-relaxed text-white/55 lg:text-[13px]">
              Our structured process ensures design intent is preserved from the
              initial sketch right through to final installation.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-wider text-white/50">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[var(--accent,#ff5a2a)]" />
                  Pathway Status
                </span>
                <span className="font-bold text-[var(--accent,#ff5a2a)]">
                  0{active + 1} / 0{steps.length}
                </span>
              </div>

              <div className="relative mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] to-[#ff825c]"
                  animate={{ width: `${activeProgressPercent}%` }}
                  transition={{ duration: 0.35, ease: "circOut" }}
                />
              </div>

              <div className="mt-3.5 space-y-1">
                {steps.map((stepName, idx) => {
                  const isCurrent = active === idx;
                  const isPassed = active > idx;

                  return (
                    <button
                      key={stepName}
                      type="button"
                      onClick={() => scrollToStep(idx)}
                      className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-all duration-300 ${
                        isCurrent
                          ? "border border-[var(--accent,#ff5a2a)]/40 bg-white/[0.08] text-white shadow-md"
                          : "text-white/40 hover:bg-white/[0.03] hover:text-white/70"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-bold transition-all duration-300 ${
                            isCurrent
                              ? "bg-[var(--accent,#ff5a2a)] text-black shadow-[0_0_8px_rgba(255,90,42,0.6)]"
                              : isPassed
                              ? "bg-[var(--accent,#ff5a2a)]/20 text-[var(--accent,#ff5a2a)]"
                              : "bg-white/10 text-white/50"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 size={10} /> : idx + 1}
                        </div>

                        <span className="text-[11px] font-medium tracking-wide">
                          {stepName}
                        </span>
                      </div>

                      {isCurrent && (
                        <span className="font-mono text-[8px] font-semibold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: SCROLLABLE CARDS                                     */}
        {/* =================================================================== */}
        <div ref={rightPanelRef} className="space-y-5 lg:col-span-7">
          {steps.map((stepText, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={stepText}
                data-step-index={i}
                ref={(el) => {
                  rightCardsRefs.current[i] = el;
                }}
                initial={false}
                animate={{
                  scale: isActive ? 1.01 : 0.98,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-xl border p-6 transition-colors duration-300 transform-gpu lg:p-7 ${
                  isActive
                    ? "border-[var(--accent,#ff5a2a)]/50 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent shadow-[0_15px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
                    : "border-white/10 bg-white/[0.015]"
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--accent,#ff5a2a)]/20 blur-3xl transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-bold tracking-widest transition-colors duration-200 ${
                      isActive ? "text-[var(--accent,#ff5a2a)]" : "text-white/30"
                    }`}
                  >
                    STAGE 0{i + 1}
                  </span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1.5 rounded-full border border-[var(--accent,#ff5a2a)]/40 bg-[var(--accent,#ff5a2a)]/10 px-2.5 py-0.5 font-mono text-[9px] text-[var(--accent,#ff5a2a)] backdrop-blur-md"
                      >
                        <span className="h-1.5 w-1.5 rounded-full animate-ping bg-[var(--accent,#ff5a2a)]" />
                        IN PROGRESS
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <h3
                  className={`mt-6 text-xl font-bold tracking-tight transition-all duration-300 sm:text-2xl lg:text-[26px] ${
                    isActive ? "translate-x-1 text-white" : "text-white/60"
                  }`}
                >
                  {stepText}
                </h3>

                <p className="mt-3 text-[11px] leading-relaxed text-white/50 lg:text-xs">
                  Detailed execution phase ensuring alignment with design rules,
                  venue constraints, and production benchmarks.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}