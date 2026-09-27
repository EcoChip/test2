import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AuraChatbot } from "@/components/chat/AuraChatbot";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F0D",
};

export const metadata: Metadata = {
  title: {
    default: "AURA Dental Architecture | Alta Estética & Ortodoncia Invisible Madrid",
    template: "%s | AURA Dental Architecture",
  },
  description:
    "Clínica dental de alta estética en el Barrio de Salamanca (Madrid). Especialistas en Invisalign® Diamond Apex, implantes dentales de carga inmediata y carillas cerámicas biomiméticas.",
  keywords: [
    "Invisalign Madrid",
    "Invisalign Diamond Apex",
    "Estética dental Barrio Salamanca",
    "Carillas de porcelana",
    "Implantes carga inmediata Madrid",
    "Odontología digital 3D",
  ],
  authors: [{ name: "AURA Dental Architecture" }],
  openGraph: {
    title: "AURA Dental Architecture | Alta Estética & Ortodoncia Invisible",
    description:
      "Perfección clínica, arquitectura dental y tecnología digital 3D en un entorno sereno y disciplinado.",
    type: "website",
    locale: "es_ES",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "AURA Dental Architecture",
    description: "Clínica de alta estética dental y ortodoncia invisible en Madrid.",
    telephone: "+34910234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle de Serrano 48",
      addressLocality: "Madrid",
      postalCode: "28001",
      addressCountry: "ES",
    },
    openingHours: "Mo,Tu,We,Th,Fr 09:00-20:00",
    priceRange: "€€€",
  };

  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('aura-demo-theme');
                if (theme) document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-porcelain text-ink antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AuraChatbot />
      </body>
    </html>
  );
}
