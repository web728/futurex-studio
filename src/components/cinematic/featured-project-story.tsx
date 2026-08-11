"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/site";
import { projectMedia } from "@/data/site-images";

gsap.registerPlugin(ScrollTrigger);

// Word-level mask helper component for liquid wave animation
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

export function FeaturedProjectStory({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const title1WordsRef = useRef<HTMLSpanElement[]>([]);
  const title2WordsRef = useRef<HTMLSpanElement[]>([]);
  const descWordsRef = useRef<HTMLSpanElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgSpotlightRef = useRef<HTMLDivElement>(null);

  // Mouse Spotlight Effect for subtle interactive background glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !bgSpotlightRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(bgSpotlightRef.current, {
      x,
      y,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Eyebrow Reveal
      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      // 2. Title Word-by-Word Liquid Wave
      tl.fromTo(
        title1WordsRef.current,
        { y: "110%", opacity: 0, rotateX: -25 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: "power4.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        title2WordsRef.current,
        { y: "110%", opacity: 0, rotateX: -25 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power4.out",
        },
        "-=0.7"
      );

      // 3. Header Paragraph Word Wave
      tl.fromTo(
        descWordsRef.current,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          stagger: 0.015,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // 4. Bottom View All Projects Link
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#f0ece5] py-12 text-[#111312] lg:py-16"
    >
      {/* FIXED: Top Edge Fade height reduced & layered behind text so eyebrow is not blurred */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-10 bg-gradient-to-b from-[#0b0c0d] via-[#f0ece5]/40 to-transparent" />

      {/* Interactive Subtle Ambient Mouse Glow */}
      <div
        ref={bgSpotlightRef}
        className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full bg-[#ff5a2a]/10 blur-[120px] will-change-transform"
      />

      {/* Content Layer with z-10 priority */}
      <div className="container relative z-10">
        {/* Header Grid */}
        <div className="grid gap-6 border-b border-black/15 pb-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <div className="overflow-hidden">
              <p
                ref={eyebrowRef}
                className="text-xs font-bold uppercase tracking-[.18em] text-[var(--accent,#ff5a2a)]"
              >
                Selected work
              </p>
            </div>
            <h2 className="mt-4 text-[clamp(2.4rem,4.8vw,5.2rem)] font-semibold leading-[.98]">
              <div className="block">
                <WaveWordText
                  text="Spaces shaped around"
                  wordsRef={title1WordsRef}
                />
              </div>
              <div className="block mt-1">
                <WaveWordText
                  text="the brand."
                  className="text-[var(--accent,#ff5a2a)]"
                  wordsRef={title2WordsRef}
                />
              </div>
            </h2>
          </div>

          <div className="max-w-lg text-sm leading-7 text-black/60 lg:text-base lg:justify-self-end">
            <WaveWordText
              text="A selection of exhibition environments from the public Futurex Studio archive. Explore the design approach and documented scope behind each space."
              wordsRef={descWordsRef}
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-10">
          {featured.map((project, index) => (
            <ProjectFeature key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="mt-10 border-t border-black/15 pt-6">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-sm font-bold transition-colors duration-300 hover:text-[var(--accent,#ff5a2a)]"
          >
            <span>View all projects</span>
            <ArrowRight
              size={16}
              className="text-[var(--accent,#ff5a2a)] transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Image Parallax Scrub on Scroll
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Card Scroll Reveal Animation
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      className={index % 2 === 1 ? "md:pt-10" : ""}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        {/* Image Mask Frame */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black/10 shadow-lg transition-all duration-500 group-hover:shadow-2xl">
          <Image
            ref={imageRef}
            src={project.featuredImage!}
            alt={projectMedia[project.slug]?.featured?.alt ?? project.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          
          {/* Index Badge */}
          <span className="absolute left-4 top-4 rounded-md bg-black/80 px-2.5 py-1.5 text-[10px] tracking-[.14em] text-white backdrop-blur-md">
            0{index + 1}
          </span>
        </div>

        {/* Info Header */}
        <div className="mt-4 flex items-start justify-between gap-6 border-t border-black/20 pt-3 transition-colors duration-300 group-hover:border-[var(--accent,#ff5a2a)]/50">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/45">
              {project.category}
            </p>
            <h3 className="display mt-1 text-xl font-semibold sm:text-2xl transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-[var(--accent,#ff5a2a)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </Link>
    </article>
  );
}