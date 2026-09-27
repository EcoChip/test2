"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, CheckIcon } from "./Icons";

export type ThemeId = "default" | "petrol" | "champagne" | "titanium";

interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  badge: string;
  isPopular?: boolean;
  colors: {
    bgDark: string;
    surfaceDark: string;
    secondary: string;
    accent: string;
    bgLight: string;
  };
  description: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: "petrol",
    name: "Azul Petróleo Desaturado",
    tagline: "Estética de Alta Tecnología & Cirugía de Vanguardia",
    badge: "Paleta Solicitada",
    isPopular: true,
    colors: {
      bgDark: "#081016",
      surfaceDark: "#0F1C25",
      secondary: "#213947",
      accent: "#4EA4B6",
      bgLight: "#F3F6F8",
    },
    description:
      "Tonalidades petróleo muy oscuras y frías con acabado mate desaturado, acompañadas de acentos cian glacial. Transmite máxima precisión óptica, microscopía 3D y sobriedad arquitectónica contemporánea.",
  },
  {
    id: "default",
    name: "AURA Original (Obsidiana & Salvia)",
    tagline: "Equilibrio Biomimético Orgánico",
    badge: "Identidad Base",
    colors: {
      bgDark: "#0B0F0D",
      surfaceDark: "#121815",
      secondary: "#2F4C42",
      accent: "#E1785A",
      bgLight: "#FAF7F2",
    },
    description:
      "Negro obsidiana de alto contraste combinado con verde quirúrgico salvia y acento coral terracota sobre blanco porcelana cálido. El diseño original de AURA.",
  },
  {
    id: "champagne",
    name: "Oro Champagne & Mármol",
    tagline: "Alta Cosmética & Estética Facial",
    badge: "Boutique de Lujo",
    colors: {
      bgDark: "#0E0E12",
      surfaceDark: "#181820",
      secondary: "#3D352B",
      accent: "#C5A265",
      bgLight: "#FAF8F5",
    },
    description:
      "Grafito carbón profundo con acentos oro champán satinado y fondo marfil cálido. Evoca la artesanía de carillas feldespáticas y clínicas privadas de estética facial.",
  },
  {
    id: "titanium",
    name: "Titanio Quirúrgico & Monocromo",
    tagline: "Minimalismo Nórdico Aséptico",
    badge: "High-Tech Straumann",
    colors: {
      bgDark: "#0F1113",
      surfaceDark: "#1A1D20",
      secondary: "#32383E",
      accent: "#9EACB8",
      bgLight: "#F8FAFC",
    },
    description:
      "Paleta monocromática en escala de grises antracita con destellos platino titanio y blanco tiza puro. Pureza clínica absoluta inspirada en biomateriales suizos.",
  },
];

interface DemoSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoSettingsModal({ isOpen, onClose }: DemoSettingsModalProps) {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("default");

  useEffect(() => {
    // Read current theme from HTML or localStorage
    const saved = (localStorage.getItem("aura-demo-theme") as ThemeId) || "default";
    setActiveTheme(saved);
  }, [isOpen]);

  const handleApplyTheme = (themeId: ThemeId) => {
    setActiveTheme(themeId);
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("aura-demo-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
      localStorage.setItem("aura-demo-theme", themeId);
    }
    window.dispatchEvent(new Event("aura-theme-change"));
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90dvh] bg-obsidian border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-porcelain">
        
        {/* Top Prominent Demo Notice */}
        <div className="bg-coral/15 border-b border-coral/30 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono text-coral font-semibold uppercase tracking-wider text-[11px]">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span>(Este menú no aparecerá en una web real)</span>
          </div>
          <span className="text-[10px] text-porcelain/60 hidden sm:inline">
            Panel de Demostración y Dirección de Arte
          </span>
        </div>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex items-start justify-between bg-black/30">
          <div>
            <h3 className="font-editorial text-2xl text-porcelain font-normal leading-tight">
              Ajustes del Demo · Paletas Cromáticas
            </h3>
            <p className="text-xs text-porcelain/70 font-sans mt-1 max-w-lg leading-relaxed">
              Selecciona una dirección estética para transformar instantáneamente la identidad visual, colores de contraste y atmósfera de la clínica en toda la web.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-porcelain/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0 ml-4"
            aria-label="Cerrar modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Themes Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90dvh-180px)]">
          {THEMES.map((theme) => {
            const isSelected = activeTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => handleApplyTheme(theme.id)}
                className={`group cursor-pointer p-4 sm:p-5 rounded-xl border transition-all duration-300 relative ${
                  isSelected
                    ? "bg-white/[0.07] border-coral shadow-lg ring-1 ring-coral/50"
                    : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-editorial text-lg text-porcelain font-normal">
                        {theme.name}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded tracking-wider border ${
                          theme.isPopular
                            ? "bg-coral/20 text-coral border-coral/40 font-semibold"
                            : "bg-white/5 text-porcelain/70 border-white/10"
                        }`}
                      >
                        {theme.badge}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
                          <CheckIcon className="w-3.5 h-3.5" />
                          <span>Activa en directo</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-porcelain/50 font-sans">
                      {theme.tagline}
                    </p>
                  </div>

                  {/* Color Swatch Circles */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-black/40 p-2 rounded-lg border border-white/10">
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.bgDark }}
                      title={`Fondo Oscuro: ${theme.colors.bgDark}`}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.surfaceDark }}
                      title={`Superficie: ${theme.colors.surfaceDark}`}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.secondary }}
                      title={`Tono Secundario: ${theme.colors.secondary}`}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.accent }}
                      title={`Acento Principal: ${theme.colors.accent}`}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.bgLight }}
                      title={`Fondo Claro: ${theme.colors.bgLight}`}
                    />
                  </div>
                </div>

                <p className="text-xs text-porcelain/80 mt-3 font-sans leading-relaxed">
                  {theme.description}
                </p>

                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-porcelain/40">
                    ID: {theme.id}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyTheme(theme.id);
                    }}
                    className={`btn-slide-left btn-slide-dark px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      isSelected
                        ? "bg-coral text-white shadow-cta"
                        : "bg-white/10 text-porcelain hover:bg-white/20"
                    }`}
                  >
                    {isSelected ? "Paleta en Uso ✓" : "Aplicar Paleta →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 px-6 bg-black/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => handleApplyTheme("default")}
            className="text-porcelain/60 hover:text-white underline text-[11px] transition-colors"
          >
            Restablecer a AURA Original
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-porcelain/40 font-mono hidden sm:inline">
              El cambio persiste entre páginas
            </span>
            <button
              onClick={onClose}
              className="btn-slide-left btn-slide-dark px-5 py-2 rounded-lg bg-coral text-white font-medium text-xs uppercase tracking-wider shadow-cta"
            >
              Listo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
