"use client"

import type React from "react"
import { cn } from "@/lib/utils"

export function AnimatedGradientBorder({
  children,
  containerClassName,
  className,
  borderClassName,
  duration = 5,
  animate = true,
  gradientClassName = "from-blue-600 via-purple-600 to-cyan-600",
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  borderClassName?: string
  duration?: number
  animate?: boolean
  gradientClassName?: string
}) {
  return (
    <div className={cn("relative rounded-xl p-[1px] overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-xl z-[1]",
          animate && "animate-gradient-xy",
          `bg-gradient-to-r ${gradientClassName}`,
          borderClassName,
        )}
        style={{
          animationDuration: `${duration}s`,
        }}
      />
      <div
        className={cn(
          "relative z-[2] bg-background rounded-xl flex items-center justify-center overflow-hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
