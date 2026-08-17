import dynamic from "next/dynamic";
import { faqs, projects, testimonials } from "@/data/site";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

// Above the fold - Direct load for fast initial render
import { CinematicHero, KineticTitle } from "@/components/motion";

// Below the fold - Lazy loaded Dynamic Imports (Without ssr: false)
const CinematicIntro = dynamic(
  () => import("@/components/cinematic").then((m) => m.CinematicIntro)
);

const FeaturedProjectStory = dynamic(
  () => import("@/components/cinematic").then((m) => m.FeaturedProjectStory)
);

const EditorialServices = dynamic(
  () => import("@/components/cinematic").then((m) => m.EditorialServices)
);

const ProcessMotion = dynamic(
  () => import("@/components/motion").then((m) => m.ProcessMotion)
);

const WhyFuturexSection = dynamic(
  () => import("@/components/why-futurex").then((m) => m.WhyFuturexSection)
);

const TestimonialsSection = dynamic(
  () => import("@/components/testimonials/TestimonialsSection").then((m) => m.TestimonialsSection)
);

const GSAPCinematicReveal = dynamic(
  () => import("@/components/motion/gsap-cinematic-reveal").then((m) => m.GSAPCinematicReveal)
);

const FAQAccordion = dynamic(
  () => import("@/components/site").then((m) => m.FAQAccordion)
);

const CTA = dynamic(
  () => import("@/components/CTA").then((m) => m.CTA)
);

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CinematicHero />

      <CinematicIntro />
      <FeaturedProjectStory projects={projects} />
      <EditorialServices />

      {/* Process Section */}
      <section className="relative overflow-x-hidden bg-[#0b0b0f] text-white">
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"
        />

        <div className="container relative z-10 py-12 lg:py-20">
          <ProcessMotion
            steps={[
              "Brief & discovery",
              "Concept development",
              "3D visualisation",
              "Technical planning",
              "Fabrication & production",
              "Installation & execution",
            ]}
          />
        </div>
      </section>

      <WhyFuturexSection />

      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ Section */}
      <section className="py-24 lg:py-36">
        <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <GSAPCinematicReveal variant="fadeUp">
              <p className="eyebrow">Practical answers</p>
            </GSAPCinematicReveal>
            <div className="mt-7">
              <KineticTitle
                text="Before the first sketch."
                className="text-5xl font-semibold"
              />
            </div>
          </div>
          <GSAPCinematicReveal variant="fadeUp" delay={0.1}>
            <FAQAccordion items={faqs} />
          </GSAPCinematicReveal>
        </div>
      </section>

      <CTA />
    </SmoothScrollProvider>
  );
}