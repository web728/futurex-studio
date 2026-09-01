"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Sparkles, MessageSquare, ArrowUpRight, FileQuestion } from "lucide-react";

interface FAQItem {
  id: string;
  category: "all" | "design" | "execution" | "pricing";
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "design",
    question: "What is your typical lead time from initial brief to 3D visualization?",
    answer:
      "Our core design phase takes 3 to 7 business days depending on scale. We deliver photorealistic 3D renders, spatial floor plans, and material specification sheets for your brand's complete sign-off.",
  },
  {
    id: "2",
    category: "execution",
    question: "Do you handle complete on-site build, logistics, and dismantle?",
    answer:
      "Yes, we operate as a 100% turnkey agency. We manage modular pre-fabrication, international freight/logistics, venue electrical approvals, fast-track on-site assembly, and eco-friendly post-event dismantling.",
  },
  {
    id: "3",
    category: "pricing",
    question: "How do you structure project pricing and scope changes?",
    answer:
      "We provide itemized, fixed-price proposals with no hidden fees. Any mid-project design scope changes are calculated against modular component rates and approved via standard change orders prior to fabrication.",
  },
  {
    id: "4",
    category: "design",
    question: "Can we request changes to the 3D pavilion designs?",
    answer:
      "Every project includes up to two complete revision rounds during the conceptual phase. We fine-tune lighting, materials, brand touchpoints, and traffic flow until it matches your brand identity.",
  },
  {
    id: "5",
    category: "execution",
    question: "How do you guarantee zero-delay deployment on tight exhibition deadlines?",
    answer:
      "Our dry-run protocol involves full test builds in our workshop prior to shipping. This eliminates fitment issues and guarantees on-site installation within 12 to 24 hours.",
  },
  {
    id: "6",
    category: "pricing",
    question: "What are your standard payment terms for custom exhibition stands?",
    answer:
      "Standard engagement terms are 50% deposit upon contract signing and design approval, 40% upon pre-fabrication workshop inspection, and 10% post-event handover at the venue.",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "design", label: "Design & 3D" },
  { id: "execution", label: "Build & On-Site" },
  { id: "pricing", label: "Pricing & Scope" },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white border-t border-[var(--border,rgba(241,239,233,0.12))]"
    >
      {/* Ambient Accent Radial Glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,90,42,0.06)_0%,transparent_75%)] blur-[140px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          
          {/* LEFT COLUMN: Header, Search & Category Filters (5 Columns) */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-5">
            <div>
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)] shadow-sm">
                <Sparkles size={11} className="text-[var(--accent,#ff5a2a)] animate-pulse" />
                <span>Frequently Asked</span>
              </div>

              {/* 2-Line Punchy Headline with Glowing Underline */}
              <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-[var(--text,#f1efe9)]">
                <span className="relative inline-block pb-1">
                  Before you brief us.
                  <span
                    className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-[var(--accent,#ff5a2a)] via-[var(--focus,#ffd2c3)] to-transparent shadow-[0_0_10px_rgba(255,90,42,0.5)]"
                    aria-hidden="true"
                  />
                </span>
                <br />
                <span className="text-[var(--secondary,#b8b6af)] font-normal text-[clamp(1.8rem,3.2vw,2.8rem)]">
                  Everything you need to know.
                </span>
              </h2>

              <p className="mt-4 text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                Clear answers regarding project scoping, visual approval rounds, turnkey fabrication, and zero-delay delivery on the show floor.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted,#7d807e)]"
              />
              <input
                type="text"
                placeholder="Search queries or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] py-3 pl-9 pr-14 text-xs font-normal text-[var(--text,#f1efe9)] placeholder-[var(--muted,#7d807e)] outline-none transition-all duration-200 focus:border-[var(--accent,#ff5a2a)] focus:ring-1 focus:ring-[var(--accent,#ff5a2a)] shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--muted,#7d807e)] hover:text-[var(--accent,#ff5a2a)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[var(--accent,#ff5a2a)] text-black shadow-[0_0_15px_rgba(255,90,42,0.35)]"
                        : "border border-[var(--border,rgba(241,239,233,0.1))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] hover:border-[var(--accent,#ff5a2a)]/40 hover:text-[var(--text,#f1efe9)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Direct Engineering Query Box */}
            <div className="rounded-2xl border border-[var(--border,rgba(241,239,233,0.1))] bg-[var(--surface,#121416)] p-5 shadow-lg">
              <div className="flex items-center gap-2 text-[var(--text,#f1efe9)]">
                <MessageSquare size={14} className="text-[var(--accent,#ff5a2a)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Specific Technical Question?
                </span>
              </div>
              <p className="mt-2 text-xs font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                Need customized floorplan approvals or electrical load calculations? Speak directly with our spatial design engineers.
              </p>
              <Link
                href="/contact"
                className="group mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent,#ff5a2a)] transition-all hover:gap-2"
              >
                <span>Talk to Spatial Team</span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion Matrix (7 Columns) */}
          <div className="divide-y divide-[var(--border,rgba(241,239,233,0.1))] rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] shadow-xl overflow-hidden lg:col-span-7">
            {filteredFaqs.length === 0 ? (
              <div className="py-16 text-center">
                <FileQuestion size={24} className="mx-auto mb-2 text-[var(--muted,#7d807e)]" />
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--secondary,#b8b6af)]">
                  No matching answers found for &ldquo;{searchQuery}&rdquo;
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <article
                    key={faq.id}
                    className={`group relative transition-colors duration-200 ${
                      isOpen ? "bg-[var(--elevated,#191c1f)]/80" : "hover:bg-[var(--elevated,#191c1f)]/40"
                    }`}
                  >
                    {/* Active Left Vertical Accent Line */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-[2.5px] bg-[var(--accent,#ff5a2a)] transition-all duration-300 ${
                        isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                      }`}
                    />

                    {/* Accordion Trigger Button */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6 cursor-pointer"
                    >
                      <div className="flex items-baseline gap-3.5 sm:gap-5">
                        <span className="font-mono text-xs font-bold text-[var(--accent,#ff5a2a)] shrink-0">
                          0{faq.id}
                        </span>

                        <h3
                          className={`text-base font-bold tracking-tight transition-colors duration-200 sm:text-lg ${
                            isOpen ? "text-[var(--text,#f1efe9)]" : "text-[var(--text,#f1efe9)]/85 group-hover:text-[var(--text,#f1efe9)]"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      {/* Rotating Plus / Cross Toggle */}
                      <div
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-[var(--accent,#ff5a2a)] bg-[var(--accent,#ff5a2a)] text-black rotate-45 shadow-[0_0_12px_rgba(255,90,42,0.4)]"
                            : "border-[var(--border,rgba(241,239,233,0.14))] text-[var(--secondary,#b8b6af)] group-hover:border-[var(--accent,#ff5a2a)]/50 group-hover:text-[var(--text,#f1efe9)]"
                        }`}
                      >
                        <Plus size={14} />
                      </div>
                    </button>

                    {/* Pure CSS Grid Smooth Height Toggle (Zero Framer Motion Lag) */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-10 pr-5 sm:pl-14 sm:pr-8">
                          <p className="text-sm font-normal leading-relaxed text-[var(--secondary,#b8b6af)]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

        </div>
      </div>
    </section>
  );
}