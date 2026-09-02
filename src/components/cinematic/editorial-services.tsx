"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/data/site-images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Core High-Impact Services matched 1:1 to Left Visual Height
const curatedServices = [
  {
    id: "01",
    slug: "3d-spatial-architecture",
    title: "3D Spatial Architecture",
    description:
      "Bespoke pavilion modeling, lighting studies, and structural flow simulation for complex exhibition footprints.",
    image: siteImages.homeServices?.src || "/gallery/project-1.jpg",
    meta: "Concept & CAD Renders",
  },
  {
    id: "02",
    slug: "turnkey-modular-fabrication",
    title: "Precision Workshop Build",
    description:
      "Off-site modular fabrication using industrial-grade steel, architectural woodwork, and custom light integrations.",
    image: siteImages.servicesHero?.src || "/gallery/1.3.jpg",
    meta: "In-House Manufacturing",
  },
  {
    id: "03",
    slug: "on-site-venue-deployment",
    title: "On-Site Fast Deployment",
    description:
      "Zero-delay dry-run assembly protocols with electrical approvals and round-the-clock venue oversight.",
    image: siteImages.homeHero?.src || "/gallery/4.png",
    meta: "12–24h Handover",
  },
  {
    id: "04",
    slug: "experiential-brand-tech",
    title: "Experiential & Brand Tech",
    description:
      "Interactive media walls, dynamic luminaire programming, and seamless attendee engagement architecture.",
    image: siteImages.homeCta?.src || "/gallery/project-4.jpeg",
    meta: "Smart Spatial Tech",
  },
];

export function EditorialServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white border-b border-[var(--border,rgba(241,239,233,0.12))]"
    >
      {/* Top Ambient Glow */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header Grid: Strictly Balanced */}
        <div
          ref={headerRef}
          className="grid gap-8 border-b border-[var(--border,rgba(241,239,233,0.12))] pb-10 lg:grid-cols-12 lg:items-end"
        >
          {/* Left Title */}
          <div className="lg:col-span-7">
            <div className="serv-anim inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
              <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
              <span>Turnkey Execution</span>
            </div>

            <h2 className="serv-anim mt-4 text-[clamp(2.2rem,4.2vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1.5">
                One studio from sketch
                {/* Glowing Accent Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent shadow-[0_0_10px_rgba(255,90,42,0.5)]"
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
              Integrated spatial engineering designed to eliminate vendor fragmentation. Every phase is calibrated for structural precision and live exhibition impact.
            </p>
          </div>
        </div>

        {/* 1:1 Height-Balanced Content Grid (5 Cols Image : 7 Cols Rows) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Sticky Image Canvas (Locked to exact aspect ratio) */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[460px] w-full overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] shadow-2xl transition-colors duration-500 hover:border-[var(--accent,#ff5a2a)]/40">
              
              {/* Image Crossfade Stack */}
              <div className="relative h-full w-full overflow-hidden">
                {curatedServices.map((service, index) => {
                  const isCurrent = activeIndex === index;

                  return (
                    <div
                      key={service.slug}
                      className={`absolute inset-0 transition-all duration-700 ease-out will-change-transform ${
                        isCurrent
                          ? "scale-100 opacity-100 z-10"
                          : "scale-105 opacity-0 pointer-events-none z-0"
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Scrim Mask */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Bottom Meta Pill */}
              <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
                  Phase 0{activeIndex + 1} / 0{curatedServices.length}
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                  {curatedServices[activeIndex]?.meta}
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Service Rows (Height Exactly Matches Image) */}
          <div className="flex flex-col justify-between divide-y divide-[var(--border,rgba(241,239,233,0.1))] rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] lg:col-span-7">
            {curatedServices.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={service.slug}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative flex-1 cursor-pointer p-6 transition-all duration-300 first:rounded-t-2xl last:rounded-b-2xl ${
                    isActive
                      ? "bg-[var(--elevated,#191c1f)]"
                      : "hover:bg-[var(--elevated,#191c1f)]/50"
                  }`}
                >
                  {/* Active Left Line Indicator */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[2.5px] bg-[var(--accent,#ff5a2a)] transition-all duration-300 ${
                      isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                  />

                  <Link
                    href={`/services#${service.slug}`}
                    className="relative z-10 flex h-full flex-col justify-center"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        {/* Numerical Identifier */}
                        <span
                          className={`font-mono text-sm font-bold transition-colors duration-200 ${
                            isActive
                              ? "text-[var(--accent,#ff5a2a)]"
                              : "text-[var(--muted,#7d807e)] group-hover:text-[var(--secondary,#b8b6af)]"
                          }`}
                        >
                          {service.id}
                        </span>

                        <div>
                          {/* Service Title */}
                          <h3
                            className={`text-lg font-bold tracking-tight transition-colors duration-200 sm:text-xl ${
                              isActive
                                ? "text-[var(--text,#f1efe9)]"
                                : "text-[var(--text,#f1efe9)]/80 group-hover:text-[var(--text,#f1efe9)]"
                            }`}
                          >
                            {service.title}
                          </h3>

                          {/* Dynamic Accordion Body */}
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isActive
                                ? "mt-2 grid-rows-[1fr] opacity-100"
                                : "mt-0 grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <p className="overflow-hidden text-xs font-normal leading-relaxed text-[var(--secondary,#b8b6af)] sm:text-sm">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Arrow Icon */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-[var(--accent,#ff5a2a)] bg-[var(--accent,#ff5a2a)] text-black shadow-[0_0_12px_rgba(255,90,42,0.4)]"
                            : "border-[var(--border,rgba(241,239,233,0.12))] text-[var(--muted,#7d807e)] group-hover:border-[var(--border,rgba(241,239,233,0.25))] group-hover:text-[var(--text,#f1efe9)]"
                        }`}
                      >
                        <ArrowUpRight
                          size={15}
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