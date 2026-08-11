import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Futurex Studio",
  description:
    "Request a proposal or get in touch with Futurex Studio — exhibition design, fabrication and project enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Futurex Studio",
    description:
      "Request a proposal or get in touch — exhibition design, fabrication and project enquiries.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
