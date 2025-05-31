"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useState, useEffect } from "react"

interface SpotlightProps {
  className?: string
  children?: React.ReactNode
  size?: number
}

export function Spotlight({ children, className, size = 400 }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mousePositionRef.current = { x, y }

        if (containerRef.current) {
          containerRef.current.style.setProperty("--x", `${x}px`)
          containerRef.current.style.setProperty("--y", `${y}px`)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-background",
        "before:absolute before:inset-0 before:z-10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(59,130,246,0.15),transparent_25%)]",
        className,
      )}
      style={
        {
          "--x": "0px",
          "--y": "0px",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
