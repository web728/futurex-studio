"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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
    question: "What is your typical lead time from initial concept to 3D visualization?",
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
      "Absolutely. Every project includes up to two complete revision rounds during the conceptual phase. We fine-tune lighting, materials, brand touchpoints, and flow dynamics until it matches your brand identity.",
  },
  {
    id: "5",
    category: "execution",
    question: "How do you guarantee zero-delay deployment on tight exhibition deadlines?",
    answer:
      "Our 'dry-run' protocol involves full test builds in our fabrication facility prior to shipping. This eliminates fitment issues and guarantees on-site installation within 12 to 24 hours.",
  },
  {
    id: "6",
    category: "pricing",
    question: "What are your payment terms for custom exhibition stands?",
    answer:
      "Standard engagement terms are 50% deposit upon contract signing and design approval, 40% upon pre-fabrication inspection completion, and 10% post-event handover at the venue.",
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
  const layoutGroupId = useId();

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

  const headingWords = "Before you brief us.".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 16 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  } as const;

  return (
    <section className="relative z-10 overflow-hidden border-t border-[var(--border)] bg-[var(--background)] py-14 text-[var(--text)] sm:py-20 lg:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--accent)]/[0.03] blur-[140px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          
          {/* LEFT COLUMN: Header & Category Filters */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.div 
                variants={wordVariants}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--accent)]"
              >
                <Sparkles size={11} className="animate-pulse" />
                <span>Frequently Asked</span>
              </motion.div>

              {/* Heading with Descender Fix */}
              <h2 className="font-display text-3xl font-normal leading-snug tracking-tight sm:text-4xl lg:text-5xl pb-1">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className={`inline-block mr-2 ${
                      word.toLowerCase().includes("brief")
                        ? "font-light italic text-[var(--secondary)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                variants={wordVariants}
                className="max-w-md text-xs font-light leading-relaxed text-[var(--secondary)] sm:text-sm"
              >
                Clear, itemized answers regarding scoping, visual approvals, turnkey fabrication, and zero-delay execution timelines.
              </motion.p>
            </motion.div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--secondary)]" />
              <input
                type="text"
                placeholder="Search topics or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-[var(--border)] bg-transparent py-2.5 pl-9 pr-12 text-xs font-light text-[var(--text)] placeholder-[var(--secondary)] outline-none transition-colors duration-300 focus:border-[var(--accent)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-wider text-[var(--secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <LayoutGroup id={layoutGroupId}>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-3 py-1 font-mono text-[11px] transition-colors duration-300 ${
                        isActive
                          ? "font-semibold text-black"
                          : "text-[var(--secondary)] hover:text-[var(--text)]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="faq-active-pill-editorial"
                          className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(255,90,42,0.3)]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Quick Help Link */}
            <div className="pt-4 border-t border-[var(--border)]/40">
              <div className="flex items-center gap-2 text-[var(--secondary)]">
                <MessageSquare size={14} className="text-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text)]">Direct Technical Query?</span>
              </div>
              <p className="mt-1.5 text-xs font-light leading-relaxed text-[var(--secondary)]">
                Need venue floorplan approvals or electrical specs? Speak directly with our spatial design engineers.
              </p>
              <a
                href="/contact"
                className="group mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)] transition-all hover:gap-2"
              >
                <span>Talk to Spatial Team</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion List */}
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredFaqs.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="py-12 text-center"
                >
                  <FileQuestion size={22} className="mx-auto mb-2 text-[var(--secondary)]/60" />
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--secondary)]">
                    No matching answers found for &ldquo;{searchQuery}&rdquo;
                  </p>
                </motion.div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openId === faq.id;
                  return (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.02 }}
                      className={`group relative transition-colors duration-300 ${
                        isOpen ? "bg-[var(--surface)]/20" : "hover:bg-[var(--surface)]/10"
                      }`}
                    >
                      {/* Left Accent Indicator */}
                      <motion.div
                        initial={false}
                        animate={{
                          scaleY: isOpen ? 1 : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent)] origin-center"
                      />

                      {/* Question Trigger Button */}
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="flex w-full items-start justify-between gap-4 py-5 px-3 text-left sm:px-5 lg:py-6"
                      >
                        <div className="flex items-baseline gap-3 sm:gap-5">
                          <span className="font-mono text-xs font-semibold text-[var(--accent)] shrink-0">
                            {faq.id.padStart(2, "0")}
                          </span>
                          {/* Question Title with Descender Fix */}
                          <h3
                            className={`font-display text-base font-medium leading-snug tracking-tight transition-colors duration-300 sm:text-lg pb-0.5 ${
                              isOpen ? "text-[var(--text)]" : "text-[var(--text)]/80 group-hover:text-[var(--text)]"
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>

                        {/* Plus/Cross Icon */}
                        <div className="mt-0.5 shrink-0">
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${
                              isOpen
                                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                                : "border-[var(--border)] text-[var(--secondary)] group-hover:border-[var(--accent)]/40 group-hover:text-[var(--text)]"
                            }`}
                          >
                            <Plus size={14} />
                          </motion.div>
                        </div>
                      </button>

                      {/* Answer Reveal */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.2, delay: 0.08 },
                              },
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.12 },
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              initial={{ y: 4 }}
                              animate={{ y: 0 }}
                              exit={{ y: -4 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="pb-5 pl-10 pr-4 sm:pl-14 sm:pr-6"
                            >
                              <p className="max-w-2xl text-xs font-light leading-relaxed text-[var(--secondary)] sm:text-sm">
                                {faq.answer}
                              </p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}