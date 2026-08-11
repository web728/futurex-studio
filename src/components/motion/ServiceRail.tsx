"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ServiceRailItem {
  slug: string;
  title: string;
  number: string;
}

interface ServiceRailProps {
  items: ServiceRailItem[];
}

/* Custom Ultra-Sharp Premium Tech Icons */
const CyberStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-black">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const CrosshairIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3 text-[#FF5A2A]">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
  </svg>
);

const CornerBracket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-2 text-white/50">
    <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v-6h-6" />
  </svg>
);

export function ServiceRail({ items }: ServiceRailProps) {
  const [active, setActive] = useState<string>(items[0]?.slug || "");
  const railContainerRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef<boolean>(false);

  const scrollToActiveBtn = useCallback((slug: string) => {
    const activeBtn = document.getElementById(`rail-btn-${slug}`);
    if (activeBtn && railContainerRef.current) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentSlug = entry.target.id;
            setActive(currentSlug);
            scrollToActiveBtn(currentSlug);
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -50% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, scrollToActiveBtn]);

  const handleClick = (slug: string) => {
    setActive(slug);
    scrollToActiveBtn(slug);

    const element = document.getElementById(slug);
    if (element) {
      isManualScrolling.current = true;
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });

      setTimeout(() => {
        isManualScrolling.current = false;
      }, 700);
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full overflow-hidden border-b border-white/10 bg-[#060709]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
      
  
      {/* 2. Ultra-Premium Cross Ticker Stage */}
      <div className="relative h-24 my-2 overflow-hidden pointer-events-none select-none flex items-center justify-center">
        
        {/* Background Radial Glow */}
        <div className="absolute size-64 bg-[#FF5A2A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ribbon 2 (Dark Cyber Ribbon - Diagonal Bottom Layer) */}
        <div className="absolute w-[120%] rotate-2 bg-[#0d0f14] text-[#FF5A2A] py-3 border-y border-[#FF5A2A]/40 shadow-2xl z-10">
          <div className="flex w-max animate-ticker-right whitespace-nowrap items-center font-mono font-bold text-xs tracking-[0.25em] uppercase">
            {/* Duplicated 4x for continuous infinite loop without gaps */}
            {Array.from({ length: 4 }).flatMap(() =>
              items.map((item, idx) => (
                <div key={`dark-ribbon-${idx}-${Math.random()}`} className="flex items-center">
                  <span className="px-6 flex items-center gap-3">
                    <CrosshairIcon />
                    <span className="text-white/90 font-sans font-black">{item.title}</span>
                  </span>
                  <CornerBracket />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ribbon 1 (Accent Orange Ribbon - Diagonal Top Layer) */}
        <div className="absolute w-[120%] -rotate-2 bg-[#FF5A2A] text-black py-3 shadow-[0_10px_40px_rgba(255,90,42,0.4)] z-20 border-y border-black/20">
          <div className="flex w-max animate-ticker-left whitespace-nowrap items-center font-black text-xs sm:text-sm tracking-widest uppercase">
            {/* Duplicated 4x for continuous infinite loop without gaps */}
            {Array.from({ length: 4 }).flatMap(() =>
              items.map((item, idx) => (
                <div key={`orange-ribbon-${idx}-${Math.random()}`} className="flex items-center">
                  <span className="px-6 flex items-center gap-3">
                    <span className="font-mono text-[10px] bg-black/10 px-1.5 py-0.5 rounded font-black">
                      {item.number}
                    </span>
                    <span className="text-black">{item.title}</span>
                  </span>
                  <CyberStar />
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        @keyframes ticker-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes ticker-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-ticker-left {
          animation: ticker-left 22s linear infinite;
        }

        .animate-ticker-right {
          animation: ticker-right 26s linear infinite;
        }
      `}</style>
    </div>
  );
}