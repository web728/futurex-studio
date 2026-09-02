import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Studio | Start an Exhibition Brief",
  description:
    "Initiate an exhibition design, 3D visualization, or turnkey fabrication brief with Futurex Studio. Fast turnaround proposals and technical review.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Futurex Studio | Exhibition Stand Brief",
    description:
      "Initiate an exhibition design, 3D visualization, or turnkey fabrication brief with Futurex Studio.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}