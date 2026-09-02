import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";
import { company, siteUrl as rawSiteUrl } from "@/data/site";
import { siteImages } from "@/data/site-images";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ClientScripts } from "@/components/providers/ClientScripts";

const baseUrl = (rawSiteUrl || "https://studiofuturex.com").replace(/\/+$/, "");

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Futurex Studio | Exhibition Stand Design & Turnkey Fabrication",
    template: "%s | Futurex Studio",
  },
  description:
    company.positioning ||
    "Turnkey exhibition stand design, 3D spatial visualization, and precision workshop fabrication for world-class trade shows and brand pavilions.",
    verification: {
    google: "Td2zsPYRs_TPqVYctI5h9aFTrhu-lBdAnOOZP02TzQA", 
  },
  keywords: [
    "Exhibition Stand Design",
    "Trade Show Booth Builder",
    "Exhibition Fabrication India",
    "Spatial Design Studio",
    "Bespoke Exhibition Pavilions",
    "Turnkey Stall Contractor",
  ],
  authors: [{ name: "Futurex Studio", url: baseUrl }],
  creator: "Futurex Studio",
  publisher: "Futurex Studio",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Futurex Studio | Spatial Architecture & Exhibition Builds",
    description:
      company.positioning ||
      "Turnkey exhibition stand design and precision workshop fabrication.",
    url: baseUrl,
    siteName: "Futurex Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteImages.siteSocial?.src || "/gallery/project-1.jpg",
        width: 1200,
        height: 630,
        alt: "Futurex Studio Spatial Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Futurex Studio | Exhibition Design & Fabrication",
    description:
      company.positioning ||
      "Bespoke spatial design and turnkey pavilion construction.",
    images: [siteImages.siteSocial?.src || "/gallery/project-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const primaryPhone = company.directors?.[0]?.phone || "+91 98108 55697";
  const primaryEmail = company.directors?.[0]?.email || "namit@futurextrade.com";

  // Enriched Schema.org for Google Business & Local Pack Rank
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name || "Futurex Studio",
    alternateName: "Futurex Exhibition Studio",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    image: `${baseUrl}${siteImages.siteSocial?.src || "/gallery/project-1.jpg"}`,
    description:
      company.positioning ||
      "Turnkey exhibition stand design, 3D spatial visualization, and precision fabrication.",
    telephone: primaryPhone,
    email: primaryEmail,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "E-52, 1st Floor, Kalkaji",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110019",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.5385",
      longitude: "77.2588",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "19:00",
    },
    sameAs: [
      "https://www.linkedin.com/company/studiofuturex/",
      "https://instagram.com/studiofuturex",
      "https://twitter.com/StudioFuturex",
      "https://www.facebook.com/StudioFuturex/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} scroll-smooth`}
    >
      <body
        className="bg-[#0b0c0d] font-sans text-[#f1efe9] antialiased selection:bg-[#ff5a2a] selection:text-white"
        suppressHydrationWarning
      >
        <ClientScripts />

        <Header />
        
        <main id="main" className="relative w-full overflow-hidden">
          {children}
        </main>
        
        <Footer />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Rich Results JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}