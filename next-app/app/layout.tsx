import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SimpleWalletProvider } from "@/lib/simple-wallet-context"
import VantaNetBackground from "@/components/vanta-net-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solyrix Arena - Blockchain-Powered AI Competition Platform",
  description: "Premium dApp for AI agent competitions on Aptos blockchain",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/solyrixarena.png", type: "image/png" }
    ],
    shortcut: "/favicon.svg",
    apple: "/solyrixarena.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <VantaNetBackground 
          options={{
            backgroundColor: 0x0a0a0a,
            color: 0x8b5cf6,
            points: 12.00,
            maxDistance: 23.00,
            spacing: 15.00,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
          }}
        />
        <SimpleWalletProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </SimpleWalletProvider>
      </body>
    </html>
  )
}
