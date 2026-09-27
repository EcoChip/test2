"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(!isHome);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolledPastHero(true);
      return;
    }

    const handleScroll = () => {
      // Intro 3D is pinned for 1000vh (900vh pure scroll); threshold when entering light content
      const threshold = window.innerHeight * 8.8;
      setScrolledPastHero(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isDarkTheme = isHome && !scrolledPastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDarkTheme
          ? "bg-obsidian/75 backdrop-blur-md border-b border-white/10 text-porcelain"
          : "bg-porcelain/90 backdrop-blur-md border-b border-ink/10 text-ink shadow-subtle"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-editorial text-2xl tracking-tight uppercase font-medium leading-none">
            AURA
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.25em] font-sans font-medium transition-colors ${
              isDarkTheme ? "text-porcelain/60" : "text-sage"
            }`}
          >
            Dental Architecture
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-wider font-medium">
          <Link
            href="/"
            className={`group py-2 inline-flex items-center transition-colors hover:text-coral ${
              pathname === "/"
                ? isDarkTheme
                  ? "text-porcelain font-semibold"
                  : "text-sage font-semibold"
                : isDarkTheme
                ? "text-porcelain/80"
                : "text-ink/80"
            }`}
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1">
              Inicio
            </span>
          </Link>
          <Link
            href="/invisalign"
            className={`group py-2 inline-flex items-center transition-colors hover:text-coral ${
              pathname === "/invisalign"
                ? isDarkTheme
                  ? "text-porcelain font-semibold"
                  : "text-sage font-semibold"
                : isDarkTheme
                ? "text-porcelain/80"
                : "text-ink/80"
            }`}
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1">
              Qué es Invisalign
            </span>
          </Link>
          <Link
            href="/tratamientos"
            className={`group py-2 inline-flex items-center transition-colors hover:text-coral ${
              pathname.startsWith("/tratamientos")
                ? isDarkTheme
                  ? "text-porcelain font-semibold"
                  : "text-sage font-semibold"
                : isDarkTheme
                ? "text-porcelain/80"
                : "text-ink/80"
            }`}
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1">
              Tratamientos
            </span>
          </Link>
          <Link
            href="/equipo"
            className={`group py-2 inline-flex items-center transition-colors hover:text-coral ${
              pathname === "/equipo"
                ? isDarkTheme
                  ? "text-porcelain font-semibold"
                  : "text-sage font-semibold"
                : isDarkTheme
                ? "text-porcelain/80"
                : "text-ink/80"
            }`}
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1">
              Equipo
            </span>
          </Link>
          <Link
            href="/blog"
            className={`group py-2 inline-flex items-center transition-colors hover:text-coral ${
              pathname.startsWith("/blog")
                ? isDarkTheme
                  ? "text-porcelain font-semibold"
                  : "text-sage font-semibold"
                : isDarkTheme
                ? "text-porcelain/80"
                : "text-ink/80"
            }`}
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1">
              Blog
            </span>
          </Link>
        </nav>

        {/* Right CTA Button with Fluid Slide-Left Animation */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contacto"
            className="group btn-slide-left btn-slide-dark inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-all duration-300 active:scale-[0.98]"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 inline-block">
              Pedir Cita
            </span>
            <ArrowRightIcon className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded focus:outline-none ${
            isDarkTheme ? "text-porcelain hover:bg-white/10" : "text-ink hover:bg-ink/5"
          }`}
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 ${
            isDarkTheme
              ? "bg-obsidian border-white/10 text-porcelain"
              : "bg-porcelain border-ink/10 text-ink shadow-editorial"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium uppercase tracking-wider py-2 border-b border-ink/5"
          >
            Inicio
          </Link>
          <Link
            href="/invisalign"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium uppercase tracking-wider py-2 border-b border-ink/5"
          >
            Qué es Invisalign
          </Link>
          <Link
            href="/tratamientos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium uppercase tracking-wider py-2 border-b border-ink/5"
          >
            Tratamientos
          </Link>
          <Link
            href="/equipo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium uppercase tracking-wider py-2 border-b border-ink/5"
          >
            Equipo
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium uppercase tracking-wider py-2 border-b border-ink/5"
          >
            Blog
          </Link>
          <div className="pt-2">
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta hover:bg-coral-hover"
            >
              <span>Pedir Cita Online</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
