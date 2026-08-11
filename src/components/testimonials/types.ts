export interface TestimonialItem {
  name: string;
  company: string;
  role?: string;
  quote: string;
  stars?: number;
  avatar?: string;
}

export interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export interface AmbientBackgroundProps {
  blobARef: React.RefObject<HTMLDivElement | null>;
  blobBRef: React.RefObject<HTMLDivElement | null>;
  raysRef: React.RefObject<HTMLDivElement | null>;
  particlesWrapRef: React.RefObject<HTMLDivElement | null>;
}

export interface LiquidAvatarProps {
  src: string;
  alt: string;
}

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  copy: string;
}