"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Users, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/data/site-images";
import { KineticTitle, MaskReveal, ProcessMotion } from "@/components/motion";
import { HowWeWorkSection } from "@/components/HowWeWorkSection";
import { PovStatsSection } from "@/components/sections/PovStatsSection";
import { CTA } from "@/components/CTA";

import { HeroWaveCanvas } from "@/components/about/HeroWaveCanvas";
import { MissionStrip } from "@/components/about/MissionStrip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE_CINEMATIC = "power3.out";

const principles = [
  {
    icon: Users,
    title: "Listen before drawing",
    copy: "The brief, brand rules, audience and venue conditions set the direction before a single line is drawn.",
  },
  {
    icon: Sparkles,
    title: "Make the idea visible",
    copy: "3D visualisation helps teams review the space before production decisions are locked in.",
  },
  {
    icon: Wrench,
    title: "Coordinate the build",
    copy: "Design intent is carried into fabrication, installation and on-site execution without dilution.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (heroCopyRef.current) {
        gsap.fromTo(
          heroCopyRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: EASE_CINEMATIC,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#08090a] text-white selection:bg-[var(--accent,#3b82f6)] selection:text-black">
      {/* Hero Header Section - Compact Height & Padding */}
      <section className="relative flex flex-col justify-center overflow-hidden border-b border-white/10 pt-20 pb-12 lg:pt-28 lg:pb-16">
        <HeroWaveCanvas />
        <div className="container relative z-10 mx-auto px-5 max-w-6xl">
          <MaskReveal>
            <span className="inline-block rounded-full border border-[var(--accent,#3b82f6)]/20 bg-[var(--accent,#3b82f6)]/10 px-3 py-0.5 font-mono text-[10px] font-medium tracking-widest text-[var(--accent,#3b82f6)] uppercase">
              About Futurex Studio
            </span>
          </MaskReveal>
          <div className="mt-3">
            <KineticTitle
              text="Design thinking that holds up"
              highlightText="in the real world."
              className="max-w-3xl text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[1.08] tracking-tight"
            />
          </div>
          <p
            ref={heroCopyRef}
            className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg"
          >
            Futurex Studio works across exhibition concepts, 3D visualisation, production and execution—connecting brand intent with the practical demands of a live environment.
          </p>
        </div>
      </section>

      {/* POV & Key Stats */}
      <PovStatsSection imageSrc={siteImages.aboutHero.src} />

      {/* How We Work */}
      <HowWeWorkSection principles={principles} />

      {/* Workflow Steps - Compact Padding */}
      <section className="py-10 lg:py-16 border-t border-white/5">
        <div className="container mx-auto px-5 max-w-6xl">
          <h2 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-4">
            Our Process
          </h2>
          <div>
            <ProcessMotion
              steps={[
                "Brief & discovery",
                "Concept development",
                "3D visualisation",
                "Technical planning",
                "Fabrication & production",
                "Installation & execution",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Studio Mission Strip */}
      <MissionStrip />

      {/* Call To Action */}
      <CTA />
    </div>
  );
}