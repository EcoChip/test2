"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DentalArchModel } from "./DentalArchModel";
import { introScroll } from "@/lib/scrollStore";

interface DentalCanvasProps {
  reducedMotion?: boolean;
  onCanvasReady?: () => void;
  isPastIntro?: boolean;
}

// Precompilation helper that warms up shaders using compileAsync
function ShaderWarmup({ onReady }: { onReady?: () => void }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    let active = true;

    // Use Three.js compileAsync to compile shaders off the main render hitch
    if (gl && (gl as any).compileAsync) {
      (gl as any).compileAsync(scene, camera).then(() => {
        if (!active) return;
        // Warm up pipeline with one hidden render frame
        gl.render(scene, camera);
        if (onReady) onReady();
      }).catch(() => {
        if (onReady) onReady();
      });
    } else {
      gl.render(scene, camera);
      if (onReady) onReady();
    }

    return () => {
      active = false;
    };
  }, [gl, scene, camera, onReady]);

  return null;
}

export function DentalCanvas({
  reducedMotion = false,
  onCanvasReady,
  isPastIntro = false,
}: DentalCanvasProps) {
  const [qualityTier, setQualityTier] = useState<"high" | "medium" | "low">("high");

  // Determine initial quality tier from hardware heuristics
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.innerWidth < 768;

    let tier: "high" | "medium" | "low" = "high";
    if (cores <= 2 || memory < 3) {
      tier = "low";
    } else if (isTouch || isNarrow || cores < 6 || memory < 6) {
      tier = "medium";
    }

    setQualityTier(tier);
    introScroll.qualityTier = tier;
  }, []);

  // Strict GPU budget: DPR max 1.5, 1.25 on medium, 1.0 on low
  const dpr: [number, number] | number =
    qualityTier === "low" ? 1.0 : qualityTier === "medium" ? 1.25 : [1, 1.5];
  const useAntialias = qualityTier === "high";

  // If scrolled completely past the intro, freeze canvas to free GPU resources
  if (isPastIntro) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      frameloop="demand"
      gl={{
        antialias: useAntialias,
        alpha: true,
        stencil: false,
        depth: true,
        powerPreference: "high-performance",
      }}
      dpr={dpr}
      onCreated={() => {
        if (onCanvasReady) {
          onCanvasReady();
        }
      }}
      className="w-full h-full"
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        {/* Key Lighting setup designed for Fresnel aligner refraction */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 5]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-3, 3, -4]} intensity={2.4} color="#E8F8FA" />

        <ShaderWarmup onReady={onCanvasReady} />

        <DentalArchModel
          reducedMotion={reducedMotion}
          qualityTier={qualityTier}
          onModelReady={onCanvasReady}
        />
      </Suspense>
    </Canvas>
  );
}
