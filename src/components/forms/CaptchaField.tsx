"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        id: string,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => number;
      reset: (id?: number) => void;
    };
  }
}

export function CaptchaField({
  onChange,
  error,
  resetSignal,
}: {
  onChange: (token: string) => void;
  error?: string;
  resetSignal: number;
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const raw = useId();
  const id = `captcha-${raw.replace(/:/g, "")}`;
  const widget = useRef<number | undefined>(undefined);

  const renderCaptcha = useCallback(() => {
    if (!siteKey || widget.current !== undefined) return;

    // Safely wait for Google reCAPTCHA engine to fully load
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => {
        if (
          window.grecaptcha?.render &&
          widget.current === undefined &&
          document.getElementById(id)
        ) {
          widget.current = window.grecaptcha.render(id, {
            sitekey: siteKey,
            callback: onChange,
            "expired-callback": () => onChange(""),
            "error-callback": () => onChange(""),
          });
        }
      });
    }
  }, [id, siteKey, onChange]);

  // Handle script load / page refresh logic
  useEffect(() => {
    if (window.grecaptcha?.ready) {
      renderCaptcha();
    }
  }, [renderCaptcha]);

  // Handle component reset signal
  useEffect(() => {
    if (widget.current !== undefined && window.grecaptcha?.reset) {
      window.grecaptcha.reset(widget.current);
      onChange("");
    }
  }, [resetSignal, onChange]);

  return (
    <div>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderCaptcha}
      />
      {siteKey ? (
        <div id={id} aria-label="Google reCAPTCHA verification" />
      ) : (
        <p
          role="alert"
          className="border border-[var(--error)]/50 bg-[var(--error)]/10 p-4 text-sm text-[var(--error)]"
        >
          Verification is not configured. Add the reCAPTCHA site key before
          accepting submissions.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-[var(--error)]">
          {error}
        </p>
      )}
    </div>
  );
}