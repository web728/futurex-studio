"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { siteImages } from "@/data/site-images";

// Local Typography Components
import { KineticTitle, GlitchText } from "../motion/kinetic-typography";
import { MagneticButton } from "../motion/magnetic-button";

// React Three Fiber Scene - Non-blocking Client Load
const Hero3DScene = dynamic(
  () => import("./hero-3d-scene").then((m) => m.Hero3DScene),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />
  }
);

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.92]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.8], ["0px", "32px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Optimized Mouse Move Parallax using RAF
  useEffect(() => {
    if (reduce) return;

    let xVal = 0;
    let yVal = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      xVal = (e.clientX / innerWidth - 0.5) * 16;
      yVal = (e.clientY / innerHeight - 0.5) * 16;

      gsap.to(".hero-parallax-layer", {
        x: xVal * 0.6,
        y: yVal * 0.6,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduce]);

  return (
    <section ref={ref} className="relative min-h-[92svh] bg-[#0b0c0d]">
      <motion.div
        className="relative min-h-[92svh] overflow-hidden bg-black"
        style={reduce ? {} : { borderRadius: heroRadius }}
      >
        <motion.div
          className="absolute -inset-y-[10%] inset-x-0"
          style={reduce ? {} : { y: imageY, scale: imageScale }}
        >
          {/* LCP Optimized Next Image */}
          <Image
            src={siteImages.homeHero.src}
            alt={siteImages.homeHero.alt}
            fill
            priority
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-[58%_center] sm:object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0b0c0d]" />
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* 3D Canvas Container - Desktop only */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="pointer-events-auto absolute right-[4%] top-[10%] h-[48%] w-[38%] opacity-95">
            <Hero3DScene />
          </div>
        </div>

        <motion.div
          className="container relative flex min-h-[92svh] flex-col justify-end pb-16 pt-28 lg:pb-24"
          style={reduce ? {} : { opacity }}
        >
          <motion.p
            className="eyebrow hero-parallax-layer"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            Exhibition Design · Fabrication · Brand Experiences
          </motion.p>

          <div className="mt-7 hero-parallax-layer">
            <KineticTitle
              text="Designed to be seen."
              highlightText="Built to be experienced."
              className="max-w-5xl text-[clamp(3.4rem,7.5vw,7.8rem)] font-semibold leading-[.94]"
            />
          </div>

          <motion.div
            className="mt-9 flex flex-col gap-7 border-t border-white/20 pt-7 md:flex-row md:items-end md:justify-between"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="max-w-xl text-base leading-7 text-white/75">
              Futurex Studio designs and delivers exhibition spaces—from the first
              concept and 3D view to fabrication, installation and the live show
              floor.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href="/portfolio"
                className="block bg-white px-5 py-3.5 text-sm font-bold text-black transition hover:bg-neutral-200 active:scale-95"
              >
                <GlitchText text="View selected work" />
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="block border border-white/40 px-5 py-3.5 text-sm font-bold text-white transition hover:border-white active:scale-95"
              >
                Discuss your brief
              </MagneticButton>
            </div>
          </motion.div>

          <motion.a
            href="#intro"
            aria-label="Scroll to introduction"
            className="absolute bottom-6 right-0 hidden items-center gap-2 text-[10px] uppercase tracking-[.18em] text-white/55 lg:flex"
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} /> Scroll
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}