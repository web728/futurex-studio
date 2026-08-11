"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Spatial Pavilion 2025",
    category: "Architecture & 3D",
    image: "/gallery.img-1.jpeg",
    year: "2025",
  },
  {
    id: "02",
    title: "Aura Kinetic Lounge",
    category: "Interior & Experiential",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: "03",
    title: "Vortex Stage Setup",
    category: "Fabrication & Live",
    image: "https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
  },
  {
    id: "04",
    title: "Lumina Minimalist Villa",
    category: "Concept & Planning",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
  },
];

export function CinematicProjectsTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      // 1. Horizontal Scroll Pinning Effect
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      // 2. Track Progress Line Scale
      if (progressLineRef.current) {
        pinTimeline.to(
          progressLineRef.current,
          {
            scaleX: 1,
            ease: "none",
          },
          0
        );
      }

      // 3. Parallax Effect on Inner Images
      const projectImages = track.querySelectorAll(".project-img");
      projectImages.forEach((img) => {
        gsap.to(img, {
          x: "-12%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0d0e0e] text-white"
    >
      {/* Header Bar inside Pinned Section */}
      <div className="absolute left-0 top-12 z-20 flex w-full items-end justify-between px-6 lg:px-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff5a2a]">
            Selected Works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight lg:text-5xl">
            Cinematic Endeavors
          </h2>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="hidden w-48 flex-col items-end gap-2 lg:flex">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            Swipe Progress
          </span>
          <div className="h-[2px] w-full overflow-hidden bg-white/10">
            <div
              ref={progressLineRef}
              className="h-full w-full origin-left bg-[#ff5a2a] scale-x-0"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Track Wrapper */}
      <div className="flex h-screen items-center">
        <div
          ref={trackRef}
          className="flex gap-8 pl-6 pr-16 pt-20 will-change-transform lg:gap-12 lg:pl-16"
        >
          {FEATURED_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="group relative h-[65vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#161817] sm:w-[55vw] lg:h-[70vh] lg:w-[38vw]"
            >
              {/* Inner Parallax Image Wrapper */}
              <div className="absolute inset-0 h-full w-[120%] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="project-img object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                  sizes="(max-width: 1200px) 80vw, 40vw"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>

              {/* Glassmorphic Shadow Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Card Meta Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-white/50">
                    [{project.id}]
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-md">
                    {project.year}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#ff5a2a]">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white lg:text-4xl">
                    {project.title}
                  </h3>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:border-[#ff5a2a] hover:bg-[#ff5a2a]"
                    >
                      View Case Study
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}