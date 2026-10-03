import * as THREE from "three";

/**
 * High-Precision View-Space Fresnel Translucent Aligner Shader
 *
 * Mathematically rigorous: Computes both normal and viewDir in view space
 * to completely eliminate distorted dot products, flipped normals,
 * and dark polygon rendering artifacts.
 */

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    // Transform normals strictly to view space using built-in normalMatrix
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uEdgeColor;
  uniform float uFresnelPower;
  uniform float uBaseAlpha;
  uniform float uEdgeAlpha;
  uniform float uSpecularIntensity;
  uniform float uShininess;
  uniform vec3 uLightDir1;
  uniform vec3 uLightDir2;
  uniform int uQualityTier; // 0 = low, 1 = med, 2 = high
  uniform bool uIsBackPass;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    if (!gl_FrontFacing || uIsBackPass) {
      normal = -normal;
    }

    vec3 viewDir = normalize(vViewPosition);

    // Fresnel calculation strictly in view space (cos theta between normal and camera ray)
    float NdotV = clamp(dot(normal, viewDir), 0.0, 1.0);
    float fresnel = pow(1.0 - NdotV, uFresnelPower);

    // Gradient from center to edge (crisp medical polyurethane with subtle cyan rim)
    vec3 finalColor = mix(uBaseColor, uEdgeColor, fresnel);

    // View-space Key Light specular highlight
    vec3 l1 = normalize(uLightDir1);
    vec3 h1 = normalize(l1 + viewDir);
    float spec1 = pow(max(dot(normal, h1), 0.0), uShininess) * uSpecularIntensity;

    // View-space Rim/Back Light specular highlight
    vec3 l2 = normalize(uLightDir2);
    vec3 h2 = normalize(l2 + viewDir);
    float spec2 = pow(max(dot(normal, h2), 0.0), uShininess * 0.5) * (uSpecularIntensity * 0.7);

    finalColor += vec3(spec1 + spec2);

    // High and medium tiers get an extra subtle studio sheen
    if (uQualityTier > 0) {
      float sheen = max(0.0, normal.y * 0.5 + 0.5) * 0.12;
      finalColor += vec3(sheen);
    }

    // Alpha blending: transparent center, polyurethane density on edges
    float alpha = mix(uBaseAlpha, uEdgeAlpha, fresnel);

    // Low quality tier fallback
    if (uQualityTier == 0) {
      alpha = mix(0.18, 0.75, fresnel);
    }

    // Back pass modification: internal refraction depth appearance
    if (uIsBackPass) {
      alpha *= 0.55;
      finalColor *= 0.90;
    }

    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
  }
`;

export function createFresnelAlignerMaterial(options: {
  isBackPass?: boolean;
  qualityTier?: "high" | "medium" | "low";
}): THREE.ShaderMaterial {
  const isBack = options.isBackPass ?? false;
  const tier = options.qualityTier ?? "high";
  const tierInt = tier === "low" ? 0 : tier === "medium" ? 1 : 2;

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uBaseColor: { value: new THREE.Color(0xf5fbfa) }, // Clear optical polyurethane
      uEdgeColor: { value: new THREE.Color(0xa0e7ef) }, // Crisp medical cyan grazing rim
      uFresnelPower: { value: tier === "low" ? 1.8 : 2.2 },
      uBaseAlpha: { value: isBack ? 0.06 : 0.16 }, // Balanced center transparency
      uEdgeAlpha: { value: isBack ? 0.50 : 0.88 }, // Milky translucent edge
      uSpecularIntensity: { value: tier === "low" ? 1.0 : 1.8 },
      uShininess: { value: 60.0 },
      uLightDir1: { value: new THREE.Vector3(0.5, 0.8, 0.6) }, // Front-top-right key light in view space
      uLightDir2: { value: new THREE.Vector3(-0.4, 0.3, -0.7) }, // Rim backlight in view space
      uQualityTier: { value: tierInt },
      uIsBackPass: { value: isBack },
    },
    transparent: true,
    side: isBack ? THREE.BackSide : THREE.FrontSide,
    // depthWrite: false on BOTH passes prevents transparent triangle occlusion holes and Z-buffer discards
    depthWrite: false,
    depthTest: true,
    blending: THREE.NormalBlending,
  });
}
