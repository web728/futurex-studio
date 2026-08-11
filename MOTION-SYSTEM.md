# Futurex Studio Motion System

## Principles

Motion should clarify hierarchy, connect sections and reward exploration. It must never delay access to content, replace a visible state, capture native scrolling or create a mobile hover dependency.

The design language is architectural: reveals behave like panels, masks and layers; movement is controlled rather than elastic or playful.

## Tokens

TypeScript tokens live in `src/components/motion-system.tsx`.

| Token | Value | Use |
|---|---:|---|
| Fast | 220 ms | Hover and focus feedback |
| Base | 480 ms | Interface state changes |
| Slow | 800 ms | Image and section reveals |
| Cinematic | 1100 ms | Hero choreography only |
| Ease | `cubic-bezier(.22,1,.36,1)` | Primary reveal easing |
| Stagger | 75 ms | Small related groups |
| Reveal distance | 28 px | Section entrance |
| Spring | 180 / 24 / .7 | Responsive pointer interactions |

Matching CSS custom properties are in `src/app/globals.css`.

## Reusable components

- `MotionShell`: fast route transition and global progress integration.
- `ScrollProgress`: two-pixel spring-smoothed reading progress.
- `FadeReveal`: viewport-aware opacity/vertical reveal.
- `StaggerGroup` / `StaggerItem`: coordinated card and detail entrances.
- `ImageReveal`: architectural clip mask and accent wipe.
- `MagneticButton`: restrained mouse-only movement for primary CTAs.
- `PremiumHeader`: scroll state, active route, animated underline and full-screen mobile navigation.
- `CinematicHero`: scroll-linked image/text depth without scroll capture.
- `ProcessMotion`: sticky desktop narrative with active-step progress.
- `ProjectHeroMotion`: project-specific hero parallax and masked title.
- `ServiceRail`: sticky active-section navigation.
- `StallTypeSelector`: keyboard-operable commercial-format selector.

## Reduced motion

Every Framer Motion primitive calls `useReducedMotion`. Parallax, masks, stagger delays and magnetic behaviour are removed or reduced to immediate states. Global CSS also collapses animation and transition duration. Content remains present in the DOM before animation.

## Mobile and touch

- Pointer-only magnetic movement checks `pointerType === "mouse"`.
- Hover image transforms are disabled on hoverless devices.
- Hero movement is lighter because mobile scroll range and viewport crop constrain the effect.
- Mobile navigation is a native button plus accessible links; no focus trap or scroll hijacking.
- Portfolio titles and metadata remain visible without hover.
- Horizontal service navigation retains native touch scrolling.

## Performance decisions

- No Lenis, GSAP, Canvas, WebGL or continuous cursor loop.
- Native scrolling and browser history are preserved.
- Motion uses transform, opacity and clip-path; no layout-dependent animation loops.
- Framer Motion is limited to interaction components; content and data remain Server Components.
- Media remains Next Image-based with responsive sizing and lazy loading.
- Viewport reveals run once and stop observing.

## Disable an effect

- Remove `MotionShell` in `src/app/layout.tsx` to disable route transitions/progress.
- Replace `CinematicHero` or `ProjectHeroMotion` with static semantic markup for static hero behaviour.
- Replace `ImageReveal`/`FadeReveal` wrappers with a `div`; their children require no animation to render.
- Replace `MagneticButton` with a normal `Link`.

## Adding motion to a new section

1. Choose the user benefit: hierarchy, orientation, continuity or feedback.
2. Prefer `FadeReveal` for editorial copy, `ImageReveal` for media and `StaggerGroup` for a small related set.
3. Do not stack multiple reveal primitives on the same element.
4. Keep essential controls immediately operable.
5. Verify keyboard, reduced-motion, 375px and desktop behaviour.
6. Check that the effect introduces no horizontal overflow or console warning.
# Final cinematic production pass

The final pass treats motion as editorial pacing: a controlled hero reveal, image-led chapter transitions, sticky desktop project frames, restrained service-image changes, and a visual handoff between case studies. Mobile replaces sticky sequences with stable vertical chapters. All additions honor the operating-system reduced-motion preference.

Chrome launch QA covers 1440, 1280, 1024, 768, 430, and 375 px widths, including overflow, console, failed requests, navigation, portfolio filters, and representative case-study transitions.
