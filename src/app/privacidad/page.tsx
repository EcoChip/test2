import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | AURA Dental Architecture",
  description: "Tratamiento y protección de datos personales de salud conforme al RGPD y LOPD-GDD.",
};

export default function PrivacidadPage() {
  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Prominent Legal Disclaimer Banner */}
        <div className="p-6 mb-12 rounded-sm bg-coral/10 border-l-4 border-coral text-ink">
          <span className="text-xs font-bold uppercase tracking-wider text-coral block mb-1">
            Aviso de Plantilla Legal Orientativa
          </span>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            <strong>Atención:</strong> Este documento es una plantilla estándar adaptada al Reglamento General de Protección de Datos (RGPD UE 2016/679) y a la Ley Orgánica 3/2018 (LOPD-GDD) en el contexto de datos de salud (categoría especial de datos según art. 9 RGPD). Debe ser validado por un delegado de protección de datos (DPD) o abogado colegiado antes de su puesta en explotación.
          </p>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl text-ink font-normal leading-tight mb-8">
          Política de Privacidad y Protección de Datos
        </h1>

        <div className="space-y-8 text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">1. Responsable del Tratamiento</h2>
            <p>
              <strong>AURA Dental Architecture S.L.P.</strong>, con domicilio en Calle de Serrano 48, 1º Derecha, 28001 Madrid (NIF B-88990011). Contacto del Delegado de Protección de Datos (DPD): <code>dpd@auradental.es</code>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">2. Finalidades y Base Jurídica</h2>
            <p>Los datos recabados en este sitio web se tratarán para las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li><strong>Gestión de solicitudes de cita y contacto:</strong> Base jurídica en el consentimiento explícito del interesado (art. 6.1.a RGPD).</li>
              <li><strong>Elaboración de historia clínica y asistencia médica bucodental:</strong> Base jurídica en la relación médico-paciente y cumplimiento de la Ley 41/2002 de Autonomía del Paciente (art. 9.2.h RGPD).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">3. Conservación de los Datos Sanitarios</h2>
            <p>
              Los datos que formen parte de la historia clínica se conservarán durante un período mínimo de cinco años contados desde la fecha del alta de cada proceso asistencial, de conformidad con la Ley 41/2002, o durante los plazos legalmente exigibles por la normativa sanitaria de la Comunidad de Madrid.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">4. Derechos del Interesado</h2>
            <p>
              El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición dirigiéndose por escrito a la dirección postal en Calle Serrano 48, 28001 Madrid, o enviando un correo a <code>dpd@auradental.es</code>, aportando copia de su DNI o documento equivalente. Asimismo, tiene derecho a formular reclamación ante la Agencia Española de Protección de Datos (AEPD).
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10 flex gap-4 text-xs">
          <Link href="/cookies" className="text-sage hover:underline">
            Ver Política de Cookies →
          </Link>
          <Link href="/aviso-legal" className="text-sage hover:underline">
            Ver Aviso Legal →
          </Link>
        </div>
      </div>
    </div>
  );
}
