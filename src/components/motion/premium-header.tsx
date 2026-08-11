"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { company, navigation } from "@/data/site";
import { brandAssets } from "@/data/site-images";
import { MagneticButton } from "./magnetic-button";
import { motionTokens } from "./tokens";

export function PremiumHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
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
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${scrolled || open ? "border-white/10 bg-[#0b0c0d]/95 backdrop-blur-xl" : "border-transparent bg-[#0b0c0d]/80"}`}
      initial={reduce ? false : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: motionTokens.ease }}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="Futurex Studio home"
          className="relative block h-[62px] w-[208px] shrink-0"
        >
          <Image
            src={brandAssets.white.src}
            alt="Futurex Studio"
            fill
            priority
            sizes="208px"
            className="object-contain"
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigation.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              aria-current={pathname === x.href ? "page" : undefined}
              className="group relative py-3 text-[13px] font-semibold text-white/70 transition hover:text-white"
            >
              <span>{x.label}</span>
              <span
                className={`absolute inset-x-0 bottom-1 h-px origin-left bg-[var(--accent)] transition-transform duration-300 ${pathname === x.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </Link>
          ))}
        </nav>
        <MagneticButton
          href="/contact"
          className="hidden bg-[var(--accent)] px-5 py-3 text-sm font-bold text-black transition hover:bg-[var(--accent-hover)] lg:block"
        >
          Request a proposal
        </MagneticButton>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="relative z-10 grid size-11 place-items-center border border-white/20 lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-20 min-h-[calc(100svh-5rem)] overflow-y-auto bg-[#0b0c0d] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{
              duration: reduce ? 0.01 : 0.55,
              ease: motionTokens.ease,
            }}
          >
            <div className="container grid min-h-[calc(100svh-5rem)] content-between py-10">
              <nav aria-label="Mobile navigation">
                {navigation.map((x, i) => (
                  <motion.div
                    key={x.href}
                    initial={reduce ? false : { opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.15 + i * 0.055 }}
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      href={x.href}
                      className="flex items-center justify-between border-b border-white/10 py-4 text-[clamp(1.9rem,9vw,3rem)] font-semibold"
                    >
                      <span>{x.label}</span>
                      <ArrowUpRight size={20} className="text-white/35" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
         <div className="grid gap-3 border-t border-white/10 py-7 text-sm text-white/55">
  {company.directors?.[0] && (
    <>
      <a href={company.directors[0].phoneHref || `tel:${company.directors[0].phone.replace(/\s+/g, "")}`}>
        {company.directors[0].phone}
      </a>
      <a href={`mailto:${company.directors[0].email}`}>
        {company.directors[0].email}
      </a>
    </>
  )}
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
