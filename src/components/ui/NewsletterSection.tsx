"use client";

import React, { useState } from "react";
import { CheckIcon, ArrowRightIcon } from "./Icons";

interface NewsletterSectionProps {
  variant?: "inline" | "card" | "full";
}

export function NewsletterSection({ variant = "card" }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Por favor, introduce un correo electrónico válido.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMessage("Debes aceptar la política de privacidad para suscribirte.");
      return;
    }

    setStatus("loading");
    // Simulate instantaneous pleasant subscription feedback
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 700);
  };

  if (status === "success") {
    return (
      <div className="p-8 sm:p-10 rounded-sm bg-sage/10 border border-sage/30 text-center space-y-3 shadow-subtle">
        <div className="w-10 h-10 rounded-full bg-sage text-porcelain flex items-center justify-center mx-auto">
          <CheckIcon className="w-5 h-5" />
        </div>
        <h4 className="font-editorial text-2xl text-ink font-normal">
          Bienvenido a El Cuaderno Clínico
        </h4>
        <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
          Hemos registrado tu suscripción. Recibirás nuestras publicaciones monográficas sobre biomecánica dental, carillas y estética conservadora directamente en tu bandeja de entrada.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-sm border border-ink/10 ${
        variant === "full"
          ? "p-8 sm:p-12 bg-white shadow-editorial"
          : "p-6 sm:p-8 bg-porcelain-light shadow-subtle"
      }`}
    >
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
          Divulgación Médica AURA
        </span>
        <h3 className="font-editorial text-2xl sm:text-3xl text-ink font-normal mt-1 leading-snug">
          Suscríbete a El Cuaderno Clínico.
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed font-sans">
          Monografías científicas bimensuales sobre ortodoncia invisible, biomimética y casos clínicos documentados. Sin spam comercial.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="tu-correo@ejemplo.com"
            disabled={status === "loading"}
            className="flex-1 px-4 py-3 text-xs bg-white border border-ink/20 rounded-sm focus:outline-none focus:border-sage text-ink placeholder:text-ink/40 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage hover:bg-sage-dark text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-colors shrink-0 disabled:opacity-70"
          >
            <span>{status === "loading" ? "Procesando..." : "Suscribirme"}</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (status === "error") setStatus("idle");
            }}
            className="mt-0.5 rounded border-ink/20 text-sage focus:ring-sage"
          />
          <span className="text-[11px] text-ink-muted leading-tight">
            He leído y acepto la{" "}
            <a href="/privacidad" className="underline hover:text-ink">
              política de privacidad
            </a>{" "}
            para el envío de monografías médicas.
          </span>
        </label>

        {status === "error" && (
          <p className="text-xs text-coral font-medium">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
