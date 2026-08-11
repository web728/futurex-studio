"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export function ScrollScrubVideo({
  src,
  className = "",
  heightVh = 400,
}: {
  src: string;
  className?: string;
  heightVh?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !ready || !video.duration) return;
    video.currentTime = latest * video.duration;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => setReady(true);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) setReady(true);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className={`h-full w-full object-cover ${className}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      </div>
    </section>
  );
}
