"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ExternalLink, MessageSquarePlus, MapPin, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Testimonial } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOOGLE_REVIEW_URL = "https://share.google/076iRQlU5bVs9xoi1";

export function TestimonialsSection({
  testimonials = [],
}: {
  testimonials: Testimonial[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      const headerNodes = headerRef.current?.querySelectorAll(".rev-anim");
      if (headerNodes && headerNodes.length > 0) {
        gsap.fromTo(
          headerNodes,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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

      // 2. Reviews Grid Stagger
      const cards = gridRef.current?.querySelectorAll(".review-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
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
      id="testimonials"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-16 lg:py-24 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* Top Divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border,rgba(241,239,233,0.18))] to-transparent opacity-60" />

      {/* MATCHING ORANGE GRADIENT: Top-Left Half Circle Orb */}
      <div
        className="pointer-events-none absolute -left-36 -top-36 z-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.22)_0%,rgba(255,130,92,0.08)_45%,transparent_75%)] blur-[70px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Google Reviews Trust Badge Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-8"
        >
          {/* Left Title */}
          <div>
            <div className="rev-anim inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              <CheckCircle size={12} className="text-[var(--accent,#ff5a2a)]" />
              <span>Verified Client Feedback</span>
            </div>

            <h2 className="rev-anim mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1">
                Client experiences
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                rated on Google.
              </span>
            </h2>
          </div>

          {/* Right Trust Box & Google Profile Link */}
          <div className="rev-anim flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] p-4 shadow-xl">
            {/* Google Rating Block */}
            <div className="flex items-center gap-3 pr-2">
              {/* Google G Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-full w-full">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.09C3.29 21.44 7.37 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.56 1.25 6.59l4.03 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-[var(--text,#f1efe9)]">4.4</span>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i === 4 ? "fill-amber-400/40 text-amber-400" : "fill-amber-400 text-amber-400"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] font-medium text-[var(--secondary,#b8b6af)]">
                 Verified Google Reviews
                </p>
              </div>
            </div>

            {/* Google Profile Buttons */}
            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-[var(--border,rgba(241,239,233,0.12))] pt-3 sm:pt-0 sm:pl-3">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-[var(--accent,#ff5a2a)] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[var(--accent-hover,#ff7248)] shadow-md hover:scale-[1.02]"
              >
                <MessageSquarePlus size={13} />
                <span>Write a Review</span>
                <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div
          ref={gridRef}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((t, idx) => (
            <article
              key={t.name || idx}
              className="review-card group relative flex flex-col justify-between rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-7 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Header: Stars & Google Badge */}
                <div className="flex items-center justify-between border-b border-[var(--border,rgba(241,239,233,0.08))] pb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.stars || 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-[var(--secondary,#b8b6af)] transition-colors hover:text-white"
                  >
                    <span>Google Review</span>
                    <ExternalLink size={9} />
                  </a>
                </div>

                {/* Quote Text */}
                <blockquote className="mt-5 text-sm font-normal leading-relaxed text-[var(--text,#f1efe9)]/90 lg:text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* Footer: User Identity & Verified State */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--border,rgba(241,239,233,0.08))] pt-4">
                <div className="flex items-center gap-3">
                  {t.avatar ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--accent,#ff5a2a)]/15 font-mono text-xs font-bold text-[var(--accent,#ff5a2a)]">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-[var(--text,#f1efe9)]">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-[var(--secondary,#b8b6af)]">
                      {t.company} {t.role ? `· ${t.role}` : ""}
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--success,#66d19e)]">
                  <CheckCircle size={11} />
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Address & Map Link Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[var(--border,rgba(241,239,233,0.08))] bg-[var(--surface,#121416)]/60 px-5 py-3.5 text-xs text-[var(--secondary,#b8b6af)]">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0 text-[var(--accent,#ff5a2a)]" />
            <span>Futurex Trade Fair and Events · 1st floor, E-52, Kalkaji, New Delhi, Delhi 110019</span>
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[var(--accent,#ff5a2a)] hover:underline"
          >
            <span>View on Google Maps</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}