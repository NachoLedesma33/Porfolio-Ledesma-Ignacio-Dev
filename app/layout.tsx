import type { Metadata } from "next";
import { Nunito, Geist_Mono, Monoton } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/app/components/NoiseOverlay";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monoton = Monoton({
  variable: "--font-monoton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ignacio Ledesma | Full Stack Developer",
  description: "Portafolio de Ignacio Ledesma, desarrollador Full Stack con enfoque en aplicaciones prácticas y escalables.",
  icons: {
    icon: "/comunidad-de-desarrollo-32.webp",
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
      className={`${nunito.variable} ${geistMono.variable} ${monoton.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/portfolio_placeholder.webp" as="image" type="image/webp" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
