"use client";

import React, { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, Building2, UserCheck, ShieldCheck } from "lucide-react";
import { company } from "@/data/site";

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
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-5 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/40 hover:bg-[var(--elevated,#191c1f)] shadow-lg">
      
      {/* Top Header */}
      <div className="flex items-center gap-3.5 border-b border-[var(--border,rgba(241,239,233,0.08))] pb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--background,#0b0c0d)] text-[var(--accent,#ff5a2a)] transition-colors group-hover:border-[var(--accent,#ff5a2a)]/50 group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black">
          <UserCheck size={18} />
        </div>
        <div>
          <h4 className="text-base font-bold tracking-tight text-[var(--text,#f1efe9)]">
            {person.name}
          </h4>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
            {person.title}
          </span>
        </div>
      </div>

      {/* Action Links */}
      <div className="mt-4 space-y-2">
        <a
          href={phoneHref}
          className="group/link flex items-center justify-between rounded-xl border border-[var(--border,rgba(241,239,233,0.08))] bg-[var(--background,#0b0c0d)]/60 px-3.5 py-2.5 transition-all duration-200 hover:border-[var(--accent,#ff5a2a)]/40 hover:bg-[var(--background,#0b0c0d)]"
        >
          <div className="flex items-center gap-3">
            <Phone size={13} className="text-[var(--secondary,#b8b6af)] group-hover/link:text-[var(--accent,#ff5a2a)] transition-colors" />
            <span className="font-mono text-xs text-[var(--text,#f1efe9)]/80 group-hover/link:text-[var(--text,#f1efe9)]">
              {person.phone}
            </span>
          </div>
          <ArrowUpRight size={13} className="text-[var(--muted,#7d807e)] transition-transform duration-200 group-hover/link:text-[var(--accent,#ff5a2a)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>

        <a
          href={`mailto:${person.email}`}
          className="group/link flex items-center justify-between rounded-xl border border-[var(--border,rgba(241,239,233,0.08))] bg-[var(--background,#0b0c0d)]/60 px-3.5 py-2.5 transition-all duration-200 hover:border-[var(--accent,#ff5a2a)]/40 hover:bg-[var(--background,#0b0c0d)]"
        >
          <div className="flex items-center gap-3">
            <Mail size={13} className="text-[var(--secondary,#b8b6af)] group-hover/link:text-[var(--accent,#ff5a2a)] transition-colors" />
            <span className="font-mono text-xs text-[var(--text,#f1efe9)]/80 group-hover/link:text-[var(--text,#f1efe9)]">
              {person.email}
            </span>
          </div>
          <ArrowUpRight size={13} className="text-[var(--muted,#7d807e)] transition-transform duration-200 group-hover/link:text-[var(--accent,#ff5a2a)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </article>
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
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start lg:space-y-10">
      
      {/* 1. KEY MANAGEMENT SECTION */}
      {keyContacts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 border-b border-[var(--border,rgba(241,239,233,0.1))] pb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--secondary,#b8b6af)]">
              Direct Spatial Leads
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {keyContacts.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </section>
      )}

      {/* 2. GLOBAL FOOTPRINT & INTERACTIVE MAPS */}
      {offices.length > 0 && selectedOffice && (
        <section>
          <div className="flex items-center justify-between border-b border-[var(--border,rgba(241,239,233,0.1))] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--secondary,#b8b6af)]">
                Studio Headquarters
              </p>
            </div>
            <Building2 size={15} className="text-[var(--secondary,#b8b6af)]" />
          </div>

          {/* Office Selection Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {offices.map((office) => {
              const isSelected = selectedOffice.id === office.id;
              return (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => setSelectedOffice(office)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--accent,#ff5a2a)] text-black shadow-[0_0_12px_rgba(255,90,42,0.35)]"
                      : "border border-[var(--border,rgba(241,239,233,0.1))] bg-[var(--surface,#121416)] text-[var(--secondary,#b8b6af)] hover:border-[var(--accent,#ff5a2a)]/40 hover:text-[var(--text,#f1efe9)]"
                  }`}
                >
                  {office.id.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Map Preview Card */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border,rgba(241,239,233,0.12))] bg-[var(--surface,#121416)] p-3 shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-black/40">
              <iframe
                key={selectedOffice.id}
                title={selectedOffice.label}
                src={selectedOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full object-cover filter grayscale contrast-125 opacity-75 transition-opacity duration-300 hover:opacity-100"
              />
            </div>

            {/* Address Details */}
            <div className="flex items-start gap-3.5 p-3.5 pt-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--background,#0b0c0d)] text-[var(--accent,#ff5a2a)]">
                <MapPin size={17} />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <strong className="block text-sm font-bold text-[var(--text,#f1efe9)]">
                    {selectedOffice.label}
                  </strong>
                  {selectedOffice.badge && (
                    <span className="rounded-md border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--accent,#ff5a2a)]">
                      {selectedOffice.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1 block text-xs leading-relaxed text-[var(--secondary,#b8b6af)]">
                  {selectedOffice.address}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. LOGISTICS HUBS & WAREHOUSES */}
      {warehouses.length > 0 && (
        <section>
          <div className="flex items-center gap-2 border-b border-[var(--border,rgba(241,239,233,0.1))] pb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#ff5a2a)]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--secondary,#b8b6af)]">
              Fabrication & Warehousing
            </p>
          </div>

          <div className="mt-4 space-y-2.5">
            {warehouses.map((wh, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 rounded-xl border border-[var(--border,rgba(241,239,233,0.08))] bg-[var(--surface,#121416)] p-3.5 transition-colors hover:border-[var(--accent,#ff5a2a)]/30"
              >
                <Building2 size={15} className="mt-0.5 shrink-0 text-[var(--secondary,#b8b6af)]" />
                <div>
                  <strong className="block text-xs font-bold text-[var(--text,#f1efe9)]">
                    {wh.label}
                  </strong>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-[var(--secondary,#b8b6af)]">
                    {wh.address}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. FAST RESPONSE DIRECT WHATSAPP ACTION */}
      {company.whatsappHref && (
        <div className="pt-2">
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between rounded-2xl border border-[var(--border,rgba(241,239,233,0.14))] bg-[var(--surface,#121416)] p-4 transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[var(--elevated,#191c1f)] hover:shadow-[0_0_25px_rgba(37,211,102,0.15)] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-black">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-[var(--text,#f1efe9)]">
                  Instant Response
                </p>
                <span className="font-mono text-[11px] text-[var(--secondary,#b8b6af)]">
                  Connect via WhatsApp
                </span>
              </div>
            </div>

            <ArrowUpRight size={16} className="text-[var(--secondary,#b8b6af)] transition-transform duration-200 group-hover:text-[#25D366] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      )}

    </aside>
  );
}