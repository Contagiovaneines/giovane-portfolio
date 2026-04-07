import type { Metadata, Viewport } from "next"
import { Manrope, Sora } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://contagiovaneines.github.io"),
  title: {
    default: "Giovane Ines | Sites, landing pages e sistemas web",
    template: "%s | Giovane Ines",
  },
  description:
    "Portfólio de Giovane Ines com foco em criação de sites, landing pages, sistemas web, APIs, integrações e soluções white label.",
  applicationName: "Giovane Ines",
  authors: [{ name: "Giovane Ines da Silva", url: "https://github.com/contagiovaneines" }],
  keywords: [
    "Giovane Ines",
    "desenvolvedor full stack",
    "freelancer",
    "sites institucionais",
    "landing pages",
    "sistemas web",
    "APIs",
    "integrações",
    "white label",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://contagiovaneines.github.io",
    title: "Giovane Ines | Sites, landing pages e sistemas web",
    description:
      "Desenvolvimento de sites, landing pages, sistemas web, APIs e integrações com foco em clareza, performance e boa entrega.",
    siteName: "Giovane Ines",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giovane Ines | Sites, landing pages e sistemas web",
    description:
      "Portfólio com foco em sites, landing pages, sistemas web, APIs, integrações e soluções white label.",
  },
  alternates: {
    canonical: "/",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
