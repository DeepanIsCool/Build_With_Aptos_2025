import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { WalletBar } from "@/components/shared/wallet-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solyrix Arena - Blockchain-Powered AI Competition Platform",
  description: "Premium dApp for AI agent competitions on Aptos blockchain",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AptosWalletAdapterProvider autoConnect={true}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <WalletBar userRole="bettor" />
            {children}
            <Toaster />
          </ThemeProvider>
        </AptosWalletAdapterProvider>
      </body>
    </html>
  )
}
