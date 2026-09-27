import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | AURA Dental Architecture",
  description: "Condiciones generales de uso del sitio web y reserva informativa de servicios odontológicos.",
};

export default function TerminosPage() {
  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Prominent Legal Disclaimer Banner */}
        <div className="p-6 mb-12 rounded-sm bg-coral/10 border-l-4 border-coral text-ink">
          <span className="text-xs font-bold uppercase tracking-wider text-coral block mb-1">
            Aviso de Plantilla Legal Orientativa
          </span>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            <strong>Atención:</strong> Las presentes condiciones corresponden a una plantilla estándar orientativa. 
            Deben ser revisadas por un abogado colegiado para adecuarlas a las políticas comerciales, financieras 
            y de contratación de servicios médicos de la clínica antes de su entrada en vigor.
          </p>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl text-ink font-normal leading-tight mb-8">
          Términos y Condiciones de Uso
        </h1>

        <div className="space-y-8 text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">1. Aceptación del Usuario</h2>
            <p>
              El acceso y uso de este portal web atribuye la condición de Usuario e implica la aceptación plena de todos los términos contenidos en el presente documento.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">2. Naturaleza de las Citas Solicitadas Online</h2>
            <p>
              El envío de un formulario de solicitud de cita a través de la web no constituye una confirmación inmediata vinculante de consulta médica. La cita quedará formalmente confirmada una vez que el personal de recepción de AURA se comunique con el paciente vía telefónica o correo electrónico para coordinar disponibilidad y agenda facultativa.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">3. Presupuestos y Planes de Tratamiento</h2>
            <p>
              Los precios o estimaciones de coste reflejados en comunicaciones comerciales tienen carácter orientativo. Todo plan de tratamiento definitivo requiere una exploración física completa, diagnóstico por imagen (TAC/escáner intraoral) y entrega de un consentimiento informado por escrito antes de cualquier intervención.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">4. Legislación y Fuero</h2>
            <p>
              Para la resolución de cualquier controversia o cuestión litigiosa relativa al presente sitio web o a las actividades desarrolladas en él, será de aplicación la legislación española, siendo competentes los Juzgados y Tribunales de la ciudad de Madrid.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10 flex gap-4 text-xs">
          <Link href="/aviso-legal" className="text-sage hover:underline">
            Ver Aviso Legal →
          </Link>
          <Link href="/privacidad" className="text-sage hover:underline">
            Ver Política de Privacidad →
          </Link>
        </div>
      </div>
    </div>
  );
}
