import type React from "react"
import "@mantine/core/styles.css"
import "./globals.css"
import { MantineProvider, ColorSchemeScript } from "@mantine/core"
import { Inter } from "next/font/google"
import { AppShell } from "@/components/layout/app-shell"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Gestion de Commandes",
  description: "Application de gestion de commandes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <AppShell>{children}</AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}
