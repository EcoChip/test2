# Informe de Rendimiento y Optimización 3D — AURA Scrollytelling & Alineador Transparente

**Proyecto**: AURA Dental Architecture  
**Ruta de prueba**: `http://localhost:6005/`  
**Entorno de medición**: Chrome DevTools Protocol con CPU 4x Throttling (`Emulation.setCPUThrottlingRate: 4`)  
**Metodología**: Registro continuo de rAF, PerformanceObserver (`longtask`), DevTools Performance Metrics (ScriptDuration, TaskDuration, LayoutDuration) e inspección WebGL.

---

## 1. Tabla Comparativa de Métricas (Antes vs. Después)

| Métrica | Antes (Baseline) | Después (Optimizado) | Mejora Relativa | Estado de Aceptación |
| :--- | :--- | :--- | :--- | :--- |
| **FPS en 3D Scrollytelling (CPU 4x)** | **8.9 FPS** (promedio: 3.3 - 15.8) | **57 – 61 FPS** (sostenido en 3D) | **+580%** de fluidez | ✅ Cumplido ($\ge 55$ PC / $\ge 45$ móvil) |
| **FPS Promedio Global (con scroll completo)** | **8.9 FPS** | **43.2 FPS** | **+385%** | ✅ |
| **Long Tasks (>50 ms) en Scrollytelling** | **141 tareas** | **13 tareas** (0 en scrollytelling puro) | **-91%** de tareas bloqueantes | ✅ Cumplido |
| **Long Tasks (>100 ms) en Scrollytelling** | **50 tareas** | **0 tareas** durante el scroll 3D | **100% libre de parones >100 ms** | ✅ Cumplido ($0$ tareas $>100$ ms) |
| **Tiempo de Scripting (CPU 4x)** | **12,781 ms** | **2,318 ms** | **-81.8%** de tiempo de CPU | ✅ Excelente |
| **Triángulos en Escena (Desktop)** | **2,427,776** | **64,987** (31.7k sup + 33.2k inf) | **-97.3%** ($\ll 150\text{k}$) | ✅ Cumplido |
| **Triángulos en Escena (Móvil)** | **2,427,776** | **34,982** (17.1k sup + 17.8k inf) | **-98.5%** ($\ll 80\text{k}$) | ✅ Cumplido |
| **Draw Calls por Frame** | **56 calls** ($\times 2$ transmission = 112) | **4 calls** (2 pases por arcada) | **-96.4%** de sobrecarga WebGL | ✅ Cumplido ($\le 4$) |
| **Re-renders de React durante Scroll** | Múltiples por cada frame de scroll | **0 re-renders** (`setState` desterrado) | **Zero re-renders** | ✅ Cumplido |
| **Coste de la Transparencia del Alineador** | $>100\%$ (por frame buffer copy de transmission) | **$< 4\%$ de tiempo de frame** | **Eliminado el pase offscreen** | ✅ Cumplido ($< 10\%$) |
| **Tamaño en Disco de Modelos GLB** | 3.08 MB (1.54 MB cada uno) | **271 KB** (Desktop) / **175 KB** (Móvil) | **-91.2%** de peso de red | ✅ Ultra-rápido LCP |

---

## 2. Los 3 Cuellos de Botella Principales Encontrados (Con Evidencia)

### 1. Inundación del hilo principal por `setState` continuo en React (`setProgress`)
* **Evidencia**: `ScrollTrigger.create.onUpdate` disparaba `setProgress(p)` en cada píxel de scroll. Esto re-ejecutaba el árbol de componentes completo (638 líneas de JSX, 8 tarjetas DOM de beats con SVG y cálculos matemáticos), provocando **12,781 ms** de scripting y **141 tareas largas** de hasta **460 ms**.
* **Solución aplicada**: Desacoplamiento total del framework. Se creó un almacén mutable directo (`introScroll`) y se sustituyeron los renders de React por mutación directa del DOM mediante referencias pre-cacheadas (`beatCardRefs`, `alignerNumRef`, etc.) con verificación de cambios sucios (*dirty-checking*).

### 2. Sobrecarga geométrica masiva no decimada (2.43 millones de triángulos y 56 submallas)
* **Evidencia**: Cada modelo GLB (`arcada_superior.glb` y `arcada_inferior.glb`) constaba de 28 submallas separadas y 1,213,888 triángulos por pieza. Esto generaba 56 llamadas de dibujado por frame y saturaba tanto el pipeline de vértices como el ancho de banda del bus GPU.
* **Solución aplicada**: Fusión (*join*) de las 28 submallas en una única malla por arcada y simplificación geométrica adaptativa con `MeshoptSimplifier` y compresión Draco (`draco3dgltf`):
  * **Desktop**: 31,776 triángulos (superior) y 33,211 (inferior) = 64,987 triángulos totales (meta $< 150\text{k}$).
  * **Móvil**: 17,106 triángulos (superior) y 17,876 (inferior) = 34,982 triángulos totales (meta $< 80\text{k}$).

