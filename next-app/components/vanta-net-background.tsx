"use client"

import { useEffect, useRef } from 'react'

interface VantaEffect {
  destroy: () => void
}

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

interface VantaNetBackgroundProps {
  options?: {
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    backgroundColor?: number
    points?: number
    maxDistance?: number
    spacing?: number
  }
}

export default function VantaNetBackground({ 
  options = {} 
}: VantaNetBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<VantaEffect | null>(null)

  useEffect(() => {
    let mounted = true
    let scriptsLoaded = 0
    const totalScripts = 2

    const initializeVanta = () => {
      if (!mounted || !vantaRef.current || !window.VANTA || !window.VANTA.NET) return

      // Default NET options matching your specification
      const defaultOptions = {
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x8b5cf6, // Purple network color
        backgroundColor: 0x0a0a0a, // Dark background
        points: 12.00, // Number of connection points
        maxDistance: 23.00, // Maximum connection distance
        spacing: 15.00 // Spacing between points
      }

      const effectOptions = {
        el: vantaRef.current,
        THREE: window.THREE,
        ...defaultOptions,
        ...options
      }

      try {
        vantaEffect.current = window.VANTA.NET(effectOptions)
      } catch (error) {
        console.error('Failed to initialize Vanta NET effect:', error)
      }
    }

    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        scriptsLoaded++
        onLoad()
        if (scriptsLoaded === totalScripts) {
          setTimeout(initializeVanta, 100)
        }
      }
      script.onerror = (error) => console.error(`Failed to load script: ${src}`, error)
      document.head.appendChild(script)
    }

    const loadVanta = async () => {
      try {
        // Only run on client side
        if (typeof window === 'undefined') return

        // Load THREE.js (r134 as specified)
        if (!window.THREE) {
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', () => {})
        } else {
          scriptsLoaded++
        }

        // Load Vanta NET effect
        if (!window.VANTA || !window.VANTA.NET) {
          loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', () => {})
        } else {
          scriptsLoaded++
        }

        // If both scripts are already loaded, initialize immediately
        if (window.THREE && window.VANTA && window.VANTA.NET) {
          scriptsLoaded = totalScripts
          setTimeout(initializeVanta, 100)
        }
      } catch (error) {
        console.error('Failed to load Vanta.js:', error)
      }
    }

    loadVanta()

    return () => {
      mounted = false
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (error) {
          console.error('Error destroying Vanta effect:', error)
        }
      }
    }
  }, [options])

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-50"
      style={{ 
        width: '100vw', 
        height: '100vh',
        backgroundColor: '#0a0a0a' // Dark fallback background
      }}
    />
  )
}
