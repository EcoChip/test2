"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { introScroll, subscribeIntroScroll } from "@/lib/scrollStore";
import { createFresnelAlignerMaterial } from "./FresnelAlignerMaterial";

// Configure local Draco decoder workers
useGLTF.setDecoderPath("/draco/");

interface DentalArchModelProps {
  reducedMotion?: boolean;
  qualityTier?: "high" | "medium" | "low";
  onModelReady?: () => void;
}

interface TransformKeyframe {
  rotX: number;
  rotY: number;
  rotZ: number;
  separation: number;
  lowerRotX: number;
  camZ: number;
  camY: number;
  scale: number;
}

// 8 Discrete Beat States (Preserved 100% identical)
export const STATES_LANDSCAPE: Record<string, TransformKeyframe> = {
  beat1: { rotX: 0.03, rotY: 0.00, rotZ: 0.00, separation: 0.00, lowerRotX: 0.00, camZ: 4.20, camY: 0.00, scale: 1.00 },
  beat2: { rotX: 0.06, rotY: -0.32, rotZ: -0.01, separation: 0.00, lowerRotX: 0.00, camZ: 3.95, camY: 0.00, scale: 1.00 },
  beat3: { rotX: 0.04, rotY: -0.05, rotZ: 0.00, separation: 1.00, lowerRotX: -0.15, camZ: 3.70, camY: 0.00, scale: 1.00 },
  beat4: { rotX: 0.09, rotY: 0.22, rotZ: 0.01, separation: 0.70, lowerRotX: -0.11, camZ: 2.10, camY: 0.14, scale: 1.35 },
  beat5: { rotX: 0.04, rotY: 0.00, rotZ: 0.00, separation: 0.55, lowerRotX: -0.09, camZ: 2.70, camY: 0.03, scale: 1.10 },
  beat6: { rotX: 0.05, rotY: -0.16, rotZ: -0.01, separation: 0.60, lowerRotX: -0.10, camZ: 2.75, camY: 0.02, scale: 1.10 },
  beat7: { rotX: 0.02, rotY: 0.00, rotZ: 0.00, separation: 0.50, lowerRotX: -0.08, camZ: 2.65, camY: 0.00, scale: 1.05 },
  beat8: { rotX: 0.00, rotY: 0.00, rotZ: 0.00, separation: 1.35, lowerRotX: -0.22, camZ: 0.28, camY: 0.00, scale: 3.20 },
};

export const STATES_PORTRAIT: Record<string, TransformKeyframe> = {
  beat1: { rotX: 0.05, rotY: 0.00, rotZ: 0.00, separation: 0.00, lowerRotX: 0.00, camZ: 3.10, camY: -0.18, scale: 1.08 },
  beat2: { rotX: 0.12, rotY: -0.34, rotZ: -0.01, separation: 0.00, lowerRotX: 0.00, camZ: 2.90, camY: -0.22, scale: 1.12 },
  beat3: { rotX: 0.08, rotY: -0.06, rotZ: 0.00, separation: 1.25, lowerRotX: -0.20, camZ: 2.80, camY: -0.10, scale: 1.10 },
  beat4: { rotX: 0.14, rotY: 0.18, rotZ: 0.01, separation: 0.65, lowerRotX: -0.10, camZ: 1.80, camY: 0.20, scale: 1.45 },
  beat5: { rotX: 0.07, rotY: 0.00, rotZ: 0.00, separation: 0.60, lowerRotX: -0.08, camZ: 2.55, camY: 0.18, scale: 1.20 },
  beat6: { rotX: 0.08, rotY: -0.18, rotZ: -0.01, separation: 0.60, lowerRotX: -0.10, camZ: 2.65, camY: 0.18, scale: 1.20 },
  beat7: { rotX: 0.03, rotY: 0.00, rotZ: 0.00, separation: 0.50, lowerRotX: -0.08, camZ: 2.65, camY: -0.15, scale: 1.12 },
  beat8: { rotX: 0.00, rotY: 0.00, rotZ: 0.00, separation: 1.50, lowerRotX: -0.25, camZ: 0.28, camY: 0.00, scale: 3.50 },
};

