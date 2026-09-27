import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] bg-porcelain flex items-center justify-center pt-24 pb-20 px-6">
      <div className="max-w-xl text-center space-y-6">
        <span className="font-editorial text-7xl sm:text-9xl text-sage/20 font-bold block leading-none select-none">
          404
        </span>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-coral font-semibold">
            Página No Encontrada
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-ink font-normal leading-tight text-balance">
            Esta sección no forma parte de la arquitectura del sitio.
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans max-w-md mx-auto pt-2">
            La página que buscas ha sido reubicada o la dirección introducida no es válida. 
            Puedes volver a la página de inicio o consultar nuestro catálogo de tratamientos.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-slide-left btn-slide-dark w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sage text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm shadow-subtle transition-colors"
          >
            <span>Volver al Inicio</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tratamientos"
            className="btn-slide-left btn-slide-coral w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-porcelain-light border border-ink/15 text-ink text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            <span>Ver Tratamientos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
