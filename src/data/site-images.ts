export type SiteImageAssignment = {
  src: string;
  width: number;
  height: number;
  alt: string;
  assignedPage: string;
  assignedSection: string;
  role: "hero" | "editorial" | "featured" | "thumbnail" | "social";
  objectPosition?: string;
  priority?: boolean;
};

export const siteImages = {
  homeHero: {
    src: "/gallery/img-1.jpeg",
    width: 1514,
    height: 1080,
    alt: "Black illuminated Q Green Techcon exhibition stall with an open reception counter",
    assignedPage: "/",
    assignedSection: "Homepage hero",
    role: "hero",
    objectPosition: "center center",
    priority: true,
  },
  homeIntroduction: {
    src: "/gallery/img-2.jpeg",
    width: 1247,
    height: 1080,
    alt: "APL Apollo exhibition pavilion with framed product displays and meeting space",
    assignedPage: "/",
    assignedSection: "Company introduction",
    role: "editorial",
    objectPosition: "center center",
  },
  homeServices: {
    src: "/gallery/img-3.jpeg",
    width: 1384,
    height: 1080,
    alt: "Red and white Kamdhenu Build Tech exhibition stall with angular architectural framing",
    assignedPage: "/",
    assignedSection: "Services",
    role: "editorial",
    objectPosition: "center center",
  },
  homeCta: {
    src: "/gallery/img-2.jpeg",
    width: 1433,
    height: 1080,
    alt: "Bright Promax exhibition space with open seating and product displays",
    assignedPage: "/",
    assignedSection: "Final call to action",
    role: "hero",
    objectPosition: "center center",
  },
  aboutHero: {
    src: "/gallery-img-1.jpeg",
    width: 1267,
    height: 1080,
    alt: "Ishwara Paper Cup exhibition stand with illuminated product shelving",
    assignedPage: "/about",
    assignedSection: "Page hero",
    role: "hero",
    objectPosition: "center center",
    priority: true,
  },
  servicesHero: {
    src: "/gallery/img-7.jpeg",
    width: 1355,
    height: 1080,
    alt: "Srons Engineers exhibition stall with curved illuminated fascia and product displays",
    assignedPage: "/services",
    assignedSection: "Page hero",
    role: "hero",
    objectPosition: "center center",
    priority: true,
  },
  contactHero: {
    src: "/media/curated/contact-hero-arb-bearings.webp",
    width: 1440,
    height: 1080,
    alt: "Open ARB Bearings exhibition environment with illuminated brand signage",
    assignedPage: "/contact",
    assignedSection: "Page hero",
    role: "hero",
    objectPosition: "center center",
    priority: true,
  },
  siteSocial: {
    src: "/media/projects/exhibition-project-07.jpeg",
    width: 1600,
    height: 1066,
    alt: "Futurex Studio exhibition design and fabrication",
    assignedPage: "Social metadata",
    assignedSection: "Open Graph image",
    role: "social",
  },
} satisfies Record<string, SiteImageAssignment>;

export const projectMedia: Record<
  string,
  {
    featured?: SiteImageAssignment;
    thumbnail: SiteImageAssignment;
    hero: SiteImageAssignment;
  }
