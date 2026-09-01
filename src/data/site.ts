import { projectMedia } from "./site-images";

export type VerifiedValue<T> = {
  value: T;
  verified: boolean;
  source?: string;
  notes?: string;
};

// 👇 Added Testimonial type definition to fix the red line import error
export type Testimonial = {
  name: string;
  company: string;
  quote: string;
  role?: string;
  stars?: number;
  avatar?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  featuredImage?: string;
  thumbnailImage: string;
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://futurexstudio.com";

export const company = {
  name: "Futurex Studio",
  positioning: "Exhibition Design & Fabrication",

  phoneHref: "tel:+919810855697",
  whatsappHref: "https://wa.me/919810855697",

  directors: [
    {
      name: "Mr. Namit Gupta",
      title: "Director",
      phone: "+91 98108 55697",
      phoneHref: "tel:+919810855697",
      whatsappHref: "https://wa.me/919810855697",
      email: "namit@futurextrade.com",
    },
  ],

  marketing: [
    {
      name: "Mr. Danish Mumtaz",
      title: "Marketing Head",
      phone: "+91 97119 90787",
      phoneHref: "tel:+919711990787",
      whatsappHref: "https://wa.me/919711990787",
      email: "sales2@futurextrade.com",
    },
  ],

  offices: [
    {
      id: "delhi",
      label: "Delhi — Corporate Office",
      short: "New Delhi",
      badge: "Headquarters",
      address: "E-52, 1st Floor, Kalkaji, New Delhi 110017, India",
      mapEmbedUrl:
        "https://www.google.com/maps?q=" +
        encodeURIComponent("E-52, 1st Floor, Kalkaji, New Delhi 110017, India") +
        "&output=embed",
    },
    {
      id: "mumbai",
      label: "Mumbai Office",
      short: "Bandra East",
      badge: "Regional Hub",
      address:
        "905, 2nd Floor, Hallmark Business Plaza, Opposite Gurunanak Hospital, Bandra East, Mumbai 400051, India",
      mapEmbedUrl:
        "https://www.google.com/maps?q=" +
        encodeURIComponent(
          "Hallmark Business Plaza, Bandra East, Mumbai 400051, India"
        ) +
        "&output=embed",
    },
    {
      id: "uae",
      label: "Sharjah — UAE",
      short: "Industrial Area",
      badge: "International Hub",
      address:
        "Warehouse No.34, Industrial Area, Street No.47, Behind Al Shola School, Sharjah, UAE",
      mapEmbedUrl:
        "https://www.google.com/maps?q=" +
        encodeURIComponent(
          "Industrial Area, Street 47, Sharjah, UAE"
        ) +
        "&output=embed",
    },
  ],

  warehouses: [
    {
      label: "Delhi/NCR Warehouse",
      address: "Near Sonia Vihar, Sabhapur Village, Vijay Vihar Pushtha, Loni, U.P.",
    },
    {
      label: "Mumbai Warehouse",
      address: "Scrap Merchant Association, Shivaji Nagar, Mandala, Navi Mumbai 400043",
    },
  ],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    slug: "stand-design-fabrication",
    number: "01",
    title: "Stand Designing & Fabrication",
    description:
      "End-to-end exhibition stand design and build — from concept sketches to structural fabrication, engineered for scale and precision on any show floor.",
    includes: ["Booth Designing", "Stall Fabrication", "Technical Concepts"],
  },
  {
    slug: "interior-exterior-design",
    number: "02",
    title: "Interior & Exterior Designing",
    description:
      "Spatial design that carries your brand from the outer facade to the last interior detail, backed by structural planning and on-ground consulting.",
    includes: [
      "Co-Designing Concepts",
      "Structural Designing",
      "Consulting Services",
    ],
  },
  {
    slug: "events",
    number: "03",
    title: "Events",
    description:
      "Full-scale event execution for corporate gatherings, B2B trade engagements, and conferences — planned and delivered with precision.",
    includes: ["Corporate Events", "B2B Events", "Seminars & Conferences"],
  },
  {
    slug: "branding-promotion",
    number: "04",
    title: "Branding & Promotion",
    description:
      "Out-of-home and on-ground brand visibility — from large-format hoardings to digital programmatic OOH, promotional activations, and merchandise.",
    includes: [
      "Hoardings & Billboards",
      "Digital OOH – Programmatic",
      "Promotions",
      "Merchandise",
    ],
  },
  {
    slug: "digital-marketing",
    number: "05",
    title: "Digital Marketing",
    description:
      "Brand systems and digital presence built to convert — identity, strategy, and corporate design paired with performance-ready web development.",
    includes: [
      "Brand Identity",
      "Brand Strategy",
      "Corporate Designing",
      "Website Development",
    ],
  },
  {
    slug: "creative-communication",
    number: "06",
    title: "Creative Designing & Communication",
    description:
      "Creative direction and communication design that keeps your brand consistent and compelling across every touchpoint.",
    includes: ["Brand Identity", "Brand Strategy", "Corporate Designing"],
  },
];

export const projects: Project[] = Array.from({ length: 20 }, (_, index) => {
  const id = index + 1;
  return {
    slug: `project-${id}`,
    title: `Project ${id}`,
    category: "Exhibition Stand",
    featuredImage: `/gallery/img-${id}.jpeg`,
    thumbnailImage: `/gallery/img-${id}.jpeg`,
  };
});

export const testimonials: Testimonial[] = [
  {
    quote:
      "The team was knowledgeable, friendly, helpful and professional throughout our work together.",
    name: "Satish Singh",
    company: "Nnoweta Chemicals",
    stars: 5,
  },
  {
    quote:
      "If I needed to find a partner again, I would come back—because I know I can rely on their expertise and experience.",
    name: "Manish Rathi",
    company: "Unicorn Petroleum Pvt. Ltd.",
    stars: 5,
  },
  {
    quote:
      "Good workflow, a positive attitude and dedicated team members. They fabricated our stall to our preferences and presented a strong variety of design options.",
    name: "Puneet Kohli",
    company: "Friends Timber Pvt. Ltd.",
    stars: 5,
  },
  {
    quote:
      "The team sent several designs, adapted to our changes and delivered efficiently with a clear focus on quality.",
    name: "Rahul Chhawcharia",
    company: "Traditions Kolkata",
    stars: 5,
  },
];

export const faqs = [
  [
    "What information is needed to begin?",
    "Share your event, venue, dates, available floor area, open sides, brand guidelines, desired visitor experience and indicative budget. Missing details can be discussed during discovery.",
  ],
  [
    "Can design and fabrication be coordinated together?",
    "Futurex Studio publicly presents design, production and execution as connected capabilities. The precise scope should be confirmed in your proposal.",
  ],
  [
    "How early should we start?",
    "Earlier planning allows more time for concept review, technical coordination and production. Timing depends on scale, venue rules and approval cycles.",
  ],
  [
    "Can our brand guidelines be incorporated?",
    "Yes—brand assets, messaging priorities and usage rules can form the foundation of the spatial concept.",
  ],
  [
    "Is 3D visualisation available before production?",
    "3D design and illustration are listed among Futurex Studio’s public services, helping teams review layout and visual direction before execution.",
  ],
  [
    "What files should we provide?",
    "Vector logos, brand guidelines, final copy, product imagery, technical requirements and any organiser manuals are useful starting points.",
  ],
  [
    "Can installation support be included?",
    "Installation and on-site execution can be discussed as part of the project scope. Venue and location requirements should be confirmed early.",
  ],
  [
    "How do we request a proposal?",
    "Use the proposal form with as much detail as possible, or contact the studio directly by phone or email.",
  ],
];