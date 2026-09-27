"use client";

import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface DentalArchModelProps {
  progress: number; // 0 to 1 from ScrollTrigger scrub
  reducedMotion?: boolean;
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

// 8 Discrete Beat States corresponding to user requirements:
// Beat 1: Presentación (mordida cerrada, vista frontal)
// Beat 2: Rotación lenta revelando ambas arcadas desde otro ángulo
// Beat 3: Apertura de la mordida
// Beat 4: Zoom al material (macro de SmartTrack)
// Beat 5: Progresión del tratamiento
// Beat 6: Comparación contra brackets
// Beat 7: Uso diario & libertad (modelo completamente quieto)
// Beat 8: Zoom final al hueco entre arcadas & plunge
// Landscape Desktop/Tablet Keyframes (composed for wide 16:9 / horizontal framing)
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

// Dedicated Portrait Mobile Camera Rig
// Composed explicitly for vertical aspect ratios (~9:19.5):
// Closer camera distance (camZ ~1.8 - 3.1), vertical Y framing, teeth fill major vertical screen area
export const STATES_PORTRAIT: Record<string, TransformKeyframe> = {
  // Beat 1: Closed occlusion placed in lower-center below hero title, camera closer so teeth are prominent
  beat1: { rotX: 0.05, rotY: 0.00, rotZ: 0.00, separation: 0.00, lowerRotX: 0.00, camZ: 3.10, camY: -0.18, scale: 1.08 },
  // Beat 2: Angled view in lower half; top area reserved for 3D scan caption card
  beat2: { rotX: 0.12, rotY: -0.34, rotZ: -0.01, separation: 0.00, lowerRotX: 0.00, camZ: 2.90, camY: -0.22, scale: 1.12 },
  // Beat 3: Mandibular vertical opening utilizes full vertical screen height!
  beat3: { rotX: 0.08, rotY: -0.06, rotZ: 0.00, separation: 1.25, lowerRotX: -0.20, camZ: 2.80, camY: -0.10, scale: 1.10 },
  // Beat 4: Macro zoom into aligner material in upper 60% of screen (specs card at bottom)
  beat4: { rotX: 0.14, rotY: 0.18, rotZ: 0.01, separation: 0.65, lowerRotX: -0.10, camZ: 1.80, camY: 0.20, scale: 1.45 },
  // Beat 5: Progressive alignment animation in upper-middle (ClinCheck counter card at bottom)
  beat5: { rotX: 0.07, rotY: 0.00, rotZ: 0.00, separation: 0.60, lowerRotX: -0.08, camZ: 2.55, camY: 0.18, scale: 1.20 },
  // Beat 6: Comparative alignment view (comparative matrix at bottom)
  beat6: { rotX: 0.08, rotY: -0.18, rotZ: -0.01, separation: 0.60, lowerRotX: -0.10, camZ: 2.65, camY: 0.18, scale: 1.20 },
  // Beat 7: Daily freedom & motionless resting pose in central area
  beat7: { rotX: 0.03, rotY: 0.00, rotZ: 0.00, separation: 0.50, lowerRotX: -0.08, camZ: 2.65, camY: -0.15, scale: 1.12 },
  // Beat 8: Plunge through the arch
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

  // Beat 1: Hold (0.00 -> 0.09)
  if (progress <= 0.09) return states.beat1;
  // Transition 1 -> 2 (0.09 -> 0.14)
  if (progress < 0.14) {
    const t = (progress - 0.09) / (0.14 - 0.09);
    return interpolateKeyframes(states.beat1, states.beat2, t);
  }
  // Beat 2: Hold (0.14 -> 0.22)
  if (progress <= 0.22) return states.beat2;
  // Transition 2 -> 3 (0.22 -> 0.30)
  if (progress < 0.30) {
    const t = (progress - 0.22) / (0.30 - 0.22);
    return interpolateKeyframes(states.beat2, states.beat3, t);
  }
  // Beat 3: Hold (0.30 -> 0.40)
  if (progress <= 0.40) return states.beat3;
  // Transition 3 -> 4 (0.40 -> 0.45)
  if (progress < 0.45) {
    const t = (progress - 0.40) / (0.45 - 0.40);
    return interpolateKeyframes(states.beat3, states.beat4, t);
  }
  // Beat 4: Hold (0.45 -> 0.58)
  if (progress <= 0.58) return states.beat4;
  // Transition 4 -> 5 (0.58 -> 0.62)
  if (progress < 0.62) {
    const t = (progress - 0.58) / (0.62 - 0.58);
    return interpolateKeyframes(states.beat4, states.beat5, t);
  }
  // Beat 5: Hold (0.62 -> 0.75)
  if (progress <= 0.75) return states.beat5;
  // Transition 5 -> 6 (0.75 -> 0.78)
  if (progress < 0.78) {
    const t = (progress - 0.75) / (0.78 - 0.75);
    return interpolateKeyframes(states.beat5, states.beat6, t);
  }
  // Beat 6: Hold (0.78 -> 0.87)
  if (progress <= 0.87) return states.beat6;
  // Transition 6 -> 7 (0.87 -> 0.89)
  if (progress < 0.89) {
    const t = (progress - 0.87) / (0.89 - 0.87);
    return interpolateKeyframes(states.beat6, states.beat7, t);
  }
  // Beat 7: Hold (0.89 -> 0.95) - Completely motionless
  if (progress <= 0.95) return states.beat7;
  // Transition 7 -> 8 / Plunge (0.95 -> 1.00)
  const t = (progress - 0.95) / (1.00 - 0.95);
  return interpolateKeyframes(states.beat7, states.beat8, t);
}

export function DentalArchModel({
  progress,
  reducedMotion = false,
  onModelReady,
}: DentalArchModelProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const upperArchRef = useRef<THREE.Group>(null);
  const lowerArchRef = useRef<THREE.Group>(null);
  const { camera, viewport } = useThree();

  // Load upper and lower dental arches with useGLTF
  const superiorGLTF = useGLTF("/models/arcada_superior.glb");
  const inferiorGLTF = useGLTF("/models/arcada_inferior.glb");

  // Apply optical SmartTrack® high-clarity translucent material
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768);

    const applySmartTrackMaterial = (scene: THREE.Group) => {
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          // Clean, high-transmission polyurethane optical material
          // On mobile, transmission: 0 avoids WebKit FBO depth bugs while maintaining high-gloss translucency
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(isMobile ? 0xf2fbf6 : 0xffffff),
            transmission: isMobile ? 0.0 : 0.82,
            opacity: isMobile ? 0.85 : 0.95,
            transparent: true,
            roughness: isMobile ? 0.12 : 0.08,
            metalness: 0.04,
            ior: 1.52, // Medical polyurethane refractive index
            thickness: 0.85,
            specularIntensity: 2.0,
            specularColor: new THREE.Color(0xffffff),
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            attenuationColor: new THREE.Color(0xecf8f4),
            attenuationDistance: 1.6,
            side: THREE.DoubleSide,
            depthWrite: isMobile ? true : false,
          });
        }
      });
    };

    if (superiorGLTF.scene) applySmartTrackMaterial(superiorGLTF.scene);
    if (inferiorGLTF.scene) applySmartTrackMaterial(inferiorGLTF.scene);

    if (superiorGLTF.scene && inferiorGLTF.scene && onModelReady) {
      onModelReady();
    }
  }, [superiorGLTF, inferiorGLTF, onModelReady]);

  useFrame((state, delta) => {
    if (!masterGroupRef.current || !upperArchRef.current || !lowerArchRef.current) return;

    const t = state.clock.getElapsedTime();
    const lerpSpeed = 1 - Math.exp(-9 * delta);

    // Responsive scaling based on viewport aspect ratio
    const isPortrait = viewport.aspect < 1.0;
    // In portrait mobile, the dedicated STATES_PORTRAIT camera rig positions the camera close (camZ 2.8 - 3.1)
    // so the model fills the vertical viewport without shrinking into a tiny dot:
    const responsiveScaleFactor = isPortrait
      ? THREE.MathUtils.clamp(viewport.aspect / 0.72, 0.78, 1.05)
      : 1.0;

    if (reducedMotion) {
      // Gentle fixed elegant posture in reduced-motion mode
      masterGroupRef.current.position.set(0, isPortrait ? -0.15 : 0, 0);
      masterGroupRef.current.rotation.set(0.08, 0.12, 0);
      masterGroupRef.current.scale.setScalar(1.1 * responsiveScaleFactor);
      upperArchRef.current.position.y = 0.28;
      lowerArchRef.current.position.y = -0.28;
      camera.position.set(0, isPortrait ? -0.08 : 0, isPortrait ? 3.2 : 4.0);
      camera.lookAt(0, isPortrait ? -0.15 : 0, 0);
      return;
    }

    const target = calculateTargetTransform(progress, isPortrait);

    // Apply idle breathing ONLY at the absolute start (progress < 0.04)
    const idleWeight = Math.max(0, 1 - progress * 25);
    const idleY = Math.sin(t * 1.2) * 0.02 * idleWeight;
    const idleRotY = Math.sin(t * 0.8) * 0.025 * idleWeight;

    // Smoothly lerp master group position
    masterGroupRef.current.position.y = THREE.MathUtils.lerp(
      masterGroupRef.current.position.y,
      0,
      lerpSpeed
    );

    // Smoothly lerp master group rotation
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

    // Master scale with responsive factor
    masterGroupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        masterGroupRef.current.scale.x,
        target.scale * responsiveScaleFactor,
        lerpSpeed
      )
    );

    // Upper Arch Position (moves upwards +Y)
    const targetUpperY = 0.16 + target.separation * 0.34;
    upperArchRef.current.position.y = THREE.MathUtils.lerp(
      upperArchRef.current.position.y,
      targetUpperY,
      lerpSpeed
    );

    // Lower Arch Position & Rotation (moves downwards -Y with mandibular hinge tilt)
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

    // Camera Dolly & Position (target.camY controls vertical framing, lookAt follows elevation)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.camZ, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      target.camY + idleY,
      lerpSpeed
    );
    camera.lookAt(0, target.camY + idleY, 0);
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]}>
      {/* Upper Arch (arcada superior) */}
      <group ref={upperArchRef} position={[0, 0.16, 0]}>
        <primitive object={superiorGLTF.scene} />
      </group>

      {/* Lower Arch (arcada inferior) */}
      <group ref={lowerArchRef} position={[0, -0.16, 0]}>
        <primitive object={inferiorGLTF.scene} />
      </group>
    </group>
  );
}

// Preload both glb models for instant loading
useGLTF.preload("/models/arcada_superior.glb");
useGLTF.preload("/models/arcada_inferior.glb");
