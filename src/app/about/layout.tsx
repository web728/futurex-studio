import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Futurex Studio",
  description:
    "Design thinking that holds up in the real world — Futurex Studio works across exhibition concepts, 3D visualisation, production and execution.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Futurex Studio",
    description:
      "Design thinking that holds up in the real world — exhibition concepts to execution.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}