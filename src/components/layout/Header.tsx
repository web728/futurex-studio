"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { company, navigation } from "@/data/site";
import { brandAssets } from "@/data/site-images";
import { MagneticButton } from "../motion/magnetic-button";

export function Header() {
  return <PremiumHeader />;
}

export function PremiumHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const primaryContact = company.directors?.[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll when menu opens
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 w-full max-w-full overflow-x-clip transition-all duration-300 ${
          scrolled || open
            ? "bg-[#0b0c0d]/95 backdrop-blur-2xl border-b border-white/10 shadow-lg py-3"
            : "bg-transparent border-b border-transparent py-4 lg:py-5"
        }`}
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Fixed Padding & Container Bounds */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12">
          
          {/* Logo */}
          <Link
            href="/"
            aria-label="Futurex Studio home"
            onClick={() => setOpen(false)}
            className="relative block h-8 w-28 sm:h-10 sm:w-36 lg:h-12 lg:w-44 shrink-0 transition-transform active:scale-95"
          >
            <Image
              src={brandAssets.white.src}
              alt="Futurex Studio"
              fill
              priority
              sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md shadow-inner"
          >
            {navigation.map((x) => {
              const isActive = pathname === x.href;
              return (
                <Link
                  key={x.href}
                  href={x.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 xl:px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 z-0 rounded-full bg-white/10 border border-white/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{x.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <MagneticButton
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent,#ff5a2a)] px-5 xl:px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white active:scale-95"
            >
              <Sparkles size={14} className="transition-transform duration-300 group-hover:rotate-12" />
              <span>Request Proposal</span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all active:scale-90 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 w-full max-w-full flex flex-col justify-between bg-[#0b0c0d]/98 px-5 sm:px-8 pt-24 pb-6 backdrop-blur-3xl lg:hidden h-[100dvh] overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              duration: reduce ? 0.01 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Ambient Lighting Accent */}
            <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-[var(--accent,#ff5a2a)] opacity-15 blur-[100px]" />

            {/* Mobile Navigation List */}
            <nav aria-label="Mobile navigation" className="my-auto flex flex-col gap-2 py-4 relative z-10 w-full">
              {navigation.map((x, i) => {
                const isActive = pathname === x.href;
                return (
                  <motion.div
                    key={x.href}
                    initial={reduce ? false : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.05 + i * 0.04 }}
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      href={x.href}
                      className={`group flex items-center justify-between border-b border-white/10 py-3.5 text-lg sm:text-xl font-semibold transition-colors ${
                        isActive ? "text-[var(--accent,#ff5a2a)]" : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span>{x.label}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black transition-all">
                        <ArrowUpRight size={16} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Footer CTA & Contacts */}
            <div className="mt-auto space-y-4 pt-4 border-t border-white/10 shrink-0 relative z-10 w-full">
              <Link
                onClick={() => setOpen(false)}
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent,#ff5a2a)] py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform active:scale-95 shadow-md"
              >
                <Sparkles size={16} />
                <span>Request Proposal</span>
              </Link>

              <div className="flex flex-col items-center gap-1 text-[11px] text-white/50 font-mono">
                {primaryContact?.phone && (
                  <a href={primaryContact?.phoneHref ?? company.phoneHref} className="hover:text-white transition-colors">
                    {primaryContact.phone}
                  </a>
                )}
                {primaryContact?.email && (
                  <a href={`mailto:${primaryContact.email}`} className="hover:text-white transition-colors">
                    {primaryContact.email}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}