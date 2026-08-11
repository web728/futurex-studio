import { z } from "zod";

const clean = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .transform((v) => v.replace(/\0/g, ""));

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v.replace(/\0/g, ""))
    .optional();

export const phoneSchema = z
  .string()
  .trim()
  .min(8)
  .max(30)
  .regex(/^[+\d][\d\s().-]{6,29}$/, "Enter a valid phone number");

// File Validation Helper (Client + Server both supported)
export const fileSchema = z
  .union([
    z.instanceof(typeof File !== "undefined" ? File : Object),
    z.object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
    }),
  ])
  .optional();

export const proposalSchema = z
  .object({
    fullName: clean(100),
    company: clean(150),
    email: z.string().email().max(254),
    phone: phoneSchema,
    preferred: z.enum(["Email", "Phone", "WhatsApp"]),
    eventName: optional(160),
    city: optional(100),
    venue: optional(180),
    dates: optional(100),
    boothSize: optional(100),
    openSides: optional(30),
    services: z.enum([
      "Exhibition stall design",
      "Design and fabrication",
      "3D visualisation",
      "Event or brand experience",
    ]),
    budget: z
      .enum([
        "To be discussed",
        "Under ₹5 lakh",
        "₹5–10 lakh",
        "₹10–25 lakh",
        "₹25 lakh+",
      ])
      .optional(),
    description: clean(5000),
    // File Field added
    file: fileSchema, 
    attachment: fileSchema,
    consent: z.literal(true).or(z.string().transform((v) => v === "true" || v === "on")),
    website: z.string().max(0).optional(),
  });

export const contactSchema = z
  .object({
    fullName: clean(100),
    email: z.string().email().max(254),
    phone: phoneSchema,
    message: clean(5000),
    consent: z.literal(true).or(z.string().transform((v) => v === "true" || v === "on")),
    website: z.string().max(0).optional(),
  });

export const newsletterSchema = z
  .object({
    email: z.string().email().max(254),
    consent: z.literal(true).or(z.string().transform((v) => v === "true" || v === "on")),
    website: z.string().max(0).optional(),
  });

export const requestSchema = z
  .object({
    formType: z.string().min(1).max(50),
    source: z.string().trim().max(120).optional(),
    pathname: z.string().trim().max(500).optional(),
    captchaToken: z.string().trim().min(1).max(4096),
    idempotencyKey: z.string().uuid().or(z.string().min(1)),
    startedAt: z.preprocess((val) => (val ? Number(val) : undefined), z.number().int().positive().optional()),
    fields: z.record(z.string(), z.unknown()),
  });