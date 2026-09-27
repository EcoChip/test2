import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Equipo Médico | Odontólogos Especialistas en Madrid",
  description:
    "Conoce a los doctores de AURA Dental Architecture: especialistas de dedicación exclusiva en ortodoncia invisible, cirugía implantológica y estética biomimética.",
};

const DOCTORS = [
  {
    name: "Dra. Elena Santamaría",
    role: "Directora Médica & Ortodoncia Avanzada",
    specialty: "Ortodoncia Digital e Invisalign Diamond Apex",
    experience: "16 años de experiencia clínica",
    collegiateNumber: "Col. Oficial de Odontólogos de Madrid nº 28004912",
    image: "/images/team/elena_santamaria.jpg",
    bio: "Licenciada en Odontología por la Universidad Complutense de Madrid con Premio Extraordinario. Máster Oficial en Ortodoncia y Ortopedia Dentofacial (3 años dedicación exclusiva). Con más de 1.800 casos concluidos con Invisalign, ostenta la categoría máxima Diamond Apex Provider. Es profesora colaboradora en programas internacionales de formación en ortodoncia digital y ponente habitual en congresos de alineadores.",
    credentials: [
      "Invisalign® Diamond Apex Provider (Top 1% Europa)",
      "Máster en Ortodoncia y Ortopedia Dentofacial (UCM)",
      "Miembro Activo de la Sociedad Española de Ortodoncia (SEDO)",
      "Certificación en Sistema Damon e iTero OrthoCAD Specialist",
    ],
  },
  {
    name: "Dr. Javier Morales",
    role: "Cirugía Oral, Implantología & Regeneración Ósea",
    specialty: "Implantología de Carga Inmediata y Cirugía Mucogingival",
    experience: "18 años de experiencia quirúrgica",
    collegiateNumber: "Col. Oficial de Odontólogos de Madrid nº 28003820",
    image: "/images/team/javier_morales.jpg",
    bio: "Especialista en cirugía reconstructiva y rehabilitación sobre implantes. Tras completar su formación hospitalaria y su Máster en Cirugía Bucal en el Hospital Clínico San Carlos de Madrid, centró su actividad en protocolos de mínima invasión: implantes guiados por ordenador 3D, carga inmediata en el mismo día y regeneración tisular con biomateriales de alta biocompatibilidad.",
    credentials: [
      "Máster en Cirugía Bucal e Implantología (Hospital Clínico San Carlos)",
      "Miembro de la Sociedad Española de Cirugía Bucal (SECIB)",
      "Especialista en Cirugía Guiada Straumann® Digital Guided Surgery",
      "Formación avanzada en Sedación Consciente en Gabinete Dental",
    ],
  },
  {
    name: "Dra. Sofía Varela",
    role: "Estética Dental Biomimética & Prótesis",
    specialty: "Carillas Cerámicas Feldespáticas & Digital Smile Design (DSD)",
    experience: "12 años de experiencia en odontología restauradora",
    collegiateNumber: "Col. Oficial de Odontólogos de Madrid nº 28006144",
    image: "/images/team/sofia_varela.jpg",
    bio: "Pionera en técnicas de adhesión dental y carillas de mínimo espesor (0.3 mm). Formada en centros de referencia en Ginebra y Milán, enfoca cada reconstrucción desde la biomimética: devolver al diente su resistencia mecánica, forma y textura natural sin desgastar tejido sano. Trabaja mano a mano con maestros ceramistas nacionales para estratificar cada faceta de porcelana a mano.",
    credentials: [
      "Postgrado en Odontología Restauradora y Estética Biomimética",
      "Miembro de la Sociedad Española de Prótesis Estomatológica (SEPES)",
      "Certificada en Digital Smile Design (DSD Master Clinic)",
      "Especialista en microscopía óptica y aislamiento absoluto con dique",
    ],
  },
];

export default function EquipoPage() {
  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Cuerpo Médico Colegiado
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink font-normal mt-3 leading-tight text-balance">
              Doctores con dedicación exclusiva y criterio conservador.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ink-muted font-sans leading-relaxed text-pretty">
              En AURA no existen tratamientos en cadena ni facultativos rotatorios. Te atenderá 
              el mismo doctor de principio a fin, responsabilizándose personalmente de tu evolución clínica.
            </p>
          </div>

          {/* Group Photo Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden border border-ink/10 shadow-editorial mt-12 bg-ink">
            <Image
              src="/images/team/group.jpg"
              alt="Equipo facultativo de AURA Dental Architecture en Calle Serrano"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 bg-porcelain/90 backdrop-blur-sm px-3.5 py-1.5 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium">
              Cuerpo Facultativo · Dra. Elena Santamaría, Dr. Javier Morales y Dra. Sofía Varela
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Philosophy Pillars */}
      <section className="py-16 border-b border-ink/10 bg-porcelain-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-ink/10 rounded-sm">
              <span className="text-xs uppercase tracking-wider text-sage font-semibold block mb-2">
                01. Mínima Invasión
              </span>
              <h3 className="font-editorial text-xl text-ink font-normal">
                Preservación del tejido biológico
              </h3>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                Priorizamos siempre la conservación del esmalte y el hueso propio del paciente frente a tallados agresivos o extracciones innecesarias.
              </p>
            </div>

            <div className="p-6 bg-white border border-ink/10 rounded-sm">
              <span className="text-xs uppercase tracking-wider text-sage font-semibold block mb-2">
                02. Diagnóstico Digital 3D
              </span>
              <h3 className="font-editorial text-xl text-ink font-normal">
                Planificación guiada por ordenador
              </h3>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                Cada intervención quirúrgica u ortodóncica se diseña digitalmente antes de tocar la boca, reduciendo tiempos clínicos y postoperatorios.
              </p>
            </div>

            <div className="p-6 bg-white border border-ink/10 rounded-sm">
              <span className="text-xs uppercase tracking-wider text-sage font-semibold block mb-2">
                03. Continuidad Asistencial
              </span>
              <h3 className="font-editorial text-xl text-ink font-normal">
                Mismo doctor en cada revisión
              </h3>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                El especialista que planifica tu caso es quien realiza todas las revisiones, garantizando un seguimiento riguroso sin sorpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profiles Detailed */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {DOCTORS.map((doc, idx) => (
            <div
              key={doc.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 bg-white border border-ink/10 rounded-sm shadow-editorial"
            >
              {/* Doctor Visual */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-ink/10 bg-ink">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Doctor Biography & Credentials */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
                    {doc.specialty}
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-1">
                    {doc.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted mt-2">
                    <span className="font-medium text-sage">{doc.experience}</span>
                    <span>·</span>
                    <span>{doc.collegiateNumber}</span>
                  </div>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed font-sans">
                  {doc.bio}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-wider text-ink font-semibold">
                    Acreditaciones y Sociedades Científicas:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                    {doc.credentials.map((cred, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ShieldCheckIcon className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contacto?doctor=${encodeURIComponent(doc.name)}`}
                    className="btn-slide-left btn-slide-dark inline-flex items-center gap-2 px-6 py-3 bg-sage text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                  >
                    <span>Solicitar Consulta con {doc.name.split(" ")[0]} {doc.name.split(" ")[1]}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