function interpolateKeyframes(a: TransformKeyframe, b: TransformKeyframe, t: number): TransformKeyframe {
  const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
  return {
    rotX: THREE.MathUtils.lerp(a.rotX, b.rotX, smoothT),
    rotY: THREE.MathUtils.lerp(a.rotY, b.rotY, smoothT),
    rotZ: THREE.MathUtils.lerp(a.rotZ, b.rotZ, smoothT),
    separation: THREE.MathUtils.lerp(a.separation, b.separation, smoothT),
    lowerRotX: THREE.MathUtils.lerp(a.lowerRotX, b.lowerRotX, smoothT),
    camZ: THREE.MathUtils.lerp(a.camZ, b.camZ, smoothT),
    camY: THREE.MathUtils.lerp(a.camY, b.camY, smoothT),
    scale: THREE.MathUtils.lerp(a.scale, b.scale, smoothT),
  };
}

function calculateTargetTransform(p: number, isPortrait: boolean): TransformKeyframe {
  const states = isPortrait ? STATES_PORTRAIT : STATES_LANDSCAPE;
  const progress = Math.min(1, Math.max(0, p));

  if (progress <= 0.09) return states.beat1;
  if (progress < 0.14) {
    const t = (progress - 0.09) / (0.14 - 0.09);
    return interpolateKeyframes(states.beat1, states.beat2, t);
  }
  if (progress <= 0.22) return states.beat2;
  if (progress < 0.30) {
    const t = (progress - 0.22) / (0.30 - 0.22);
    return interpolateKeyframes(states.beat2, states.beat3, t);
  }
  if (progress <= 0.40) return states.beat3;
  if (progress < 0.45) {
    const t = (progress - 0.40) / (0.45 - 0.40);
    return interpolateKeyframes(states.beat3, states.beat4, t);
  }
  if (progress <= 0.58) return states.beat4;
  if (progress < 0.62) {
    const t = (progress - 0.58) / (0.62 - 0.58);
    return interpolateKeyframes(states.beat4, states.beat5, t);
  }
  if (progress <= 0.75) return states.beat5;
  if (progress < 0.78) {
    const t = (progress - 0.75) / (0.78 - 0.75);
    return interpolateKeyframes(states.beat5, states.beat6, t);
  }
  if (progress <= 0.87) return states.beat6;
  if (progress < 0.89) {
    const t = (progress - 0.87) / (0.89 - 0.87);
    return interpolateKeyframes(states.beat6, states.beat7, t);
  }
  if (progress <= 0.95) return states.beat7;
  const t = (progress - 0.95) / (1.00 - 0.95);
  return interpolateKeyframes(states.beat7, states.beat8, t);
}

