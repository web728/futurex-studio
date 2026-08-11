"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { motionTokens } from "./tokens";

export function ProjectHeroMotion({
  image,
  title,
  category,
}: {
  image: string;
  title: string;
  category: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-[78svh] overflow-hidden">
      <motion.div
        className="absolute -inset-y-[10%] inset-x-0"
        style={reduce ? {} : { y, scale }}
      >
        <Image
          src={image}
          alt={`${title}, a Futurex Studio project`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
      <motion.div
        className="container absolute inset-x-0 bottom-0 pb-12"
        style={reduce ? {} : { y: textY }}
      >
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {category}
        </motion.p>
        <div className="mt-5 overflow-hidden">
          <motion.h1
            className="display max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-semibold"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: motionTokens.ease }}
          >
            {title}
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}
