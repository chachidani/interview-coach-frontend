"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useRef, useState } from "react"

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: any
}) {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    const computedStyle = getComputedStyle(container)
    const height = Number.parseFloat(computedStyle.height)
    const width = Number.parseFloat(computedStyle.width)

    canvas.width = width
    canvas.height = height

    const waves = createWaves(colors || ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"])
    let animationId: number

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      if (backgroundFill) {
        ctx.fillStyle = backgroundFill
        ctx.fillRect(0, 0, width, height)
      }

      waves.forEach((wave) => {
        drawWave(ctx, wave, width, height, waveWidth, waveOpacity)
        updateWave(wave, speed)
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isMounted, colors, waveWidth, backgroundFill, blur, speed, waveOpacity])

  const createWaves = (colors: string[]) => {
    return colors.map((color) => ({
      color,
      offsetX: Math.random() * 1000,
      offsetY: Math.random() * 20 - 10,
      scale: Math.random() * 0.1 + 0.05,
    }))
  }

  const drawWave = (
    ctx: CanvasRenderingContext2D,
    wave: { color: string; offsetX: number; offsetY: number; scale: number },
    width: number,
    height: number,
    waveWidth?: number,
    opacity?: number,
  ) => {
    const { color, offsetX, offsetY, scale } = wave
    const waveHeight = height * 0.2
    const baseY = height / 2 + offsetY

    ctx.beginPath()
    ctx.moveTo(0, baseY)

    for (let x = 0; x < width; x++) {
      const y = baseY + Math.sin((x + offsetX) * (waveWidth || 0.01) * scale) * waveHeight
      ctx.lineTo(x, y)
    }

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()

    ctx.fillStyle = color
    ctx.globalAlpha = opacity || 0.5
    ctx.fill()
    ctx.globalAlpha = 1
  }

  const updateWave = (
    wave: { color: string; offsetX: number; offsetY: number; scale: number },
    speed: "slow" | "fast",
  ) => {
    const speedFactor = speed === "fast" ? 1 : 0.5
    wave.offsetX += 1 * speedFactor
  }

  if (!isMounted) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative flex h-full w-full flex-col overflow-hidden", containerClassName)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          filter: `blur(${blur}px)`,
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
