"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { company, navigation } from "@/data/site";
import { brandAssets, siteImages } from "@/data/site-images";
import { FAQAccordion } from "./interactive";
import { FadeReveal, MaskReveal, PremiumHeader } from "./motion-system";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

// ----------------------------------------------------------------------
// 1. MAGNETIC LINK & BUTTON WRAPPER
// ----------------------------------------------------------------------
function MagneticElement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 2. LOGO & HEADER
// ----------------------------------------------------------------------
export function Logo() {
  return (
    <Link href="/" aria-label="Futurex Studio home" className="group relative block h-[58px] w-[148px]">
      <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
        <Image
          src="/logo/Futurex-studio-white-logo.png"
          alt="Futurex Studio"
          fill
          sizes="148px"
          className="object-contain mix-blend-screen" // <--- Dark background ko invisible kar dega
          priority
        />
      </div>
    </Link>
  );
}

export function Header() {
  return <PremiumHeader />;
}

// ----------------------------------------------------------------------
// 3. ULTRA-PREMIUM INTERACTIVE SECTION HEADER
// ----------------------------------------------------------------------
interface SectionHeaderProps {
  eyebrow?: string;
  title?: string;
  highlightText?: string;
  titleEnd?: string;
  copy?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function SectionHeader({
  eyebrow = "Our point of view",
  title = "An exhibition stand is a ",
  highlightText = "temporary space",
  titleEnd = "",
  copy = "It must communicate quickly, support real conversations and represent the brand under pressure. Futurex Studio’s role is to translate that requirement into a spatial concept that can be reviewed, refined and built.",
  imageSrc = "/gallery/img-1.jpeg",
  imageAlt = "Exhibition Stand Concept",
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  // Dynamic 3D Card Hover Angle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Ambient pulsing brand glow — fixed invalid ease token.
      // "sine.easeInOut" is not a real GSAP ease; the correct name is "sine.inOut".
      gsap.fromTo(
        ".ambient-glow-orb",
        { scale: 0.8, opacity: 0.05 },
        {
          scale: 1.2,
          opacity: 0.2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      if (prefersReducedMotion) return;

      // -----------------------------------------------------------
      // Wave text reveal — characters rise in a traveling-wave
      // stagger (not a flat fade), settling with a soft overshoot.
      // -----------------------------------------------------------
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "words,chars" });

        if (split.chars) {
          gsap.set(split.chars, {
            display: "inline-block",
            willChange: "transform, opacity",
          });

          gsap.fromTo(
            split.chars,
            { opacity: 0, y: 34, rotate: 6 },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 1,
              ease: "back.out(1.7)",
              stagger: { each: 0.018, from: "start" },
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

      // -----------------------------------------------------------
      // Subtle continuous shimmer-wave on the highlighted phrase —
      // a slow moving gradient sweep, classy rather than jittery.
      // -----------------------------------------------------------
      if (highlightRef.current) {
        gsap.set(highlightRef.current, { backgroundSize: "200% 100%" });
        gsap.to(highlightRef.current, {
          backgroundPosition: "-200% 0%",
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#070809] py-24 lg:py-36">
      {/* Ambient Pulsing Brand Glow */}
      <div
        className="ambient-glow-orb pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--accent, #ff5a2a)" }}
      />

      <div className="container relative mx-auto px-6 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT COLUMN: 3D INTERACTIVE GLASS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
            className="relative lg:col-span-5 flex justify-center [perspective:1000px]"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="group relative w-full max-w-[440px] cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-3xl transition-all duration-500 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(255,90,42,0.15)]"
            >
              {/* Image Inner Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-900">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 440px"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-sm text-neutral-500">
                    No Image Provided
                  </div>
                )}
                {/* Vignette Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070809]/80 via-transparent to-transparent" />
              </div>

              {/* Floating Hologram Badge */}
              <div
                style={{ transform: "translateZ(30px)" }}
                className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)]/40"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-[var(--accent,#ff5a2a)]" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">Spatial Concept</span>
                </div>
                <span className="text-[11px] font-mono font-light text-white/35">3D Visual</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: KINETIC TYPOGRAPHY */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Pill Badge */}
            <MaskReveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--accent-hover,#ff7248)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent, #ff5a2a)" }} />
                {eyebrow}
              </div>
            </MaskReveal>

            {/* Main Animated Title — thin, premium weight; characters
                wave-reveal in via the GSAP/SplitType effect above. */}
            <h2
              ref={titleRef}
              className="text-[clamp(2.4rem,4.2vw,4.5rem)] font-extralight leading-[1.1] tracking-tight text-white text-balance"
            >
              {title}
              <span
                ref={highlightRef}
                className="bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[#ff825c] via-white to-[var(--accent,#ff5a2a)] bg-clip-text font-light italic text-transparent"
                style={{ backgroundSize: "200% 100%" }}
              >
                {highlightText}
              </span>
              {titleEnd}
            </h2>

            {/* Paragraph Description */}
            {copy && (
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
                className="max-w-xl text-base font-light leading-relaxed text-white/55 text-pretty sm:text-lg"
              >
                {copy}
              </motion.p>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 4. CINEMATIC PAGE HERO
// ----------------------------------------------------------------------
// Wrapper if MaskReveal is external, else standard motion div

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
}) {
  const imageAlt = image
    ? Object.values(siteImages).find((item) => item.src === image)?.alt ?? ""
    : "";

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#08090a] py-12 md:py-16 lg:py-20">
      {/* Dynamic Noise Texture */}
      <div className="pointer-events-none absolute inset-0 noise opacity-40" />

      {/* Background Image Reveal with Gradient Overlay */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute right-0 top-0 hidden h-full w-[40%] lg:block"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="40vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090a] via-[#08090a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-transparent" />
        </motion.div>
      )}

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <MaskReveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent,#ff5a2a)]">
            {eyebrow}
          </p>
        </MaskReveal>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_CINEMATIC }}
          className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_CINEMATIC }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {copy}
        </motion.p>
      </div>
    </section>
  );
}


export { FAQAccordion };