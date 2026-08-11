export const motionTokens = {
  duration: { fast: 0.22, base: 0.48, slow: 0.8, cinematic: 1.1 },
  ease: [0.22, 1, 0.36, 1] as const,
  spring: { stiffness: 180, damping: 24, mass: 0.7 },
  stagger: 0.075,
  revealY: 28,
};
