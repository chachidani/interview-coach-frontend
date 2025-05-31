"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: any
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const borderRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return
    if (!borderRef.current) return
    const { x, y } = position
    borderRef.current.style.setProperty("--x", `${x * 100}%`)
    borderRef.current.style.setProperty("--y", `${y * 100}%`)
  }, [position, isMounted])

  return (
    <Component ref={containerRef} className={cn("relative rounded-lg p-[1px] overflow-hidden", containerClassName)}>
      <div
        ref={borderRef}
        className={cn(
          "absolute inset-0 rounded-lg z-[1]",
          "bg-[radial-gradient(var(--x)_var(--y),circle,var(--border-color)_0%,transparent_75%)]",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          borderClassName,
        )}
        style={
          {
            "--border-color": "hsl(var(--primary))",
          } as React.CSSProperties
        }
      />
      <div className={cn("relative z-[2] rounded-lg", className)}>{children}</div>
    </Component>
  )
}
