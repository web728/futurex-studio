"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/data/site-images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Lightweight text reveal
      const animElements = contentRef.current?.querySelectorAll(".intro-anim-item");
      if (animElements && animElements.length > 0) {
        gsap.fromTo(
          animElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. Smooth Image Frame Reveal
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative overflow-hidden  bg-[#0d0e0e] py-16 lg:py-24 text-[var(--text,#f1efe9)]"
    >
      {/* Ambient Accent Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,rgba(255,90,42,0.035)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Grid items-stretch ensures image height precisely matches text height */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column: Image Matched to Text Height */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              ref={imageFrameRef}
              className="group relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] shadow-2xl transition-all duration-500 hover:border-[var(--accent,#ff5a2a)]/50"
            >
              <Image
                src={siteImages.homeIntroduction.src}
                alt={siteImages.homeIntroduction.alt || "Introduction Preview"}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={false}
              />

              {/* Bottom Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background,#0b0c0d)]/85 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/10 pt-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--secondary,#b8b6af)]">
                  Concept · Detail · Delivery
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text Content */}
          <div
            ref={contentRef}
            className="flex flex-col justify-center lg:col-span-7 lg:pl-6"
          >
            {/* Eyebrow */}
            <p className="intro-anim-item text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              Exhibition design, end to end
            </p>

            {/* Display Heading */}
            <h2 className="intro-anim-item mt-3 text-[clamp(1.85rem,3.2vw,3rem)] font-bold leading-[1.12] tracking-tight text-[var(--text,#f1efe9)]">
              A clear idea, carried all the way{" "}
              <span className="text-[var(--accent,#ff5a2a)]">
                into the space.
              </span>
            </h2>

            {/* Accent Divider */}
            <div
              className="intro-anim-item my-5 h-px w-full max-w-sm bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--border,rgba(241,239,233,0.18))] to-transparent"
              aria-hidden="true"
            />

            {/* Paragraph 1: Primary Lead */}
            <p className="intro-anim-item max-w-xl text-base font-normal leading-relaxed text-[var(--text,#f1efe9)]/90">
              Futurex Studio brings design, visualisation, fabrication and on-site execution into one coordinated process.
            </p>

            {/* Paragraph 2: Secondary Context */}
            <p className="intro-anim-item mt-3 max-w-xl text-sm font-light leading-relaxed text-[var(--secondary,#b8b6af)]">
              For exhibition teams, that means fewer disconnected handoffs, clearer approvals and a brand environment designed around how people arrive, move and engage.
            </p>

            {/* CTA Button */}
            <div className="intro-anim-item mt-7">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] px-7 py-3.5 text-sm font-semibold text-[var(--text,#f1efe9)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--elevated,#191c1f)] hover:text-[var(--accent,#ff5a2a)]"
              >
                <span>How we work</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}