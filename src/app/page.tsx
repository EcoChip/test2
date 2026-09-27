import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DentalIntroScroller } from "@/components/3d/DentalIntroScroller";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ClinicLocationMap } from "@/components/sections/ClinicLocationMap";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ScanFaceIcon,
  ClockIcon,
  CheckIcon,
  GoogleIcon,
  ToothIcon,
} from "@/components/ui/Icons";

export default function HomePage() {
  return (
    <div className="w-full bg-porcelain">
      {/* 1. Cinematic 3D Intro Sequence */}
      <DentalIntroScroller />

      {/* 2. Anchor point where light porcelain content starts */}
      <div id="contenido-home" className="relative z-10 bg-porcelain pt-16">
        
        {/* SECTION: Hero Clínico con Foto de Gabinete & Reseña Google Verificada (Inspirado en Imagen 4) */}
        <section className="py-20 lg:py-28 border-b border-ink/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Narrative and Call to Actions */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-sage" />
                  <span className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold font-sans">
                    AURA DENTAL ARCHITECTURE · SALAMANCA
                  </span>
                </div>

                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-[1.1] tracking-tight hover-lift-sm">
                  Nos especializamos en cuidar tu salud bucal y estética dental.
                </h1>

                <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans max-w-xl">
                  En <strong>AURA</strong> combinamos tecnología de vanguardia (escáner 3D iTero Element 5D y TAC digital),
                  atención médica personalizada y experiencia clínica para que sonrías con absoluta confianza en cada etapa de tu vida.
                </p>

                {/* Dual Buttons with Fluid Slide-Left Animation */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/contacto"
                    className="group btn-slide-left btn-slide-dark inline-flex items-center gap-3 px-8 py-4 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-all duration-300"
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                      Agenda tu cita
                    </span>
                    <ArrowRightIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/tratamientos"
                    className="group hover-lift-sm inline-flex items-center gap-2 px-5 py-4 border-b-2 border-sage text-sage hover:text-coral hover:border-coral text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                  >
                    <span>Ver Especialidades</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Micro trust indicators */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-ink/10 text-ink/75">
                  <div className="hover-lift-sm">
                    <div className="font-editorial text-2xl text-sage font-medium">3D</div>
                    <div className="text-[11px] text-ink-muted uppercase tracking-wider mt-0.5">Planificación Digital</div>
                  </div>
                  <div className="hover-lift-sm">
                    <div className="font-editorial text-2xl text-coral font-medium">18+ años</div>
                    <div className="text-[11px] text-ink-muted uppercase tracking-wider mt-0.5">Experiencia Médica</div>
                  </div>
                  <div className="hover-lift-sm">
                    <div className="font-editorial text-2xl text-ink font-medium">4.9 ★</div>
                    <div className="text-[11px] text-ink-muted uppercase tracking-wider mt-0.5">Google Reviews</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Large Clinical Photo with Overlaid Google Review Card */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] sm:aspect-[14/11] rounded-2xl overflow-hidden shadow-2xl border border-ink/10 group">
                  <Image
                    src="/images/treatments/implantes_surgery.jpg"
                    alt="Especialistas de AURA realizando tratamiento quirúrgico de precisión en Madrid"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Circular Dental Badge in Top-Right corner (like Image 4) */}
                  <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-sage-deep/90 backdrop-blur-md text-porcelain flex items-center justify-center border border-white/20 shadow-lg hover-lift-sm">
                    <ToothIcon className="w-6 h-6 text-coral" />
                  </div>
                </div>

                {/* Floating Google Review Card Overlaid on Bottom-Left (like Image 4) */}
                <div className="relative sm:absolute -mt-8 sm:mt-0 sm:-bottom-8 sm:-left-8 z-20 max-w-sm p-5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-ink/10 hover-lift-md">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    {/* 5 Yellow Stars */}
                    <div className="flex items-center gap-1 text-amber-400 text-sm">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>

                    {/* Google Official Icon */}
                    <div className="p-1 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <GoogleIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-ink font-semibold leading-relaxed">
                    “Excelente atención y resultados increíbles. La Dra. Elena Santamaría y todo el equipo son de otro nivel. Recomiendo 100%”
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-ink/10 flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted font-medium">Mariana V.</span>
                    <span className="text-sage font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Paciente Verificada
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION: Por qué Invisalign (Asymmetric layout, no identical cards) */}
        <section className="py-24 border-b border-ink/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Large Architectural Medical Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-editorial">
                  <Image
                    src="/images/clinic/cabinet.jpg"
                    alt="Gabinete de odontología digital en AURA Dental Architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-porcelain/90 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium">
                    Gabinete Clínico · Calle Serrano 48
                  </div>
                </div>
              </div>

              {/* Right Column: Asymmetric Editorial Narrative */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                    Biomecánica Predictiva
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-[1.15] text-balance">
                    Ortodoncia que respeta tu ritmo de vida y tu biología dental.
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                  A diferencia de los brackets tradicionales, el sistema de alineadores Invisalign® 
                  utiliza una aleación de poliuretano multicapa patentada que aplica fuerzas constantes 
                  de baja intensidad, permitiendo micromovimientos dentales de máxima precisión sin dañar 
                  el ligamento periodontal.
                </p>

                {/* 3 Asymmetric Key Points */}
                <div className="space-y-6 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0 mt-1">
                      <SparklesIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-lg text-ink font-normal">
                        Material SmartTrack® Multicapa
                      </h3>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Fórmula exclusiva que se adapta milimétricamente al contorno de cada diente. 
                        Genera un movimiento 50% más rápido y predecible que otros plásticos genéricos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0 mt-1">
                      <ShieldCheckIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-lg text-ink font-normal">
                        Invisibilidad Óptica y Confort
                      </h3>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Completamente transparente a distancia social. Sin alambres, bordes cortantes 
                        ni urgencias por rotura de brackets metálicos durante fines de semana o viajes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0 mt-1">
                      <ScanFaceIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-lg text-ink font-normal">
                        Higiene y Libertad Absoluta
                      </h3>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Alineadores 100% removibles para las comidas y el cepillado. Mantén tu salud 
                        gingival óptima y sin restricciones dietéticas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/invisalign"
                    className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage hover:text-coral transition-colors"
                  >
                    <span>Conoce el protocolo clínico paso a paso</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Antes y Después (Casos Clínicos Reales) */}
        <section className="py-24 border-b border-ink/10 bg-porcelain-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                Evidencia Clínica Documentada
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
                Casos reales tratados en nuestro gabinete.
              </h2>
              <p className="text-sm text-ink-muted mt-3 font-sans leading-relaxed">
                Fotografías intraorales normalizadas sin retoque digital. Tratamientos planificados por la 
                Dra. Elena Santamaría y la Dra. Sofía Varela con tecnología 3D ClinCheck.
              </p>
            </div>

            {/* Interactive Before/After Component */}
            <BeforeAfterSlider />
          </div>
        </section>

        {/* SECTION: Teaser de Tratamientos */}
        <section className="py-24 border-b border-ink/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                  Disciplinas Clínicas
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
                  Tratamientos de alta especialización estética y reconstructiva.
                </h2>
              </div>
              <div>
                <Link
                  href="/tratamientos"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage hover:text-coral transition-colors"
                >
                  <span>Ver todas las especialidades</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Asymmetric Treatment Grid (Editorial, not 3 generic cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Treatment 1: Invisalign (Highlighted) */}
              <div className="p-8 bg-sage text-porcelain rounded-sm flex flex-col justify-between border border-sage-deep shadow-editorial">
                <div>
                  <div className="flex items-center justify-between text-xs text-porcelain/70 mb-4">
                    <span>Ortodoncia Invisible</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] uppercase tracking-wider">
                      Diamond Apex
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl text-porcelain font-normal">
                    Invisalign® Diamond
                  </h3>
                  <p className="text-xs text-porcelain/80 mt-3 leading-relaxed">
                    Alineadores transparentes de última generación. Planificación virtual 3D con simulación 
                    del resultado antes de colocar el primer alineador.
                  </p>
                  <div className="mt-6 pt-4 border-t border-porcelain/15 space-y-2 text-xs text-porcelain/80">
                    <div className="flex justify-between">
                      <span className="text-porcelain/60">Duración:</span>
                      <span className="font-medium text-porcelain">6 a 18 meses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-porcelain/60">Revisiones:</span>
                      <span className="font-medium text-porcelain">Cada 6-8 semanas</span>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    href="/invisalign"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-coral hover:text-white transition-colors"
                  >
                    <span>Ver ficha técnica</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Treatment 2: Implantes de Carga Inmediata */}
              <div className="p-8 bg-porcelain-light text-ink rounded-sm flex flex-col justify-between border border-ink/10 shadow-subtle hover:border-ink/25 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-muted mb-4">
                    <span>Cirugía Guiada 3D</span>
                    <span className="text-[11px] text-sage font-medium">Straumann®</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-ink font-normal">
                    Implantes de Carga Inmediata
                  </h3>
                  <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                    Diente fijo en la misma sesión quirúrgica mediante férula quirúrgica guiada por TAC 3D. 
                    Sin dolor gracias a protocolos de sedación consciente.
                  </p>
                  <div className="mt-6 pt-4 border-t border-ink/10 space-y-2 text-xs text-ink-muted">
                    <div className="flex justify-between">
                      <span>Intervención:</span>
                      <span className="font-medium text-ink">1 sola sesión</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Osteointegración:</span>
                      <span className="font-medium text-sage">Titanio Roxolid®</span>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    href="/tratamientos/implantes"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-sage hover:text-coral transition-colors"
                  >
                    <span>Ver ficha técnica</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Treatment 3: Carillas Cerámicas Biomiméticas */}
              <div className="p-8 bg-porcelain-light text-ink rounded-sm flex flex-col justify-between border border-ink/10 shadow-subtle hover:border-ink/25 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-muted mb-4">
                    <span>Estética Mínima Invasión</span>
                    <span className="text-[11px] text-sage font-medium">0.3 mm</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-ink font-normal">
                    Carillas de Porcelana
                  </h3>
                  <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                    Láminas ultrafinas de disilicato de litio y cerámica feldespática estratificada a mano. 
                    Diseño biomimético sin desgaste agresivo del diente natural.
                  </p>
                  <div className="mt-6 pt-4 border-t border-ink/10 space-y-2 text-xs text-ink-muted">
                    <div className="flex justify-between">
                      <span>Sesiones:</span>
                      <span className="font-medium text-ink">2 a 3 citas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Garantía:</span>
                      <span className="font-medium text-sage">10 años</span>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    href="/tratamientos/carillas"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-sage hover:text-coral transition-colors"
                  >
                    <span>Ver ficha técnica</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: Teaser del Equipo */}
        <section className="py-24 border-b border-ink/10 bg-porcelain">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                  Cuerpo Facultativo
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
                  Doctores de dedicación exclusiva y trayectoria universitaria.
                </h2>
                <p className="text-sm text-ink-muted mt-3 font-sans leading-relaxed max-w-2xl">
                  En AURA cada paciente es tratado por un facultativo colegiado con formación de postgrado 
                  universitaria en su área. Sin rotación de profesionales ni franquicias.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/equipo"
                  className="btn-slide-left btn-slide-dark inline-flex items-center gap-2 px-5 py-2.5 bg-sage text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                >
                  <span>Conocer a los doctores</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Doctors Portraits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Doctor 1 */}
              <div className="group border border-ink/10 rounded-sm overflow-hidden bg-white shadow-subtle hover:shadow-editorial transition-all">
                <div className="relative aspect-[4/5] bg-ink">
                  <Image
                    src="/images/team/elena_santamaria.jpg"
                    alt="Dra. Elena Santamaría - Directora Médica de AURA"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-wider text-coral font-semibold">
                    Invisalign Diamond Apex
                  </span>
                  <h3 className="font-editorial text-xl text-ink font-normal mt-1">
                    Dra. Elena Santamaría
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    Directora Médica. Especialista en Ortodoncia Digital con más de 1.800 casos resueltos. 
                    Profesora colaboradora en postgrados de ortodoncia invisible.
                  </p>
                  <div className="mt-4 pt-3 border-t border-ink/5 text-[11px] text-ink-subtle">
                    Col. Odontólogos nº 28004912 · 16 años de experiencia
                  </div>
                </div>
              </div>

              {/* Doctor 2 */}
              <div className="group border border-ink/10 rounded-sm overflow-hidden bg-white shadow-subtle hover:shadow-editorial transition-all">
                <div className="relative aspect-[4/5] bg-ink">
                  <Image
                    src="/images/team/javier_morales.jpg"
                    alt="Dr. Javier Morales - Cirugía e Implantología en AURA"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-wider text-sage font-semibold">
                    Cirugía & Implantología
                  </span>
                  <h3 className="font-editorial text-xl text-ink font-normal mt-1">
                    Dr. Javier Morales
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    Máster en Cirugía Bucal e Implantología (UCM). Especialista en técnicas de regeneración 
                    ósea guiada y colocación inmediata de implantes Straumann.
                  </p>
                  <div className="mt-4 pt-3 border-t border-ink/5 text-[11px] text-ink-subtle">
                    Col. Odontólogos nº 28003820 · Miembro Activo SECIB
                  </div>
                </div>
              </div>

              {/* Doctor 3 */}
              <div className="group border border-ink/10 rounded-sm overflow-hidden bg-white shadow-subtle hover:shadow-editorial transition-all">
                <div className="relative aspect-[4/5] bg-ink">
                  <Image
                    src="/images/team/sofia_varela.jpg"
                    alt="Dra. Sofía Varela - Estética Dental en AURA"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-wider text-coral font-semibold">
                    Estética Biomimética
                  </span>
                  <h3 className="font-editorial text-xl text-ink font-normal mt-1">
                    Dra. Sofía Varela
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    Especialista en Carillas Cerámicas y Digital Smile Design (DSD). Enfoque de máxima 
                    conservación de tejido natural y adhesión de última generación.
                  </p>
                  <div className="mt-4 pt-3 border-t border-ink/5 text-[11px] text-ink-subtle">
                    Col. Odontólogos nº 28006144 · Miembro Activo SEPES
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: Espacios Clínicos y Arquitectura */}
        <section className="py-24 border-b border-ink/10 bg-porcelain-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                Arquitectura & Entorno
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
                Un santuario de calma acústica y diseño en el corazón de Salamanca.
              </h2>
              <p className="text-sm text-ink-muted mt-3 font-sans leading-relaxed">
                Concebida como una galería biomédica de autor, nuestra clínica en Calle Serrano fusiona 
                mármol travertino, luz natural y tecnología digital de última generación para una experiencia serena y prémium.
              </p>
            </div>

            {/* Asymmetric Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Card 1: Reception (Large 7 cols) */}
              <div className="md:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden border border-ink/10 shadow-editorial group">
                <Image
                  src="/images/clinic/reception.jpg"
                  alt="Recepción y bienvenida en AURA Dental Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-porcelain">
                  <span className="text-[10px] uppercase tracking-wider text-coral font-semibold">Espacio de Bienvenida</span>
                  <p className="text-sm font-editorial font-light mt-0.5">Atmósfera silenciosa con piedra natural travertino y nogal</p>
                </div>
              </div>

              {/* Card 2: 3D Scanner room (5 cols) */}
              <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto rounded-sm overflow-hidden border border-ink/10 shadow-editorial group">
                <Image
                  src="/images/clinic/itero.jpg"
                  alt="Sala de digitalización 3D y escáner intraoral en AURA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-porcelain">
                  <span className="text-[10px] uppercase tracking-wider text-sage font-semibold">Tecnología Intraoral</span>
                  <p className="text-sm font-editorial font-light mt-0.5">Sala de escaneo digital 3D iTero Lumina</p>
                </div>
              </div>

              {/* Card 3: Consultation (4 cols) */}
              <div className="md:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-editorial group">
                <Image
                  src="/images/clinic/consultation.jpg"
                  alt="Planificación y consulta diagnóstica personalizada con el paciente"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-porcelain">
                  <span className="text-[10px] uppercase tracking-wider text-coral font-semibold">Diálogo Clínico</span>
                  <p className="text-sm font-editorial font-light mt-0.5">Explicación visual del plan en pantalla 3D de alta definición</p>
                </div>
              </div>

              {/* Card 4: Hallway (4 cols) */}
              <div className="md:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-editorial group">
                <Image
                  src="/images/clinic/hallway.jpg"
                  alt="Galería arquitectónica y paso a gabinetes en AURA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-porcelain">
                  <span className="text-[10px] uppercase tracking-wider text-sage font-semibold">Privacidad & Flujo</span>
                  <p className="text-sm font-editorial font-light mt-0.5">Aislamiento acústico integral y carpintería enrasada</p>
                </div>
              </div>

              {/* Card 5: Facade (4 cols) */}
              <div className="md:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-editorial group">
                <Image
                  src="/images/clinic/facade.jpg"
                  alt="Fachada histórica de AURA Dental Architecture en Calle Serrano"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-porcelain">
                  <span className="text-[10px] uppercase tracking-wider text-coral font-semibold">Ubicación Exclusiva</span>
                  <p className="text-sm font-editorial font-light mt-0.5">Calle Serrano 48 · Barrio de Salamanca, Madrid</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Google Maps & Ubicación de la Clínica */}
        <ClinicLocationMap />

        {/* SECTION: CTA Final hacia /contacto */}
        <section className="py-24 bg-sage-deep text-porcelain">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-coral font-semibold">
              Primera Consulta Diagnóstica
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-porcelain mt-3 leading-tight text-balance">
              Empieza tu transformación con un diagnóstico 3D completo.
            </h2>
            <p className="text-sm sm:text-base text-porcelain/70 font-sans mt-4 max-w-2xl mx-auto leading-relaxed text-pretty">
              Sin moldes de silicona molestos. Tu primera visita incluye escaneado intraoral 3D con iTero, 
              estudio fotográfico de proporciones faciales y simulación ClinCheck con la Dra. Elena Santamaría.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="group btn-slide-left btn-slide-dark w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-all duration-300"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  Solicitar Cita de Valoración
                </span>
                <ArrowRightIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="https://wa.me/34600000000?text=Hola,%20quisiera%20pedir%20cita%20de%20valoración%20para%20Invisalign"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-slide-left btn-slide-coral w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-porcelain/25 text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  Consultar por WhatsApp
                </span>
              </a>
            </div>
            <p className="text-[11px] text-porcelain/50 mt-4">
              C/ de Serrano 48, Barrio de Salamanca, Madrid · Horario ininterrumpido 09:00 a 20:00 h
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
