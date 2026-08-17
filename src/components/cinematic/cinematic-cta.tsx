"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteImages } from "@/data/site-images";
import {
  FadeReveal,
  ImageReveal,
  KineticTitle,
  MaskReveal,
  motionTokens,
} from "@/components/motion";

export function CinematicCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[68vh] overflow-hidden bg-black text-white">
      {/* Background Image with Reveal & Parallax */}
      <div className="absolute inset-0">
        <ImageReveal color="#000000" className="h-full w-full">
          <motion.div
            className="absolute -inset-y-[4%] inset-x-0 will-change-transform"
            initial={reduce ? false : { scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: motionTokens.ease }}
          >
            <Image
              src={siteImages.homeCta.src}
              alt={siteImages.homeCta.alt || "Cinematic CTA Background"}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-80"
            />
          </motion.div>
        </ImageReveal>
      </div>

      {/* Cinematic Dark Gradient Protection Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      {/* Content Container */}
      <div className="container relative z-10 flex min-h-[68vh] flex-col justify-center py-16 lg:py-20">
        <MaskReveal>
          <p className="eyebrow text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent,#ff5a2a)]">
            Planning an exhibition?
          </p>
        </MaskReveal>

        <div className="mt-5">
          <KineticTitle
            text="Bring us the brief."
            highlightText="We’ll shape the space."
            className="max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[0.98] tracking-tight"
          />
        </div>

        <FadeReveal delay={0.2}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Tell us about the event, floor area, timeline, and what the space
            needs to achieve. We’ll help define the right next step.
          </p>
        </FadeReveal>

        {/* Action Buttons */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.35, duration: 0.6, ease: motionTokens.ease }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[var(--accent,#ff5a2a)] px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent,#ff5a2a)]/25"
          >
            <span>Start a project</span>
          </Link>

          <a
            href="tel:+919711831386"
            className="inline-flex items-center justify-center rounded-md border border-white/30 bg-black/20 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            Call +91 97118 31386
          </a>
        </motion.div>
      </div>
    </section>
  );
}