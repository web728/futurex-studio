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

// Helper component to split text into word-level masks for wave animation
function WaveWordText({
  text,
  className = "",
  wordsRef,
}: {
  text: string;
  className?: string;
  wordsRef: React.MutableRefObject<HTMLSpanElement[]>;
}) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <span
            ref={(el) => {
              if (el && !wordsRef.current.includes(el)) {
                wordsRef.current.push(el);
              }
            }}
            className="inline-block origin-bottom-left will-change-transform"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  // Word Refs Arrays for Word-by-Word Wave Animation
  const title1WordsRef = useRef<HTMLSpanElement[]>([]);
  const title2WordsRef = useRef<HTMLSpanElement[]>([]);
  const desc1WordsRef = useRef<HTMLSpanElement[]>([]);
  const desc2WordsRef = useRef<HTMLSpanElement[]>([]);

  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate ref references on re-render / HMR
    title1WordsRef.current = [];
    title2WordsRef.current = [];
    desc1WordsRef.current = [];
    desc2WordsRef.current = [];

    const ctx = gsap.context(() => {
      // 1. Image Parallax Effect via Container Wrapper (Prevents Next.js Image Ref Mismatches)
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.15, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 2. Timeline for Word Wave Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Eyebrow reveal
      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Title Line 1 - Word-by-Word Wave Reveal
      if (title1WordsRef.current.length > 0) {
        tl.fromTo(
          title1WordsRef.current,
          { y: "115%", opacity: 0, rotateX: -25 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.03,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // Title Line 2 (Accent) - Word-by-Word Wave Reveal
      if (title2WordsRef.current.length > 0) {
        tl.fromTo(
          title2WordsRef.current,
          { y: "115%", opacity: 0, rotateX: -25 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.035,
            ease: "power4.out",
          },
          "-=0.6"
        );
      }

      // Animated Divider Line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.75, ease: "power3.inOut" },
        "-=0.5"
      );

      // Paragraph 1 - Word-by-Word Smooth Wave
      if (desc1WordsRef.current.length > 0) {
        tl.fromTo(
          desc1WordsRef.current,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.55,
            stagger: 0.012,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      // Paragraph 2 - Word-by-Word Smooth Wave
      if (desc2WordsRef.current.length > 0) {
        tl.fromTo(
          desc2WordsRef.current,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.55,
            stagger: 0.01,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      // CTA Button Reveal
      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative overflow-hidden bg-[#0b0c0d] py-10 lg:py-16"
    >
      {/* Seamless Top Transition Overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#0a0a0c] via-[#0b0c0d]/80 to-transparent backdrop-blur-[2px]" />

      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,90,42,0.06)_0%,transparent_65%)]" />

      <div className="container relative z-10 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        {/* Image Parallax Frame */}
        <div
          ref={imageWrapperRef}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121316] shadow-2xl shadow-black/80 transition-all duration-500 hover:border-[var(--accent,#ff5a2a)]/40 hover:shadow-[0_0_40px_rgba(255,90,42,0.15)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/3.2]">
            <div ref={imageInnerRef} className="absolute inset-0 h-full w-full will-change-transform">
              <Image
                src={siteImages.homeIntroduction.src}
                alt={siteImages.homeIntroduction.alt || "Introduction Preview"}
                fill
                sizes="(max-width:1024px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.18em] text-white/70">
              Concept · Detail · Delivery
            </p>
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:pl-12">
          {/* Eyebrow */}
          <div className="overflow-hidden">
            <p
              ref={eyebrowRef}
              className="eyebrow text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent,#ff5a2a)]"
            >
              Exhibition design, end to end
            </p>
          </div>

          {/* Heading - Word-by-Word Wave Reveal */}
          <h2 className="mt-4 text-[clamp(2.2rem,4.2vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            <div className="block">
              <WaveWordText
                text="A clear idea, carried all the way"
                className="text-white"
                wordsRef={title1WordsRef}
              />
            </div>
            <div className="mt-1 block">
              <WaveWordText
                text="into the space."
                className="text-[var(--accent,#ff5a2a)]"
                wordsRef={title2WordsRef}
              />
            </div>
          </h2>

          {/* Line Divider */}
          <div
            ref={lineRef}
            className="my-6 h-px origin-left bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-white/20 to-transparent"
          />

          {/* Paragraph 1 - Word Wave */}
          <div className="max-w-xl text-base leading-7 text-white/70 lg:text-lg">
            <WaveWordText
              text="Futurex Studio brings design, visualisation, fabrication and on-site execution into one coordinated process."
              wordsRef={desc1WordsRef}
            />
          </div>

          {/* Paragraph 2 - Word Wave */}
          <div className="mt-4 max-w-xl text-sm leading-6 text-white/45 lg:text-base">
            <WaveWordText
              text="For exhibition teams, that means fewer disconnected handoffs, clearer approvals and a brand environment designed around how people arrive, move and engage."
              wordsRef={desc2WordsRef}
            />
          </div>

          {/* CTA Link */}
          <div ref={ctaRef} className="mt-6">
            <Link
              href="/about"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)]/10 hover:shadow-[0_0_25px_rgba(255,90,42,0.25)]"
            >
              <span>How we work</span>
              <ArrowRight
                size={16}
                className="text-[var(--accent,#ff5a2a)] transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}