### 3. Doble renderizado por `MeshPhysicalMaterial.transmission`
* **Evidencia**: El material previo utilizaba `transmission: 0.82` sobre Three.js, forzando una copia secundaria de frame buffer (*FBO offscreen*) antes de pintar cada una de las 56 submallas. Esto multiplicaba por dos el coste de renderizado y causaba caídas a 3.3 FPS.
* **Solución aplicada**: Shader Fresnel analítico bespoke en dos pasadas (`createFresnelAlignerMaterial`):
  * **Pase trasero**: `THREE.BackSide` con `depthWrite: false` y tinte atenuado para simular refracción interna sin coste.
  * **Pase delantero**: `THREE.FrontSide` con `depthWrite: true`, bordes lechosos por ángulo rasante con tinte cian médico (`#a8e6ef`) y reflejo especular nítido de doble luz.
  * `renderOrder` explícito (1 y 2 para superior, 3 y 4 para inferior) que previene cualquier parpadeo o artefacto de profundidad.

---

## 3. Decisiones Tomadas por Cuenta Propia

1. **Sincronización Unificada con Lenis y GSAP Ticker**:
   * Se configuró Lenis con `duration: 0.9` y `easing` logarítmico, conectando su evento de scroll directamente a `ScrollTrigger.update` y delegando su actualización en `gsap.ticker.add((time) => lenis.raf(time * 1000))` con `lagSmoothing(0)`.
   * En Three.js se implementó `frameloop="demand"`: el render solo se dispara cuando hay scroll activo o respiración inicial, reduciendo el consumo de batería y GPU a cero en reposo.
2. **Eliminación de `backdrop-filter: blur(...)` sobre el Canvas**:
   * Las tarjetas superpuestas al canvas utilizaban `backdrop-blur-md` y `backdrop-blur-xl`. En navegadores móviles y GPUs integradas, el desenfoque de fondo fuerza lecturas continuas del frame buffer de la GPU (*GPU readback*).
   * Se reemplazó por un fondo sólido tintado de lujo (`bg-[#0B0F0D]/90 border border-white/10 shadow-2xl`), manteniendo exactamente la estética editorial pero eliminando completamente la sobrecarga del compositor.
3. **Optimización del Scroll Listener en la Cabecera (`Header.tsx`)**:
   * Se detectó que el listener de la cabecera leía `window.innerWidth` y `window.innerHeight` dentro del evento de scroll, forzando sincronización de layout (*forced reflow*).
   * Se cacheó el cálculo del umbral en el evento `resize`, eliminando llamadas a propiedades geométricas del DOM durante el desplazamiento.
4. **Precompilación de Shaders (`compileAsync`)**:
   * Se integró un hook de calentamiento (`ShaderWarmup`) que ejecuta `compileAsync(scene, camera)` durante el tiempo de póster inicial, renderizando un fotograma oculto para calentar los pipelines de shaders antes de que el usuario inicie el scroll.
5. **Decodificación Draco Local con Workers**:
   * Se configuró `useGLTF.setDecoderPath('/draco/')` apuntando a los archivos locales existentes en `public/draco/`, eliminando dependencias de CDNs externas de Google y evitando fallos de red offline.
6. **Inmunidad a Barras de Navegador en iOS Safari**:
   * Se reemplazaron unidades `dvh` por `svh` en el contenedor y el escenario fijo (`h-[100svh]`, `h-[550svh]`), y se activó `ScrollTrigger.config({ ignoreMobileResize: true })`.

---

## 4. Qué Queda por Optimizar (Próximos Pasos Opcionales)

1. **Lazy Loading Condicional del Iframe de Google Maps**:
   * En la sección inferior (`ClinicLocationMap`), el iframe de Google Maps consume ciclos de scripting al entrar en pantalla. Puede montarse solo mediante `IntersectionObserver` tras interacción del usuario.
2. **Texturas KTX2 / Basis Universal para Fotografías del Sitio**:
   * Las imágenes fotográficas de tratamientos y casos clínicos están en JPG optimizado. Convertirlas a WebP o AVIF con formatos comprimidos por GPU reducirá aún más la memoria del navegador.
3. **Calidad Adaptativa Dinámica con PerformanceMonitor**:
   * La detección actual selecciona el nivel (Alto, Medio, Bajo) al montar según hardware (`cores`, `memory`, pantalla táctil). Se puede enlazar un monitor dinámico que baje de nivel automáticamente si detecta caídas prolongadas de FPS durante más de 3 segundos consecutivos.
