"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/site";
import { siteImages } from "@/data/site-images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EditorialServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const serviceRowsRef = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Title Reveal (Only on initial scroll entry)
      if (titleTextRef.current) {
        gsap.fromTo(
          titleTextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleTextRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. ScrollTrigger Sync for Active Row Selection
      serviceRowsRef.current.forEach((row, idx) => {
        if (!row) return;

        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#0d0e0e] py-12 text-white lg:py-20"
    >
      {/* Top Transition Gradient Layer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-12 bg-gradient-to-b from-[#f0ece5] via-[#0d0e0e]/60 to-transparent" />

      <div className="container relative z-10">
        {/* Header Grid */}
        <div className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent,#ff5a2a)]">
              What We Deliver
            </p>
            <h2
              ref={titleTextRef}
              className="mt-3 text-[clamp(2.4rem,4.8vw,5rem)] font-bold leading-[0.95] tracking-tight"
            >
              One studio from <br />
              <span className="text-[var(--accent,#ff5a2a)]">
                first sketch
              </span>{" "}
              to show floor.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-white/60 lg:justify-self-end lg:text-base">
            Choose a complete design-and-build partnership or bring us into a
            specific stage. Every discipline stays aligned to the same spatial
            vision.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left Sticky Image Frame */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-[#121313] shadow-2xl transition-all duration-500 lg:aspect-[4/5]">
              {/* Dynamic Image Crossfade Layer */}
              <div className="relative h-full w-full overflow-hidden">
                {services.map((service, index) => {
                  const serviceImage =
                    (service as { image?: string }).image ||
                    siteImages.homeServices?.src ||
                    "";
                  const isCurrent = activeIndex === index;

                  return (
                    <Image
                      key={service.slug || index}
                      src={serviceImage}
                      alt={service.title || "Service Frame"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      priority={index === 0}
                      className={`object-cover grayscale-75 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 ${
                        isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Gradient Protection Layer */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Glass Counter Overlay */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 p-4 backdrop-blur-md">
                <span className="font-mono text-xs tracking-widest text-white/70">
                  PHASE 0{activeIndex + 1} / 0{services.length}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent,#ff5a2a)]">
                  {services[activeIndex]?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right Service Rows */}
          <div className="divide-y divide-white/10 border-b border-t border-white/10">
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={service.slug || index}
                  ref={(el: HTMLDivElement | null) => {
                    if (el) {
                      serviceRowsRef.current.set(index, el);
                    } else {
                      serviceRowsRef.current.delete(index);
                    }
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group relative cursor-pointer py-6 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-white/[0.02] opacity-0 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "group-hover:opacity-100"
                    }`}
                  />

                  <Link
                    href={`/services#${service.slug}`}
                    className="relative z-10 block"
                  >
                    <div className="grid gap-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                      {/* Counter */}
                      <span
                        className={`font-mono text-sm font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--accent,#ff5a2a)]"
                            : "text-white/30 group-hover:text-white/60"
                        }`}
                      >
                        {service.number || `0${index + 1}`}
                      </span>

                      {/* Title & Accordion */}
                      <div>
                        <h3
                          className={`text-[clamp(1.6rem,2.5vw,2.5rem)] font-bold tracking-tight transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-white/40 group-hover:text-white/80"
                          }`}
                        >
                          {service.title}
                        </h3>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isActive
                              ? "mt-3 grid-rows-[1fr] opacity-100"
                              : "mt-0 grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <p className="max-w-xl overflow-hidden text-sm leading-relaxed text-white/50">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "rotate-45 border-[var(--accent,#ff5a2a)] bg-[var(--accent,#ff5a2a)] text-white"
                            : "border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white"
                        }`}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}