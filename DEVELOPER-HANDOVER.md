# Futurex Studio developer handover

## Overview

Production-oriented marketing and portfolio site for an exhibition design and fabrication studio. It uses a shared, fail-closed form backend: MongoDB is the source of truth; Google Sheets and Resend are downstream integrations. Do not redesign or alter approved copy, image assignments, motion or forms without owner approval.

## Source reference

- Branch: `final-cinematic-production-pass`
- Latest pre-handover product commit: `aaf48b5` (`Integrate curated Futurex image system`)
- Stable rollback commit: `21aa49f`
- Git history is intentionally excluded from the delivery ZIP.

## Runtime and stack

- Node.js `>=20.9.0`; use the current Node 20 LTS or newer compatible LTS
- Next.js 16 App Router, React 19, TypeScript 5
- Tailwind CSS 4, Framer Motion, React Hook Form, Zod
- MongoDB Atlas, Google Sheets API, Resend, reCAPTCHA v2 Checkbox, Upstash Redis

## Local setup and verification

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`. For a production build:

```powershell
npm test
npm run lint
npx tsc --noEmit
npm run build
npm start
```

Use `README.md` for the complete environment-variable table. Never place secrets in a `NEXT_PUBLIC_` variable or commit `.env.local`.

## Provider setup

1. **MongoDB Atlas:** create a least-privilege database user, restrict network access, set URI/database/collection. Mongo failure rejects the request.
2. **Google Sheets:** enable the Sheets API, create a service account, share the existing spreadsheet with it, set the exact tab name, then run `npm run setup:google-sheet`. The command validates headers and does not overwrite incompatible data.
3. **Resend:** verify the sending domain, configure the API key and sender, and set both notification recipients.
4. **reCAPTCHA:** create v2 Checkbox keys for every real hostname. Set the public site key, server secret and expected production hostname.
5. **Upstash:** create Redis and set both REST values. Production rate limiting fails closed if they are absent.

Uploads remain disabled. Do not enable the file input until private object storage, validation, malware scanning, signed access, retention and deletion are implemented.

## Domain and Vercel

1. Import the project and select the repository root.
2. Use Node `>=20.9.0`; install with `npm ci`; build with `npm run build`.
3. Configure every production variable from `.env.example`; use separate Preview values.
4. Keep `NEXT_PUBLIC_NOINDEX=true` in Preview. Set it to `false` only on approved Production.
5. Set `NEXT_PUBLIC_SITE_URL` and `RECAPTCHA_EXPECTED_HOSTNAME` to the final domain.
6. Attach the domain, finish DNS, deploy, and verify HTTPS.
7. Check `/robots.txt`, `/sitemap.xml`, every route, redirects and the 404.
8. Run a real form submission and confirm MongoDB, the existing Sheet tab and both emails.

For alternative Node hosting, provide persistent HTTPS reverse proxying, trusted forwarded headers only when the proxy overwrites them, all server secrets, outbound access to providers, and a durable Redis limiter. Run `npm ci && npm run build`, then `npm start`; do not use an in-memory limiter in production.

## Form and retry testing

Test valid submission, invalid fields, honeypot, too-fast completion, invalid/expired CAPTCHA, rate limit, duplicate idempotency ID, Mongo failure and each downstream partial failure. Confirm public errors do not expose provider details. A partially completed record retains its reference ID.

Retry only from an authorised server shell:

```powershell
$env:ALLOW_FORM_RETRY='true'
npm run forms:retry-failed
Remove-Item Env:ALLOW_FORM_RETRY
```

The command retries only failed Sheets/email steps. Review logs and database status afterward.

## Search, redirects and rollback

After launch, verify the canonical hostname, submit `/sitemap.xml` in Google Search Console and monitor indexing. Implement owner-approved legacy redirects from `REDIRECT-PLAN.md` at the hosting layer before DNS cutover. If a release must be reversed, deploy commit `21aa49f`; provider data created after that deployment is not rolled back.

## Known limitations

- Two project hero images are only 960×540.
- Verified same-project gallery coverage is limited; do not invent or cross-assign images.
- Real provider credentials are not included; external integrations have not received a production end-to-end submission.
- Legal review, final contact details, testimonials/project permissions and image rights remain owner responsibilities.
- Final domain/DNS and production indexing configuration are pending.
- Responsive desktop emulation was checked; final physical-device and real Safari/iOS QA remains required.
- Analytics IDs are reserved but scripts/consent are not active.

## Exact launch checklist

- [ ] Owner signs off `CONTENT-VERIFICATION.md`, `ASSUMPTIONS.md`, legal pages and contact data.
- [ ] Image, testimonial, project and logo permissions are documented.
- [ ] Production secrets are configured only in the host.
- [ ] Mongo/Sheets/Resend/reCAPTCHA/Upstash setup is complete.
- [ ] `npm ci`, tests, lint, TypeScript, build and dependency audit pass.
- [ ] Final domain, DNS, SSL, canonical and reCAPTCHA hostname match.
- [ ] Preview remains noindex; Production robots/sitemap are verified.
- [ ] All routes, links, 404 and legacy redirects are tested.
- [ ] Real form delivery and partial-failure/retry behaviour are tested.
- [ ] Physical-device, Safari/iOS, accessibility and performance checks pass.
- [ ] Search Console receives the sitemap.
- [ ] Monitoring and rollback ownership are assigned.
