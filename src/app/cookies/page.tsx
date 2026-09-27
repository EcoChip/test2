import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies | AURA Dental Architecture",
  description: "Información detallada sobre el uso de cookies técnicas y analíticas en nuestro sitio web.",
};

export default function CookiesPage() {
  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Prominent Legal Disclaimer Banner */}
        <div className="p-6 mb-12 rounded-sm bg-coral/10 border-l-4 border-coral text-ink">
          <span className="text-xs font-bold uppercase tracking-wider text-coral block mb-1">
            Aviso de Plantilla Legal Orientativa
          </span>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            <strong>Atención:</strong> Esta política de cookies es un documento de plantilla elaborado conforme a 
            las directrices de la Agencia Española de Protección de Datos (AEPD). Debe ser validado por un 
            asesor legal antes de su publicación definitiva.
          </p>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl text-ink font-normal leading-tight mb-8">
          Política de Cookies
        </h1>

        <div className="space-y-8 text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">1. ¿Qué son las cookies?</h2>
            <p>
              Una cookie es un fichero que se descarga en su dispositivo al acceder a determinadas páginas web. Permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de un usuario para mejorar su experiencia técnica.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">2. Tipos de Cookies que utilizamos</h2>
            <ul className="list-disc pl-5 space-y-2 pt-1">
              <li>
                <strong>Cookies Técnicas (Estrictamente Necesarias):</strong> Permiten la navegación a través del sitio web, el control de la sesión y la renderización interactiva del contenido 3D y formularios de contacto. No requieren consentimiento según el art. 22.2 LSSI.
              </li>
              <li>
                <strong>Cookies de Preferencias:</strong> Permiten recordar opciones como el modo de movimiento reducido (prefers-reduced-motion) o el idioma seleccionado.
              </li>
              <li>
                <strong>Cookies de Rendimiento y Analítica:</strong> Permiten cuantificar el número de usuarios y realizar la medición estadística del uso que hacen los pacientes de las distintas secciones del sitio.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">3. Gestión y Desactivación de Cookies</h2>
            <p>
              El usuario puede en cualquier momento permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador de Internet (Chrome, Safari, Firefox, Edge).
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10 flex gap-4 text-xs">
          <Link href="/privacidad" className="text-sage hover:underline">
            Ver Política de Privacidad →
          </Link>
          <Link href="/aviso-legal" className="text-sage hover:underline">
            Ver Aviso Legal →
          </Link>
        </div>
      </div>
    </div>
  );
}
