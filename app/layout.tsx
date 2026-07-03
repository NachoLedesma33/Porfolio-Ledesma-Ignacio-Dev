import type { Metadata } from "next";
import { Nunito, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/app/components/NoiseOverlay";
import ThemeInitializer from "@/app/components/ThemeInitializer";
import WebVitalsReporter from "@/app/components/performance/WebVitalsReporter";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.SITE_URL || "https://ignacio-ledesma.dev";

export const metadata: Metadata = {
  title: "Ignacio Ledesma | Full Stack Developer",
  description: "Portafolio de Ignacio Ledesma, desarrollador Full Stack con enfoque en aplicaciones prácticas y escalables.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Ignacio Ledesma | Full Stack Developer",
    description: "Portafolio de Ignacio Ledesma, desarrollador Full Stack con enfoque en aplicaciones prácticas y escalables.",
    url: "/",
    siteName: "Ignacio Ledesma - Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/portfolio_placeholder.webp",
        width: 256,
        height: 256,
        alt: "Ignacio Ledesma",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ignacio Ledesma | Full Stack Developer",
    description: "Portafolio de Ignacio Ledesma, desarrollador Full Stack con enfoque en aplicaciones prácticas y escalables.",
    images: ["/portfolio_placeholder.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <ThemeInitializer />
        <NoiseOverlay />
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
