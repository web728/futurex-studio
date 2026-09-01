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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle Header Reveal
      const headerElements = headerRef.current?.querySelectorAll(".serv-anim");
      if (headerElements && headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 24 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* Top Divider Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border,rgba(241,239,233,0.18))] to-transparent opacity-60" />

      {/* Subtle Accent Glow */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header Grid: Strictly Balanced */}
        <div
          ref={headerRef}
          className="grid gap-8 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-10 lg:grid-cols-12 lg:items-end"
        >
          {/* Left Title */}
          <div className="lg:col-span-7">
            <p className="serv-anim text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              What We Deliver
            </p>

            <h2 className="serv-anim mt-3 text-[clamp(2.2rem,4.2vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1.5">
                One studio from sketch
                {/* Glowing Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                to final show floor.
              </span>
            </h2>
          </div>

          {/* Right Lead Description */}
          <div className="lg:col-span-5 lg:pb-1">
            <p className="serv-anim max-w-md text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)] lg:text-base">
              Choose an end-to-end turnkey build or integrate our specialized
              team into specific architectural, 3D visualization, or fabrication
              phases.
            </p>
          </div>
        </div>

        {/* Content Section: Sticky Image (Left) + Interactive Rows (Right) */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Sticky Preview Container */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.16))] bg-[var(--surface,#121416)] shadow-2xl transition-all duration-500 hover:border-[var(--accent,#ff5a2a)]/40 lg:aspect-[4/4.8]">
              
              {/* Image Crossfade Stack */}
              <div className="relative h-full w-full overflow-hidden">
                {services.map((service, index) => {
                  const serviceImage =
                    (service as { image?: string }).image ||
                    siteImages.homeServices?.src ||
                    "/gallery/project-1.jpg";
                  const isCurrent = activeIndex === index;

                  return (
                    <Image
                      key={service.slug || index}
                      src={serviceImage}
                      alt={service.title || "Service Preview"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={index === 0}
                      className={`object-cover transition-all duration-700 ease-out ${
                        isCurrent
                          ? "scale-100 opacity-100"
                          : "scale-105 opacity-0 pointer-events-none"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Gradient Scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background,#0b0c0d)]/85 via-black/20 to-transparent" />

              {/* Bottom Information Pill */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
                  Stage 0{activeIndex + 1} / 0{services.length}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                  {services[activeIndex]?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Rows */}
          <div className="divide-y divide-[var(--border,rgba(241,239,233,0.12))] border-b border-t border-[var(--border,rgba(241,239,233,0.12))] lg:col-span-7">
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={service.slug || index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative cursor-pointer py-7 transition-colors duration-300 ${
                    isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                >
                  <Link
                    href={`/services#${service.slug}`}
                    className="relative z-10 block px-4 sm:px-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                      
                      {/* Step Number */}
                      <span
                        className={`font-mono text-sm font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--accent,#ff5a2a)]"
                            : "text-[var(--muted,#7d807e)] group-hover:text-[var(--secondary,#b8b6af)]"
                        }`}
                      >
                        {service.number || `0${index + 1}`}
                      </span>

                      {/* Title & Smooth Accordion Description */}
                      <div className="pr-4">
                        <h3
                          className={`text-[clamp(1.4rem,2.2vw,2rem)] font-bold tracking-tight transition-colors duration-300 ${
                            isActive
                              ? "text-[var(--text,#f1efe9)]"
                              : "text-[var(--muted,#7d807e)] group-hover:text-[var(--text,#f1efe9)]"
                          }`}
                        >
                          {service.title}
                        </h3>

                        <div
                          className={`grid transition-all duration-300 ease-out ${
                            isActive
                              ? "mt-2 grid-rows-[1fr] opacity-100"
                              : "mt-0 grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <p className="overflow-hidden text-sm leading-relaxed text-[var(--secondary,#b8b6af)]">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Arrow */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-[var(--accent,#ff5a2a)] bg-[var(--accent,#ff5a2a)] text-white shadow-[0_0_15px_rgba(255,90,42,0.4)]"
                            : "border-[var(--border,rgba(241,239,233,0.14))] text-[var(--muted,#7d807e)] group-hover:border-[var(--border,rgba(241,239,233,0.3))] group-hover:text-[var(--text,#f1efe9)]"
                        }`}
                      >
                        <ArrowUpRight
                          size={18}
                          className={`transition-transform duration-300 ${
                            isActive ? "-translate-y-0.5 translate-x-0.5" : ""
                          }`}
                        />
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