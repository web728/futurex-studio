import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = `
  default-src 'self';
  img-src 'self' data: blob: https://images.unsplash.com https://www.gstatic.com https://raw.githack.com https://cdn.jsdelivr.net https://dl.polyhaven.org https://c.clarity.ms;
  font-src 'self' data:;
  style-src 'self' 'unsafe-inline';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms;
  frame-src https://www.google.com;
  connect-src 'self' https://www.google.com https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://raw.githack.com https://cdn.jsdelivr.net https://dl.polyhaven.org;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
`.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
    "gsap",
  ],

  productionBrowserSourceMaps: false,

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/get-quote", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;