"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const TextRevealEffect = ({
  text,
  children,
  className,
  revealClassName,
  revealText = true,
  revealOnHover = false,
}: {
  text?: string
  children?: React.ReactNode
  className?: string
  revealClassName?: string
  revealText?: boolean
  revealOnHover?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    if (!revealOnHover) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !textRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (textRef.current) {
        textRef.current.style.setProperty("--x", `${x}px`)
        textRef.current.style.setProperty("--y", `${y}px`)
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted, isHovered, revealOnHover])

  const content = text || (children as React.ReactNode)

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {revealText ? (
        <>
          <div className="pointer-events-none relative z-10 select-none bg-transparent opacity-0">{content}</div>
          <div
            ref={textRef}
            className={cn(
              "absolute inset-0 z-0",
              revealOnHover && isHovered
                ? "bg-[radial-gradient(circle_at_var(--x)_var(--y),theme(colors.blue.500),transparent_25%)]"
                : "bg-transparent",
              revealClassName,
            )}
            style={
              {
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                "--x": "0px",
                "--y": "0px",
              } as React.CSSProperties
            }
          >
            {content}
          </div>
        </>
      ) : (
        content
      )}
    </div>
  )
}
