import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { CurrencyProvider } from "@/lib/currency-context"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Project Management System",
  description: "연구개발 프로젝트 및 세액공제 통합 관리 대시보드",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${playfair.variable} ${sourceSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <style>{`
html {
  font-family: ${sourceSans.style.fontFamily};
  --font-sans: ${sourceSans.variable};
  --font-serif: ${playfair.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  )
}
