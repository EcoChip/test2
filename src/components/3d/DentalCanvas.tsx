"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { DentalArchModel } from "./DentalArchModel";

interface DentalCanvasProps {
  progress: number;
  reducedMotion?: boolean;
  onCanvasReady?: () => void;
}

/**
 * Procedural Studio Environment Map using Three.js built-in RoomEnvironment.
 * Requires ZERO external network downloads (eliminates CDN 403 Forbidden / offline bugs on mobile).
 */
function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    try {
      const pmremGenerator = new PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      const room = new RoomEnvironment();
      const envMap = pmremGenerator.fromScene(room, 0.04).texture;
      scene.environment = envMap;

      return () => {
        scene.environment = null;
        envMap.dispose();
        pmremGenerator.dispose();
        room.dispose();
      };
    } catch {
      // Fallback gracefully to direct studio lights on restricted mobile WebGL contexts
    }
  }, [gl, scene]);

  return null;
}

export function DentalCanvas({
  progress,
  reducedMotion = false,
  onCanvasReady,
}: DentalCanvasProps) {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const updateProfile = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isNarrow = window.innerWidth < 768;
      setIsMobilePortrait(isNarrow && isPortrait);
    };
    updateProfile();
    window.addEventListener("resize", updateProfile);
    window.addEventListener("orientationchange", updateProfile);
    return () => {
      window.removeEventListener("resize", updateProfile);
      window.removeEventListener("orientationchange", updateProfile);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        stencil: false,
        depth: true,
        powerPreference: "high-performance",
      }}
      // Strict GPU budget: cap to [1, 1.5] on mobile portrait to avoid fillrate bottlenecks on high-density displays
      dpr={isMobilePortrait ? [1, 1.5] : [1, 2]}
      onCreated={() => {
        if (onCanvasReady) {
          onCanvasReady();
        }
      }}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        {/* Built-in procedural HDRI environment for specular reflections */}
        <StudioEnvironment />

        {/* Ambient Fill Light */}
        <ambientLight intensity={isMobilePortrait ? 1.1 : 0.9} />

        {/* Front Key Light */}
        <directionalLight position={[4, 5, 5]} intensity={2.2} color="#FFFFFF" />

        {/* Powerful Backlight passing THROUGH transparent aligner for glowing edges */}
        <directionalLight position={[0, 0, -4]} intensity={2.8} color="#FFFFFF" />

        {/* Additional specular rim and fill lights for desktop/landscape studio depth */}
        {!isMobilePortrait && (
          <>
            <pointLight position={[0, 0.2, -2.5]} intensity={3.5} distance={9} color="#E8F4F0" />
            <directionalLight position={[-5, 3, 2]} intensity={2.0} color="#FAF7F2" />
            <directionalLight position={[0, 6, 2]} intensity={1.8} color="#FFFFFF" />
            <directionalLight position={[0, -4, 3]} intensity={0.8} color="#B8D0C5" />
          </>
        )}

        <DentalArchModel
          progress={progress}
          reducedMotion={reducedMotion}
          onModelReady={onCanvasReady}
        />
      </Suspense>
    </Canvas>
  );
}
