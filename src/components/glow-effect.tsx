"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function GlowingAura() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 blur-[80px] sm:h-[420px] sm:w-[420px]"
      />

      <motion.div
        animate={{ y: [-6, 6, -6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-5 -left-3 z-20 text-orange-400"
      >
        <Sparkles className="h-7 w-7 drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -bottom-5 -right-3 z-20 text-amber-300"
      >
        <Sparkles className="h-6 w-6 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
      </motion.div>
    </>
  );
}