import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium Animation Utilities for Portfolio
 * Use these functions for advanced effects
 */

// ============================================
// TEXT ANIMATIONS
// ============================================

/**
 * Staggered character animation with morphing effect
 */
export function animateSplitTextWithMorph(
  element: HTMLElement,
  delay = 0,
  duration = 0.6
) {
  const chars = element.querySelectorAll("span");

  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 100,
      rotationX: 90,
      rotationZ: 45,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      rotationZ: 0,
      duration,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.5,
        ease: "power2.inOut",
      },
      delay,
    }
  );
}

/**
 * Character-by-character wave animation
 */
export function animateWaveText(element: HTMLElement, delay = 0) {
  const chars = element.querySelectorAll("span");

  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: {
        amount: 0.4,
        ease: "sine.inOut",
        from: "start",
      },
      delay,
    }
  );
}

/**
 * Blur to focus text animation
 */
export function animateBlurReveal(element: HTMLElement, delay = 0) {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay,
    }
  );
}

// ============================================
// SCROLL TRIGGER ANIMATIONS
// ============================================

/**
 * Premium scroll trigger with parallax effect
 */
export function createParallaxScroll(
  element: HTMLElement,
  intensity = 0.5,
  trigger?: string
) {
  gsap.to(element, {
    y: 100 * intensity,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top center",
      end: "bottom center",
      scrub: 0.5, // Smooth scrubbing
      markers: false,
    },
  });
}

/**
 * Staggered reveal on scroll with rotation
 */
export function staggerRevealOnScroll(
  elements: NodeListOf<Element> | HTMLElement[],
  config: {
    start?: string;
    staggerAmount?: number;
    duration?: number;
  } = {}
) {
  const { start = "top 85%", staggerAmount = 0.1, duration = 0.8 } = config;

  Array.from(elements).forEach((item, index) => {
    gsap.set(item, {
      opacity: 0,
      y: 40,
      rotationX: 10,
    });

    ScrollTrigger.create({
      trigger: item as HTMLElement,
      start,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration,
          ease: "power2.out",
          delay: index * staggerAmount,
        });
      },
      once: true,
    });
  });
}

/**
 * Counter animation on scroll
 */
export function createCounterAnimation(
  element: HTMLElement,
  endValue: number,
  duration = 2
) {
  const counter = { value: 0 };

  ScrollTrigger.create({
    trigger: element,
    start: "top 75%",
    onEnter: () => {
      gsap.to(counter, {
        value: endValue,
        duration,
        ease: "power1.out",
        onUpdate: () => {
          element.textContent = Math.floor(counter.value).toString();
        },
      });
    },
    once: true,
  });
}

// ============================================
// HOVER & INTERACTIVE ANIMATIONS
// ============================================

/**
 * Advanced hover animation with multiple elements
 */
export function setupAdvancedHover(
  trigger: HTMLElement,
  targets: {
    title?: Element;
    arrow?: Element;
    background?: Element;
  }
) {
  const tl = gsap.timeline({ paused: true });

  if (targets.title) {
    tl.to(targets.title, { x: 10, duration: 0.3, ease: "power2.out" }, 0);
  }

  if (targets.arrow) {
    tl.to(
      targets.arrow,
      { y: -6, x: 6, rotation: 45, duration: 0.3, ease: "power2.out" },
      0
    );
  }

  if (targets.background) {
    tl.to(targets.background, { opacity: 1, duration: 0.3 }, 0);
  }

  trigger.addEventListener("mouseenter", () => tl.play());
  trigger.addEventListener("mouseleave", () => tl.reverse());

  return tl;
}

/**
 * Magnetic button/element animation
 */
export function createMagneticEffect(element: HTMLElement, strength = 0.4) {
  let xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1.2)" });
  let yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1.2)" });

  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    xTo(x * strength);
    yTo(y * strength);
  });

  element.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
  });
}

