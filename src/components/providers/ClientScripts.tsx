"use client";

import dynamic from "next/dynamic";

const SmoothScrollAndCursor = dynamic(
  () => import("@/components/SmoothScrollAndCursor"),
  { ssr: false }
);

const Clarity = dynamic(() => import("@/components/Clarity"), {
  ssr: false,
});

export function ClientScripts() {
  return (
    <>
      <SmoothScrollAndCursor />
      <Clarity />
    </>
  );
}