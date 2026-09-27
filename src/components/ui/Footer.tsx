"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPinIcon, PhoneIcon, ClockIcon } from "./Icons";
import { DemoSettingsModal } from "./DemoSettingsModal";

export function Footer() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <footer className="bg-sage-deep text-porcelain border-t border-porcelain/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-porcelain/10">
          {/* Col 1: Clinic Identity & NAP */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-editorial text-2xl uppercase tracking-tight text-porcelain">
                AURA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-porcelain/60 font-sans">
                Dental Architecture
              </span>
            </div>
            <p className="text-xs text-porcelain/70 leading-relaxed font-sans max-w-xs">
              Clínica de alta estética dental y ortodoncia invisible en el Barrio de Salamanca, Madrid.
              Odontología biomimética y diagnósticos 3D por ordenador.
            </p>
            <div className="text-[11px] text-porcelain/50 pt-2">
              Autorización Sanitaria CAM: CS-12345/M
            </div>
          </div>

          {/* Col 2: Tratamientos */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm tracking-wide uppercase text-porcelain">
              Tratamientos
            </h4>
            <ul className="space-y-2 text-xs text-porcelain/70">
              <li>
                <Link href="/invisalign" className="hover:text-coral transition-colors">
                  Invisalign®
                </Link>
              </li>
              <li>
                <Link href="/tratamientos/implantes" className="hover:text-coral transition-colors">
                  Implantes
                </Link>
              </li>
              <li>
                <Link href="/tratamientos/carillas" className="hover:text-coral transition-colors">
                  Carillas
                </Link>
              </li>
              <li>
                <Link href="/tratamientos/blanqueamiento" className="hover:text-coral transition-colors">
                  Blanqueamiento
                </Link>
              </li>
              <li>
                <Link href="/tratamientos" className="hover:text-coral transition-colors font-medium text-porcelain">
                  Tratamientos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Enlaces y Equipo */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm tracking-wide uppercase text-porcelain">
              La Clínica
            </h4>
            <ul className="space-y-2 text-xs text-porcelain/70">
              <li>
                <Link href="/equipo" className="hover:text-coral transition-colors">
                  Equipo Médico
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-coral transition-colors">
                  Pedir Cita
                </Link>
              </li>
              <li>
                <Link href="/contacto#ubicacion" className="hover:text-coral transition-colors">
                  Ubicación & Acceso
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto directo & Horarios */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm tracking-wide uppercase text-porcelain">
              Contacto Directo
            </h4>
            <div className="space-y-2.5 text-xs text-porcelain/80">
              <div className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <span>C/ de Serrano 48, 1º Dcha, Barrio Salamanca, 28001 Madrid</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneIcon className="w-4 h-4 text-coral shrink-0" />
                <a href="tel:+34910234567" className="hover:text-coral transition-colors">
                  +34 910 234 567
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <span>Lunes a Viernes: 09:00 - 20:30 h (Ininterrumpido)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with legal links and copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-porcelain/50 gap-4">
          <div>
            © {new Date().getFullYear()} AURA Dental Architecture S.L.P. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/aviso-legal" className="hover:text-porcelain transition-colors">
              Aviso Legal
            </Link>
            <Link href="/privacidad" className="hover:text-porcelain transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-porcelain transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/cookies" className="hover:text-porcelain transition-colors">
              Cookies
            </Link>
            <span className="text-porcelain/30">·</span>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-coral text-porcelain hover:text-white font-mono text-[10px] tracking-wider uppercase transition-all duration-300 border border-white/15 hover:border-coral group shadow-sm"
              title="Abrir selector de paletas de color y dirección de arte"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-coral group-hover:bg-white transition-colors" />
              <span>Ajustes del Demo</span>
            </button>
          </div>
        </div>
      </div>

      <DemoSettingsModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </footer>
  );
}