> = {
  "selected-exhibition-project-01": {
    featured: {
      src: "/media/curated/featured-aero-edge.webp",
      width: 1609,
      height: 1080,
      alt: "Aero Edge exhibition stall with colourful product displays",
      assignedPage: "/",
      assignedSection: "Featured work 01",
      role: "featured",
    },
    thumbnail: {
      src: "/media/curated/portfolio-arb-bearings.webp",
      width: 1920,
      height: 880,
      alt: "Wide ARB Bearings exhibition pavilion with illuminated blue architecture",
      assignedPage: "/portfolio",
      assignedSection: "Portfolio project 01",
      role: "thumbnail",
    },
    hero: {
      src: "/media/projects/exhibition-project-01.jpg",
      width: 2048,
      height: 1152,
      alt: "Brand-focused exhibition environment from the Futurex Studio archive",
      assignedPage: "/portfolio/selected-exhibition-project-01",
      assignedSection: "Project hero",
      role: "hero",
      priority: true,
    },
  },
  "custom-exhibition-environment-02": {
    featured: {
      src: "/media/curated/featured-cladding-projects.webp",
      width: 1367,
      height: 1080,
      alt: "Cladding Projects exhibition stall with suspended greenery and digital displays",
      assignedPage: "/",
      assignedSection: "Featured work 02",
      role: "featured",
    },
    thumbnail: {
      src: "/media/curated/portfolio-atulya-medilink.webp",
      width: 1220,
      height: 1080,
      alt: "Atulya Medilink exhibition stand with orange fascia and product displays",
      assignedPage: "/portfolio",
      assignedSection: "Portfolio project 02",
      role: "thumbnail",
    },
    hero: {
      src: "/media/projects/exhibition-project-02.jpg",
      width: 2048,
      height: 1150,
      alt: "Open product showcase from the Futurex Studio project archive",
      assignedPage: "/portfolio/custom-exhibition-environment-02",
      assignedSection: "Project hero",
      role: "hero",
      priority: true,
    },
  },
  "brand-experience-installation-03": {
    featured: {
      src: "/media/curated/featured-empire-cables.webp",
      width: 1654,
      height: 1080,
      alt: "Empire Cables exhibition environment with bold red and black framing",
      assignedPage: "/",
      assignedSection: "Featured work 03",
      role: "featured",
    },
    thumbnail: {
      src: "/media/curated/portfolio-brihans-animal-health.webp",
      width: 1636,
      height: 1080,
      alt: "Brihans Animal Health exhibition stand with an orange portal frame",
      assignedPage: "/portfolio",
      assignedSection: "Portfolio project 03",
      role: "thumbnail",
    },
    hero: {
      src: "/media/projects/exhibition-project-03.jpg",
      width: 960,
      height: 540,
      alt: "Immersive brand installation from the Futurex Studio project archive",
      assignedPage: "/portfolio/brand-experience-installation-03",
      assignedSection: "Project hero",
      role: "hero",
      priority: true,
    },
  },
  "selected-exhibition-project-04": {
    featured: {
      src: "/media/curated/featured-zone-safer-world.webp",
      width: 1428,
      height: 1080,
      alt: "Zone for a Safer World exhibition stand with wood-toned and blue brand architecture",
      assignedPage: "/",
      assignedSection: "Featured work 04",
      role: "featured",
    },
    thumbnail: {
      src: "/media/curated/portfolio-epack-prefab.webp",
      width: 1438,
      height: 1080,
      alt: "Epack Prefab exhibition stall with yellow, blue and black product presentation",
      assignedPage: "/portfolio",
      assignedSection: "Portfolio project 04",
      role: "thumbnail",
    },
    hero: {
      src: "/media/projects/exhibition-project-04.jpg",
      width: 960,
      height: 540,
      alt: "Structured exhibition pavilion from the Futurex Studio project archive",
      assignedPage: "/portfolio/selected-exhibition-project-04",
      assignedSection: "Project hero",
      role: "hero",
      priority: true,
    },
  },
  "spatial-brand-environment-05": {
    thumbnail: {
      src: "/media/curated/portfolio-reynoarch.webp",
      width: 1434,
      height: 1080,
      alt: "ReynoArch exhibition stall with material displays and open visitor counter",
      assignedPage: "/portfolio",
      assignedSection: "Portfolio project 05",
      role: "thumbnail",
    },
    hero: {
      src: "/media/projects/exhibition-project-05.jpg",
      width: 960,
      height: 540,
      alt: "Spatial brand showcase from the Futurex Studio project archive",
      assignedPage: "/portfolio/spatial-brand-environment-05",
      assignedSection: "Project hero",
      role: "hero",
      priority: true,
    },
  },
  "custom-exhibition-environment-06": {
    thumbnail: {
      src: "/media/curated/portfolio-riyom-industries.webp",
      width: 1620,
      height: 1080,
      alt: "Riyom Industries exhibition setting with warm material displays and meeting areas",
      assignedPage: "/portfolio",
      assignedSection: "Portfolio project 06",
      role: "thumbnail",
    },
    hero: {
      src: "/media/projects/exhibition-project-06.jpeg",
      width: 1600,
      height: 1204,
      alt: "Contemporary exhibition setting from the Futurex Studio project archive",
      assignedPage: "/portfolio/custom-exhibition-environment-06",
      assignedSection: "Project hero",
      role: "hero",
      priority: true,
    },
  },
};

export const brandAssets = {
  white: {
    src: "/logo/Futurex-studio-white-logo.png",
    width: 920,
    height: 483,
  },
  // black: { src:"/media/brand/futurex-studio-logo-black.png", width:720, height:283 },
} as const;
