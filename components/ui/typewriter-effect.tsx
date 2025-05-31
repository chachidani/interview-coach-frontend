"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const currentWord = words[currentWordIndex].text

    const timeout = setTimeout(
      () => {
        // If we're deleting, remove the last character
        if (isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        } else {
          // If we're typing, add the next character
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        }

        // If we've completed typing the word
        if (!isDeleting && currentText === currentWord) {
          // Wait a bit before starting to delete
          setTimeout(() => setIsDeleting(true), 1000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          // Move to the next word
          setCurrentWordIndex((currentWordIndex + 1) % words.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span className="mr-2">I'm</span>
      <span className="inline-block">
        {words.map((word, idx) => {
          return (
            <span
              key={idx}
              className={cn("absolute", {
                "opacity-100": idx === currentWordIndex,
                "opacity-0": idx !== currentWordIndex,
                [word.className || ""]: true,
              })}
            >
              {idx === currentWordIndex ? currentText : word.text}
            </span>
          )
        })}
      </span>
      <span className={cn("ml-1 inline-block h-4 w-[2px] animate-blink bg-primary", cursorClassName)} />
    </div>
  )
}
