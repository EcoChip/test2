"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowRightIcon } from "../ui/Icons";
import { notifyIntroScroll } from "@/lib/scrollStore";

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
  { id: 4, label: "04 / MATERIAL", shortTitle: "SmartTrack®", start: 0.42, peakStart: 0.45, peakEnd: 0.58, end: 0.60 },
  { id: 5, label: "05 / PROGRESIÓN", shortTitle: "ClinCheck® 3D", start: 0.60, peakStart: 0.62, peakEnd: 0.75, end: 0.77 },
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
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const crossFadeRef = useRef<HTMLDivElement>(null);

  // Direct DOM references for 8 beat cards (Zero React setState during scroll)
  const beatCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotIndicatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Direct DOM references for Beat 5 dynamic aligner counter
  const alignerNumRef = useRef<HTMLSpanElement>(null);
  const alignerBarRef = useRef<HTMLDivElement>(null);
  const alignerPhaseRef = useRef<HTMLDivElement>(null);

  const [canvasReady, setCanvasReady] = useState(false);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isLowEnd, setIsLowEnd] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check WebGL and hardware capability
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(!!gl);

      if (gl) {
        const cores = navigator.hardwareConcurrency || 4;
        const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
        if (cores < 2 || (memory && memory < 2)) {
          setIsLowEnd(true);
        }
      }
    } catch {
      setHasWebGL(false);
    }

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
    };
  }, []);

  // Safety fallback for poster fade out
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanvasReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const lastOpacitiesRef = useRef<number[]>([1, 0, 0, 0, 0, 0, 0, 0]);
  const lastAlignerRef = useRef<number>(-1);
  const lastCrossFadeRef = useRef<number>(-1);
  const lastCanvasDisplayRef = useRef<string>("block");

  // Direct DOM Mutation Function (Zero React reconciliation / zero setState during scroll)
  const updateDomStorytelling = useCallback((p: number) => {
    // 1. Notify 3D engine directly via mutable store
    notifyIntroScroll(p);

    // 2. Update 8 Beat Cards with dirty-checking
    for (let i = 0; i < BEATS.length; i++) {
      const beat = BEATS[i];
      const opacity = getBeatOpacity(p, beat);
      const prevOpacity = lastOpacitiesRef.current[i];

      if (Math.abs(opacity - prevOpacity) > 0.005) {
        lastOpacitiesRef.current[i] = opacity;
        const cardEl = beatCardRefs.current[i];
        if (cardEl) {
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
          cardEl.style.visibility = opacity > 0.001 ? "visible" : "hidden";
        }

        // 3. Update Storyline Dots
        const isActive = p >= beat.start && p <= beat.end;
        const dotEl = dotIndicatorRefs.current[i];
        const labelEl = dotLabelRefs.current[i];
        if (dotEl) {
          dotEl.style.width = isActive ? "1.75rem" : "0.5rem";
          dotEl.style.backgroundColor = isActive ? "#E1785A" : "rgba(255, 255, 255, 0.2)";
          dotEl.style.boxShadow = isActive ? "0 0 8px rgba(230, 110, 80, 0.8)" : "none";
        }
        if (labelEl) {
          labelEl.style.opacity = isActive ? "1" : "0";
          labelEl.style.color = isActive ? "#FAF7F2" : "rgba(250, 247, 242, 0.3)";
        }
      }
    }

    // 4. Update Beat 5 Dynamic Aligner Counter
    const p5 = Math.min(1, Math.max(0, (p - 0.62) / (0.75 - 0.62)));
    const currentAligner = Math.min(22, Math.max(1, Math.round(1 + p5 * 21)));
    if (currentAligner !== lastAlignerRef.current) {
      lastAlignerRef.current = currentAligner;
      if (alignerNumRef.current) {
        alignerNumRef.current.textContent = `Alineador ${currentAligner} `;
      }
      if (alignerBarRef.current) {
        alignerBarRef.current.style.width = `${((currentAligner / 22) * 100).toFixed(1)}%`;
      }
      if (alignerPhaseRef.current) {
        alignerPhaseRef.current.textContent = `Fase ${currentAligner} de 22`;
      }
    }

    // 5. Update Seamless Porcelain Cross-Fade
    let crossFadeOpacity = 0;
    if (p >= 0.94) {
      crossFadeOpacity = Math.min(1, (p - 0.94) / 0.05);
    }
    if (Math.abs(crossFadeOpacity - lastCrossFadeRef.current) > 0.005) {
      lastCrossFadeRef.current = crossFadeOpacity;
      if (crossFadeRef.current) {
        crossFadeRef.current.style.opacity = crossFadeOpacity.toFixed(3);
        crossFadeRef.current.style.visibility = crossFadeOpacity > 0.001 ? "visible" : "hidden";
      }
    }

    // 6. Freeze/Hide Canvas when completely past intro to free GPU
    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.display = p >= 0.999 ? "none" : "block";
    }
  }, []);

  // Setup Lenis + GSAP Ticker + ScrollTrigger (Single Unified Render Loop)
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    // Single unified scroll driver: Lenis synchronized with GSAP ticker
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
        onUpdate: (self) => {
          updateDomStorytelling(self.progress);
        },
      });
    }, containerRef);

    // Initial DOM update for Beat 1
    updateDomStorytelling(0);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [reducedMotion, updateDomStorytelling]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        reducedMotion ? "h-[100svh]" : "h-[550svh] md:h-[1000svh]"
      } bg-[#0B0F0D] overscroll-none`}
      style={{ overscrollBehavior: "none", overscrollBehaviorY: "none" }}
      aria-label="Introducción cinematográfica AURA 3D"
    >
      {/* Sticky Fullscreen Stage (Using svh for Safari iOS browser bar immunity) */}
      <div 
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center overscroll-none bg-[#0B0F0D]"
        style={{ overscrollBehavior: "none", overscrollBehaviorY: "none" }}
      >
        {/* Fallback for devices without WebGL */}
        {hasWebGL === false || isLowEnd ? (
          <div className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-[#0B0F0D] text-porcelain p-6">
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
                Planificación Digital ClinCheck®
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl font-normal leading-tight">
                Tu sonrisa, a otro nivel.
              </h1>
              <p className="text-sm text-porcelain/70 font-sans">
                Alineación dental invisible y arquitectura de la sonrisa con escáner digital 3D.
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
            {/* High Priority Static Poster for Instant LCP (< 1.8s) & Zero White Flashes */}
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

            {/* 3D Canvas Stage (Single unified canvas, paused when past intro) */}
            <div
              ref={canvasContainerRef}
              className="absolute inset-0 z-10 w-full h-full"
            >
              <DentalCanvas
                reducedMotion={reducedMotion}
                onCanvasReady={() => setCanvasReady(true)}
              />
            </div>

            {/* Top Right Quick Skip Button */}
            <div className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] sm:top-6 sm:right-6 z-40">
              <a
                href="#contenido-home"
                className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 min-h-[44px] rounded-full border border-white/15 bg-[#0B0F0D]/80 hover:bg-[#0B0F0D] text-xs font-sans tracking-wider text-porcelain/80 hover:text-white transition-all shadow-subtle pointer-events-auto"
                aria-label="Saltar secuencia 3D e ir directo al contenido de la clínica"
              >
                <span>Saltar intro</span>
                <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Right Side Storyline Navigation (Updated directly via DOM) */}
            <div className="hidden lg:flex flex-col gap-2.5 absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-porcelain/40 mb-1">
                Storyline
              </div>
              {BEATS.map((beat, idx) => (
                <div key={beat.id} className="flex items-center gap-3">
                  <div
                    ref={(el) => { dotIndicatorRefs.current[idx] = el; }}
                    className="h-1.5 w-2 rounded-full bg-white/20 transition-all duration-300"
                  />
                  <span
                    ref={(el) => { dotLabelRefs.current[idx] = el; }}
                    className="text-[11px] font-sans tracking-wider uppercase opacity-0 text-porcelain/30 transition-all duration-300 font-semibold"
                  >
                    {beat.shortTitle}
                  </span>
                </div>
              ))}
            </div>

            {/* ======================================================== */}
            {/* 8 BEAT STORYTELLING OVERLAYS (NO BACKDROP BLUR OVER CANVAS) */}
            {/* ======================================================== */}

            {/* BEAT 1: PRESENTACIÓN */}
            <div
              ref={(el) => { beatCardRefs.current[0] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-5 sm:p-12 md:p-16 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-7xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 1 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0B0F0D]/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-porcelain/90 font-sans font-medium">
                    Invisalign® Diamond Apex Provider
                  </span>
                </div>
              </div>

              <div className="max-w-2xl my-auto sm:my-auto">
                <h1 className="font-editorial text-3xl sm:text-6xl md:text-7xl font-normal text-porcelain leading-[1.1] tracking-tight text-balance">
                  Tu sonrisa, a&nbsp;otro&nbsp;nivel.
                </h1>
                <p className="mt-3 sm:mt-5 text-sm sm:text-base text-porcelain/80 font-sans max-w-sm sm:max-w-lg leading-relaxed text-pretty">
                  Ortodoncia invisible y arquitectura dental biomimética.
                  Diagnóstico 3D y alineación personalizada en el Barrio de Salamanca, Madrid.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 text-porcelain/70 text-xs sm:text-sm font-sans uppercase tracking-[0.2em]">
                  <div className="w-4 h-7 rounded-full border border-porcelain/30 flex items-start justify-center p-1">
                    <div className="w-1 h-1.5 rounded-full bg-coral animate-bounce" />
                  </div>
                  <span>Haz scroll para explorar la secuencia 3D</span>
                </div>
              </div>
            </div>

            {/* BEAT 2: ANATOMÍA DUAL */}
            <div
              ref={(el) => { beatCardRefs.current[1] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex items-start sm:items-center p-4 sm:p-12 md:p-16 pt-[max(4.75rem,env(safe-area-inset-top))] sm:pt-12 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-7xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="max-w-xl space-y-3 sm:space-y-4 p-5 sm:p-0 rounded-2xl bg-[#0B0F0D]/90 sm:bg-transparent border border-white/10 sm:border-transparent shadow-2xl sm:shadow-none w-full sm:w-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/30 bg-coral/10 text-coral text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em]">
                  02 / Escaneo Digital 3D
                </div>
                <h2 className="font-editorial text-2xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Anatomía y Oclusión Dual
                </h2>
                <p className="text-sm sm:text-base text-porcelain/85 font-sans leading-relaxed">
                  Ambas arcadas funcionan como un engranaje biomecánico continuo. Mediante escaneo intraoral digital analizamos la relación interoclusal y la alineación dental en tiempo real, sin recurrir a pastas molestas.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-sans text-porcelain">
                    Escáner intraoral 3D
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-sans text-porcelain">
                    Alta definición digital
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-sans text-porcelain">
                    Sin pastas molestas
                  </span>
                </div>
              </div>
            </div>

            {/* BEAT 3: APERTURA Y DESOCLUSIÓN */}
            <div
              ref={(el) => { beatCardRefs.current[2] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex items-start sm:items-center justify-start sm:justify-end p-4 sm:p-12 md:p-16 pt-[max(4.75rem,env(safe-area-inset-top))] sm:pt-12 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-7xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="max-w-xl space-y-3 sm:space-y-4 text-left sm:text-right p-5 sm:p-0 rounded-2xl bg-[#0B0F0D]/90 sm:bg-transparent border border-white/10 sm:border-transparent shadow-2xl sm:shadow-none w-full sm:w-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em]">
                  03 / Dinámica Mandibular
                </div>
                <h2 className="font-editorial text-2xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Apertura y Desoclusión Guiada
                </h2>
                <p className="text-sm sm:text-base text-porcelain/85 font-sans leading-relaxed">
                  Desacople vertical milimétrico. Cada movimiento respeta la articulación temporomandibular (ATM) y la guía canina, corrigiendo sobremordida o apiñamiento severo con vectores axiales.
                </p>
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#0B0F0D]/85 border border-white/15 inline-block text-left max-w-md shadow-xl">
                  <div className="text-xs uppercase tracking-wider text-coral font-medium mb-1">
                    ATM Free-Stress Protocol
                  </div>
                  <div className="text-xs sm:text-sm text-porcelain/75 leading-relaxed">
                    Planificación digital de la dimensión vertical para relajar la musculatura maseterina y prevenir el bruxismo.
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 4: ZOOM SMARTTRACK */}
            <div
              ref={(el) => { beatCardRefs.current[3] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end sm:justify-center items-center sm:items-start p-4 sm:p-12 md:p-16 pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:pb-12 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-7xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="max-w-xl space-y-3 sm:space-y-4 p-5 sm:p-0 rounded-2xl bg-[#0B0F0D]/90 sm:bg-transparent border border-white/10 sm:border-transparent shadow-2xl sm:shadow-none w-full sm:w-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em]">
                  04 / Material Patentado SmartTrack®
                </div>
                <h2 className="font-editorial text-2xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Polímero Elastomérico Multicapa
                </h2>
                <p className="text-sm sm:text-base text-porcelain/85 font-sans leading-relaxed">
                  Desarrollado exclusivamente para ortodoncia transparente. Ejerce una fuerza constante y suave sobre el diente para un movimiento más predecible. Su transparencia óptica se adapta a la luz natural del esmalte.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#0B0F0D]/80 border border-white/10">
                    <div className="font-editorial text-xl sm:text-2xl text-coral">Constante</div>
                    <div className="text-xs uppercase tracking-wider text-porcelain/70 mt-0.5">Fuerza suave</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B0F0D]/80 border border-white/10">
                    <div className="font-editorial text-xl sm:text-2xl text-porcelain">Translúcido</div>
                    <div className="text-xs uppercase tracking-wider text-porcelain/70 mt-0.5">Estética discreta</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B0F0D]/80 border border-white/10">
                    <div className="font-editorial text-xl sm:text-2xl text-porcelain">Adaptable</div>
                    <div className="text-xs uppercase tracking-wider text-porcelain/70 mt-0.5">Ajuste anatómico</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B0F0D]/80 border border-white/10">
                    <div className="font-editorial text-xl sm:text-2xl text-emerald-300">Biomédico</div>
                    <div className="text-xs uppercase tracking-wider text-porcelain/70 mt-0.5">Confort y seguridad</div>
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 5: PROGRESIÓN CLINCHECK CON CONTADOR DINÁMICO */}
            <div
              ref={(el) => { beatCardRefs.current[4] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end sm:justify-center items-center sm:items-end p-4 sm:p-12 md:p-16 pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:pb-12 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-7xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="max-w-xl space-y-3 sm:space-y-4 text-left sm:text-right p-5 sm:p-0 rounded-2xl bg-[#0B0F0D]/90 sm:bg-transparent border border-white/10 sm:border-transparent shadow-2xl sm:shadow-none w-full sm:w-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em]">
                  05 / Simulación ClinCheck® Pro
                </div>
                <h2 className="font-editorial text-2xl sm:text-5xl font-normal text-porcelain leading-tight">
                  Progresión del Tratamiento
                </h2>
                <p className="text-sm sm:text-base text-porcelain/85 font-sans leading-relaxed">
                  Cada alineador guía el micromovimiento gradual de tus piezas dentales según la planificación previa realizada por el especialista.
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F0D]/90 border border-white/15 text-left shadow-2xl space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-porcelain/70 font-sans">
                      Alineador Activo
                    </span>
                    <span className="font-editorial text-2xl sm:text-4xl text-coral font-medium tracking-tight">
                      <span ref={alignerNumRef}>Alineador 1 </span>
                      <span className="text-xs sm:text-sm font-sans text-porcelain/60">de 22</span>
                    </span>
                  </div>

                  <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden p-0.5 relative">
                    <div
                      ref={alignerBarRef}
                      className="h-full bg-gradient-to-r from-coral via-amber-400 to-emerald-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(230,110,80,0.6)]"
                      style={{ width: "4.5%" }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-porcelain/60">Etapa</div>
                      <div ref={alignerPhaseRef} className="text-xs sm:text-sm font-semibold text-porcelain mt-0.5">
                        Fase 1 de 22
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-porcelain/60">Fuerza</div>
                      <div className="text-xs sm:text-sm font-semibold text-coral mt-0.5">
                        Constante y suave
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-porcelain/60">Planificación</div>
                      <div className="text-xs sm:text-sm font-semibold text-emerald-300 mt-0.5">
                        ClinCheck® 3D
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 6: COMPARATIVA */}
            <div
              ref={(el) => { beatCardRefs.current[5] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center items-center p-4 sm:p-12 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(5rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-5xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="w-full space-y-3 sm:space-y-6 max-h-[75svh] overflow-y-auto sm:overflow-visible pr-1 sm:pr-0">
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300 text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em]">
                    06 / Análisis Comparativo
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-5xl font-normal text-porcelain">
                    SmartTrack® vs. Brackets
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#0B0F0D]/90 border border-coral/40 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-coral text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-widest rounded-bl-lg">
                      Recomendado
                    </div>
                    <div className="font-editorial text-lg sm:text-xl text-porcelain mb-2 sm:mb-4">
                      AURA Invisible
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-porcelain/90 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>Fuerza biológica constante sin dolor agudo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>100% Removible: come y cepíllate con total libertad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>Cero llagas ni heridas por arcos o metales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-coral font-bold">✓</span>
                        <span>Citas breves cada 8 semanas (o remoto con Virtual Care)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl bg-[#0B0F0D]/75 border border-white/10 opacity-80 shadow-xl">
                    <div className="font-editorial text-lg sm:text-xl text-porcelain/60 mb-2 sm:mb-4">
                      Brackets Metálicos
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-porcelain/60 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Fricción brusca y dolor tras cada ajuste</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Dificultad extrema para usar hilo dental</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Urgencias por brackets o alambres despegados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-porcelain/40 font-bold">✗</span>
                        <span>Alimentos restringidos y mordiscos con precaución</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 7: LIBERTAD */}
            <div
              ref={(el) => { beatCardRefs.current[6] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-4 sm:p-12 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] max-w-5xl mx-auto w-full transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="text-center space-y-4 sm:space-y-6 max-w-3xl p-5 sm:p-0 rounded-2xl bg-[#0B0F0D]/90 sm:bg-transparent border border-white/10 sm:border-transparent shadow-2xl sm:shadow-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/30 bg-coral/10 text-coral text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em]">
                  07 / Vida Cotidiana Sin Restricciones
                </div>
                <h2 className="font-editorial text-3xl sm:text-6xl md:text-7xl font-normal text-porcelain leading-[1.1] tracking-tight">
                  Cómetelo. Cepíllate.<br />
                  <span className="text-coral italic font-normal">Quítatelo cuando quieras.</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-porcelain/85 font-sans leading-relaxed max-w-2xl mx-auto">
                  La ortodoncia invisible de alta gama que respeta tu ritmo de vida y tus compromisos profesionales. Disfruta de un café, vino o una cena formal sin limitaciones: retiras tus alineadores en un segundo y sonríes sin complejos.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                  <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-sans text-porcelain">
                    ☕ Sin manchas ni tinciones
                  </div>
                  <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-sans text-porcelain">
                    ✨ Higiene oral sin obstáculos
                  </div>
                  <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-sans text-porcelain">
                    📸 Prácticamente imperceptible
                  </div>
                </div>
              </div>
            </div>

            {/* BEAT 8: ENTRADA FINAL */}
            <div
              ref={(el) => { beatCardRefs.current[7] = el; }}
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-6 sm:p-8 text-center transition-opacity duration-75 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(4.5rem,env(safe-area-inset-bottom))]"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="space-y-3 sm:space-y-4 max-w-lg">
                <div className="text-xs uppercase tracking-[0.3em] font-sans text-coral font-medium">
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

            {/* Seamless Porcelain Cross-Fade */}
            <div
              ref={crossFadeRef}
              className="absolute inset-0 z-40 bg-porcelain pointer-events-none transition-opacity duration-75"
              style={{ opacity: 0, visibility: "hidden" }}
            />
          </>
        )}
      </div>
    </section>
  );
}
