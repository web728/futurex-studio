import { Check, Sparkles } from "lucide-react";
import { GSAPCinematicReveal } from "@/components/motion/gsap-text-animations";

export function WhyFuturexSection() {
  const features = [
    "One coordinated project partner",
    "Customised, brand-first design",
    "Visual review before fabrication",
    "Design-to-execution capability",
    "Support across exhibition requirements",
    "Spatial thinking grounded in visitor experience",
  ];

  return (
    <section className="relative bg-[#070709] py-12 lg:py-16">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          
          {/* Left Column: Compact Heading & Eyebrow */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <GSAPCinematicReveal variant="fadeUp" delay={0}>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--accent,#ff5a2a)] backdrop-blur-md">
                  <Sparkles size={11} className="animate-pulse" />
                  <span>Why Futurex Studio</span>
                </div>
              </GSAPCinematicReveal>

              <GSAPCinematicReveal variant="splitWord" delay={0.1}>
                <h2 className="text-[clamp(2rem,3.8vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-white">
                  Fewer handoffs. <br />
                  <span className="bg-gradient-to-r from-[var(--accent,#ff5a2a)] to-[#ff825c] bg-clip-text text-transparent">
                    Clearer intent.
                  </span>
                </h2>
              </GSAPCinematicReveal>

              <GSAPCinematicReveal variant="fadeUp" delay={0.15}>
                <p className="max-w-md text-xs leading-relaxed text-white/60 sm:text-sm">
                  We eliminate communication gaps by keeping design, technical strategy, and production under one continuous line of control.
                </p>
              </GSAPCinematicReveal>
            </div>
          </div>

          {/* Right Column: Compact Feature Cards Grid */}
          <div className="lg:col-span-7">
            <GSAPCinematicReveal
              variant="staggerList"
              delay={0.15}
              className="grid gap-3 sm:grid-cols-2"
            >
              {features.map((item, index) => (
                <div
                  key={item}
                  className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-4 transition-all duration-300 hover:border-[var(--accent,#ff5a2a)]/50 hover:bg-white/[0.05] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Compact Icon Badge */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--accent,#ff5a2a)]/30 bg-[var(--accent,#ff5a2a)]/10 text-[var(--accent,#ff5a2a)] transition-all duration-300 group-hover:bg-[var(--accent,#ff5a2a)] group-hover:text-black">
                      <Check size={14} strokeWidth={2.5} />
                    </div>

                    {/* Counter */}
                    <span className="font-mono text-[10px] font-bold text-white/20 transition-colors duration-300 group-hover:text-[var(--accent,#ff5a2a)]">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm font-medium leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
                    {item}
                  </p>
                </div>
              ))}
            </GSAPCinematicReveal>
          </div>

        </div>
      </div>
    </section>
  );
}