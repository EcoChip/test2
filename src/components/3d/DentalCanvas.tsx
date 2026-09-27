"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { DentalArchModel } from "./DentalArchModel";

interface DentalCanvasProps {
  progress: number;
  reducedMotion?: boolean;
  onCanvasReady?: () => void;
}

export function DentalCanvas({
  progress,
  reducedMotion = false,
  onCanvasReady,
}: DentalCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,
        depth: true,
      }}
      dpr={[1, 2]} // Crisp rendering on high-DPI retina displays
      onCreated={() => {
        if (onCanvasReady) {
          onCanvasReady();
        }
      }}
      className="w-full h-full"
    >
      {/* Studio HDRI Environment for crystalline reflections across facets */}
      <Environment preset="studio" environmentIntensity={1.0} />

      {/* Ambient Fill Light */}
      <ambientLight intensity={0.9} />

      {/* Front Key Light for crisp clinical definition */}
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#FFFFFF" />

      {/* Powerful Backlight passing THROUGH transparent aligner for glowing edges */}
      <directionalLight position={[0, 0, -4]} intensity={3.2} color="#FFFFFF" />
      <pointLight position={[0, 0.2, -2.5]} intensity={3.5} distance={9} color="#E8F4F0" />

      {/* Left Specular Rim Light */}
      <directionalLight position={[-5, 3, 2]} intensity={2.0} color="#FAF7F2" />

      {/* Top Incisal Edge Specular Light */}
      <directionalLight position={[0, 6, 2]} intensity={1.8} color="#FFFFFF" />

      {/* Lower Mandibular Soft Fill */}
      <directionalLight position={[0, -4, 3]} intensity={0.8} color="#B8D0C5" />

      <Suspense fallback={null}>
        <DentalArchModel
          progress={progress}
          reducedMotion={reducedMotion}
          onModelReady={onCanvasReady}
        />
      </Suspense>
    </Canvas>
  );
}
