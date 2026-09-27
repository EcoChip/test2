"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "../ui/Icons";

// Dynamically import DentalCanvas to avoid SSR Three.js execution
const DentalCanvas = dynamic(
  () => import("./DentalCanvas").then((mod) => mod.DentalCanvas),
  { ssr: false }
);

interface BeatConfig {
  id: number;
  label: string;
  shortTitle: string;
  start: number;
  peakStart: number;
  peakEnd: number;
  end: number;
}

const BEATS: BeatConfig[] = [
  { id: 1, label: "01 / INTRO", shortTitle: "Presentación", start: 0.00, peakStart: 0.00, peakEnd: 0.08, end: 0.11 },
  { id: 2, label: "02 / OCLUSIÓN", shortTitle: "Anatomía Dual", start: 0.11, peakStart: 0.14, peakEnd: 0.22, end: 0.25 },
  { id: 3, label: "03 / APERTURA", shortTitle: "Dinámica Mandibular", start: 0.26, peakStart: 0.30, peakEnd: 0.40, end: 0.42 },
  { id: 4, label: "04 / MATERIAL", shortTitle: "SmartTrack® 0.75mm", start: 0.42, peakStart: 0.45, peakEnd: 0.58, end: 0.60 },
  { id: 5, label: "05 / PROGRESIÓN", shortTitle: "Algoritmo ClinCheck®", start: 0.60, peakStart: 0.62, peakEnd: 0.75, end: 0.77 },
  { id: 6, label: "06 / COMPARATIVA", shortTitle: "vs Brackets", start: 0.76, peakStart: 0.78, peakEnd: 0.87, end: 0.88 },
  { id: 7, label: "07 / LIBERTAD", shortTitle: "Uso Diario", start: 0.88, peakStart: 0.89, peakEnd: 0.95, end: 0.96 },
  { id: 8, label: "08 / ENTRADA", shortTitle: "Bienvenido a AURA", start: 0.95, peakStart: 0.97, peakEnd: 0.99, end: 1.00 },
];

function getBeatOpacity(progress: number, beat: BeatConfig): number {
  if (progress < beat.start || progress > beat.end) return 0;
  if (progress < beat.peakStart) {
    return (progress - beat.start) / (beat.peakStart - beat.start);
  }
  if (progress <= beat.peakEnd) {
    return 1;
  }
  return 1 - (progress - beat.peakEnd) / (beat.end - beat.peakEnd);
}

