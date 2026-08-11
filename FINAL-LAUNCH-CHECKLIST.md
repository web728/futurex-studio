# Final launch checklist

## Release protection

- [x] Pre-refinement production state committed on `master` at `21aa49f`.
- [x] Final work isolated on `final-cinematic-production-pass`.
- [ ] Merge only after stakeholder approval and production environment verification.
- [ ] Roll back by redeploying commit `21aa49f` if a release issue appears.

## Experience

- [x] Cinematic homepage narrative and project chapters.
- [x] Editorial services interaction with mobile-safe fallback.
- [x] Portfolio image/index on desktop and vertical gallery on mobile.
- [x] Case-study next-project handoff.
- [x] Reduced-motion behavior preserved.
- [ ] Confirm final project names, facts, client permissions, and testimonial permissions.

## Engineering

- [x] Unit tests pass (13/13).
- [x] ESLint passes.
- [x] TypeScript passes.
- [x] Production build passes.
- [x] Production Chrome smoke audit reports no application console errors or horizontal overflow.
- [ ] Validate 1440, 1280, 1024, 768, 430, and 375 px viewports.

## Production operations

- [ ] Set and verify all variables documented in `.env.example`.
- [ ] Confirm MongoDB indexes and retention policy.
- [ ] Confirm Google Sheets service-account access.
- [ ] Confirm Resend sender domain and notification recipients.
- [ ] Confirm Upstash rate limiting and reCAPTCHA keys.
- [ ] Submit every form once in production and verify database, sheet, and email delivery.
- [ ] Verify canonical production URL, redirects, analytics, robots, sitemap, and Search Console.
- [ ] Run an accessibility review with keyboard, screen reader, contrast, and reduced motion.
