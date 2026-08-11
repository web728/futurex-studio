# Futurex Studio Website

A complete Next.js marketing and portfolio website centred on exhibition stall design, fabrication and turnkey execution. The visual direction is architectural/editorial: charcoal surfaces, warm whites, an orange accent, large project imagery, sharp grids and restrained interaction.

> Technical deployment readiness does not equal business launch approval. Review `CONTENT-VERIFICATION.md` and `ASSUMPTIONS.md` before publishing.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Lucide icons
- Framer Motion motion primitives for route, scroll, reveal and interaction choreography
- Next Image and Metadata APIs

## Local setup

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Quality commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` locally and configure the same values per Vercel environment. `NEXT_PUBLIC_` variables are browser-visible; every credential without that prefix is server-only.

| Variable | Production | Purpose / example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Required | Final HTTPS origin, for example `https://futurexstudio.com` |
| `NEXT_PUBLIC_NOINDEX` | Required | `true` on Preview/Staging; `false` only on approved Production |
| `WEBSITE_NAME`, `BUSINESS_TIMEZONE` | Optional | Defaults: `Futurex Studio`, `Asia/Kolkata` |
| `TRUST_PROXY_HEADERS` | Optional | Enable only behind a trusted proxy that overwrites forwarding headers |
| `MONGODB_URI` | Required | Server-only Atlas connection secret |
| `MONGODB_DATABASE`, `MONGODB_COLLECTION` | Optional | Defaults: `futurex_studio`, `form_submissions` |
| `GOOGLE_SPREADSHEET_ID`, `GOOGLE_SHEET_NAME` | Required | Existing sheet ID and exact tab name |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Required* | Sheets service-account credentials |
| `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64` | Required* | Alternative to the email/private-key pair |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Required | Browser-visible reCAPTCHA v2 Checkbox key |
| `RECAPTCHA_SECRET_KEY` | Required | Server-only verification secret |
| `RECAPTCHA_EXPECTED_HOSTNAME` | Recommended | Exact production hostname |
| `RESEND_API_KEY`, `EMAIL_FROM` | Required | Server-only Resend key and verified sender |
| `NOTIFICATION_EMAIL_1`, `NOTIFICATION_EMAIL_2` | Required | Both notification recipients |
| `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_WINDOW_SECONDS` | Optional | Defaults: 5 requests per 600 seconds |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Required | Durable production limiter; production fails closed without it |
| `ALLOW_FORM_RETRY` | Optional | Keep `false`; enable only for an authorised one-off retry |
| Analytics IDs in `.env.example` | Optional | Reserved and currently inactive |

`VERCEL` is supplied automatically by Vercel. Never commit `.env.local`, real secrets, or credential JSON.

## Editing content

Core editable content lives in `src/data/site.ts`: company contacts, navigation, services, projects, testimonials and FAQs. Each project supports a slug, category, service list, hero, gallery, summary and verification flag.

To add a project:

1. Copy approved, rights-cleared images into `public/media/projects`.
2. Optimise the source before committing where practical.
3. Add one record to `projects` in `src/data/site.ts`.
4. Use only verified facts. Keep missing fields absent.
5. Run the build; the dynamic route is statically generated.

## Proposal form

The proposal form uses the shared `POST /api/forms/submit` architecture. MongoDB is the source of truth; Google Sheets and Resend delivery are tracked independently. It includes mirrored client/server validation, honeypot, completion timing, reCAPTCHA v2, durable production rate limiting, request-size limits and UUID idempotency.

Before launch:

1. Create an Atlas database user with access only to the target database and restrict network access to approved deployment sources.
2. Create a Google Cloud service account with Sheets API access, then share the existing spreadsheet with its email.
3. Confirm the exact `Website Enquiries` tab and run `npm run setup:google-sheet`.
4. Register reCAPTCHA v2 Checkbox keys for each real hostname.
5. Configure Resend, verify the sending domain and set both notification recipients.
6. Create an Upstash Redis database for durable production rate limiting.
7. Configure secure object storage, malware scanning, signed access and deletion before enabling uploads.
8. Test complete, partial-failure, retry and duplicate-submission behaviour.

See `FORM-BACKEND.md`.

## Backend commands

```bash
npm test
npm run setup:google-sheet
npm run forms:retry-failed
```

The setup and retry commands require configured server credentials. Routine unit tests mock every external provider.

## MongoDB Atlas

Use a dedicated least-privilege database user and set `MONGODB_URI`, `MONGODB_DATABASE` and `MONGODB_COLLECTION`. The application caches the Mongo client and creates unique indexes for submission/idempotency IDs plus query indexes for form type, submitted time, status and creation time.

MongoDB failure rejects the public request. Sheets or email failure retains the MongoDB record as `partially_completed` and returns the reference ID.

## Google Sheets

