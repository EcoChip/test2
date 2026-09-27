import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TREATMENTS } from "@/lib/treatmentsData";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const treatment = TREATMENTS.find((t) => t.slug === params.slug);
  if (!treatment) {
    return { title: "Tratamiento no encontrado" };
  }
  return {
    title: `${treatment.name} | Protocolo Clínico en Madrid`,
    description: treatment.shortDesc,
  };
}

export default function TreatmentDetailPage({ params }: PageProps) {
  const treatment = TREATMENTS.find((t) => t.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      {/* Breadcrumb & Header */}
      <section className="py-12 md:py-16 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/tratamientos" className="hover:text-ink transition-colors">
              Tratamientos
            </Link>
            <span>/</span>
            <span className="text-sage font-medium">{treatment.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded bg-sage/10 text-sage text-xs font-semibold uppercase tracking-wider">
                  {treatment.category}
                </span>
                <span className="text-xs text-ink-muted">
                  Responsable: <strong className="text-ink">{treatment.doctorInCharge}</strong>
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-[1.1] text-balance">
                {treatment.name}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted font-sans leading-relaxed text-pretty">
                {treatment.fullDesc}
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-4 p-8 bg-white border border-ink/10 rounded-sm shadow-editorial space-y-6">
              <h3 className="font-editorial text-xl text-ink font-normal border-b border-ink/10 pb-3">
                Ficha Técnica Resumida
              </h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-ink-muted block">Duración estimada:</span>
                  <span className="font-medium text-ink text-sm">{treatment.duration}</span>
                </div>
                <div>
                  <span className="text-ink-muted block">Número de sesiones:</span>
                  <span className="font-medium text-ink text-sm">{treatment.sessions}</span>
                </div>
                <div>
                  <span className="text-ink-muted block">Nivel de invasividad:</span>
                  <span className="font-medium text-sage text-sm">{treatment.invasiveness}</span>
                </div>
                <div>
                  <span className="text-ink-muted block">Anestesia requerida:</span>
                  <span className="font-medium text-ink text-sm">{treatment.anesthesia}</span>
                </div>
                <div>
                  <span className="text-ink-muted block">Garantía clínica:</span>
                  <span className="font-medium text-ink text-sm">{treatment.warranty}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contacto?tratamiento=${treatment.slug}`}
                  className="btn-slide-left btn-slide-dark w-full inline-flex items-center justify-center gap-2 py-3.5 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-colors"
                >
                  <span>Pedir Cita para este Tratamiento</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Visual Showcase */}
      <section className="py-12 border-b border-ink/10 bg-porcelain-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden border border-ink/10 shadow-editorial bg-ink">
              <Image
                src={treatment.heroImage}
                alt={`${treatment.name} - Enfoque Clínico`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-porcelain/90 backdrop-blur-sm px-3 py-1 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium">
                Protocolo Clínico · {treatment.doctorInCharge}
              </div>
            </div>
            <div className="md:col-span-5 relative aspect-[4/3] md:aspect-[16/10] rounded-sm overflow-hidden border border-ink/10 shadow-editorial bg-ink">
              <Image
                src={treatment.image}
                alt={`${treatment.name} - Detalle Material`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-porcelain/90 backdrop-blur-sm px-3 py-1 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium">
                Biomateriales Certificados
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol & Indications */}
      <section className="py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Step-by-Step Protocol */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                  Rigor Metodológico
                </span>
                <h2 className="font-editorial text-3xl text-ink font-normal mt-2 leading-tight">
                  Protocolo clínico paso a paso.
                </h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-ink/10">
                {treatment.protocolSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    <div className="w-7 h-7 rounded-full bg-sage text-porcelain text-xs font-semibold flex items-center justify-center shrink-0 z-10">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-editorial text-xl text-ink font-normal">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Indications & Materials */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* Indications */}
              <div className="p-8 bg-white rounded-sm border border-ink/10 shadow-subtle space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                  Candidatos Idóneos
                </span>
                <h3 className="font-editorial text-2xl text-ink font-normal leading-snug">
                  Indicaciones clínicas
                </h3>
                <ul className="space-y-2.5 pt-2 text-xs text-ink-muted">
                  {treatment.indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckIcon className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Biomaterials & Tech */}
              <div className="p-8 bg-porcelain-light rounded-sm border border-ink/10 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
                  Calidad Farmacológica & Biomateriales
                </span>
                <h3 className="font-editorial text-2xl text-ink font-normal leading-snug">
                  Tecnología empleada
                </h3>
                <ul className="space-y-2 pt-2 text-xs text-ink-muted">
                  {treatment.materialsUsed.map((mat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0 mt-1.5" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal leading-tight">
            ¿Deseas una valoración clínica con el {treatment.doctorInCharge}?
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-3 font-sans leading-relaxed">
            Tu primera visita en AURA incluye estudio radiológico digital y diagnóstico personalizado sin compromiso.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/contacto?tratamiento=${treatment.slug}`}
              className="btn-slide-left btn-slide-dark w-full sm:w-auto px-8 py-3.5 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-colors"
            >
              Pedir Cita para {treatment.name}
            </Link>
            <Link
              href="/tratamientos"
              className="btn-slide-left btn-slide-coral w-full sm:w-auto px-8 py-3.5 border border-ink/20 text-ink text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Ver otros tratamientos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
