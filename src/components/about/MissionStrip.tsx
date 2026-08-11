"use client";

import { useRef, useEffect } from "react";
import { Target } from "lucide-react";
import { gsap } from "gsap";
import { FadeReveal, MagneticButton } from "@/components/motion";
import { AmbientParticles } from "./AmbientParticles";

const EASE_SOFT = "power2.inOut";

export function MissionStrip() {
  const missionSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (missionSectionRef.current) {
        const orb = missionSectionRef.current.querySelector(".mission-orb");
        if (orb) {
          gsap.fromTo(
            orb,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: EASE_SOFT,
              scrollTrigger: {
                trigger: missionSectionRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }
    }, missionSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={missionSectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-[#090a0b] py-10 lg:py-14"
    >
      <div className="mission-orb pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent,#3b82f6)]/[0.06] blur-[90px]" />
      <AmbientParticles count={6} />
      <div className="container relative z-10 mx-auto px-5 max-w-6xl">
        <FadeReveal>
          <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3.5 lg:gap-5">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 backdrop-blur-md shrink-0">
                <Target className="text-[var(--accent,#3b82f6)]" size={24} />
              </div>
              <p className="max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                Every stand we design has to work twice—once as an idea on
                screen, and once as a space people actually walk into.
              </p>
            </div>
            <MagneticButton
              href="/contact"
              className="mt-1 block shrink-0 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-[var(--accent,#3b82f6)] hover:bg-[var(--accent,#3b82f6)] hover:text-black hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] lg:mt-0"
            >
              Start your brief
            </MagneticButton>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}