export function DentalArchModel({
  reducedMotion = false,
  qualityTier = "high",
  onModelReady,
}: DentalArchModelProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const upperArchRef = useRef<THREE.Group>(null);
  const lowerArchRef = useRef<THREE.Group>(null);
  const { camera, viewport, invalidate } = useThree();

  // Model path based on quality tier (mobile uses decimated model <80k)
  const isMobileTier = qualityTier !== "high";
  const superiorModelPath = isMobileTier
    ? "/models/arcada_superior_mobile.glb"
    : "/models/arcada_superior.glb";
  const inferiorModelPath = isMobileTier
    ? "/models/arcada_inferior_mobile.glb"
    : "/models/arcada_inferior.glb";

  const superiorGLTF = useGLTF(superiorModelPath);
  const inferiorGLTF = useGLTF(inferiorModelPath);

  // Materials: 2 passes (back faces depthWrite=false, front faces depthWrite=true)
  const backMaterial = useMemo(
    () => createFresnelAlignerMaterial({ isBackPass: true, qualityTier }),
    [qualityTier]
  );
  const frontMaterial = useMemo(
    () => createFresnelAlignerMaterial({ isBackPass: false, qualityTier }),
    [qualityTier]
  );

  // Clone scenes for back and front passes
  const { upperBack, upperFront, lowerBack, lowerFront } = useMemo(() => {
    const uBack = superiorGLTF.scene.clone(true);
    const uFront = superiorGLTF.scene.clone(true);
    const lBack = inferiorGLTF.scene.clone(true);
    const lFront = inferiorGLTF.scene.clone(true);

    const setupMeshes = (scene: THREE.Group, mat: THREE.Material, renderOrder: number) => {
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          mesh.material = mat;
          mesh.renderOrder = renderOrder;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
        }
      });
    };

    // Explicit renderOrder: Back passes render first, then Front passes
    setupMeshes(uBack, backMaterial, 1);
    setupMeshes(uFront, frontMaterial, 2);
    setupMeshes(lBack, backMaterial, 3);
    setupMeshes(lFront, frontMaterial, 4);

    return { upperBack: uBack, upperFront: uFront, lowerBack: lBack, lowerFront: lFront };
  }, [superiorGLTF.scene, inferiorGLTF.scene, backMaterial, frontMaterial]);

  useEffect(() => {
    if (onModelReady) {
      onModelReady();
    }
  }, [onModelReady]);

  // Request R3F render whenever scroll updates (render-on-demand)
  useEffect(() => {
    const unsub = subscribeIntroScroll(() => {
      invalidate();
    });
    return unsub;
  }, [invalidate]);

  // Track motion state so we can stop rendering when motionless
  const isMovingRef = useRef(true);
  const lastActiveProgressRef = useRef(-1);

  useFrame((state, delta) => {
    if (!masterGroupRef.current || !upperArchRef.current || !lowerArchRef.current) return;

    const t = state.clock.getElapsedTime();
    const currentProgress = introScroll.progress;
    const isPortrait = viewport.aspect < 1.0;

    // Responsive scaling
    const responsiveScaleFactor = isPortrait
      ? THREE.MathUtils.clamp(viewport.aspect / 0.72, 0.78, 1.05)
      : 1.0;

    if (reducedMotion) {
      masterGroupRef.current.position.set(0, isPortrait ? -0.15 : 0, 0);
      masterGroupRef.current.rotation.set(0.08, 0.12, 0);
      masterGroupRef.current.scale.setScalar(1.1 * responsiveScaleFactor);
      upperArchRef.current.position.y = 0.28;
      lowerArchRef.current.position.y = -0.28;
      camera.position.set(0, isPortrait ? -0.08 : 0, isPortrait ? 3.2 : 4.0);
      camera.lookAt(0, isPortrait ? -0.15 : 0, 0);
      return;
    }

    const target = calculateTargetTransform(currentProgress, isPortrait);
    const lerpSpeed = Math.min(1, 1 - Math.exp(-12 * delta));

    // Idle breathing ONLY at the absolute start (progress < 0.04)
    const idleWeight = Math.max(0, 1 - currentProgress * 25);
    const hasIdle = idleWeight > 0.001;
    const idleY = hasIdle ? Math.sin(t * 1.2) * 0.02 * idleWeight : 0;
    const idleRotY = hasIdle ? Math.sin(t * 0.8) * 0.025 * idleWeight : 0;

    // Mutate master group directly
    masterGroupRef.current.position.y = 0;
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.x,
      target.rotX,
      lerpSpeed
    );
    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.y,
      target.rotY + idleRotY,
      lerpSpeed
    );
    masterGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.z,
      target.rotZ,
      lerpSpeed
    );

    masterGroupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        masterGroupRef.current.scale.x,
        target.scale * responsiveScaleFactor,
        lerpSpeed
      )
    );

    // Upper Arch Position
    const targetUpperY = 0.16 + target.separation * 0.34;
    upperArchRef.current.position.y = THREE.MathUtils.lerp(
      upperArchRef.current.position.y,
      targetUpperY,
      lerpSpeed
    );

    // Lower Arch Position & Rotation
    const targetLowerY = -0.16 - target.separation * 0.34;
    lowerArchRef.current.position.y = THREE.MathUtils.lerp(
      lowerArchRef.current.position.y,
      targetLowerY,
      lerpSpeed
    );
    lowerArchRef.current.rotation.x = THREE.MathUtils.lerp(
      lowerArchRef.current.rotation.x,
      target.lowerRotX,
      lerpSpeed
    );

    // Camera Dolly & Position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.camZ, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      target.camY + idleY,
      lerpSpeed
    );
    camera.lookAt(0, target.camY + idleY, 0);

    // Keep invalidating if breathing or moving
    const posDelta = Math.abs(currentProgress - lastActiveProgressRef.current);
    if (hasIdle || introScroll.isScrolling || posDelta > 0.0001) {
      lastActiveProgressRef.current = currentProgress;
      invalidate();
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]}>
      {/* Upper Arch (arcada superior) - 2 Passes */}
      <group ref={upperArchRef} position={[0, 0.16, 0]}>
        {qualityTier !== "low" && <primitive object={upperBack} />}
        <primitive object={upperFront} />
      </group>

      {/* Lower Arch (arcada inferior) - 2 Passes */}
      <group ref={lowerArchRef} position={[0, -0.16, 0]}>
        {qualityTier !== "low" && <primitive object={lowerBack} />}
        <primitive object={lowerFront} />
      </group>
    </group>
  );
}

// Preload models
useGLTF.preload("/models/arcada_superior.glb");
useGLTF.preload("/models/arcada_inferior.glb");
useGLTF.preload("/models/arcada_superior_mobile.glb");
useGLTF.preload("/models/arcada_inferior_mobile.glb");
