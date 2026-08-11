import { FAQAccordion } from "@/components/site";
import { faqs, projects, testimonials } from "@/data/site";
import {
  CinematicHero,
  KineticTitle,
  ProcessMotion,
} from "@/components/motion";
import {
  CinematicCTA,
  CinematicIntro,
  EditorialServices,
  FeaturedProjectStory,
  CinematicProjectsTrack, 
} from "@/components/cinematic";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { GSAPCinematicReveal } from "@/components/motion/gsap-cinematic-reveal";
import { WhyFuturexSection } from "@/components/why-futurex";
import { CTA } from "@/components/CTA";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CinematicHero />
      <CinematicIntro />
      <FeaturedProjectStory projects={projects} />
      <EditorialServices />

      {/* Reduced Height Process Section */}
      <section className="relative overflow-x-hidden bg-[#0b0b0f] text-white">
        {/* Ambient Canvas Glow Grid */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
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

      {/* FAQ */}
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