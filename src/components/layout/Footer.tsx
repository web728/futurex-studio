"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Maximize2,
  X,
  Clock,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "../site";
import { company, navigation } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/studiofuturex/",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/studiofuturex",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/StudioFuturex",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/StudioFuturex/",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
      </svg>
    ),
  },
];

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
    <div className="border-b border-[var(--border,rgba(241,239,233,0.08))] py-3 last:border-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] font-mono text-[9px] font-bold text-[var(--accent,#ff5a2a)]">
            {getInitials(person.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-[var(--text,#f1efe9)]">
              {person.name}
            </p>
            <p className="truncate font-mono text-[9px] uppercase tracking-wider text-[var(--muted,#7d807e)]">
              {person.title}
            </p>
          </div>
        </div>

        {/* Action Direct Icons */}
        <div className="flex shrink-0 items-center gap-1.5">
          {person.whatsappHref && (
            <a
              href={person.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${person.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-200 hover:border-[#25D366] hover:bg-[#25D366] hover:text-black active:scale-95"
            >
              <MessageCircle size={12} />
            </a>
          )}
          <a
            href={person.phoneHref}
            aria-label={`Call ${person.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-200 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95"
          >
            <Phone size={12} />
          </a>
          <a
            href={`mailto:${person.email}`}
            aria-label={`Email ${person.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-200 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95"
          >
            <Mail size={12} />
          </a>
        </div>
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
        Locations &amp; Hubs
      </p>

      {/* Tabs */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {offices.map((office) => {
          const isActive = office.id === activeId;
          return (
            <button
              key={office.id}
              type="button"
              onClick={() => setActiveId(office.id)}
              className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[var(--accent,#ff5a2a)] text-black shadow-sm"
                  : "border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] hover:border-[var(--accent,#ff5a2a)]/40 hover:text-[var(--text,#f1efe9)]"
              }`}
            >
              {office.short || office.id}
            </button>
          );
        })}
      </div>

      {/* Address */}
      <p className="mt-3 text-xs leading-relaxed text-[var(--secondary,#b8b6af)] line-clamp-2">
        {current.address}
      </p>

      {/* Map Thumbnail Button */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMapOpen(true)}
          className="group inline-flex items-center gap-1.5 rounded-lg border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text,#f1efe9)] transition-colors hover:border-[var(--accent,#ff5a2a)] hover:text-[var(--accent,#ff5a2a)]"
        >
          <Maximize2 size={11} />
          <span>View Map</span>
        </button>

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--secondary,#b8b6af)] transition-colors hover:text-[var(--text,#f1efe9)]"
        >
          <span>Directions</span>
          <ArrowUpRight
            size={11}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      {/* Warehouses Strip */}
      {warehouses.length > 0 && (
        <div className="mt-4 border-t border-[var(--border,rgba(241,239,233,0.08))] pt-3">
          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--muted,#7d807e)]">
            Logistics Centers
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {warehouses.map((wh) => (
              <a
                key={wh.label}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  wh.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-[var(--border,rgba(241,239,233,0.08))] bg-[var(--surface,#121416)] px-2 py-0.5 font-mono text-[9px] text-[var(--secondary,#b8b6af)] transition-colors hover:border-[var(--accent,#ff5a2a)]/40 hover:text-[var(--text,#f1efe9)]"
              >
                <MapPin size={9} className="text-[var(--accent,#ff5a2a)] shrink-0" />
                <span>{wh.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Map Modal */}
      {mapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setMapOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[var(--surface,#121416)] shadow-2xl"
          >
            <iframe
              title={`Map — ${current.label}`}
              src={current.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full object-cover filter grayscale contrast-125 opacity-85"
            />
            <button
              type="button"
              onClick={() => setMapOpen(false)}
              aria-label="Close map"
              className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-[var(--accent,#ff5a2a)] hover:text-black"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent px-5 py-3.5">
              <p className="text-sm font-bold text-white">{current.label}</p>
              <p className="text-xs text-white/70 truncate">{current.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const columns = contentRef.current?.querySelectorAll(".footer-col");
      if (columns && columns.length > 0) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 88%",
              once: true,
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
      className="relative overflow-hidden border-t border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--background,#0b0c0d)] py-14 text-[var(--text,#f1efe9)] lg:py-20 select-none"
    >
      {/* Ambient Accent Radial Glow */}
      <div
        className="pointer-events-none absolute -bottom-36 left-1/2 -translate-x-1/2 h-[350px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.06)_0%,transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      {/* Typographic Studio Background Watermark */}
      <div className="pointer-events-none absolute -bottom-4 left-0 right-0 w-full flex justify-center overflow-hidden leading-none opacity-[0.025]">
        <span className="text-[12vw] font-black uppercase tracking-tight text-white whitespace-nowrap">
          FUTUREX STUDIO
        </span>
      </div>

      <div ref={contentRef} className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* 12-Column Balanced Master Grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* 1. Brand Profile & Operating Clock (4 Cols) */}
          <div className="footer-col sm:col-span-2 lg:col-span-4">
            <Logo />
            
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[var(--secondary,#b8b6af)] sm:text-sm">
              {company.positioning ||
                "Specialized spatial engineering and turnkey exhibition pavilion execution across global commercial venues."}
            </p>

            {/* Live Studio Clock & Location Tag */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] px-3.5 py-1.5 text-[11px] font-mono text-[var(--secondary,#b8b6af)] shadow-inner">
              <Clock size={12} className="text-[var(--accent,#ff5a2a)]" />
              <span>DELHI NCR / {time || "12:00 PM"} IST</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success,#66d19e)] animate-pulse" />
            </div>

            {/* Social Channels */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-200 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Structured Navigation (2 Cols) */}
          <div className="footer-col lg:col-span-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              Navigation
            </p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs font-medium">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-[var(--secondary,#b8b6af)] transition-colors duration-200 hover:text-[var(--text,#f1efe9)] w-fit"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Direct Contact Lines (3 Cols) */}
          <div className="footer-col lg:col-span-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
              Direct Inquiries
            </p>
            <div className="mt-2">
              {people.slice(0, 3).map((person) => (
                <PersonRow key={person.email} person={person} />
              ))}
            </div>
          </div>

          {/* 4. Locations & Hubs (3 Cols) */}
          <div className="footer-col sm:col-span-2 lg:col-span-3">
            <LocationsPanel />
          </div>

        </div>

        {/* Bottom Legal & Back to Top Strip */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[var(--border,rgba(241,239,233,0.1))] pt-6 text-[11px] text-[var(--muted,#7d807e)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Futurex Studio. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[var(--text,#f1efe9)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[var(--text,#f1efe9)]"
            >
              Terms of Engagement
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border,rgba(241,239,233,0.18))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] transition-all duration-200 hover:border-[var(--accent,#ff5a2a)] hover:bg-[var(--accent,#ff5a2a)] hover:text-black active:scale-95"
            >
              <ArrowUp
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}