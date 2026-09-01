import { faqs, projects, services, testimonials } from "@/data/site";

// Hero Section (WebGL yahi chalega)
import { CinematicHero, KineticTitle } from "@/components/motion";

// Section Components
import {
  CinematicIntro,
  FeaturedProjectStory,
  EditorialServices,
} from "@/components/cinematic";
import { ProcessMotion } from "@/components/motion";
import { WhyFuturexSection } from "@/components/why-futurex";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { GSAPCinematicReveal } from "@/components/motion/gsap-cinematic-reveal";
import { FAQAccordion } from "@/components/site";
import { CTA } from "@/components/CTA";
import { ServiceRail } from "@/components/motion/ServiceRail";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (Single WebGL Instance) */}
      <CinematicHero />

        <ServiceRail
              items={services.map(({ slug, title, number }) => ({
                slug,
                title,
                number,
              }))}
            />

      {/* 2. Intro & Portfolio */}
      <CinematicIntro />
      <FeaturedProjectStory projects={projects} />
      <EditorialServices />

      {/* 3. Process Section */}
   <section id="process" className="relative overflow-hidden bg-[var(--background,#0b0c0d)] py-20 lg:py-28 text-[var(--text,#f1efe9)] selection:bg-[var(--accent,#ff5a2a)] selection:text-white">
  {/* Top Subtle Border */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border,rgba(241,239,233,0.18))] to-transparent opacity-60" />

  {/* Subtle Ambient Radial Accent Glow */}
  <div
    className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--accent,#ff5a2a)]/5 blur-[140px]"
    aria-hidden="true"
  />

  <div className="container relative z-10 mx-auto px-6 lg:px-12">
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

      {/* 4. Why Futurex & Testimonials */}
      <WhyFuturexSection />
      <TestimonialsSection testimonials={testimonials} />

     

      {/* 6. Call to Action */}
      <CTA />
    </>
  );
}