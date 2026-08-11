"use client";

import React, { useEffect, useRef } from "react";
import { siteImages } from "@/data/site-images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ContactHero } from "@/components/contact/contact-hero";
import { ContactAmbientBg } from "@/components/contact/contact-ambient-bg";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { ContactFormSection } from "@/components/contact/contact-form-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0b0c0d] text-[#f1efe9]">
      <ContactHero
        eyebrow="Request a proposal"
        title="Tell us what needs to happen on the exhibition floor."
        copy="Share the event, space, timing and ambition."
        image={siteImages.contactHero?.src}
      />

      <section className="relative py-12 lg:py-20">
        <ContactAmbientBg />

        <div className="contact-grid container relative z-10 mx-auto grid gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ContactSidebar />
          <ContactFormSection />
        </div>
      </section>
    </div>
  );
}