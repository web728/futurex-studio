"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { TestimonialsSectionProps } from "./types";
import { EASE_CINEMATIC, EASE_SOFT } from "./constants";
import { AmbientBackground } from "./AmbientBackground";
import { SectionHeader } from "./SectionHeader";
import { LiquidAvatar } from "./LiquidAvatar";

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const particlesWrapRef = useRef<HTMLDivElement>(null);

  const parallaxSetters = useRef<{
    blobA?: { x: gsap.QuickToFunc; y: gsap.QuickToFunc };
    blobB?: { x: gsap.QuickToFunc; y: gsap.QuickToFunc };
    rays?: { x: gsap.QuickToFunc; y: gsap.QuickToFunc };
  }>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(section, { autoAlpha: 1 });
        return;
      }

      // Section Entrance
      gsap.fromTo(
        section,
        { opacity: 0, y: 60, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: EASE_CINEMATIC,
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Ambient Drifts
      if (blobARef.current) {
        gsap.to(blobARef.current, {
          x: 60,
          y: 40,
          duration: 18,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (blobBRef.current) {
        gsap.to(blobBRef.current, {
          x: -50,
          y: -30,
          duration: 22,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (raysRef.current) {
        gsap.to(raysRef.current, {
          rotate: 360,
          duration: 90,
          ease: "none",
          repeat: -1,
        });
      }

      // Parallax Setters Setup
      if (blobARef.current) {
        parallaxSetters.current.blobA = {
          x: gsap.quickTo(blobARef.current, "x", { duration: 1.1, ease: EASE_SOFT }),
          y: gsap.quickTo(blobARef.current, "y", { duration: 1.1, ease: EASE_SOFT }),
        };
      }
      if (blobBRef.current) {
        parallaxSetters.current.blobB = {
          x: gsap.quickTo(blobBRef.current, "x", { duration: 1.3, ease: EASE_SOFT }),
          y: gsap.quickTo(blobBRef.current, "y", { duration: 1.3, ease: EASE_SOFT }),
        };
      }
      if (raysRef.current) {
        parallaxSetters.current.rays = {
          x: gsap.quickTo(raysRef.current, "x", { duration: 1.6, ease: EASE_SOFT }),
          y: gsap.quickTo(raysRef.current, "y", { duration: 1.6, ease: EASE_SOFT }),
        };
      }

      // Header Animation Sequence
      if (headerRef.current) {
        const titleEl = headerRef.current.querySelector("h2, .section-title, [class*='title']");
        const eyebrowEl = headerRef.current.querySelector("[class*='eyebrow']");
        const copyEl = headerRef.current.querySelector("p, [class*='copy']");

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });

        if (eyebrowEl) {
          headerTl.fromTo(
            eyebrowEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: EASE_CINEMATIC }
          );
        }

        if (titleEl) {
          const splitTitle = new SplitType(titleEl as HTMLElement, {
            types: "words,chars",
          });
          if (splitTitle.chars) {
            gsap.set(splitTitle.chars, {
              display: "inline-block",
              willChange: "transform, opacity",
            });
            headerTl.fromTo(
              splitTitle.chars,
              { opacity: 0, y: 28, rotate: 4 },
              {
                opacity: 1,
                y: 0,
                rotate: 0,
                duration: 0.9,
                stagger: 0.012,
                ease: EASE_CINEMATIC,
              },
              "-=0.4"
            );
          }
        }

        if (copyEl) {
          headerTl.fromTo(
            copyEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: EASE_CINEMATIC },
            "-=0.55"
          );
        }
      }

      // Grid Cards Sequence
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children) as HTMLElement[];

        cards.forEach((card, index) => {
          const quoteEl = card.querySelector<HTMLElement>("[data-quote]");
          const starsEls = card.querySelectorAll<HTMLElement>("[data-star]");
          const nameEl = card.querySelector<HTMLElement>("[data-client-name]");
          const metaEl = card.querySelector<HTMLElement>("[data-client-meta]");
          const footerEl = card.querySelector<HTMLElement>("[data-card-footer]");

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });

          cardTl.fromTo(
            card,
            { opacity: 0, y: 55, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.05,
              ease: EASE_CINEMATIC,
            }
          );

          if (starsEls.length) {
            cardTl.fromTo(
              starsEls,
              { opacity: 0, scale: 0.2, filter: "drop-shadow(0 0 0px rgba(251,191,36,0))" },
              {
                opacity: 1,
                scale: 1,
                filter: "drop-shadow(0 0 6px rgba(251,191,36,0.8))",
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(3)",
              },
              "-=0.75"
            );
            cardTl.to(
              starsEls,
              {
                filter: "drop-shadow(0 0 0px rgba(251,191,36,0))",
                duration: 0.5,
                ease: EASE_SOFT,
              },
              "-=0.05"
            );
          }

          if (quoteEl) {
            const splitQuote = new SplitType(quoteEl, { types: "lines,words" });
            if (splitQuote.lines) {
              gsap.set(splitQuote.lines, { overflow: "hidden", display: "block" });
            }
            if (splitQuote.words) {
              gsap.set(splitQuote.words, { display: "inline-block", willChange: "transform, opacity" });
              cardTl.fromTo(
                splitQuote.words,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.012,
                  ease: EASE_CINEMATIC,
                },
                "-=0.65"
              );
            }
          }

          if (footerEl) {
            cardTl.fromTo(
              footerEl,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: EASE_SOFT },
              "-=0.3"
            );
          }

          if (nameEl) {
            cardTl.fromTo(
              nameEl,
              { opacity: 0, y: 12, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: EASE_CINEMATIC },
              "-=0.25"
            );
          }

          if (metaEl) {
            cardTl.fromTo(
              metaEl,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: EASE_CINEMATIC },
              "-=0.35"
            );
          }

          cardTl.call(() => {
            gsap.to(card, {
              y: "-=6",
              duration: 3 + (index % 3) * 0.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              overwrite: false,
            });
          });

          gsap.to(card, {
            y: index % 2 === 0 ? -24 : -12,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    parallaxSetters.current.blobA?.x(relX * 40);
    parallaxSetters.current.blobA?.y(relY * 30);

    parallaxSetters.current.blobB?.x(relX * -30);
    parallaxSetters.current.blobB?.y(relY * -22);

    parallaxSetters.current.rays?.x(relX * 15);
    parallaxSetters.current.rays?.y(relY * 15);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      y: -6,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.55)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.killTweensOf(e.currentTarget, "y");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(card, {
          y: "-=6",
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          overwrite: false,
        });
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative overflow-hidden border-y border-white/10 bg-[#0A0C0D] py-24 lg:py-32 opacity-0"
    >
      <AmbientBackground
        blobARef={blobARef}
        blobBRef={blobBRef}
        raysRef={raysRef}
        particlesWrapRef={particlesWrapRef}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Public testimonials"
            title="What clients have said."
            copy="Lightly edited for clarity from testimonials published on the current Futurex Studio website; permissions should be confirmed before launch."
          />
        </div>

        <div ref={gridRef} className="mt-16 grid gap-6 lg:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.04] lg:p-10"
              style={{
                transformStyle: "preserve-3d",
                backgroundImage:
                  "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.06), transparent 40%)",
              }}
            >
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-[var(--accent,#3b82f6)] to-transparent transition-all duration-700 group-hover:w-full" />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  {t.stars ? (
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} data-star className="text-sm text-amber-400">
                          ★
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-7 items-center rounded-full border border-white/10 bg-white/5 px-3 font-mono text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                      VERIFIED
                    </div>
                  )}

                  <span className="font-mono text-[11px] font-medium tracking-widest text-white/30 uppercase group-hover:text-white/60">
                    TESTIMONIAL
                  </span>
                </div>

                <blockquote
                  data-quote
                  className="mt-8 text-lg leading-relaxed text-white/80 group-hover:text-white lg:text-xl"
                >
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption
                data-card-footer
                className="relative z-10 mt-10 flex items-center gap-4 border-t border-white/10 pt-6"
              >
                {t.avatar ? (
                  <LiquidAvatar src={t.avatar} alt={t.name} />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-mono text-base font-bold text-white group-hover:border-[var(--accent,#3b82f6)]/50 group-hover:bg-[var(--accent,#3b82f6)]/20">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                )}
                <div>
                  <strong data-client-name className="block text-base font-semibold tracking-tight text-white">
                    {t.name}
                  </strong>
                  <span data-client-meta className="text-xs font-medium text-white/45">
                    {t.company} {t.role ? `• ${t.role}` : ""}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}