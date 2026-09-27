"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  WhatsAppIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tratamiento: "Invisalign Diamond",
    horario: "Tardes (15:00 - 20:00)",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate high-converting clinical form submission
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      {/* Hero Header */}
      <section className="py-16 md:py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Cita Previa & Localización
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink font-normal mt-3 leading-tight text-balance">
              Agenda tu primera valoración diagnóstica 3D.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ink-muted font-sans leading-relaxed text-pretty">
              Estamos en la Calle Serrano 48, en el corazón del Barrio de Salamanca de Madrid. 
              Contacta con nuestro equipo médico para coordinar tu cita con la Dra. Elena Santamaría 
              o el especialista de tu interés.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Direct Channels Grid */}
      <section className="py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-ink/10 rounded-sm shadow-editorial">
              <h2 className="font-editorial text-2xl sm:text-3xl text-ink font-normal">
                Solicitud de Cita en Gabinete
              </h2>
              <p className="text-xs text-ink-muted mt-2 font-sans">
                Completa tus datos y nuestro coordinador clínico se pondrá en contacto contigo 
                en menos de 2 horas hábiles para confirmar fecha y hora.
              </p>

              {submitted ? (
                <div className="mt-8 p-6 bg-sage/10 border border-sage/30 rounded-sm space-y-3">
                  <div className="flex items-center gap-2 text-sage font-medium text-sm">
                    <CheckIcon className="w-5 h-5 text-sage" />
                    <span>¡Solicitud recibida correctamente!</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">
                    Muchas gracias, <strong>{formData.nombre}</strong>. Hemos registrado tu petición para el tratamiento de <strong>{formData.tratamiento}</strong>. Nuestro equipo de recepción te llamará al {formData.telefono} para proponerte el hueco más adecuado.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-sage underline hover:text-coral pt-2 block"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej. Carmen Gómez"
                        className="w-full px-4 py-3 text-xs bg-porcelain border border-ink/15 rounded-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
                        Teléfono móvil *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-3 text-xs bg-porcelain border border-ink/15 rounded-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="carmen@ejemplo.es"
                        className="w-full px-4 py-3 text-xs bg-porcelain border border-ink/15 rounded-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
                        Tratamiento de interés
                      </label>
                      <select
                        value={formData.tratamiento}
                        onChange={(e) => setFormData({ ...formData, tratamiento: e.target.value })}
                        className="w-full px-4 py-3 text-xs bg-porcelain border border-ink/15 rounded-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                      >
                        <option value="Invisalign Diamond">Invisalign® Diamond Apex</option>
                        <option value="Implantes de Carga Inmediata">Implantes de Carga Inmediata</option>
                        <option value="Carillas de Porcelana">Carillas Cerámicas Biomiméticas</option>
                        <option value="Blanqueamiento Philips Zoom">Blanqueamiento Philips Zoom</option>
                        <option value="Periodoncia & Encías">Periodoncia & Salud Gingival</option>
                        <option value="Revisión General / Diagnóstico">Primera Revisión Diagnóstica General</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
                      Preferencia de horario
                    </label>
                    <select
                      value={formData.horario}
                      onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-porcelain border border-ink/15 rounded-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                    >
                      <option value="Mañanas (09:00 - 14:00)">Mañanas (09:00 a 14:00 h)</option>
                      <option value="Mediodía (14:00 - 16:00)">Mediodía (14:00 a 16:00 h)</option>
                      <option value="Tardes (16:00 - 20:00)">Tardes (16:00 a 20:00 h)</option>
                      <option value="Cualquier horario disponible">Cualquier horario disponible</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
                      Motivo de la consulta o comentarios (opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Explícanos brevemente qué te gustaría mejorar de tu sonrisa..."
                      className="w-full px-4 py-3 text-xs bg-porcelain border border-ink/15 rounded-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group btn-slide-left btn-slide-dark w-full inline-flex items-center justify-center gap-2.5 py-4 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-all duration-300"
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                        Solicitar Cita de Valoración 3D
                      </span>
                      <ArrowRightIcon className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <p className="text-[10px] text-ink-subtle mt-3 text-center">
                      Tus datos médicos se tratan conforme al RGPD exclusivamente para la gestión de tu cita en clínica.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Quick Contact & Direct WhatsApp (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* WhatsApp VIP Card */}
              <div className="p-8 bg-sage text-porcelain rounded-sm shadow-editorial space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-coral">
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl text-porcelain font-normal">
                      Atención Directa por WhatsApp
                    </h3>
                    <span className="text-[11px] text-porcelain/70 font-sans">
                      Respuesta en horario clínico
                    </span>
                  </div>
                </div>
                <p className="text-xs text-porcelain/80 leading-relaxed font-sans">
                  ¿Prefieres coordinar tu cita o enviarnos fotos de tu caso directamente por mensaje? 
                  Escríbenos directamente a nuestro número médico oficial.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/34600000000?text=Hola,%20quisiera%20pedir%20información%20sobre%20una%20cita%20en%20AURA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white text-sage text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-porcelain transition-colors"
                  >
                    <span>Abrir Chat de WhatsApp</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct NAP Details */}
              <div className="p-8 bg-white border border-ink/10 rounded-sm shadow-subtle space-y-6">
                <h3 className="font-editorial text-xl text-ink font-normal border-b border-ink/10 pb-3">
                  Información Asistencial
                </h3>

                <div className="space-y-4 text-xs text-ink-muted">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-ink block">Dirección de la Clínica:</strong>
                      <span>Calle de Serrano 48, 1º Derecha<br />28001 Madrid (Barrio de Salamanca)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-ink block">Teléfono de Centralita:</strong>
                      <a href="tel:+34910234567" className="text-sage hover:underline font-medium">
                        +34 910 234 567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-ink block">Horario de Consulta:</strong>
                      <span>Lunes a Viernes: 09:00 - 20:00 h (Ininterrumpido)<br />Sábados: Cirugías y citas quirúrgicas programadas</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive Map & Transport Section */}
      <section id="ubicacion" className="py-20 bg-porcelain-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Accesos y Transporte
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-normal mt-2 leading-tight">
              Cómo llegar a nuestro gabinete en Serrano.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Real Interactive Google Maps Embed (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-ink/10 rounded-sm overflow-hidden shadow-editorial relative aspect-[16/10] min-h-[400px]">
              <iframe
                title="Ubicación de AURA Dental Architecture en Google Maps"
                src="https://maps.google.com/maps?q=Calle+de+Serrano+48,+Madrid,+Spain&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              />
              <div className="absolute top-4 left-4 bg-porcelain/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-ink/10 text-[11px] uppercase tracking-wider text-ink font-medium shadow-sm pointer-events-none">
                Calle Serrano 48 · 28001 Madrid
              </div>
            </div>

            {/* Transport details (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white border border-ink/10 rounded-sm space-y-2">
                <span className="text-xs uppercase tracking-wider text-sage font-semibold block">
                  En Metro de Madrid
                </span>
                <p className="text-xs text-ink-muted leading-relaxed">
                  <strong>Estación Serrano (Línea 4):</strong> A solo 120 metros caminando.<br />
                  <strong>Estación Colón (Línea 4) o Rubén Darío (Línea 5):</strong> A 6 minutos a pie.
                </p>
              </div>

              <div className="p-6 bg-white border border-ink/10 rounded-sm space-y-2">
                <span className="text-xs uppercase tracking-wider text-sage font-semibold block">
                  Parking Subterráneo Bonificado
                </span>
                <p className="text-xs text-ink-muted leading-relaxed">
                  <strong>Parking Serrano:</strong> Acceso directo de entrada frente al portal 46. Ofrecemos a nuestros pacientes <strong>2 horas de estacionamiento bonificado</strong> en cada cita diagnóstica y de tratamiento.
                </p>
              </div>

              <div className="p-6 bg-white border border-ink/10 rounded-sm space-y-2">
                <span className="text-xs uppercase tracking-wider text-sage font-semibold block">
                  Líneas de Autobús EMT
                </span>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Paradas en la misma puerta (Líneas 1, 9, 19, 51, 74 y N4).
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calle+de+Serrano+48+28001+Madrid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-sage hover:bg-sage-dark text-porcelain text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-colors"
                >
                  <span>Abrir Ruta en Google Maps</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
