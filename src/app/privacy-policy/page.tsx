import type { Metadata } from "next";
import { PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Draft privacy policy for the Futurex Studio website.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false },
};

const policySections = [
  [
    "Information we collect",
    "When you submit an enquiry, we may collect your name, company, contact details, event information and project requirements. We may also record the submission source, page path, referral and campaign parameters, IP address and user agent for security, routing and attribution. We do not use this data for device fingerprinting.",
  ],
  [
    "How information is used",
    "Information is used to validate and respond to enquiries, prepare proposals, coordinate potential projects, prevent abuse, maintain business records and monitor delivery of the enquiry.",
  ],
  [
    "Storage and notifications",
    "Validated submissions are stored in MongoDB as the primary record, appended to the controlled Website Enquiries Google Sheet and included in notifications sent through the configured email provider. These processors may handle data in other jurisdictions.",
  ],
  [
    "Google reCAPTCHA",
    "Public forms use Google reCAPTCHA v2 to reduce automated abuse. Google may process technical information under its own privacy policy and terms. CAPTCHA tokens are verified by the server and are not stored in the enquiry record.",
  ],
  [
    "Files and retention",
    "Uploads remain disabled until private storage, malware scanning and a deletion process are approved. Submission records are retained according to a business-approved policy that is still to be confirmed; no automated deletion period is active.",
  ],
  [
    "Analytics and cookies",
    "Optional analytics or advertising tools must remain disabled until valid IDs, a lawful basis, consent controls where required and this policy are updated.",
  ],
  [
    "Security and sharing",
    "Access should be limited to authorised staff and approved processors. Data is not intended to be sold. No internet system can be guaranteed completely secure.",
  ],
  [
    "Your choices",
    "You may contact Futurex Studio to request access, correction or deletion where applicable. Legal rights and exceptions depend on jurisdiction.",
  ],
  [
    "External links",
    "External websites have their own privacy practices. Futurex Studio is not responsible for their content or policies.",
  ],
  [
    "Contact",
    "Privacy questions may be sent to design@futurextrade.com. Confirm the appropriate legal/privacy contact before launch.",
  ],
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal draft"
        title="Privacy policy."
        copy="This draft must be reviewed and approved by Futurex Studio and qualified legal counsel before public launch."
      />

      <article className="container mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {policySections.map(([title, content], index) => (
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