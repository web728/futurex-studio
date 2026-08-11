"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { MaskReveal, motionTokens } from "@/components/motion";

export function NextProjectHandoff({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block border-y border-white/10 bg-[#101214]"
    >
      <div className="container py-20 lg:py-28">
        <MaskReveal>
          <p className="eyebrow">Continue exploring</p>
        </MaskReveal>
        <div className="mt-4 flex items-end justify-between gap-8">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: motionTokens.ease }}
              className="display max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-semibold"
            >
              {project.title}
            </motion.h2>
          </div>
          <ArrowUpRight
            className="mb-2 shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2"
            size={34}
          />
        </div>
      </div>
    </Link>
  );
}
