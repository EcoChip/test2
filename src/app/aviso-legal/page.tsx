import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal | AURA Dental Architecture",
  description: "Información legal y datos identificativos de la sociedad conforme a la Ley 34/2002 (LSSI-CE).",
};

export default function AvisoLegalPage() {
  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Prominent Legal Disclaimer Banner */}
        <div className="p-6 mb-12 rounded-sm bg-coral/10 border-l-4 border-coral text-ink">
          <span className="text-xs font-bold uppercase tracking-wider text-coral block mb-1">
            Aviso de Plantilla Legal Orientativa
          </span>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            <strong>Atención:</strong> El contenido de esta página es un modelo de plantilla adaptado a la 
            normativa española (LSSI-CE y normativa sanitaria). Debe ser revisado y formalmente validado 
            por un abogado o asesor jurídico colegiado especializado en el sector sanitario antes de la 
            publicación y explotación definitiva del sitio web.
          </p>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl text-ink font-normal leading-tight mb-8">
          Aviso Legal y Datos Identificativos
        </h1>

        <div className="space-y-8 text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">1. Datos Identificativos del Titular</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos identificativos de la entidad titular de este sitio web:
            </p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li><strong>Denominación Social:</strong> AURA Dental Architecture S.L.P.</li>
              <li><strong>NIF:</strong> B-88990011</li>
              <li><strong>Domicilio Social:</strong> Calle de Serrano 48, 1º Derecha, 28001 Madrid, España.</li>
              <li><strong>Inscripción Registral:</strong> Registro Mercantil de Madrid, Tomo 34.500, Folio 120, Hoja M-620.000.</li>
              <li><strong>Autorización Sanitaria:</strong> Centro Sanitario homologado por la Consejería de Sanidad de la Comunidad de Madrid con código CS-12345/M.</li>
              <li><strong>Dirección Médica Colegiada:</strong> Dra. Elena Santamaría (Colegiada nº 28004912 en el Ilustre Colegio Oficial de Odontólogos y Estomatólogos de la I Región).</li>
              <li><strong>Correo Electrónico:</strong> legal@auradental.es</li>
              <li><strong>Teléfono:</strong> +34 910 234 567</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">2. Objeto y Ámbito de Aplicación</h2>
            <p>
              El presente sitio web tiene por objeto poner a disposición del público información sobre los servicios odontológicos, médicos y de estética dental avanzada prestados por AURA Dental Architecture, así como permitir la solicitud de citas diagnósticas informativas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">3. Propiedad Intelectual e Industrial</h2>
            <p>
              La totalidad del contenido de este sitio web (incluyendo textos, imágenes clínicas, modelos 3D, código informático, diseño gráfico, logotipos y marcas comerciales) está protegida por la legislación sobre propiedad intelectual e industrial española e internacional. Queda prohibida su reproducción o explotación total o parcial sin autorización previa y por escrito.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl text-ink font-normal">4. Carácter Informativo y Ausencia de Diagnóstico Vinculante</h2>
            <p>
              La información disponible en este sitio web tiene carácter divulgativo y orientativo. En ningún caso sustituye la anamnesis, exploración clínica presencial, radiología o juicio facultativo emitido por un odontólogo colegiado en el gabinete dental.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10 flex gap-4 text-xs">
          <Link href="/privacidad" className="text-sage hover:underline">
            Ver Política de Privacidad →
          </Link>
          <Link href="/terminos" className="text-sage hover:underline">
            Ver Términos de Uso →
          </Link>
        </div>
      </div>
    </div>
  );
}
