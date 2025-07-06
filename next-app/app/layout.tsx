import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SimpleWalletProvider } from "@/lib/simple-wallet-context"

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
