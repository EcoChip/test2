import React from "react";
import { MapPinIcon, PhoneIcon, ClockIcon, ArrowRightIcon } from "@/components/ui/Icons";

export function ClinicLocationMap() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Calle+de+Serrano+48+28001+Madrid";
  const embedUrl = "https://maps.google.com/maps?q=Calle+de+Serrano+48,+Madrid,+Spain&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="py-20 border-b border-ink/10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
            Localización Estratégica
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
            Calle Serrano 48 · Milla de Oro, Barrio de Salamanca.
          </h2>
          <p className="text-sm text-ink-muted mt-3 font-sans leading-relaxed">
            Nuestra clínica está situada en uno de los enclaves más distinguidos y accesibles de Madrid, 
            diseñada con absoluto aislamiento acústico para que tu visita sea un remanso de tranquilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Google Map Embed (8 cols) */}
          <div className="lg:col-span-8 rounded-sm overflow-hidden border border-ink/15 shadow-editorial relative min-h-[380px] lg:min-h-[460px] bg-porcelain-dark">
            <iframe
              title="Ubicación de AURA Dental Architecture en Google Maps"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[25%] contrast-[105%]"
            />
            {/* Live badge overlay */}
            <div className="absolute top-4 left-4 bg-porcelain/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium shadow-sm pointer-events-none">
              Calle Serrano 48 · 28001 Madrid
            </div>
          </div>

          {/* Access & Logistics Details Card (4 cols) */}
          <div className="lg:col-span-4 p-8 bg-porcelain rounded-sm border border-ink/10 shadow-editorial flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold">
                  Acceso y Transporte
                </span>
                <h3 className="font-editorial text-2xl text-ink font-normal mt-1">
                  Cómo encontrarnos
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block">Dirección:</strong>
                    <span className="text-ink-muted leading-relaxed">
                      Calle de Serrano 48, 1º Derecha<br />
                      Barrio de Salamanca, 28001 Madrid
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    M
                  </div>
                  <div>
                    <strong className="text-ink block">Metro más cercano:</strong>
                    <span className="text-ink-muted leading-relaxed">
                      • <strong>Serrano</strong> (Línea 4) a 2 min a pie.<br />
                      • <strong>Rubén Darío</strong> (Línea 5) a 4 min a pie.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-coral/10 text-coral flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    P
                  </div>
                  <div>
                    <strong className="text-ink block">Aparcamiento clientes:</strong>
                    <span className="text-ink-muted leading-relaxed">
                      Parking público vigilado en Serrano 48 (acceso directo frente a la clínica) o Plaza de Colón.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block">Horario ininterrumpido:</strong>
                    <span className="text-ink-muted leading-relaxed">
                      Lunes a Viernes de 09:00 a 20:30 h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-ink/10 space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-sage hover:bg-sage-dark text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-colors"
              >
                <span>Abrir Ruta en Google Maps</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:+34910234567"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-white border border-ink/15 hover:border-ink/40 text-ink text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-sage" />
                <span>Llamar a Recepción: 910 234 567</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
