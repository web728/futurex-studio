"use client";

import React, { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, Building, UserCheck } from "lucide-react";
import { company } from "@/data/site";
import { MagneticCard } from "./magnetic-card";
import { motion, AnimatePresence } from "framer-motion";

interface ContactPerson {
  name: string;
  title: string;
  phone: string;
  phoneHref?: string;
  email: string;
}

const PersonCard = ({ person }: { person: ContactPerson }) => {
  const phoneHref = person.phoneHref || `tel:${person.phone.replace(/\s+/g, "")}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[var(--accent)]">
          <UserCheck size={20} />
        </span>
        <div>
          <strong className="block text-base font-semibold text-white">{person.name}</strong>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">{person.title}</span>
        </div>
      </div>

      <div className="mt-5 space-y-3.5">
        <a href={phoneHref} className="group flex items-center gap-3.5 rounded-lg border border-white/5 bg-white/[0.01] p-3 transition-colors hover:border-[var(--accent)]/30 hover:bg-white/[0.03]">
          <Phone size={15} className="text-white/40 transition-colors group-hover:text-[var(--accent)]" />
          <span className="font-mono text-xs text-white/70 transition-colors group-hover:text-white">{person.phone}</span>
          <ArrowUpRight size={14} className="ml-auto opacity-0 transition-all group-hover:opacity-100 group-hover:text-[var(--accent)]" />
        </a>
        <a href={`mailto:${person.email}`} className="group flex items-center gap-3.5 rounded-lg border border-white/5 bg-white/[0.01] p-3 transition-colors hover:border-[var(--accent)]/30 hover:bg-white/[0.03]">
          <Mail size={15} className="text-white/40 transition-colors group-hover:text-[var(--accent)]" />
          <span className="font-mono text-xs text-white/70 transition-colors group-hover:text-white">{person.email}</span>
          <ArrowUpRight size={14} className="ml-auto opacity-0 transition-all group-hover:opacity-100 group-hover:text-[var(--accent)]" />
        </a>
      </div>
    </div>
  );
};

export function ContactSidebar() {
  const offices = company.offices || [];
  const warehouses = company.warehouses || [];
  const [selectedOffice, setSelectedOffice] = useState(offices[0] || null);

  const keyContacts: ContactPerson[] = [
    ...(company.directors || []),
    ...(company.marketing || []),
  ];

  return (
    <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start lg:space-y-12">
      {/* Key Management */}
      {keyContacts.length > 0 && (
        <section>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">Key Management</p>
          <div className="mt-6 space-y-6">
            {keyContacts.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </section>
      )}

      {/* Global Footprint / Interactive Maps */}
      {offices.length > 0 && selectedOffice && (
        <section>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">Global Footprint</p>
            <Building size={16} className="text-[var(--accent)] opacity-50" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-white/5 pb-2">
            {offices.map((office) => (
              <button
                key={office.id}
                onClick={() => setSelectedOffice(office)}
                className={`rounded-full px-4 py-2 font-mono text-xs transition-all ${
                  selectedOffice.id === office.id
                    ? "bg-[var(--accent)] font-semibold text-black shadow-lg"
                    : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                }`}
              >
                {office.id.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] p-2 shadow-inner backdrop-blur-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-black/20">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={selectedOffice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  title={selectedOffice.label}
                  src={selectedOffice.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-80 transition-opacity hover:mix-blend-normal hover:opacity-100"
                />
              </AnimatePresence>
              <div className="noise pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay" />
            </div>

            <div className="flex items-start gap-4 p-5 pt-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[var(--accent)]">
                <MapPin size={18} />
              </span>
              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <strong className="block text-sm font-semibold text-white">{selectedOffice.label}</strong>
                  {selectedOffice.badge && (
                    <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                      {selectedOffice.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1.5 block max-w-xs text-xs leading-relaxed text-white/60">{selectedOffice.address}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Logistics & Warehouses */}
      {warehouses.length > 0 && (
        <section>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">Logistics Hubs</p>
          <div className="mt-6 space-y-4">
            {warehouses.map((wh, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.015] p-4">
                <Building size={16} className="mt-0.5 text-white/30" />
                <div>
                  <strong className="block text-xs font-semibold text-white/80">{wh.label}</strong>
                  <span className="mt-1 block text-[11px] leading-relaxed text-white/50">{wh.address}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      {company.whatsappHref && (
        <MagneticCard>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-black shadow-lg transition-all hover:scale-105 hover:shadow-[#25D366]/40"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </MagneticCard>
      )}
    </aside>
  );
}