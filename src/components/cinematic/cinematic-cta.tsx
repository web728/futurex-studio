"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteImages } from "@/data/site-images";
import { FadeReveal, ImageReveal, KineticTitle, MaskReveal, motionTokens } from "@/components/motion";

export function CinematicCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[68vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <ImageReveal color="#000000" className="h-full w-full">
          <motion.div
            className="absolute -inset-y-[4%] inset-x-0"
            initial={reduce ? false : { scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: motionTokens.ease }}
          >
            <Image
              src={siteImages.homeCta.src}
              alt={siteImages.homeCta.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </ImageReveal>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
      <div className="container relative flex min-h-[68vh] flex-col justify-center py-16">
        <MaskReveal>
          <p className="eyebrow">Planning an exhibition?</p>
        </MaskReveal>

        <div className="mt-5">
          <KineticTitle
            text="Bring us the brief."
            highlightText="We’ll shape the space."
            className="max-w-4xl text-[clamp(3rem,6.5vw,6.6rem)] font-semibold leading-[.98]"
          />
        </div>

        <FadeReveal delay={0.2}>
          <p className="mt-6 max-w-xl leading-7 text-white/65">
            Tell us about the event, floor area, timeline and what the space
            needs to achieve. We’ll help define the right next step.
          </p>
        </FadeReveal>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.35, duration: 0.6, ease: motionTokens.ease }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/contact"
            className="bg-[var(--accent)] px-6 py-4 text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a project
          </Link>
          <a
            href="tel:+919711831386"
            className="border border-white/40 px-6 py-4 text-sm font-bold transition-colors duration-300 hover:border-white"
          >
            Call +91 97118 31386
          </a>
        </motion.div>
      </div>
    </section>
  );
}
