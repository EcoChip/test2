# AURA Dental Architecture — Premium Dental Clinic Web Experience

> Sitio web multi-página de alta gama para la clínica dental de estética y ortodoncia invisible **AURA Dental Architecture** (Calle de Serrano 48, Barrio de Salamanca, Madrid).

---

## 🌟 Características Principales

- **Intro 3D Cinematográfica (Scrollstorytelling en 8 Beats)**:
  - Desarrollada con **React Three Fiber**, `@react-three/drei` y **GSAP ScrollTrigger**.
  - Modelos anatómicos de arcada dental superior e inferior reales en formato `.glb`.
  - Material físico SmartTrack® (`MeshPhysicalMaterial`) con transmisión de luz del 90%, rugosidad de 0.09 y retroiluminación de estudio.
  - Timeline en 8 beats discretos con pausas (*holds*) y contador reactivo de alineadores ClinCheck.
- **Asistente Virtual Clínico NOVA (Gemini 2.5 Flash)**:
  - IA médica conversacional conectada vía Next.js API Routes con base de datos clínica.
  - Calendario dinámico de disponibilidad a 14 días (L-V y sábados VIP).
  - Generador de localizadores de reserva (`AURA-XXXX-XXXX`), integración con Google Calendar y WhatsApp.
  - Gatillo flotante simétrico en píldora con micro-interacciones suaves e icono SVG propio.
- **Módulo de Ajustes del Demo & Dirección de Arte**:
  - Selector en tiempo real de 4 paletas cromáticas exclusivas:
    1. **Azul Petróleo Desaturado (*Petrol Noir*)**: Estética fría, quirúrgica y de alta tecnología.
    2. **AURA Original**: Obsidiana, verde quirúrgico salvia y coral terracota.
    3. **Oro Champagne & Mármol**: Grafito, bronce y oro champán satinado.
    4. **Titanio Quirúrgico**: Antracita y platino minimalista nórdico.
  - Persistencia en `localStorage` con precarga en `<head>` para evitar FOUC.
- **Arquitectura Multi-página Completa**:
  - `/` — Página de inicio con intro 3D, sección clínica con Google Reviews 5.0★, tratamientos y cuaderno clínico.
  - `/tratamientos` & `/tratamientos/[slug]` — Catálogo y monográficos detallados (Invisalign, Implantes, Carillas, etc.).
  - `/invisalign` — Página de especialidad Diamond Apex con comparador y fases.
  - `/equipo` — Cuerpo facultativo colegiado con perfiles y acreditaciones.
  - `/blog` & `/blog/[slug]` — Artículos científicos comparativos y newsletter.
  - `/contacto` — Formulario de cita y mapa logístico interactivo de Google Maps.
  - Páginas legales completas (`/aviso-legal`, `/privacidad`, `/terminos`, `/cookies`).

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Estilos**: Tailwind CSS + Custom CSS Variables para tematización en vivo
- **3D & Animación**: Three.js, React Three Fiber, React Drei, GSAP 3 + ScrollTrigger
- **Inteligencia Artificial**: Google Gemini API (`gemini-2.5-flash`)
- **Iconografía**: SVG bespoke de alta definición (Favicon, NovaChatIcon, ToothIcon, etc.)

---

## 🚀 Puesta en Marcha

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/EcoChip/test2.git
cd test2
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:
```bash
cp .env.example .env.local
```
Añade tu API Key de Gemini:
```env
GEMINI_API_KEY=tu_gemini_api_key
```

### 3. Modo desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Compilación de producción
```bash
npm run build
npm run start
```

---

## 📄 Licencia

Privado © AURA Dental Architecture S.L.P. Todos los derechos reservados.
