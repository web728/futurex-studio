import { contactSchema, newsletterSchema, proposalSchema } from "./schemas";

export const formRegistry = {
  contact: {
    displayName: "Contact Form",
    schema: contactSchema,
    labels: {
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
    },
  },
  proposal: {
    displayName: "Proposal Form",
    schema: proposalSchema,
    labels: {
      fullName: "Full Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      preferred: "Preferred Contact",
      eventName: "Event",
      city: "City",
      venue: "Venue",
      dates: "Dates",
      boothSize: "Booth Size",
      openSides: "Open Sides",
      services: "Services",
      budget: "Budget",
      description: "Project Brief",
      file: "Uploaded File",
      consent: "Consent",
    },
  },
  newsletter: {
    displayName: "Newsletter Subscription",
    schema: newsletterSchema,
    labels: {
      email: "Email",
      consent: "Consent",
    },
  },
} as const;

export type FormKey = keyof typeof formRegistry;

export function isFormKey(value: string): value is FormKey {
  return value in formRegistry;
}