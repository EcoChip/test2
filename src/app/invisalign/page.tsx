import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ScanFaceIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Qué es Invisalign® | Ortodoncia Invisible Diamond Apex Madrid",
  description:
    "Descubre cómo funciona Invisalign®: tecnología SmartTrack®, planificación 3D ClinCheck®, fases del tratamiento y duración estimada con la Dra. Elena Santamaría.",
};

export default function InvisalignPage() {
  const steps = [
    {
      num: "01",
      title: "Escaneo intraoral 3D de alta definición",
      desc: "Digitalizamos tu boca en menos de 3 minutos con el escáner óptico iTero Lumina. Sin pastas de silicona ni náuseas. Obtenemos un mapa tridimensional micrométrico de tus dientes y encías.",
    },
    {
      num: "02",
      title: "Planificación virtual ClinCheck®",
      desc: "La Dra. Elena Santamaría diseña la biomecánica de cada movimiento en un software 3D exclusivo. Podrás ver en pantalla la evolución paso a paso de tu sonrisa antes de fabricar los alineadores.",
    },
    {
      num: "03",
      title: "Fabricación robotizada SmartTrack®",
      desc: "Tus alineadores se producen a medida mediante impresión 3D multicapa con corte láser de contorno gingival exacto, lo que maximiza la retención sin rozar la encía.",
    },
    {
      num: "04",
      title: "Uso diario y cambios bi-semanales",
      desc: "Llevarás cada par de alineadores durante 22 horas al día, cambiándolos en casa cada 10 a 14 días. Las visitas presenciales de control en Serrano son breves y cada 6-8 semanas.",
    },
    {
      num: "05",
      title: "Retención definitiva Vivera®",
      desc: "Al finalizar los micromovimientos activos, colocamos retenedores transparentes Vivera® un 30% más resistentes que los plásticos estándar, garantizando que tu sonrisa se mantenga estable de por vida.",
    },
  ];

  const modalities = [
    {
      name: "Invisalign Express",
      ideal: "Recidivas de ortodoncias previas y pequeñas correcciones estéticas anteriores.",
      duration: "3 a 6 meses",
      aligners: "Hasta 7 alineadores",
      visits: "3 visitas clínicas",
    },
    {
      name: "Invisalign Lite",
      ideal: "Apiñamientos moderados, diastemas leves y discrepancias de arco menores.",
      duration: "6 a 12 meses",
      aligners: "Hasta 14 alineadores",
      visits: "5 visitas clínicas",
    },
    {
      name: "Invisalign Comprehensive",
      ideal: "Casos complejos, mordidas cruzadas, sobremordidas severas y extracciones guiadas.",
      duration: "12 a 18 meses",
      aligners: "Alineadores ilimitados + refinamientos",
      visits: "Seguimiento continuado",
      featured: true,
    },
  ];

  const faqs = [
    {
      q: "¿Es doloroso el tratamiento con Invisalign?",
      a: "No produce dolor agudo. Durante las primeras 24-48 horas tras cambiar a un nuevo alineador, es normal notar una ligera presión que indica que los dientes están comenzando su micromovimiento biológico, pero sin las heridas o llagas características de los brackets metálicos.",
    },
    {
      q: "¿Cuántas horas al día es imprescindible llevar los alineadores?",
      a: "El tiempo óptimo es de 22 horas al día. Solo debes retirarlos para las comidas principales y para cepillarte los dientes antes de volver a colocarlos.",
    },
    {
      q: "¿Cómo se limpian y desinfectan los alineadores?",
      a: "Se cepillan diariamente con agua tibia y jabón neutro utilizando un cepillo de cerdas suaves. Es recomendable usar pastillas de limpieza efervescentes un par de veces por semana para mantener su total transparencia óptica.",
    },
    {
      q: "¿Qué sucede si pierdo un alineador en un viaje?",
      a: "Gracias a la planificación ClinCheck digital, contamos con tu modelo guardado en la nube. Te indicaremos si debes avanzar al alineador siguiente o volver temporalmente al anterior mientras solicitamos un reemplazo inmediato.",
    },
  ];

  return (
    <div className="w-full bg-porcelain pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10 text-sage text-xs uppercase tracking-[0.2em] font-medium mb-6">
                <span>Guía Clínica de Ortodoncia Invisible</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-[1.1] text-balance">
                Qué es Invisalign® y cómo transforma tu sonrisa.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-ink-muted font-sans leading-relaxed text-pretty">
                Invisalign® es el sistema de ortodoncia transparente más avanzado del mundo. 
                Mediante una serie de férulas secuenciales prácticamente invisibles y extraíbles, 
                alinea tus dientes milímetro a milímetro de manera predecible, cómoda e imperceptible.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-editorial bg-ink">
                <Image
                  src="/images/treatments/invisalign.jpg"
                  alt="Alineador dental transparente Invisalign sobre pedestal de piedra"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-porcelain/90 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium">
                  SmartTrack® · Categoría Diamond Apex
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biomechanics & SmartTrack */}
      <section className="py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                La Ciencia Detrás del Movimiento
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal leading-tight">
                La diferencia entre Invisalign y otros alineadores genéricos.
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                No todos los plásticos dentales son iguales. Los alineadores de bajo coste utilizan plásticos rígidos de una sola capa que pierden fuerza elástica a las pocas horas de su colocación.
              </p>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Invisalign cuenta con más de 800 patentes activas. Su fórmula <strong>SmartTrack®</strong> combina una matriz polimérica elastomérica que almacena energía y aplica una fuerza suave y continua durante los 14 días de uso activo, protegiendo las raíces dentales y las encías.
              </p>
              <div className="pt-2">
                <div className="p-4 bg-porcelain-dark rounded-sm border border-ink/10">
                  <div className="text-xs font-semibold uppercase tracking-wider text-sage">
                    Categoría Diamond Apex Provider
                  </div>
                  <p className="text-xs text-ink-muted mt-1">
                    La Dra. Elena Santamaría se encuentra en el 1% de ortodoncistas de mayor volumen 
                    y experiencia clínica con Invisalign en Europa.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-sm border border-ink/10 shadow-subtle space-y-3">
                  <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-lg text-ink font-normal">
                    Fuerza Constante y Suave
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Movimiento de 0.25 mm por alineador. Biomecánica controlada que respeta el flujo vascular 
                    periodontal y disminuye la sensación de tensión.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-sm border border-ink/10 shadow-subtle space-y-3">
                  <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <ScanFaceIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-lg text-ink font-normal">
                    Ajuste Anatómico al Milímetro
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Corte gingival festoneado que coincide con el margen de la encía, logrando que el alineador 
                    sea 100% invisible incluso en conversaciones a corta distancia.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-sm border border-ink/10 shadow-subtle space-y-3">
                  <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <ShieldCheckIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-lg text-ink font-normal">
                    Attachments SmartForce®
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Micro-puntos de composite del mismo color del diente colocados en piezas estratégicas 
                    para posibilitar rotaciones y extrusiones complejas.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-sm border border-ink/10 shadow-subtle space-y-3">
                  <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <ClockIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-lg text-ink font-normal">
                    Tiempos de Tratamiento Reducidos
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Al planificar cada movimiento en el ordenador con exactitud matemática, se evitan meses 
                    de ensayos o rectificaciones típicos de los brackets metálicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Steps */}
      <section className="py-20 border-b border-ink/10 bg-porcelain-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Cronograma de Atención
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
              El proceso clínico en 5 etapas rigurosas.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="p-6 bg-white border border-ink/10 rounded-sm flex flex-col justify-between shadow-subtle">
                <div>
                  <span className="font-editorial text-3xl text-sage font-medium block mb-4">
                    {st.num}
                  </span>
                  <h3 className="font-editorial text-lg text-ink font-normal leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Experience & 3D Scanning Visual Showcase */}
      <section className="py-16 border-b border-ink/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-ink/10 shadow-editorial bg-ink group">
              <Image
                src="/images/treatments/invisalign_patient.jpg"
                alt="Paciente colocándose alineador transparente Invisalign con absoluta naturalidad"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-porcelain">
                <span className="text-[10px] uppercase tracking-wider text-coral font-semibold">Uso Cotidiano</span>
                <p className="text-sm font-editorial font-light mt-0.5">Adaptabilidad imperceptible y máxima comodidad sin roces</p>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-ink/10 shadow-editorial bg-ink group">
              <Image
                src="/images/treatments/itero_scanner.jpg"
                alt="Escáner intraoral 3D iTero Lumina mostrando la evolución de la arcada dental"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-porcelain">
                <span className="text-[10px] uppercase tracking-wider text-sage font-semibold">Diagnóstico Óptico</span>
                <p className="text-sm font-editorial font-light mt-0.5">Simulación ClinCheck® en tiempo real sin moldes convencionales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Modalities & Duration */}
      <section className="py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Modalidades Según Complejidad
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
              ¿Cuánto tiempo dura el tratamiento?
            </h2>
            <p className="text-sm text-ink-muted mt-3 font-sans leading-relaxed">
              La duración exacta depende del grado de apiñamiento o maloclusión. En tu primera cita de diagnóstico 3D 
              te indicaremos con certeza a qué modalidad corresponde tu caso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modalities.map((mod) => (
              <div
                key={mod.name}
                className={`p-8 rounded-sm flex flex-col justify-between border ${
                  mod.featured
                    ? "bg-sage text-porcelain border-sage-deep shadow-editorial"
                    : "bg-white text-ink border-ink/10 shadow-subtle"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={mod.featured ? "text-porcelain/70" : "text-ink-muted"}>
                      Categoría Oficial
                    </span>
                    {mod.featured && (
                      <span className="px-2 py-0.5 bg-coral text-white rounded text-[10px] font-semibold uppercase tracking-wider">
                        Más Frecuente
                      </span>
                    )}
                  </div>
                  <h3 className="font-editorial text-2xl font-normal">
                    {mod.name}
                  </h3>
                  <p className={`text-xs mt-3 leading-relaxed ${mod.featured ? "text-porcelain/80" : "text-ink-muted"}`}>
                    {mod.ideal}
                  </p>
                  
                  <div className={`mt-6 pt-6 border-t space-y-3 text-xs ${
                    mod.featured ? "border-porcelain/20" : "border-ink/10"
                  }`}>
                    <div className="flex justify-between">
                      <span className={mod.featured ? "text-porcelain/60" : "text-ink-muted"}>Duración estimada:</span>
                      <span className="font-semibold">{mod.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={mod.featured ? "text-porcelain/60" : "text-ink-muted"}>Número de férulas:</span>
                      <span className="font-medium">{mod.aligners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={mod.featured ? "text-porcelain/60" : "text-ink-muted"}>Frecuencia de citas:</span>
                      <span className="font-medium">{mod.visits}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/contacto"
                    className={`btn-slide-left btn-slide-dark w-full inline-flex items-center justify-center gap-2 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${
                      mod.featured
                        ? "bg-coral text-white shadow-cta"
                        : "bg-sage text-porcelain"
                    }`}
                  >
                    <span>Valorar mi caso</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical FAQ */}
      <section className="py-20 border-b border-ink/10 bg-porcelain-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Dudas Clínicas Frecuentes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
              Respuestas médicas transparentes.
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 bg-white rounded-sm border border-ink/10 shadow-subtle space-y-2">
                <h3 className="font-editorial text-xl text-ink font-normal">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans pt-1">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Callout CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal leading-tight">
            Descubre tu simulación 3D ClinCheck en Serrano 48.
          </h2>
          <p className="text-sm text-ink-muted mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Pide cita de valoración diagnóstica con la Dra. Elena Santamaría para comprobar 
            el resultado final exacto de tu sonrisa.
          </p>
          <div className="mt-8">
            <Link
              href="/contacto"
              className="group btn-slide-left btn-slide-dark inline-flex items-center gap-2.5 px-8 py-4 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-all duration-300"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                Pedir Cita para Invisalign
              </span>
              <ArrowRightIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
