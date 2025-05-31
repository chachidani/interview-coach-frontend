"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex items-center justify-center">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover rounded-full h-10 w-10 border-2 border-white group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-50"
            >
              <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-md text-center">
                <div className="text-white font-bold">{item.name}</div>
                <div className="text-white/80 text-xs">{item.designation}</div>
              </div>
              <div className="w-4 h-4 bg-black/80 backdrop-blur-sm rotate-45 -mt-2 z-0"></div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
