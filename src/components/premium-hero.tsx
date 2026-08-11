"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import type { SiteImageAssignment } from "@/data/site-images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PremiumHeroProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  backgroundImages?: SiteImageAssignment[];
  enableParallax?: boolean;
  enable3D?: boolean;
}

export function PremiumHero({
  eyebrow,
  title,
  copy,
  backgroundImages = [],
  enableParallax = true,
  enable3D = true,
}: PremiumHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageCarouselRef = useRef<HTMLDivElement>(null);
  const svgMeshRef = useRef<SVGSVGElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const particles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      width: ((i * 17 + 60) % 120) + 60,
      height: ((i * 17 + 60) % 120) + 60,
      left: `${(i + 1) * 15}%`,
      top: `${15 + i * 12}%`,
      duration: 10 + i * 2,
      delay: i * 0.6,
    }));
  }, []);

  // Entrance Sequence
  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    let splitTitle: SplitType | null = null;
    let splitCopy: SplitType | null = null;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        splitTitle = new SplitType(titleRef.current, {
          types: "words, chars",
          tagName: "span",
        } as Record<string, any>);
      }

      if (copyRef.current) {
        splitCopy = new SplitType(copyRef.current, {
          types: "lines, words",
          tagName: "span",
        } as Record<string, any>);
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      gsap.set(containerRef.current, { opacity: 1 });

      if (eyebrowRef.current) {
        gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      }

      if (splitTitle?.chars) {
        gsap.set(splitTitle.chars, {
          opacity: 0,
          y: 30,
          rotateX: -20,
          transformOrigin: "0% 50% 0",
        });
      }

      if (splitCopy?.words) {
        gsap.set(splitCopy.words, { opacity: 0, y: 15 });
      }

      if (indicatorsRef.current) {
        gsap.set(indicatorsRef.current, { opacity: 0, y: 15 });
      }

      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -10 });
      }

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .to(
          splitTitle?.chars || [],
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.015,
          },
          "-=0.5"
        )
        .to(
          splitCopy?.words || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.01,
          },
          "-=0.7"
        )
        .to(
          [indicatorsRef.current, scrollIndicatorRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => {
      splitTitle?.revert();
      splitCopy?.revert();
      ctx.revert();
    };
  }, [title, copy]);

  // Mouse Motion Parallax
  useEffect(() => {
    if (!enable3D || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const xToBg = backgroundRef.current
      ? gsap.quickTo(backgroundRef.current, "x", {
          duration: 1.2,
          ease: "power2.out",
        })
      : null;
    const yToBg = backgroundRef.current
      ? gsap.quickTo(backgroundRef.current, "y", {
          duration: 1.2,
          ease: "power2.out",
        })
      : null;

    const xToContent = contentRef.current
      ? gsap.quickTo(contentRef.current, "x", {
          duration: 0.6,
          ease: "power2.out",
        })
      : null;
    const yToContent = contentRef.current
      ? gsap.quickTo(contentRef.current, "y", {
          duration: 0.6,
          ease: "power2.out",
        })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const xRel = (e.clientX - left) / width - 0.5;
      const yRel = (e.clientY - top) / height - 0.5;

      if (xToBg && yToBg) {
        xToBg(xRel * 20);
        yToBg(yRel * 20);
      }

      if (xToContent && yToContent) {
        xToContent(xRel * -10);
        yToContent(yRel * -10);
      }
    };

    const handleMouseLeave = () => {
      xToBg?.(0);
      yToBg?.(0);
      xToContent?.(0);
      yToContent?.(0);
    };

    const targetEl = containerRef.current;
    window.addEventListener("mousemove", handleMouseMove);
    targetEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      targetEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enable3D]);

  // ScrollTrigger Exit Motion
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (enableParallax && backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -25,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "60% top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [enableParallax]);

  // Background Image Carousel Loop
  useEffect(() => {
    if (backgroundImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    if (!imageCarouselRef.current) return;

    const items =
      imageCarouselRef.current.querySelectorAll("[data-carousel-item]");
    items.forEach((item, index) => {
      if (index === activeImageIndex) {
        gsap.to(item, {
          opacity: 1,
          duration: 1.4,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(item, {
          opacity: 0,
          duration: 1.4,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeImageIndex]);

  // Ambient Motion Graphics
  useEffect(() => {
    if (!svgMeshRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".orbital-ring-1", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbital-ring-2", {
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 50,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".wave-path", {
        strokeDashoffset: -1000,
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }, svgMeshRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[55vh] lg:min-h-[65vh] w-full overflow-hidden bg-[var(--background)] text-[var(--text)] opacity-0"
    >
      {/* Background Images Layer */}
      {backgroundImages.length > 0 && (
        <div
          ref={imageCarouselRef}
          className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0"
        >
          {backgroundImages.map((img, index) => (
            <div
              key={img.src}
              data-carousel-item
              className="absolute inset-0 h-full w-full opacity-0"
            >
              <Image
                src={img.src}
                alt={img.alt || "Background Image"}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover object-center opacity-40"
                quality={90}
              />
            </div>
          ))}

          {/* Core Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/70 via-[var(--background)]/80 to-[var(--background)]" />
          <div className="absolute inset-0 bg-radial-vignette opacity-1" />
        </div>
      )}

      {/* Ambient Visual Elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none z-1"
      >
        <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/[0.18] blur-[90px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[var(--accent)]/[0.18] blur-[100px]" />

        <svg
          ref={svgMeshRef}
          className="absolute inset-0 h-full w-full opacity-50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hero-grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--accent-hover)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="hero-grad-text" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--text)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--text)" stopOpacity="0.1" />
            </linearGradient>

            <pattern
              id="grid-pattern"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="var(--text)"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            </pattern>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          <circle
            className="orbital-ring-1"
            cx="85%"
            cy="30%"
            r="280"
            fill="none"
            stroke="url(#hero-grad-accent)"
            strokeWidth="2.5"
            strokeDasharray="12 12"
            filter="url(#glow)"
          />
          <circle
            className="orbital-ring-2"
            cx="85%"
            cy="30%"
            r="440"
            fill="none"
            stroke="url(#hero-grad-text)"
            strokeWidth="1.5"
            strokeDasharray="16 20"
          />

          <path
            className="wave-path"
            d="M -100,320 C 300,120 800,620 1600,220"
            fill="none"
            stroke="url(#hero-grad-accent)"
            strokeWidth="2.5"
            strokeDasharray="250 700"
            filter="url(#glow)"
          />
        </svg>

        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[var(--accent)]/20 blur-[2px] pointer-events-none"
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: p.left,
                top: p.top,
                animation: `float-particle ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Layer */}
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-[55vh] lg:min-h-[65vh] w-full items-center justify-center py-12 lg:py-16"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-left sm:text-center">
            {eyebrow && (
              <p
                ref={eyebrowRef}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3.5 py-1 backdrop-blur-md font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)] shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                {eyebrow}
              </p>
            )}

            <h1
              ref={titleRef}
              className="mb-4 font-display text-3xl font-light leading-[1.12] tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl"
            >
              {title}
            </h1>

            {copy && (
              <p
                ref={copyRef}
                className="mx-auto max-w-xl text-sm font-normal leading-relaxed text-[var(--secondary)] sm:text-base md:text-lg"
              >
                {copy}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      {backgroundImages.length > 1 && (
        <div
          ref={indicatorsRef}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1.5 backdrop-blur-lg"
        >
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeImageIndex
                  ? "w-6 bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
                  : "w-2 bg-[var(--muted)]/50 hover:bg-[var(--secondary)]"
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Text */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Scroll
        </span>
        <div className="relative h-8 w-[1px] overflow-hidden bg-[var(--border)]">
          <div className="absolute top-0 left-0 h-1/2 w-full bg-[var(--accent)] animate-scroll-line" />
        </div>
      </div>

      {/* Subtle Bottom-Only Ambient Blur Line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent backdrop-blur-[1.5px] z-30" />

      {/* CSS Animations */}
      <style jsx>{`
        .bg-radial-vignette {
          background: radial-gradient(
            circle at center,
            transparent 10%,
            var(--background) 100%
          );
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-22px) translateX(10px);
          }
          66% {
            transform: translateY(-38px) translateX(-10px);
          }
        }

        @keyframes scroll-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }

        .animate-scroll-line {
          animation: scroll-line 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
}