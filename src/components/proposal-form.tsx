"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Paperclip, X } from "lucide-react";
import { CaptchaField } from "./forms/CaptchaField";

// 1. Schema me File Upload Support Add Kar Diya Hai
const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  company: z.string().min(2, "Please enter your company name"),
  email: z.string().email("Enter a valid work email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  preferred: z.string(),
  eventName: z.string().optional(),
  venue: z.string().optional(),
  dates: z.string().optional(),
  boothSize: z.string().optional(),
  openSides: z.string().optional(),
  services: z.string().min(1, "Choose a service"),
  budget: z.string().optional(),
  description: z.string().min(20, "Please share at least 20 characters"),
  consent: z.literal(true, { error: "Consent is required" }),
  website: z.string().max(0).optional(),
});

type Fields = z.infer<typeof schema>;

const input =
  "mt-2 w-full border border-white/20 bg-white/[.04] px-4 py-3.5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[var(--accent)] focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(232,76,28,0.12)] rounded-xl";

export function ProposalForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [submissionId, setSubmissionId] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [idempotency, setIdempotency] = useState(() => crypto.randomUUID());
  
  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { preferred: "Email", services: "", consent: undefined },
  });

  const captchaChange = useCallback((token: string) => {
    setCaptchaToken(token);
    if (token) setCaptchaError("");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size 10MB se chhoti honi chahiye.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 2. Submit Handler Updated to Use FormData
  const submit = async (data: Fields) => {
    if (!captchaToken) {
      setCaptchaError("Complete the “I’m not a robot” verification.");
      return;
    }
    setStatus("loading");
    setServerMessage("");

    try {
      // Create FormData instead of plain JSON
      const formData = new FormData();
      formData.append("formType", "proposal");
      formData.append("source", "Contact Page");
      formData.append("pathname", window.location.pathname);
      formData.append("captchaToken", captchaToken);
      formData.append("idempotencyKey", idempotency);
      formData.append("startedAt", String(startedAt));

      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(`fields[${key}]`, String(value));
        }
      });

      // Append file if selected
      if (selectedFile) {
        formData.append("fields[file]", selectedFile);
      }

      // API Call without manual Content-Type header (Browser auto-sets boundary)
      const r = await fetch("/api/forms/submit", {
        method: "POST",
        body: formData,
      });

      const result = (await r.json()) as {
        success: boolean;
        submissionId?: string;
        message?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (r.ok && result.success) {
        setSubmissionId(result.submissionId || "");
        setServerMessage(
          result.message ||
            "Thank you. Your enquiry has been received successfully."
        );
        setStatus("success");
        reset();
        setSelectedFile(null);
        setResetSignal((x) => x + 1);
      } else {
        setSubmissionId(result.submissionId || "");
        setServerMessage(
          result.message ||
            "The form could not be processed. Please call or email the studio."
        );
        setStatus("error");
        setResetSignal((x) => x + 1);
      }
    } catch {
      setServerMessage(
        "The form could not be processed. Please call or email the studio."
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const restart = () => {
    setStatus("idle");
    setIdempotency(crypto.randomUUID());
    setStartedAt(Date.now());
  };

  if (status === "success")
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[var(--success,#22c55e)]/40 bg-[var(--success,#22c55e)]/10 p-10 focus:outline-none"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--success,#22c55e)]/20 blur-[80px]" />
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 200,
            damping: 14,
          }}
        >
          <CheckCircle2 className="text-[var(--success,#22c55e)]" size={40} />
        </motion.div>
        <h2 className="relative mt-5 text-2xl font-bold text-white">Enquiry received</h2>
        <p className="relative mt-3 text-white/65">{serverMessage}</p>
        <p className="relative mt-4 text-sm text-white/45">
          Reference: {submissionId}
        </p>
        <button
          onClick={restart}
          className="relative mt-6 rounded-xl border border-white/25 px-4 py-2 text-sm text-white transition hover:border-white/50"
        >
          Send another enquiry
        </button>
      </motion.div>
    );

  const field = (
    name: keyof Fields,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <label className="block text-sm font-semibold text-white">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={input}
      />
      <AnimatePresence>
        {errors[name] && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 block text-xs text-[var(--error,#ef4444)]"
          >
            {errors[name]?.message}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("fullName", "Full name *")}
        {field("company", "Company name *")}
        {field("email", "Work email *", "email")}
        {field("phone", "Phone number *", "tel")}
        <label className="block text-sm font-semibold text-white">
          Preferred contact method
          <select {...register("preferred")} className={input}>
            <option className="bg-black text-white">Email</option>
            <option className="bg-black text-white">Phone</option>
            <option className="bg-black text-white">WhatsApp</option>
          </select>
        </label>
        {field("eventName", "Exhibition or event name")}
        {field("venue", "Venue")}
        {field("dates", "Event dates")}
        {field("boothSize", "Booth size or dimensions")}
        {field("openSides", "Number of open sides")}
        <label className="block text-sm font-semibold text-white">
          Required service *
          <select {...register("services")} className={input}>
            <option value="" className="bg-black text-white">
              Select
            </option>
            <option className="bg-black text-white">Exhibition stall design</option>
            <option className="bg-black text-white">Design and fabrication</option>
            <option className="bg-black text-white">3D visualisation</option>
            <option className="bg-black text-white">Event or brand experience</option>
          </select>
          {errors.services && (
            <span className="mt-2 block text-xs text-[var(--error,#ef4444)]">
              {errors.services.message}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-white">
          Estimated budget range
          <select {...register("budget")} className={input}>
            <option className="bg-black text-white">To be discussed</option>
            <option className="bg-black text-white">Under ₹5 lakh</option>
            <option className="bg-black text-white">₹5–10 lakh</option>
            <option className="bg-black text-white">₹10–25 lakh</option>
            <option className="bg-black text-white">₹25 lakh+</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-white">
        Project description *
        <textarea
          rows={6}
          {...register("description")}
          className={input}
          placeholder="Tell us about the space, audience, objectives and key requirements."
        />
        {errors.description && (
          <span className="mt-2 block text-xs text-[var(--error,#ef4444)]">
            {errors.description.message}
          </span>
        )}
      </label>

      {/* 3. Fully Working Active File Upload Input */}
      <div className="block text-sm font-semibold text-white">
        <span>Reference files (PDF, PNG, JPG - Max 10MB)</span>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.zip"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/[.04] px-4 py-3 text-sm font-normal text-white transition hover:border-[var(--accent)] hover:bg-white/[.08]"
          >
            <Paperclip size={18} />
            {selectedFile ? "Change file" : "Upload floorplan or layout"}
          </label>

          {selectedFile && (
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-white">
              <span className="max-w-[200px] truncate">{selectedFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="text-white/60 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <label className="hidden" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>

      <label className="flex items-start gap-3 text-sm leading-6 text-white/65">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 size-4 accent-[var(--accent,#ff5a2a)]"
        />
        I consent to Futurex Studio using these details to respond to my
        enquiry. *
      </label>
      {errors.consent && (
        <span className="block text-xs text-[var(--error,#ef4444)]">
          {errors.consent.message}
        </span>
      )}

      <CaptchaField
        onChange={captchaChange}
        error={captchaError}
        resetSignal={resetSignal}
      />

      <motion.button
        disabled={status === "loading"}
        whileHover={status !== "loading" ? { scale: 1.02 } : {}}
        whileTap={status !== "loading" ? { scale: 0.98 } : {}}
        className="relative flex items-center gap-2 rounded-xl bg-[var(--accent,#ff5a2a)] px-7 py-4 font-bold text-black transition-opacity disabled:opacity-50"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={18} />}
        {status === "loading" ? "Sending securely…" : "Send project brief"}
      </motion.button>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-xl border border-[var(--error,#ef4444)]/30 bg-[var(--error,#ef4444)]/10 p-4 text-sm text-[var(--error,#ef4444)]"
          >
            <p>{serverMessage}</p>
            {submissionId && <p className="mt-1">Reference: {submissionId}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}