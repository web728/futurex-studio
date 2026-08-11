"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Maximize2,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "../site";
import { company, navigation } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom inline SVG icons
const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/studiofuturex/",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/studiofuturex",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/StudioFuturex",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/StudioFuturex/",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
      </svg>
    ),
  },
];

function MagneticLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3;
    const y = (e.clientY - (top + height / 2)) * 0.3;

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type Person = {
  name: string;
  title: string;
  phone: string;
  phoneHref: string;
  whatsappHref?: string;
  email: string;
};

function PersonRow({ person }: { person: Person }) {
  return (
    <div className="border-b border-[var(--border,rgba(241,239,233,0.1))] py-2.5 last:border-0">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.15))] bg-[var(--surface,#121416)] font-mono text-[10px] font-bold text-[var(--accent,#ff5a2a)]">
          {getInitials(person.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-[var(--text,#f1efe9)]">
            {person.name}
          </p>
          <p className="truncate font-mono text-[9px] uppercase tracking-wider text-[var(--muted,#7d807e)]">
            {person.title}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {person.whatsappHref && (
          <MagneticLink>
            <a
              href={person.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${person.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-90"
            >
              <MessageCircle size={12} />
            </a>
          </MagneticLink>
        )}
        <MagneticLink>
          <a
            href={person.phoneHref}
            aria-label={`Call ${person.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-90"
          >
            <Phone size={12} />
          </a>
        </MagneticLink>
        <MagneticLink>
          <a
            href={`mailto:${person.email}`}
            aria-label={`Email ${person.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-90"
          >
            <Mail size={12} />
          </a>
        </MagneticLink>
      </div>
    </div>
  );
}

function LocationsPanel() {
  const offices = company.offices ?? [];
  const warehouses = company.warehouses ?? [];
  const [activeId, setActiveId] = useState(offices[0]?.id);
  const [mapOpen, setMapOpen] = useState(false);
  const current = offices.find((o) => o.id === activeId) ?? offices[0];

  useEffect(() => {
    if (!mapOpen) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setMapOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mapOpen]);

  if (!current) return null;

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    current.address
  )}`;

  return (
    <div className="min-w-0">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
        Locations
      </p>

      {/* Tabs */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {offices.map((office) => {
          const isActive = office.id === activeId;
          const isDelhi =
            office.short?.toLowerCase().includes("delhi") ||
            office.label?.toLowerCase().includes("delhi") ||
            office.address?.toLowerCase().includes("delhi");

          return (
            <button
              key={office.id}
              onClick={() => setActiveId(office.id)}
              aria-pressed={isActive}
              className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive
                  ? "text-black"
                  : "border border-[var(--border,rgba(241,239,233,0.15))] text-[var(--secondary,#b8b6af)] hover:text-[var(--text,#f1efe9)]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeOfficePill"
                  className="absolute inset-0 z-0 rounded-full bg-[var(--accent,#ff5a2a)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{office.short}</span>
              {isDelhi && (
                <span
                  className={`relative z-10 rounded px-1 py-0.5 text-[8px] font-extrabold tracking-tight ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-[var(--accent,#ff5a2a)] text-black"
                  }`}
                >
                  Head Office
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Address */}
      <motion.p
        key={current.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-3 text-[11px] leading-relaxed text-[var(--secondary,#b8b6af)]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {current.address}
      </motion.p>

      {/* Small map thumbnail */}
      <button
        type="button"
        onClick={() => setMapOpen(true)}
        aria-label={`Expand map for ${current.label}`}
        className="group relative mt-2.5 block h-20 w-full overflow-hidden rounded-xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)]"
      >
        <iframe
          key={current.id}
          title={`Map — ${current.label}`}
          src={current.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          className="pointer-events-none h-full w-full grayscale invert-[0.92] contrast-[0.85] brightness-90 hue-rotate-180 transition-all duration-500 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:hue-rotate-0"
        />
        <span className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
        <span className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md">
          <Maximize2 size={10} />
        </span>
      </button>

      <div className="mt-2 flex items-center gap-3">
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text,#f1efe9)] transition-colors duration-300 hover:text-[var(--accent,#ff5a2a)]"
        >
          <span>Directions</span>
          <ArrowUpRight
            size={10}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* Warehouses */}
      {warehouses.length > 0 && (
        <div className="mt-3 border-t border-[var(--border,rgba(241,239,233,0.1))] pt-2.5">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted,#7d807e)]">
            Warehouses
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {warehouses.map((wh) => (
              <a
                key={wh.label}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  wh.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title={wh.address}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--border,rgba(241,239,233,0.12))] px-2 py-0.5 text-[9px] text-[var(--secondary,#b8b6af)] transition-colors duration-300 hover:border-[var(--accent,#ff5a2a)] hover:text-[var(--text,#f1efe9)]"
              >
                <MapPin size={9} className="shrink-0 text-[var(--accent,#ff5a2a)]" />
                <span className="whitespace-nowrap">{wh.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Expanded map modal */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface,#121416)] sm:aspect-video"
            >
              <iframe
                title={`Map — ${current.label}`}
                src={current.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
              <button
                onClick={() => setMapOpen(false)}
                aria-label="Close map"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-[var(--accent,#ff5a2a)] hover:text-black"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                <p className="text-sm font-semibold text-white">{current.label}</p>
                <p className="text-xs text-white/70">{current.address}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { yPercent: 15, opacity: 0.01 },
          {
            yPercent: -10,
            opacity: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      if (contentRef.current) {
        const columns = contentRef.current.querySelectorAll(".footer-col");
        gsap.fromTo(
          columns,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const people: Person[] = [...(company.directors ?? []), ...(company.marketing ?? [])];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--background,#0b0c0d)] py-8 text-[var(--text,#f1efe9)] lg:py-12 select-none"
    >
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full bg-[var(--accent,#ff5a2a)] opacity-[0.05] blur-[140px]" />

      {/* Watermark Section */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute bottom-1 left-0 right-0 w-full flex justify-center overflow-hidden leading-none opacity-[0.03] will-change-transform px-4"
      >
        <span className="text-[11vw] font-black uppercase tracking-tight text-[var(--text,#f1efe9)] whitespace-nowrap text-center max-w-full">
          FUTUREX STUDIO
        </span>
      </div>

      <div ref={contentRef} className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
         {/* Brand Column */}
<div className="footer-col min-w-0 sm:col-span-2 lg:col-span-4 bg-transparent! p-0! border-none! shadow-none!">
  <Logo />
  <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--secondary,#b8b6af)]">
    {company.positioning}
  </p>
</div>

          {/* Navigation Links Column */}
          <div className="footer-col min-w-0 lg:col-span-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              Navigate
            </p>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              {navigation.map((item) => (
                <MagneticLink key={item.href} className="w-fit">
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[var(--secondary,#b8b6af)] transition-colors duration-300 hover:text-[var(--text,#f1efe9)]"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </MagneticLink>
              ))}
            </div>
          </div>

          {/* People Column */}
          <div className="footer-col min-w-0 lg:col-span-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              Talk to us
            </p>
            <div className="mt-1">
              {people.map((person) => (
                <PersonRow key={person.email} person={person} />
              ))}
            </div>
          </div>

          {/* Locations Column */}
          <div className="footer-col sm:col-span-2 lg:col-span-3">
            <LocationsPanel />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[var(--border,rgba(241,239,233,0.12))] pt-4 text-[11px] text-[var(--muted,#7d807e)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Futurex Studio. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-[var(--text,#f1efe9)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[var(--text,#f1efe9)]"
            >
              Terms of Service
            </Link>

            <MagneticLink>
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] transition-all duration-300 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-90"
              >
                <ArrowUp
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </button>
            </MagneticLink>
          </div>
        </div>
      </div>
    </footer>
  );
}