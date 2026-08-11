"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                       WORD-BY-WORD KINETIC REVEAL TITLE                    */
/* -------------------------------------------------------------------------- */

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    rotate: 3,
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export function KineticTitle({
  text,
  className = "",
  highlightText = "",
}: {
  text: string;
  className?: string;
  highlightText?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.h1
      className={`display flex flex-wrap gap-x-[0.25em] gap-y-2 overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <motion.span
            variants={reduce ? undefined : wordVariants}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
      {highlightText && (
        <span className="block w-full overflow-hidden py-1 text-[var(--accent)]">
          <motion.span
            variants={reduce ? undefined : wordVariants}
            className="inline-block origin-bottom-left"
          >
            {highlightText}
          </motion.span>
        </span>
      )}
    </motion.h1>
  );
}

/* -------------------------------------------------------------------------- */
/*                         HOVER KINETIC GLITCH TEXT                          */
/* -------------------------------------------------------------------------- */

export function GlitchText({ text }: { text: string }) {
  return (
    <motion.span
      className="relative inline-block cursor-pointer font-bold uppercase tracking-wider"
      whileHover="hover"
    >
      <motion.span
        className="relative z-10 block"
        variants={{
          hover: { x: [0, -2, 2, -1, 0], transition: { duration: 0.2 } },
        }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0 text-cyan-400 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.8, 0],
            x: [-3, 3, -2],
            y: [1, -1, 0],
            transition: { repeat: Infinity, duration: 0.15 },
          },
        }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0 text-red-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.8, 0],
            x: [3, -3, 1],
            y: [-1, 1, 0],
            transition: { repeat: Infinity, duration: 0.15, delay: 0.05 },
          },
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
