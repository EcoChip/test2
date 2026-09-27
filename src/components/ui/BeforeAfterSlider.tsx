"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface CaseItem {
  id: string;
  title: string;
  treatment: string;
  duration: string;
  doctor: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImg: string;
  afterImg: string;
}

const CASES: CaseItem[] = [
  {
    id: "caso-1",
    title: "Rehabilitación estética anterior y atrición dental",
    treatment: "Carillas Cerámicas Feldespáticas (0.3 mm)",
    duration: "3 semanas (3 sesiones)",
    doctor: "Dra. Sofía Varela",
    description:
      "Paciente con desgaste incisal severo por bruxismo y atrición del esmalte. Restauración estética y funcional biomimética conservando el 95% de la estructura dental intacta.",
    beforeLabel: "Atrición y Desgaste (Mes 0)",
    afterLabel: "Carillas Cerámicas (Final)",
    beforeImg: "/images/clinical/case1_before.jpg",
    afterImg: "/images/clinical/case1_after.jpg",
  },
  {
    id: "caso-2",
    title: "Restauración de pieza anterior con implante unitario",
    treatment: "Implante Straumann® Roxolid + Corona Zirconio",
    duration: "1 sesión (Carga inmediata)",
    doctor: "Dr. Javier Morales",
    description:
      "Ausencia de incisivo anterior por traumatismo previo con compromiso del contorno óseo. Colocación guiada mediante TAC 3D y corona provisional fija el mismo día de la intervención.",
    beforeLabel: "Espacio Edéntulo Previo",
    afterLabel: "Rehabilitación Straumann",
    beforeImg: "/images/clinical/case2_before.jpg",
    afterImg: "/images/clinical/case2_after.jpg",
  },
  {
    id: "caso-3",
    title: "Corrección de apiñamiento severo y compresión de arco",
    treatment: "Invisalign® Diamond Apex + SmartTrack®",
    duration: "11 meses (22 alineadores)",
    doctor: "Dra. Elena Santamaría",
    description:
      "Apiñamiento severo en el sector anterior con rotación y solapamiento incisal. Expansión guiada y nivelación completa sin realizar extracciones de piezas sanas.",
    beforeLabel: "Apiñamiento Severo",
    afterLabel: "Arco Armónico Nivelado",
    beforeImg: "/images/clinical/case3_before.jpg",
    afterImg: "/images/clinical/case3_after.jpg",
  },
];

export function BeforeAfterSlider() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIndex];

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clampedPercent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full">
      {/* Case Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {CASES.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCaseIndex(idx);
              setSliderPos(50);
            }}
            className={`text-xs uppercase tracking-wider px-4 py-2 rounded-sm border transition-all text-left ${
              activeCaseIndex === idx
                ? "bg-sage text-porcelain border-sage font-medium shadow-sm"
                : "bg-transparent text-ink/70 border-ink/15 hover:border-ink/40"
            }`}
          >
            Caso 0{idx + 1}: {item.treatment.split("+")[0].trim()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slider Canvas (8 cols) */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-sm overflow-hidden select-none cursor-ew-resize border border-ink/10 bg-porcelain-dark shadow-editorial"
          >
            {/* After Image (Full width background) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={activeCase.afterImg}
                alt={activeCase.afterLabel}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-sage/90 text-porcelain text-[11px] uppercase tracking-wider px-3 py-1 rounded backdrop-blur-sm">
                {activeCase.afterLabel}
              </span>
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 h-full" style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}>
                <Image
                  src={activeCase.beforeImg}
                  alt={activeCase.beforeLabel}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-4 left-4 bg-ink/90 text-porcelain text-[11px] uppercase tracking-wider px-3 py-1 rounded backdrop-blur-sm z-10">
                {activeCase.beforeLabel}
              </span>
            </div>

            {/* Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-porcelain shadow-lg pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-porcelain border border-ink/20 flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18-6-6 6-6" />
                  <path d="m15 6 6 6-6 6" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-ink/50 mt-2 text-center">
            Arrastra el selector horizontalmente para contrastar el antes y el después
          </p>
        </div>

        {/* Clinical Dossier details (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-coral font-semibold">
              Diagnóstico Clínico
            </span>
            <h3 className="font-editorial text-2xl text-ink font-normal mt-1 leading-snug">
              {activeCase.title}
            </h3>
          </div>

          <div className="space-y-3 py-4 border-y border-ink/10 text-xs">
            <div className="flex justify-between">
              <span className="text-ink/60">Tratamiento:</span>
              <span className="font-medium text-ink text-right">{activeCase.treatment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Duración activa:</span>
              <span className="font-medium text-sage text-right">{activeCase.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Especialista:</span>
              <span className="font-medium text-ink text-right">{activeCase.doctor}</span>
            </div>
          </div>

          <p className="text-xs text-ink/75 leading-relaxed font-sans">
            {activeCase.description}
          </p>
        </div>
      </div>
    </div>
  );
}
