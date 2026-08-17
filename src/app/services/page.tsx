// src/app/services/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Boxes, Hammer, Layers, PenTool, Sparkles, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA } from "@/components/CTA";
import { services } from "@/data/site";
import { siteImages } from "@/data/site-images";
import { FadeReveal } from "@/components/motion-system";
import { ServicesHeroGSAP } from "@/components/motion-system/ServicesHeroGSAP";
import { ServicesListSection } from "@/components/motion/ServicesListSection";
import { ExecutionPromiseSection } from "@/components/motion/ExecutionPromiseSection";
import { FAQSection } from "@/components/motion/FAQSection";
import { ServiceRail } from "@/components/motion/ServiceRail";
import { StallTypeSelector } from "@/components/StallTypeSelector";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceIcons = [Layers, PenTool, Boxes, Hammer, Sparkles];

// 👇 Yahan har stall type ke saamne apni /public/hdri/ waali image ka filename daal de
const stallFormats = [
  { label: "Modular booths", image: "/hdri/modular.jfif" },
  { label: "Custom-built stands", image: "/hdri/sec.jfif" },
  { label: "Double-deck structures", image: "/hdri/double-deck.jfif" },
  { label: "Portable & pop-up displays", image: "/hdri/pop-up.jfif" },
];

const servicesData = [
  {
    slug: "spatial-design",
    number: "01",
    title: "Spatial & Exhibition Design",
    description:
      "Translating brand identities into immersive physical environments that captivate audiences and maximize foot traffic.",
    includes: [
      "3D Visualizations & Walkthroughs",
      "Structural Layout Planning",
      "Material & Finish Selections",
      "Lighting & Acoustic Design",
    ],
  },
  {
    slug: "fabrication-build",
    number: "02",
    title: "Custom Fabrication & Build",
    description:
      "Precision engineering and modular construction built in-house with sustainable materials under strict quality control.",
    includes: [
      "Modular Aluminum Frameworks",
      "Custom Joinery & Millwork",
      "Eco-friendly Materials",
      "Pre-assembly Inspection",
    ],
  },
  {
    slug: "event-graphics",
    number: "03",
    title: "Brand Graphics & Signage",
    description:
      "High-impact large format printing, illuminated typography, and dynamic media integration that commands attention.",
    includes: [
      "Large Format Vinyl Printing",
      "3D LED Illuminated Logos",
      "Wayfinding Signage Systems",
      "Fabric Tension Displays",
    ],
  },
  {
    slug: "tech-integration",
    number: "04",
    title: "Interactive Tech Integration",
    description:
      "Seamlessly embedding digital experiences, touchscreens, and interactive displays to drive deeper engagement.",
    includes: [
      "Interactive Touch Walls",
      "AR / VR Experience Stations",
      "LED Video Wall Configuration",
      "Custom Event Analytics Software",
    ],
  },
  {
    slug: "logistics-handover",
    number: "05",
    title: "Turnkey Logistics & On-site Handover",
    description:
      "End-to-end management handling transport, venue permits, rapid installation, and complete handover before deadlines.",
    includes: [
      "Global Shipping & Customs Handling",
      "Venue Permit Management",
      "Overnight Site Installation",
      "Dedicated On-site Manager",
    ],
  },
  {
    slug: "dismantling-storage",
    number: "06",
    title: "Dismantling & Warehousing",
    description:
      "Careful dismantling post-event with secure storage and refurbishment options for future exhibitions globally.",
    includes: [
      "Damage-free Dismantling",
      "Climate-controlled Storage",
      "Inventory Management",
      "Asset Refurbishment",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                             */
/* -------------------------------------------------------------------------- */
export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const serviceBlocks = gsap.utils.toArray<HTMLElement>(".service-block");

      serviceBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const cardCleanupFns: (() => void)[] = [];

      serviceBlocks.forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotateX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const rotateY = gsap.quickTo(card, "rotateY", {
          duration: 0.6,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;

          rotateY((px - 0.5) * 3.5);
          rotateX((0.5 - py) * 3.5);

          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
        };

        const handleMouseLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        cardCleanupFns.push(() => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      gsap.fromTo(
        ".section-underline",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".section-underline",
            start: "top 90%",
          },
        }
      );

      if (imageRevealRef.current) {
        gsap.fromTo(
          imageRevealRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.1 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imageRevealRef.current,
              start: "top 78%",
            },
          }
        );
      }

      return () => cardCleanupFns.forEach((fn) => fn());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[var(--background)] font-body text-[var(--text)] selection:bg-[var(--accent)] selection:text-black"
    >
      {/* 🚀 GSAP MAGNETIC HERO SECTION */}
      <ServicesHeroGSAP />

      <ServiceRail
        items={services.map(({ slug, title, number }) => ({
          slug,
          title,
          number,
        }))}
      />

      {/* ⚡️ ULTRA-MODERN SERVICE CARDS LIST */}
      <ServicesListSection
        services={servicesData}
        serviceIcons={serviceIcons}
      />{/* STICKY INTERACTIVE RAIL */}
      

    {/* 🏛 COMMON FORMATS - COMPACT LUXURY SAND SECTION */}
<section className="relative z-10 rounded-t-[2.5rem] bg-[#e2ddd5] py-16 text-black shadow-2xl lg:py-20">
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <FadeReveal>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-black/70">
            <ShieldCheck size={13} className="text-[var(--accent,#ff5a2a)]" />
            <span>Standard Formats</span>
          </div>

          {/* Heading - Fixed Descender Cutoff ('g', 'p', 'y') */}
          <h2 className="font-display mt-3 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-black sm:text-3xl lg:text-4xl pb-1">
            Whatever the footprint, the execution holds.
          </h2>
        </div>
      </div>
    </FadeReveal>

    <div className="mt-8">
      <StallTypeSelector items={stallFormats} />
    </div>
  </div>
</section>

      {/* ⚡️ MODERN ANIMATED EXECUTION PROMISE SECTION */}
      <ExecutionPromiseSection />

      {/* ❓ FAQ SECTION */}
      <FAQSection />

      {/* 🖼 CINEMATIC VISUAL BREAK */}
      <section className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--background)] py-24 lg:py-36">
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={imageRevealRef}
            className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border border-[var(--border)] shadow-2xl"
          >
            <Image
              src={siteImages.servicesHero.src}
              alt={siteImages.servicesHero.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}