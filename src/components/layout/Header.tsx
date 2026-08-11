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
import { motionTokens } from "../motion/tokens";

export function Header() {
  return <PremiumHeader />;
}

export function PremiumHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Primary contact shown in the mobile drawer footer
  const primaryContact = company.directors?.[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#0b0c0d]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
       {/* Brand Logo */}
<Link
  href="/"
  aria-label="Futurex Studio home"
  className="group relative block h-[50px] w-[170px] shrink-0 transition-transform duration-300 active:scale-95 lg:h-[58px] lg:w-[190px]"
>
  <Image
    src={brandAssets.white.src}
    alt="Futurex Studio"
    fill
    priority
    sizes="(max-width: 768px) 170px, 190px"
    className="object-contain transition-opacity duration-300 group-hover:opacity-90"
  />
</Link>

        {/* Floating Glassmorphism Desktop Navigation Bar */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md shadow-inner lg:flex"
        >
          {navigation.map((x) => {
            const isActive = pathname === x.href;
            return (
              <Link
                key={x.href}
                href={x.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
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
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent,#ff5a2a)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(255,90,42,0.4)] active:scale-95"
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
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 active:scale-90 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Fullscreen Interactive Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#0b0c0d]/98 px-6 pt-28 pb-10 backdrop-blur-3xl lg:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              duration: reduce ? 0.01 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute top-1/4 right-0 h-72 w-72 rounded-full bg-[var(--accent,#ff5a2a)] opacity-10 blur-[120px]" />

            {/* Navigation Links */}
            <nav aria-label="Mobile navigation" className="space-y-2">
              {navigation.map((x, i) => (
                <motion.div
                  key={x.href}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.1 + i * 0.06 }}
                >
                  <Link
                    onClick={() => setOpen(false)}
                    href={x.href}
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-2xl font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    <span>{x.label}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[var(--accent,#ff5a2a)] group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black">
                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Info & CTA */}
            <div className="space-y-6 pt-8 border-t border-white/10">
              <Link
                onClick={() => setOpen(false)}
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent,#ff5a2a)] py-4 text-sm font-bold uppercase tracking-wider text-black transition-all active:scale-95"
              >
                <Sparkles size={16} />
                <span>Request Proposal</span>
              </Link>

              <div className="flex flex-col gap-2 text-center text-xs text-white/50 font-mono">
                <a
                  href={primaryContact?.phoneHref ?? company.phoneHref}
                  className="hover:text-white transition-colors"
                >
                  {primaryContact?.phone}
                </a>
                <a
                  href={`mailto:${primaryContact?.email ?? ""}`}
                  className="hover:text-white transition-colors"
                >
                  {primaryContact?.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}