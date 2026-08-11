import type { Metadata } from "next";
import Script from "next/script";
import Clarity from "@/components/Clarity";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";
import { MotionShell } from "@/components/motion-system";
import { company, siteUrl } from "@/data/site";
import { siteImages } from "@/data/site-images";
import SmoothScrollAndCursor from "@/components/SmoothScrollAndCursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Futurex Studio | Exhibition Design & Fabrication",
    template: "%s | Futurex Studio",
  },
  description: company.positioning || "Exhibition Design & Fabrication",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Futurex Studio",
    description: company.positioning || "Exhibition Design & Fabrication",
    type: "website",
    images: [siteImages.siteSocial.src],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Safe extraction for phone & email to prevent runtime error
  const primaryPhone = company.directors?.[0]?.phone || "+91 98108 55697";
  const primaryEmail = company.directors?.[0]?.email || "namit@futurextrade.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name || "Futurex Studio",
    url: siteUrl,
    telephone: primaryPhone,
    email: primaryEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "E-52, 1st Floor, Kalkaji",
      addressLocality: "New Delhi",
      postalCode: "110017",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body suppressHydrationWarning>
        
        {/* Controls Route Scroll Reset, Lenis Smooth Scroll & Custom Accent Cursor */}
        <SmoothScrollAndCursor />

        <Clarity />
        <Header />
        <MotionShell>
          <main id="main">{children}</main>
          <Footer />
        </MotionShell>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}