// ============================================
// SECTION ANIMATIONS
// ============================================

/**
 * Animated underline for filter buttons
 */
export function createAnimatedUnderline(
  buttons: NodeListOf<Element> | HTMLElement[],
  activeClass = "active"
) {
  const underline = document.createElement("div");
  underline.style.cssText = `
    position: absolute;
    bottom: -9px;
    height: 1px;
    background: var(--accent);
    pointer-events: none;
  `;

  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", () => {
      const rect = button.getBoundingClientRect();
      const parentRect = button.parentElement?.getBoundingClientRect();

      if (parentRect) {
        gsap.to(underline, {
          width: rect.width,
          left: rect.left - parentRect.left,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    });
  });
}

/**
 * Glitch effect animation
 */
export function createGlitchEffect(
  element: HTMLElement,
  intensity = 5,
  duration = 0.3
) {
  const timeline = gsap.timeline();

  for (let i = 0; i < 5; i++) {
    timeline.to(
      element,
      {
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity,
        duration: duration / 5,
      },
      i * (duration / 5)
    );
  }

  timeline.to(element, {
    x: 0,
    y: 0,
    duration: duration / 5,
  });

  return timeline;
}

/**
 * Smooth scroll to element with offset
 */
export function smoothScrollTo(element: HTMLElement, offset = 80) {
  gsap.to(window, {
    scrollTo: {
      y: element,
      offsetY: offset,
      autoKill: false,
    },
    duration: 1,
    ease: "power2.inOut",
  });
}

// ============================================
// ADVANCED EFFECTS
// ============================================

/**
 * Typewriter effect
 */
export function typewriterEffect(
  element: HTMLElement,
  speed = 0.05,
  delay = 0
) {
  const text = element.textContent || "";
  element.textContent = "";

  gsap.to(
    { index: 0 },
    {
      index: text.length,
      duration: text.length * speed,
      ease: "none",
      delay,
      onUpdate: function (this: any) {
        element.textContent = text.substring(0, Math.floor(this.targets()[0].index));
      },
    }
  );
}

/**
 * Sequential fade in stagger effect
 */
export function fadeInStagger(
  elements: NodeListOf<Element> | HTMLElement[],
  config: {
    duration?: number;
    staggerAmount?: number;
    delay?: number;
  } = {}
) {
  const { duration = 0.6, staggerAmount = 0.08, delay = 0 } = config;

  gsap.fromTo(
    elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      stagger: staggerAmount,
      delay,
      ease: "power2.out",
    }
  );
}

/**
 * Slide in from direction
 */
export function slideInFrom(
  element: HTMLElement,
  direction: "left" | "right" | "top" | "bottom" = "left",
  distance = 100,
  duration = 0.6,
  delay = 0
) {
  const config: any = { duration, delay, ease: "power2.out" };

  switch (direction) {
    case "left":
      gsap.fromTo(element, { x: -distance, opacity: 0 }, { x: 0, opacity: 1, ...config });
      break;
    case "right":
      gsap.fromTo(element, { x: distance, opacity: 0 }, { x: 0, opacity: 1, ...config });
      break;
    case "top":
      gsap.fromTo(element, { y: -distance, opacity: 0 }, { y: 0, opacity: 1, ...config });
      break;
    case "bottom":
      gsap.fromTo(element, { y: distance, opacity: 0 }, { y: 0, opacity: 1, ...config });
      break;
  }
}

/**
 * Kill all GSAP animations and ScrollTriggers (cleanup)
 */
export function killAllAnimations() {
  gsap.killTweensOf("*");
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresh all ScrollTriggers (useful after DOM changes)
 * NOTE: Removed ScrollTrigger.refresh() — calling it frequently causes layout thrashing.
 * ScrollTrigger auto-refreshes on resize/orientation change; manual refresh is rarely needed.
 */
export function refreshScrollTriggers() {
  // no-op: removed to avoid layout thrashing
}