"use client";

import { useEffect, useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyFuturexSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "One coordinated partner",
      desc: "Single point of accountability from conceptual drawings to show floor delivery.",
    },
    {
      title: "Customised, brand-first design",
      desc: "Spatial architecture tailored to your specific commercial positioning and footfall goals.",
    },
    {
      title: "Visual review before build",
      desc: "Photorealistic 3D simulations ensuring zero guesswork prior to factory fabrication.",
    },
    {
      title: "Design-to-execution control",
      desc: "Integrated workshop precision ensuring final physical dimensions match the initial design.",
    },
    {
      title: "Complete venue compliance",
      desc: "Full structural calculations, power distribution planning, and organizer sign-offs.",
    },
    {
      title: "Visitor-centric spatial layout",
      desc: "Thoughtfully mapped sightlines, interactive focal zones, and fluid crowd circulation.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftItems = leftColRef.current?.querySelectorAll(".why-anim-left");
      if (leftItems && leftItems.length > 0) {
        gsap.fromTo(
          leftItems,
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

      const cards = rightGridRef.current?.querySelectorAll(".why-card-item");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: rightGridRef.current,
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
      id="why-futurex"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-14 lg:py-20 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white"
    >
      {/* Top Divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border,rgba(241,239,233,0.18))] to-transparent opacity-60" />

      {/* MATCHING ORANGE GRADIENT: Bottom-Left Half Circle Orb */}
      <div
        className="pointer-events-none absolute -bottom-36 -left-36 z-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.22)_0%,rgba(255,130,92,0.08)_45%,transparent_75%)] blur-[70px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Heading */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-4">
            <div className="why-anim-left inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--elevated,#191c1f)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              <Sparkles size={12} className="text-[var(--accent,#ff5a2a)]" />
              <span>Why Futurex Studio</span>
            </div>

            <h2 className="why-anim-left text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
              <span className="relative inline-block pb-1">
                Fewer handoffs.
                <span
                  className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent"
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-[var(--secondary,#b8b6af)]">
                Clearer build intent.
              </span>
            </h2>

            <p className="why-anim-left max-w-md text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
              We eliminate communication gaps by keeping 3D design, engineering strategy, fabrication, and on-site build under one continuous line of control.
            </p>

            <div className="why-anim-left pt-1">
              <div className="inline-flex items-center gap-3 border-l-2 border-[var(--accent,#ff5a2a)] pl-3.5">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--secondary,#b8b6af)]">
                  Turnkey Excellence · 100% In-House Oversight
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2x3 Feature Grid */}
          <div ref={rightGridRef} className="lg:col-span-7">
            <div className="grid gap-3.5 sm:grid-cols-2">
              {features.map((item, index) => (
                <div
                  key={item.title}
                  className="why-card-item group relative flex flex-col justify-between rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--background,#0b0c0d)]/60 p-5 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-[var(--elevated,#191c1f)] hover:-translate-y-0.5 shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 text-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black">
                        <Check size={14} strokeWidth={2.5} />
                      </div>

                      <span className="font-mono text-xs font-bold text-[var(--muted,#7d807e)] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-sm font-bold text-[var(--text,#f1efe9)] transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--secondary,#b8b6af)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}