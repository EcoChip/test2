# Informe de Rendimiento Inicial (Baseline Perf Before) — AURA Scrollytelling 3D

Fecha y entorno de prueba:
- **Entorno**: Chrome DevTools Protocol con CPU 4x Throttling (`Emulation.setCPUThrottlingRate: 4`)
- **Viewport**: 1280x800, DPR 1.0 (Desktop) y emulación móvil
- **Prueba**: Recorrido de scroll completo arriba-abajo y retorno rápido a través de la sección de 3D scrollytelling

---

## 1. Métricas Registradas

| Métrica | Valor Baseline (Antes) | Objetivo de Aceptación | Estado |
| :--- | :--- | :--- | :--- |
| **FPS Medio** | **8.9 FPS** | $\ge 55\text{ FPS}$ (Desktop) / $\ge 45\text{ FPS}$ (Móvil 4x) | ❌ Crítico |
| **FPS Mínimo** | **3.3 FPS** | $\ge 30\text{ FPS}$ | ❌ Crítico |
| **FPS 1% Low** | **3.3 FPS** | $\ge 30\text{ FPS}$ | ❌ Crítico |
| **Long Tasks (>50 ms)** | **141 tareas** | Mínimas posibles | ❌ Crítico |
| **Long Tasks (>100 ms)** | **50 tareas** | **0 tareas** durante el scroll | ❌ Crítico |
| **Long Task Máxima** | **460 ms** | $< 50\text{ ms}$ | ❌ Bloqueante |
| **Tiempo de Scripting** | **12,781 ms** | $< 1,500\text{ ms}$ | ❌ Crítico |
| **Triángulos en Escena** | **2,427,776 triángulos** (1.21M superior + 1.21M inferior) | $< 150\text{k}$ (Desktop), $< 80\text{k}$ (Móvil) | ❌ 16x sobre presupuesto |
| **Draw Calls por Frame** | **56 draw calls** ($\times 2$ por pase de transmission = 112 calls) | Mínimos posibles ($\le 4\text{ calls}$) | ❌ Crítico |
| **Re-renders de React por Scroll** | **Múltiples re-renders por cada píxel de scroll** (`setProgress(p)` en `onUpdate`) | **0 re-renders** de React durante el scroll | ❌ Crítico |

---

## 2. Los 3 Mayores Cuellos de Botella Identificados (Con Evidencia)

### Cuello de Botella #1: Re-renders masivos de React en cada evento de Scroll (`setState` en `ScrollTrigger.onUpdate`)
* **Evidencia**: En [`DentalIntroScroller.tsx`](file:///c:/Users/nda94/Documents/antigravity/charming-rutherford/src/components/3d/DentalIntroScroller.tsx#L136-L146), el callback `onUpdate` de ScrollTrigger ejecuta `setProgress(p)` y `setActiveBeatId(current.id)` en cada micro-movimiento de rueda o touch.
* **Impacto**: Provoca la reconciliación y re-renderizado completo de todo el árbol del componente (638 líneas de JSX, 8 tarjetas DOM de beats con SVG y cálculos matemáticos continuos), propagando cambios de props hacia `DentalCanvas` y `DentalArchModel`. Esto dispara **12,781 ms de Scripting** y **141 tareas largas**, saturando el hilo principal con hasta **460 ms de bloqueo**.

### Cuello de Botella #2: Carga geométrica masiva no optimizada (2.43 millones de triángulos y 56 submallas)
* **Evidencia**: Inspección directa de `public/models/arcada_superior.glb` y `public/models/arcada_inferior.glb`:
  * Cada arcada contiene 28 submallas independientes con **1,213,888 triángulos**.
  * Total en escena: **2,427,776 triángulos** y **56 llamadas de dibujado (draw calls)** por frame.
* **Impacto**: Supera por más de 16 veces el presupuesto para escritorio (<150k) y por más de 30 veces el presupuesto para móvil (<80k). La GPU y el driver sufren un cuello de botella de procesamiento de vértices y sobrecarga de estado WebGL, hundiendo los FPS a **8.9 FPS**.

### Cuello de Botella #3: Uso de `MeshPhysicalMaterial.transmission: 0.82` (Doble renderizado de la escena)
* **Evidencia**: En [`DentalArchModel.tsx`](file:///c:/Users/nda94/Documents/antigravity/charming-rutherford/src/components/3d/DentalArchModel.tsx#L162-L179), el material del alineador utiliza `transmission: 0.82` y `roughness: 0.08` con `thickness: 0.85` en `MeshPhysicalMaterial`.
* **Impacto**: Three.js implementa `transmission` mediante una copia de frame buffer / render target secundario que obliga a renderizar la escena dos veces por cada frame. Multiplicado por 2.43 millones de triángulos y 56 submallas, aniquila la tasa de cuadros y genera caídas por debajo de **4 FPS** con `transmission`.

---

## 3. Plan de Mitigación Secuencial

1. **Optimización 1: Scroll desacoplado de React (Zero setState / Zero re-renders)**:
   * Eliminar `setProgress` y `setState` en el scroll.
   * Conectar ScrollTrigger directamente a variables mutables y sincronizar con Lenis.
   * Centralizar el bucle en un único ticker (GSAP ticker / Lenis) sin renders redundantes en rAF.
2. **Optimización 2: Reducción y fusión geométrica de los modelos GLB**:
   * Decimar la geometría a $<150\text{k}$ triángulos para escritorio y $<80\text{k}$ para móvil.
   * Fusionar las submallas en una sola malla por arcada (reduciendo de 56 draw calls a 2–4 draw calls).
   * Comprimir con Draco/Meshopt decodificado en Worker.
3. **Optimización 3: Shader Fresnel ultra-optimizado sin `transmission` (Alineador Transparente de Alta Gama)**:
   * Sustituir `MeshPhysicalMaterial` con transmission por un shader Fresnel bespoke:
     * Opaque/luz suave en los bordes por ángulo rasante.
     * Centro cristalino casi vacío con leve tinte cian.
     * Reflejo especular fino y sutil.
     * Renderizado en 2 pasadas (caras traseras con `depthWrite: false` y caras delanteras) para evitar artefactos de orden o parpadeo.
     * Coste de frame $\le 10\%$.
4. **Optimización 4: Renderer, Calidad Adaptativa, Precompilación y Safari iOS**:
   * DPR máx 1.5 (1.25 móvil bajo), `compileAsync` de shaders y subida de texturas a GPU en loader.
   * Sincronización con Lenis y `ScrollTrigger.config({ ignoreMobileResize: true })`.
   * Unidades `svh` y desactivación de canvas cuando no está en pantalla.
