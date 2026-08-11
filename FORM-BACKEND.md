# Shared Form Backend

## Lifecycle

All public forms submit `POST /api/forms/submit` with a trusted form key, source, pathname, temporary captcha token, UUID idempotency key, completion timestamp and field object.

The server applies this sequence:

1. Enforce the JSON body limit.
2. Validate the common request envelope.
3. Select a schema from the server-owned registry.
4. Apply IP/form rate limiting.
5. Reject implausibly fast submissions and honeypot values.
6. Verify reCAPTCHA v2 with Google.
7. Normalize and validate fields.
8. Check the idempotency key.
9. Insert the source-of-truth MongoDB document.
10. Append to `Website Enquiries`.
11. Notify both recipients through Resend.
12. Store each delivery result and final status.
13. Return a safe typed response.

MongoDB failure rejects the request. Sheets/email failure retains the record and returns `PARTIAL_DELIVERY` with the reference ID.

## Registry and schemas

`src/lib/forms/registry.ts` contains the supported `contact`, `proposal` and `newsletter` keys. Only the proposal UI currently exists. Future forms use the same endpoint and add a registry entry, Zod schema, labels and client configuration. Arbitrary schemas and unknown form types are rejected.

Limits include 100-character names, 150-character companies, 254-character emails, 30-character phones and 5,000-character long messages. Schemas are strict. Strings are trimmed, null bytes removed and horizontal whitespace normalized.

## MongoDB model

The driver uses a cached `MongoClient`. The shared `form_submissions` collection stores:

- unique submission and idempotency IDs;
- form type, source and ISO timestamps;
- sanitized fields and permitted request metadata;
- overall status;
- MongoDB, Sheets and email attempt/status records.

Indexes are created for submission ID, idempotency key, form type, submitted time, status and creation time. CAPTCHA tokens and secrets are never stored.

## Google Sheets

The exact tab name is `Website Enquiries`. A stable 18-column mapping stores common fields and JSON-encodes remaining fields. The append method first checks column A for the submission ID, then uses append semantics. This reduces duplicate rows during administrative retry.

Run `npm run setup:google-sheet` once after sharing the sheet with the service-account email. The script writes headers only when row one is empty and rejects incompatible existing headers.

## Email

Resend is the single provider. Both notification recipients are required. Email includes Futurex Studio branding, submission metadata and all public fields, with a plain-text fallback. User values are HTML-escaped. The Resend idempotency header uses the submission ID.

## reCAPTCHA

The client renders the Google reCAPTCHA v2 checkbox and holds the token only in component state. Missing/expired verification blocks submission. The server fails closed and optionally checks `RECAPTCHA_EXPECTED_HOSTNAME`. The widget resets after complete or partial processing.

Use Google’s official test keys for local integration work. There is no production bypass.

## Errors

Responses use `VALIDATION_ERROR`, `CAPTCHA_REQUIRED`, `CAPTCHA_FAILED`, `RATE_LIMITED`, `DATABASE_ERROR`, `PARTIAL_DELIVERY` or `SERVER_ERROR`. Provider responses, stack traces and configuration values are never returned.

## Rate limiting

Production requires Upstash Redis REST. Keys combine client IP and trusted form type. Defaults are five submissions per ten minutes. If durable rate limiting is unconfigured in production, the endpoint fails closed. An in-memory implementation exists only outside production for local testing.

## Retry

`npm run forms:retry-failed` is an administrative server-side script. It finds failed Sheets/email deliveries, retries only failed steps, preserves the submission ID, increments attempts and recalculates status. Do not expose it as a public endpoint.

## File uploads

The visible upload control is disabled. Configure private object storage, MIME and extension validation, randomized names, size limits, malware scanning, retention, signed access and deletion before enabling it. Files must not be stored in MongoDB, Sheets or notification email attachments.

## Integration testing

Routine tests mock MongoDB, Google, Resend, CAPTCHA and rate limiting:

```bash
npm test
```

For a real staging test:

1. Set all values in `.env.local`.
2. Restrict Atlas/network/provider credentials to staging.
3. Share the spreadsheet with the service account.
4. Run `npm run setup:google-sheet`.
5. Use a reCAPTCHA key registered for the staging hostname.
6. Submit one proposal and confirm one Mongo record, one sheet row and delivery to both inboxes.
7. Repeat with the same idempotency key through an API client and confirm no duplicates.
8. Temporarily invalidate one downstream credential and confirm `partially_completed`, then restore it and run `npm run forms:retry-failed`.

Do not use production personal data for integration tests.
# Final-pass status

The cinematic production pass does not change the form endpoint, validation, persistence, Google Sheets, notification, anti-spam, or retry architecture. Re-run the automated form tests and perform one real production submission before launch.
