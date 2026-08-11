import type { Metadata } from "next";
import { PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Draft terms and conditions for the Futurex Studio website.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

const termsSections = [
  [
    "Website information",
    "Website content is general information and may be updated. Project scope, timing, pricing and deliverables are governed only by a separate written proposal or agreement.",
  ],
  [
    "Enquiries and proposals",
    "Submitting the form does not create a contract or guarantee availability. Futurex Studio may request further information before preparing a proposal.",
  ],
  [
    "Intellectual property",
    "Website design, copy, brand elements and owned project media may not be reproduced without permission. Third-party client marks remain the property of their respective owners.",
  ],
  [
    "Project imagery",
    "Published project imagery should be reviewed for ownership, confidentiality and client permission before launch.",
  ],
  [
    "File uploads",
    "Users must have the right to share uploaded materials and should not submit malicious, unlawful or unnecessary sensitive content.",
  ],
  [
    "External links",
    "Links to third-party services are provided for convenience and do not imply responsibility for their availability, security or content.",
  ],
  [
    "Liability",
    "To the extent permitted by law, the website is provided without guarantees regarding uninterrupted availability, completeness or suitability for a specific purpose.",
  ],
  [
    "Governing terms",
    "Applicable law, legal entity details, jurisdiction and dispute provisions must be completed by qualified legal counsel before launch.",
  ],
];

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal draft"
        title="Terms & conditions."
        copy="This draft is not legal advice and requires business-owner and legal review before launch."
      />

      <article className="container mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {termsSections.map(([title, content], index) => (
            <section
              key={title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface,rgba(255,255,255,0.02))] p-6 backdrop-blur-xl transition-colors hover:border-white/20 md:p-8"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent,#ff5a2a)] opacity-70">
                0{index + 1}
              </span>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
                {content}
              </p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}