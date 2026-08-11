"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "./tokens";

/* -------------------------------------------------------------------------- */
/*                                  FADE REVEAL                               */
/* -------------------------------------------------------------------------- */
/* Upgraded: subtle scale + blur-in alongside the fade/rise, for a softer,   */
/* more cinematic settle instead of a flat linear fade.                      */

export function FadeReveal({
  children,
  className = "",
  delay = 0,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, y: motionTokens.revealY, scale: 0.985 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduce ? 0 : 0.75,
        delay,
        ease: motionTokens.ease,
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                    PREMIUM TEXT MASK REVEAL (Kononenko-style)              */
/* -------------------------------------------------------------------------- */
/* Upgraded: spring-based settle instead of a flat tween, so the line has a  */
/* touch of natural overshoot rather than stopping dead.                     */

export function MaskReveal({
  children,
  className = "",
  delay = 0,
  amount = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduce ? false : { y: "112%", skewY: 4, opacity: 0.4 }}
        whileInView={{ y: "0%", skewY: 0, opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                delay,
                type: "spring",
                stiffness: 110,
                damping: 18,
                mass: 0.9,
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                    PREMIUM IMAGE CURTAIN REVEAL                            */
/* -------------------------------------------------------------------------- */
/* Upgraded: pairs the curtain lift with a slow image zoom-out, so the image */
/* itself breathes into place rather than sitting static under the panel.    */

export function ImageReveal({
  children,
  className = "",
  delay = 0,
  color = "#0b0c0d",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  color?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: reduce ? 0 : 1.3,
          delay,
          ease: motionTokens.ease,
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      {!reduce && (
        <motion.div
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay, ease: motionTokens.ease }}
          style={{ originY: 0, backgroundColor: color }}
          className="pointer-events-none absolute inset-0 z-10"
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              STAGGER GROUP / ITEM                          */
/* -------------------------------------------------------------------------- */
/* Upgraded: item now settles with a spring + slight scale-in, matching the  */
/* softer feel of the other primitives above.                                */

export function StaggerGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : motionTokens.stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y: 24, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 140, damping: 16, mass: 0.7 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                    NEW: WORD-BY-WORD TEXT REVEAL                           */
/* -------------------------------------------------------------------------- */
/* Splits a string into words and reveals each one on a staggered rise —     */
/* stronger than MaskReveal for hero-weight headlines with multiple words.   */
/* Usage: <TextReveal text="Designed to be seen." className="text-6xl" />    */

export function TextReveal({
  text,
  className = "",
  delay = 0,
  amount = 0.5,
}: {
  text: string;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? {} : { y: "115%", rotate: 4 },
              show: {
                y: "0%",
                rotate: 0,
                transition: { duration: 0.7, ease: motionTokens.ease },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*                    NEW: GLOW HOVER CARD WRAPPER                            */
/* -------------------------------------------------------------------------- */
/* A drop-in wrapper for cards/panels that adds a soft accent-colored glow   */
/* following a gentle lift on hover — reusable across service/project cards. */

export function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={reduce ? {} : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] bg-[var(--accent)]/0 opacity-0 blur-md transition-all duration-500 group-hover:bg-[var(--accent)]/15 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}


/* -------------------------------------------------------------------------- */
/*                    PORTAL / APERTURE REVEAL                                */
/* -------------------------------------------------------------------------- */

export function PortalReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative ${className}`}
      initial={
  reduce
    ? false
    : { clipPath: "inset(45% 45% 45% 45% round 40px)", opacity: 0 }
}
whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
viewport={{ once: true, amount: 0.5 }}
transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={reduce ? false : { scale: 1.15, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.3, delay: 0.1, ease: motionTokens.ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}