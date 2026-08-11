import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition Services",
  description:
    "Full-service exhibition design, fabrication, installation and logistics by Futurex Studio — one studio from first sketch to show floor.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Exhibition Services | Futurex Studio",
    description:
      "Full-service exhibition design, fabrication, installation and logistics by Futurex Studio.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
