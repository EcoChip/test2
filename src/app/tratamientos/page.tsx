"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TREATMENTS } from "@/lib/treatmentsData";
import { ArrowRightIcon, ClockIcon, ShieldCheckIcon } from "@/components/ui/Icons";

const CATEGORIES = [
  "Todos",
  "Ortodoncia",
  "Estética Dental",
  "Implantología",
  "Salud Periodontal",
];

export default function TratamientosHubPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? TREATMENTS
    : TREATMENTS.filter((t) => t.category === activeCategory);

  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      {/* Hub Hero */}
      <section className="py-16 md:py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Enciclopedia Clínica AURA
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink font-normal mt-3 leading-tight text-balance">
              Catálogo de tratamientos y protocolos clínicos.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ink-muted font-sans leading-relaxed text-pretty">
              Conoce en detalle la duración estimada, el nivel de invasividad, los materiales y el 
              procedimiento exacto de cada especialidad odontológica en nuestro gabinete de Madrid.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-sm border transition-all ${
                  activeCategory === cat
                    ? "bg-sage text-porcelain border-sage font-semibold shadow-sm"
                    : "bg-white text-ink-muted border-ink/15 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Encyclopedia Treatment Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.slug}
                className="p-6 sm:p-8 bg-white border border-ink/10 rounded-sm flex flex-col justify-between shadow-subtle hover:shadow-editorial hover:border-ink/25 transition-all group"
              >
                <div>
                  {/* Treatment Editorial Photo */}
                  <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-6 bg-ink/5 border border-ink/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Category & Invasiveness meta badges */}
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span className="text-sage font-semibold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-porcelain-dark text-ink-muted border border-ink/5">
                      {item.invasiveness}
                    </span>
                  </div>

                  <h2 className="font-editorial text-2xl text-ink font-normal group-hover:text-sage transition-colors leading-snug">
                    {item.name}
                  </h2>

                  <p className="text-xs text-ink-muted mt-3 leading-relaxed line-clamp-3">
                    {item.shortDesc}
                  </p>

                  {/* Metadata Specs */}
                  <div className="mt-6 pt-4 border-t border-ink/10 space-y-2 text-xs text-ink-muted">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span>Duración:</span>
                      </span>
                      <span className="font-medium text-ink">{item.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sesiones:</span>
                      <span className="font-medium text-ink">{item.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsable:</span>
                      <span className="font-medium text-sage">{item.doctorInCharge}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/tratamientos/${item.slug}`}
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 bg-porcelain-dark hover:bg-sage hover:text-porcelain text-ink text-xs font-semibold uppercase tracking-wider rounded-sm transition-all"
                  >
                    <span>Ficha técnica completa</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="py-16 border-t border-ink/10 bg-porcelain-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-editorial text-2xl sm:text-3xl text-ink font-normal leading-tight">
            ¿No estás seguro de qué tratamiento es el adecuado para ti?
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2 max-w-xl mx-auto leading-relaxed">
            En la primera cita diagnóstica realizamos un TAC 3D y escaneado óptico para determinar 
            el plan de tratamiento más conservador y eficiente para tu caso.
          </p>
          <div className="mt-6">
            <Link
              href="/contacto"
              className="group btn-slide-left btn-slide-dark inline-flex items-center gap-2.5 px-7 py-3.5 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-all duration-300"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 inline-block">
                Solicitar Valoración Clínica
              </span>
              <ArrowRightIcon className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
