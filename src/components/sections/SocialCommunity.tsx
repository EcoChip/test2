import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/Icons";

const SOCIAL_NETWORKS = [
  {
    name: "Instagram",
    handle: "@aura.dentalarchitecture",
    description: "Casos clínicos diarios, micro-fotografía de carillas cerámicas y el día a día en nuestro gabinete de Calle Serrano.",
    url: "https://instagram.com",
    badge: "14.2K seguidores",
    previewImage: "/images/clinic/patient_mirror.jpg",
    accent: "text-coral",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "AURA Dental Architecture",
    description: "Comunicaciones científicas, ponencias de la Dra. Elena Santamaría y avances en regeneración tisular e implantología.",
    url: "https://linkedin.com",
    badge: "Publicaciones Médicas",
    previewImage: "/images/clinic/consultation.jpg",
    accent: "text-sage",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "AURA Odontología Digital",
    description: "Documentales clínicos en 4K, análisis de biomecánica 3D y explicaciones detalladas de pacientes antes y después.",
    url: "https://youtube.com",
    badge: "Vídeos en 4K",
    previewImage: "/images/treatments/diseno_sonrisa.jpg",
    accent: "text-coral",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
        <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@aura.dental",
    description: "Desmitificando mitos de la ortodoncia invisible, cuidados de alineadores y tips prácticos de salud periodontal.",
    url: "https://tiktok.com",
    badge: "Formato Corto",
    previewImage: "/images/treatments/invisalign_patient.jpg",
    accent: "text-sage",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.35 0 .69.06 1 .17V9.45a6.35 6.35 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.49V6.75a4.78 4.78 0 0 1-1-.06z"/>
      </svg>
    ),
  },
];

export function SocialCommunity() {
  return (
    <section className="py-24 border-b border-ink/10 bg-porcelain">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Comunidad & Divulgación
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
              Sigue la actividad clínica y académica de AURA en redes.
            </h2>
            <p className="text-sm text-ink-muted mt-3 font-sans leading-relaxed">
              Fotografías clínicas normalizadas, investigación odontológica, casos en directo 
              y consejos de cuidado preventivo compartidos por nuestro equipo médico.
            </p>
          </div>

          <div>
            <a
              href="https://wa.me/34600000000?text=Hola,%20quisiera%20hacer%20una%20consulta%20con%20AURA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-ink/15 hover:border-sage text-ink text-xs font-semibold uppercase tracking-wider rounded-sm shadow-subtle transition-all"
            >
              <span>WhatsApp Concierge Directo</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-sage" />
            </a>
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_NETWORKS.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-ink/10 rounded-sm overflow-hidden flex flex-col justify-between shadow-subtle hover:shadow-editorial hover:border-ink/25 transition-all group"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] w-full bg-ink/5 overflow-hidden">
                  <Image
                    src={soc.previewImage}
                    alt={soc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider text-ink border border-ink/5">
                    {soc.badge}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-ink">
                    <span className={soc.accent}>{soc.icon}</span>
                    <h3 className="font-editorial text-xl font-normal group-hover:text-sage transition-colors">
                      {soc.name}
                    </h3>
                  </div>

                  <span className="text-xs text-sage font-medium block mt-1">
                    {soc.handle}
                  </span>

                  <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                    {soc.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-ink/5 mt-4">
                <div className="pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink group-hover:text-coral transition-colors">
                  <span>Visitar canal</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
