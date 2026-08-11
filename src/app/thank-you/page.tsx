import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Enquiry Received",
  description: "Confirmation that Futurex Studio received your project enquiry.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-[var(--accent,#ff5a2a)]/15 blur-[120px]" />
      
      <div className="container relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface,rgba(255,255,255,0.02))] p-8 shadow-2xl backdrop-blur-2xl md:p-12">
          
          {/* Status Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 text-[var(--accent,#ff5a2a)]">
            <CheckCircle2 size={32} />
          </div>

          <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent,#ff5a2a)]">
            Brief received
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Thank you.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
            Your interface submission has been accepted. External delivery must be configured before production launch.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent,#ff5a2a)] px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent,#ff5a2a)]/25"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Return home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}