Enable the Google Sheets API, create a service account and use either individual credential variables or base64-encoded JSON. Share the spreadsheet—not a new tab—with the service-account email. The backend appends to `Website Enquiries`, never overwrites rows, and stores flexible fields as JSON in `Additional Fields`.

## reCAPTCHA and rate limiting

Use reCAPTCHA v2 Checkbox, not v3. The secret stays server-only and verification fails closed. Production also fails closed if Upstash rate limiting is absent. For local manual integration tests, use Google’s published test keys; no production bypass exists.

## Email and retry

Resend is the single notification provider. A successful submission sends one escaped HTML/plain-text email to both configured recipients. Provider idempotency uses the submission ID. Run the retry command only from an authorised server environment with `ALLOW_FORM_RETRY=true`; it retries only failed integration steps.

## Troubleshooting

- `CONFIG_MONGODB`: check URI, Atlas user permissions and network access.
- `CONFIG_GOOGLE_SHEETS`: confirm spreadsheet ID, exact tab name, private-key newlines and sheet sharing.
- `INCOMPATIBLE_GOOGLE_SHEET_HEADERS`: compare row one with `FORM-BACKEND.md`; the setup script will not overwrite it.
- `CONFIG_RECAPTCHA`: confirm both keys and registered hostname.
- `CONFIG_EMAIL`: confirm Resend key, verified sender and both recipient variables.
- `CONFIG_RATE_LIMIT`: production requires both Upstash REST values.

Public responses intentionally hide these internal categories.

## Analytics

GA, Search Console, Clarity, Meta Pixel and LinkedIn Insight Tag are not activated. When approved, add environment-driven scripts in the root layout, ensure they render only when an ID exists, implement consent where legally required, and update the Privacy Policy with provider, purpose, retention and opt-out details.

## SEO

Unique route metadata, canonicals, Open Graph, Twitter cards, semantic headings, internal links, sitemap, robots and Organization/ProfessionalService JSON-LD are included. Dynamic portfolio metadata is generated from project data. Add verified local coverage only after owner confirmation.

See `SEO-CONTENT-PLAN.md` and `REDIRECT-PLAN.md`.

## Accessibility and performance

- Semantic landmarks and skip link
- Keyboard-accessible mobile navigation, filters and accordion
- Visible focus styling and adequate touch targets
- Reduced-motion override
- Responsive Next Images with explicit responsive containers
- Server Components by default; client code limited to navigation, filters, FAQ and form
- Local assets, no third-party runtime imagery or scripts
- Native scrolling is preserved; no Lenis, GSAP, WebGL or continuous animation loop
- Motion primitives automatically reduce parallax, masks, stagger and magnetic behaviour for `prefers-reduced-motion`
- Mouse-only magnetic interactions are disabled for touch pointers

## Motion architecture

The reusable motion system lives in `src/components/motion-system.tsx`. It provides the page shell, progress indicator, reveal primitives, premium header, cinematic hero, project hero, process sequence and magnetic CTA behaviour. Page-specific interactive states remain in `src/components/interactive.tsx`.

See `MOTION-SYSTEM.md` for tokens, accessibility behaviour, performance decisions and extension guidance.

Motion regression checks:

```bash
npm run dev
# Check 375, 430, 768, 1024, 1280 and 1440px widths
# Enable the OS/browser reduced-motion preference and reload
# Navigate every route using keyboard only
# Test mobile menu, portfolio filters, service anchors and proposal validation
```

Run a browser-based axe/Lighthouse audit against the final production build before launch.

## Deployment to Vercel

```bash
npm ci
npm run build
npx vercel
npx vercel --prod
```

In Vercel:

1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
2. Set `NEXT_PUBLIC_NOINDEX=true` for Preview and `false` for Production.
3. Add all MongoDB, Google Sheets, reCAPTCHA, Resend and Upstash values from `.env.example`.
4. Attach the domain and verify DNS.
5. Confirm `/robots.txt`, `/sitemap.xml`, every route, redirects and the 404.
6. Run Lighthouse, an accessibility audit and a real form-delivery test.
7. Submit the sitemap in Google Search Console.

Recommended error monitoring: Vercel runtime logs plus Sentry or another approved provider, with privacy review.

## Owner review order

1. `CONTENT-VERIFICATION.md`
2. `ASSUMPTIONS.md`
3. Contact information in `src/data/site.ts`
4. All project images and testimonial wording
5. `src/app/privacy-policy/page.tsx` and `src/app/terms/page.tsx`
6. Form provider and destination
7. `REDIRECT-PLAN.md`
8. `OWNER-HANDOVER-SUMMARY.md`

Generated legal drafts are not legal advice. Obtain qualified review.
# Final production branch

The final cinematic refinement is isolated on `final-cinematic-production-pass`. The protected pre-pass release is commit `21aa49f`; redeploy that commit for a clean rollback. See `FINAL-LAUNCH-CHECKLIST.md` before merging or deploying.