export function DentalIntroScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [hasWebGL2, setHasWebGL2] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeBeatId, setActiveBeatId] = useState(1);

  // Check WebGL2 and prefers-reduced-motion on mount
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    // Detect WebGL2 support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setHasWebGL2(!!gl);
    } catch {
      setHasWebGL2(false);
    }

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
    };
  }, []);

  // Set up ScrollTrigger scrubbed animation over 1000vh (~900vh of pure scroll travel)
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          // Find current active beat
          const current = BEATS.find((b) => p >= b.start && p <= b.end);
          if (current) {
            setActiveBeatId(current.id);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Dynamic Aligner count for Beat 5 (range 0.62 to 0.75)
  const currentAligner = useMemo(() => {
    const p5 = Math.min(1, Math.max(0, (progress - 0.62) / (0.75 - 0.62)));
    return Math.min(22, Math.max(1, Math.round(1 + p5 * 21)));
  }, [progress]);

  // Seamless Porcelain Cross-Fade (cross-fades at the pass-through threshold 0.94 -> 0.99)
  let crossFadeOpacity = 0;
  if (progress >= 0.94) {
    crossFadeOpacity = Math.min(1, (progress - 0.94) / 0.05);
  }

  // Determine if canvas should be active (hide once completely past intro to free GPU resources)
  const isPastIntro = progress >= 0.999;

  // Opacities for the 8 beats
  const opacities = useMemo(() => {
    return BEATS.map((beat) => getBeatOpacity(progress, beat));
  }, [progress]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        reducedMotion ? "h-screen" : "h-[1000vh]"
      } bg-obsidian`}
      aria-label="Introducción cinematográfica AURA 3D"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Fallback for devices without WebGL2 */}
        {hasWebGL2 === false ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-obsidian text-porcelain p-6">
            <video
              src="/posters/hero-fallback.mp4"
              poster="/posters/hero-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 max-w-lg text-center space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-medium">
                Simulación 3D ClinCheck
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl font-normal leading-tight">
                Tu sonrisa, a otro nivel.
              </h1>
              <p className="text-sm text-porcelain/70 font-sans">
                Alineación dental invisible de precisión milimétrica mediante escáner digital 3D.
              </p>
              <div className="pt-4">
                <a
                  href="#contenido-home"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta hover:bg-coral-hover transition-colors"
                >
                  Entrar al sitio
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* High Priority Static Poster for Instant LCP (< 1.8s) */}
            <div
              className={`absolute inset-0 z-20 transition-opacity duration-500 pointer-events-none ${
                canvasReady ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src="/posters/hero-poster.jpg"
                alt="Arcadas dentales alineadas - AURA Dental Architecture"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Studio Back-Glow Halo for Translucent Refraction */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(52, 75, 65, 0.45) 0%, rgba(25, 38, 32, 0.25) 45%, rgba(11, 15, 13, 0) 75%)",
              }}
            />

            {/* 3D Canvas Stage */}
            <div
              className="absolute inset-0 z-10 w-full h-full"
              style={{
                display: isPastIntro ? "none" : "block",
              }}
            >
              <DentalCanvas
                progress={reducedMotion ? 0.35 : progress}
                reducedMotion={reducedMotion}
                onCanvasReady={() => setCanvasReady(true)}
              />
            </div>

            {/* Top Right Quick Skip Button */}
            <div className="absolute top-6 right-6 z-40">
              <a
                href="#contenido-home"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 backdrop-blur-md text-xs font-sans tracking-wider text-porcelain/70 hover:text-white transition-all shadow-subtle pointer-events-auto"
                aria-label="Saltar secuencia 3D e ir directo al contenido de la clínica"
              >
                <span>Saltar intro</span>
                <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Right Side Beat Navigation / Storytelling Tracker (Desktop/Tablet) */}
            <div className="hidden lg:flex flex-col gap-2.5 absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-porcelain/40 mb-1">
                Storyline
              </div>
              {BEATS.map((beat) => {
                const isActive = activeBeatId === beat.id;
                return (
                  <div
                    key={beat.id}
                    className="flex items-center gap-3 transition-all duration-300"
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-7 bg-coral shadow-[0_0_8px_rgba(230,110,80,0.8)]"
                          : "w-2 bg-white/20"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-sans tracking-wider uppercase transition-colors duration-300 ${
                        isActive
                          ? "text-porcelain font-semibold opacity-100"
                          : "text-porcelain/30 opacity-0"
                      }`}
                    >
                      {beat.shortTitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* 8 BEAT STORYTELLING UI OVERLAYS                          */}
            {/* ======================================================== */}

            {/* BEAT 1: PRESENTACIÓN (0.00 - 0.08 hold) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 max-w-7xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: reducedMotion ? 1 : opacities[0] }}
            >
              <div className="pt-16 sm:pt-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-porcelain/90 font-sans font-medium">
                    Invisalign® Diamond Apex Provider
                  </span>
                </div>
              </div>

              <div className="max-w-2xl my-auto">
                <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal text-porcelain leading-[1.05] tracking-tight text-balance">
                  Tu sonrisa, a&nbsp;otro&nbsp;nivel.
                </h1>
                <p className="mt-5 text-sm sm:text-base text-porcelain/75 font-sans max-w-lg leading-relaxed text-pretty">
                  Ortodoncia invisible y arquitectura dental biomimética.
                  Diagnóstico 3D y alineación personalizada en el Barrio de Salamanca, Madrid.
                </p>
              </div>

              <div className="pb-4">
                <div className="flex items-center gap-3 text-porcelain/60 text-xs font-sans uppercase tracking-[0.2em]">
                  <div className="w-4 h-7 rounded-full border border-porcelain/30 flex items-start justify-center p-1">
                    <div className="w-1 h-1.5 rounded-full bg-coral animate-bounce" />
                  </div>
                  <span>Haz scroll para explorar la secuencia 3D</span>
                </div>
              </div>
            </div>

            {/* BEAT 2: ROTACIÓN LENTA / ANATOMÍA DUAL (0.14 - 0.22 hold) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center p-8 sm:p-12 md:p-16 max-w-7xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: opacities[1] }}
            >
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/30 bg-coral/10 text-coral text-[10px] font-sans uppercase tracking-[0.2em]">
                  02 / Escaneo Digital 5D
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Anatomía y Oclusión Dual
                </h2>
                <p className="text-sm sm:text-base text-porcelain/75 font-sans leading-relaxed">
                  Ambas arcadas funcionan como un engranaje biomecánico continuo. Capturamos 6.000 imágenes por segundo con nuestro escáner intraoral iTero Element 5D para analizar la relación interoclusal sin pastas molestas.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-sans text-porcelain/80">
                    6.000 fotos / seg
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-sans text-porcelain/80">
                    Precisión &lt; 20 µm
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-sans text-porcelain/80">
                    Cero moldes de silicona
                  </span>
                </div>
              </div>
            </div>

            {/* BEAT 3: APERTURA DE LA MORDIDA (0.30 - 0.40 hold) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-end p-8 sm:p-12 md:p-16 max-w-7xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: opacities[2] }}
            >
              <div className="max-w-xl space-y-4 text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-[10px] font-sans uppercase tracking-[0.2em]">
                  03 / Dinámica Mandibular
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Apertura y Desoclusión Guiada
                </h2>
                <p className="text-sm sm:text-base text-porcelain/75 font-sans leading-relaxed">
                  Desacople vertical milimétrico. Cada movimiento respeta la articulación temporomandibular (ATM) y la guía canina, corrigiendo sobremordida, mordida cruzada o apiñamiento severo con vectores axiales fisiológicos.
                </p>
                <div className="p-4 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md inline-block text-left max-w-md">
                  <div className="text-xs uppercase tracking-wider text-coral font-medium mb-1">
                    ATM Free-Stress Protocol
                  </div>
                  <div className="text-xs text-porcelain/70">
                    Planificación digital de la dimensión vertical para relajar la musculatura maseterina y prevenir el bruxismo.
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 4: ZOOM AL MATERIAL SMARTTRACK (0.45 - 0.58 hold - Momento de Detalle) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center p-8 sm:p-12 md:p-16 max-w-7xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: opacities[3] }}
            >
              <div className="max-w-xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-[10px] font-sans uppercase tracking-[0.2em]">
                  04 / Nanomaterial SmartTrack®
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-porcelain leading-tight">
                  0.75 mm de Polímero Elastomérico
                </h2>
                <p className="text-sm sm:text-base text-porcelain/75 font-sans leading-relaxed">
                  Desarrollado tras 8 años de bioingeniería de polímeros. Ejerce una fuerza biológica constante y suave sin deformación plástica. Su transparencia óptica se mimetiza con la luz natural de tu esmalte dental.
                </p>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
                    <div className="font-editorial text-2xl text-coral">0.75 mm</div>
                    <div className="text-[10px] uppercase tracking-wider text-porcelain/60 mt-1">Espesor fino</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
                    <div className="font-editorial text-2xl text-porcelain">1.52 IOR</div>
                    <div className="text-[10px] uppercase tracking-wider text-porcelain/60 mt-1">Refracción óptica</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
                    <div className="font-editorial text-2xl text-porcelain">&gt;90%</div>
                    <div className="text-[10px] uppercase tracking-wider text-porcelain/60 mt-1">Transmisión luz</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
                    <div className="font-editorial text-2xl text-emerald-300">0% BPA</div>
                    <div className="text-[10px] uppercase tracking-wider text-porcelain/60 mt-1">Biomédico inerte</div>
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 5: PROGRESIÓN DEL TRATAMIENTO CON CONTADOR DINÁMICO (0.62 - 0.75 hold) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-end p-8 sm:p-12 md:p-16 max-w-7xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: opacities[4] }}
            >
              <div className="max-w-xl space-y-5 text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 text-[10px] font-sans uppercase tracking-[0.2em]">
                  05 / Simulación ClinCheck® Pro
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Progresión del Tratamiento
                </h2>
                <p className="text-sm sm:text-base text-porcelain/75 font-sans leading-relaxed">
                  Cada férula desplaza tus dientes entre 0.20 y 0.25 mm con rotaciones axiales controladas por inteligencia algorítmica. Conoces el resultado final antes de colocar el primer alineador.
                </p>

                {/* Animated Interactive Aligner Counter & Progress Bar */}
                <div className="p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-lg text-left shadow-2xl space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-porcelain/60 font-sans">
                      Alineador Activo
                    </span>
                    <span className="font-editorial text-3xl sm:text-4xl text-coral font-medium tracking-tight">
                      Alineador {currentAligner} <span className="text-sm font-sans text-porcelain/50">de 22</span>
                    </span>
                  </div>

                  {/* Progress Bar with 22 ticks */}
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-coral via-amber-400 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(230,110,80,0.6)]"
                      style={{ width: `${(currentAligner / 22) * 100}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-porcelain/50">Semana</div>
                      <div className="text-xs font-semibold text-porcelain mt-0.5">
                        {Math.ceil(currentAligner * 1.45)} de 32
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-porcelain/50">Movimiento</div>
                      <div className="text-xs font-semibold text-coral mt-0.5">
                        +{(currentAligner * 0.22).toFixed(1)} mm
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-porcelain/50">Previsibilidad</div>
                      <div className="text-xs font-semibold text-emerald-300 mt-0.5">
                        99.4%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 6: COMPARATIVA BRACKETS VS INVISALIGN (0.78 - 0.87 hold) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-6 sm:p-12 max-w-5xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: opacities[5] }}
            >
              <div className="w-full space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300 text-[10px] font-sans uppercase tracking-[0.2em]">
                    06 / Análisis Comparativo
                  </div>
                  <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-porcelain">
                    SmartTrack® vs. Brackets Tradicionales
                  </h2>
                </div>

                {/* Two Column Comparative Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Invisalign AURA */}
                  <div className="p-6 rounded-xl bg-black/60 border border-coral/40 backdrop-blur-md shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-coral text-white text-[9px] uppercase font-bold tracking-widest rounded-bl-lg">
                      Recomendado
                    </div>
                    <div className="font-editorial text-xl text-porcelain mb-4">
                      AURA Invisible
                    </div>
                    <ul className="space-y-2.5 text-xs text-porcelain/90 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>Fuerza biológica constante sin picos de dolor agudo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>100% Removible: come y cepíllate con total libertad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>Cero llagas o heridas por arcos ni ligaduras metálicas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>Citas breves de revisión cada 8 semanas (o remoto con Virtual Care)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Brackets Tradicionales */}
                  <div className="p-6 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md opacity-80">
                    <div className="font-editorial text-xl text-porcelain/60 mb-4">
                      Brackets Metálicos
                    </div>
                    <ul className="space-y-2.5 text-xs text-porcelain/60 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Fricción brusca y tensión dolorosa tras cada ajuste</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Dificultad extrema para usar hilo dental y acúmulo de sarro</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Urgencias frecuentes por brackets despegados o alambres punzantes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Alimentos restringidos (frutos secos, pan duro, manzanas a mordiscos)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 7: USO DIARIO Y LIBERTAD — MODELO COMPLETAMENTE QUIETO (0.89 - 0.95 hold) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-8 sm:p-12 max-w-5xl mx-auto w-full transition-opacity duration-200"
              style={{ opacity: opacities[6] }}
            >
              <div className="text-center space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/30 bg-coral/10 text-coral text-[10px] font-sans uppercase tracking-[0.2em]">
                  07 / Vida Cotidiana Sin Restricciones
                </div>
                <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal text-porcelain leading-[1.1] tracking-tight">
                  Cómetelo. Cepíllate.<br />
                  <span className="text-coral italic font-normal">Quítatelo cuando quieras.</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-porcelain/80 font-sans leading-relaxed max-w-2xl mx-auto">
                  La ortodoncia invisible de alta gama que respeta tu ritmo de vida y tus compromisos profesionales. Disfruta de un espresso, vino o una cena formal sin limitaciones: retiras tus alineadores en un segundo y sonríes sin complejos.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-porcelain/90">
                    ☕ Sin manchas ni tinciones
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-porcelain/90">
                    ✨ Higiene oral sin obstáculos
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-porcelain/90">
                    📸 100% imperceptible en cámara
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 8: ENTRADA FINAL & CROSS-FADE (0.95 - 1.00) */}
            <div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-8 text-center transition-opacity duration-150"
              style={{ opacity: opacities[7] }}
            >
              <div className="space-y-4 max-w-lg">
                <div className="text-[10px] uppercase tracking-[0.3em] font-sans text-coral font-medium">
                  AURA Dental Architecture
                </div>
                <h2 className="font-editorial text-4xl sm:text-6xl text-porcelain font-normal">
                  Bienvenido a AURA
                </h2>
                <p className="text-sm text-porcelain/80 font-sans">
                  Descubre la excelencia en estética dental y salud bucodental de vanguardia en Madrid.
                </p>
              </div>
            </div>

            {/* Seamless Porcelain Cross-Fade (Cross-fade into white home content) */}
            <div
              className="absolute inset-0 z-40 bg-porcelain pointer-events-none transition-opacity duration-100"
              style={{
                opacity: crossFadeOpacity,
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
