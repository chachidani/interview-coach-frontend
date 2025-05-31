"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { Mic, Send, ArrowLeft, Volume2, VolumeX, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

// Sample interview questions for a frontend developer role
const interviewQuestions = [
  "Tell me about yourself and your experience as a frontend developer.",
  "What frontend frameworks are you familiar with, and which one do you prefer?",
  "Can you explain the difference between controlled and uncontrolled components in React?",
  "How do you approach responsive design in your projects?",
  "Describe a challenging frontend problem you've solved recently.",
  "How do you optimize the performance of a web application?",
  "What's your experience with state management libraries?",
  "How do you handle cross-browser compatibility issues?",
  "Can you explain how you would implement authentication in a frontend application?",
  "What's your approach to testing frontend code?",
]

export default function NewInterviewRoom() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [conversation, setConversation] = useState<Array<{ type: string; content: string }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [recognitionActive, setRecognitionActive] = useState(false)
  const [recognitionError, setRecognitionError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore - SpeechRecognition is not in the TypeScript types yet
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("")

          // Capitalize first letter and add period if missing
          let formattedText = transcript
          if (formattedText.length > 0) {
            formattedText = formattedText.charAt(0).toUpperCase() + formattedText.slice(1)
            if (!formattedText.match(/[.!?]$/)) {
              formattedText += "."
            }
          }

          setMessage(formattedText)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setRecognitionError(event.error)
          setIsRecording(false)
          toast({
            title: "Speech Recognition Error",
            description: `Error: ${event.error}. Please try again or use text input.`,
            variant: "destructive",
          })
        }

        recognitionRef.current.onend = () => {
          setRecognitionActive(false)
        }
      } else {
        toast({
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support speech recognition. Please use text input instead.",
          variant: "destructive",
        })
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [toast])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, isTyping])

  // Check if speech synthesis is available
  useEffect(() => {
    if (!speechSynthesis) {
      setSpeechEnabled(false)
      toast({
        title: "Text-to-Speech Not Supported",
        description: "Your browser doesn't support text-to-speech. AI responses will be displayed as text only.",
        variant: "destructive",
      })
    }
  }, [speechSynthesis, toast])

  useEffect(() => {
    // Add the first question when the component mounts
    setConversation([{ type: "ai", content: interviewQuestions[0] }])
  }, [])

  // Speak the last AI message when conversation updates
  useEffect(() => {
    if (speechEnabled && conversation.length > 0) {
      const lastMessage = conversation[conversation.length - 1]
      if (lastMessage.type === "ai") {
        speakMessage(lastMessage.content)
      }
    }
  }, [conversation, speechEnabled])

  const speakMessage = (text: string) => {
    if (!speechSynthesis || !speechEnabled) return

    // Cancel any ongoing speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95 // Slightly slower for better clarity
    utterance.pitch = 1
    utterance.volume = 1

    // Get available voices and select a good one
    const voices = speechSynthesis.getVoices()

    // Try to find a high-quality voice
    const preferredVoice =
      voices.find(
        (voice) =>
          (voice.name.includes("Google") && voice.name.includes("Female")) ||
          voice.name.includes("Samantha") ||
          (voice.name.includes("Microsoft") && voice.name.includes("Zira")),
      ) ||
      voices.find(
        (voice) => voice.name.includes("Google") || voice.name.includes("Natural") || voice.name.includes("Female"),
      )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => {
      setIsSpeaking(false)
      toast({
        title: "Text-to-Speech Error",
        description: "There was an error playing the audio. Please try again.",
        variant: "destructive",
      })
    }

    speechSynthesis.speak(utterance)
  }

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis?.cancel()
      setIsSpeaking(false)
    }
    setSpeechEnabled(!speechEnabled)

    toast({
      title: speechEnabled ? "Text-to-Speech Disabled" : "Text-to-Speech Enabled",
      description: speechEnabled
        ? "AI responses will no longer be spoken aloud."
        : "AI responses will now be spoken aloud.",
    })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to conversation
      const newConversation = [...conversation, { type: "user", content: message }]
      setConversation(newConversation)
      setMessage("")

      // Simulate AI typing
      setIsTyping(true)

      // Move to next question after a delay
      setTimeout(() => {
        setIsTyping(false)
        if (currentQuestion < interviewQuestions.length - 1) {
          const nextQuestion = currentQuestion + 1
          setCurrentQuestion(nextQuestion)
          setConversation((prev) => [...prev, { type: "ai", content: interviewQuestions[nextQuestion] }])
        } else {
          // Interview completed
          setConversation((prev) => [
            ...prev,
            {
              type: "ai",
              content:
                "Thank you for completing this practice interview! You can now view your feedback and performance analysis.",
            },
          ])

          // Redirect to dashboard after a delay
          setTimeout(() => {
            setConfirmDialogOpen(true)
          }, 2000)
        }
      }, 2000)
    }
  }

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition. Please use text input instead.",
        variant: "destructive",
      })
      return
    }

    if (isRecording) {
      // Stop recording
      recognitionRef.current.stop()
      setIsRecording(false)
      setRecognitionActive(false)
    } else {
      // Start recording
      setRecognitionError(null)
      setIsRecording(true)
      setRecognitionActive(true)
      recognitionRef.current.start()

      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone. Your speech will be converted to text.",
      })
    }
  }

  const completeInterview = () => {
    toast({
      title: "Interview Completed",
      description: "Your interview has been completed and saved.",
    })
    router.push("/dashboard")
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Exit Interview
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exit Interview</DialogTitle>
                <DialogDescription>
                  Are you sure you want to exit? Your progress will be saved and you can resume later.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                  Continue Interview
                </Button>
                <Button onClick={() => router.push("/dashboard")}>Save & Exit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <h1 className="text-2xl font-bold">Frontend Developer Interview</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSpeech}
            className="h-8 w-8"
            title={speechEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
          >
            {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setConfirmDialogOpen(true)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Interview
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4 mb-4 max-h-[70vh] overflow-y-auto p-2 chat-container">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex message-bubble animate-in fade-in-50 duration-300",
                  message.type === "user" ? "justify-end" : "justify-start",
                  index === conversation.length - 1 && "slide-in-from-bottom-5",
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-4 shadow-sm",
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none",
                  )}
                >
                  <p>{message.content}</p>
                  {message.type === "ai" && speechEnabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 mt-2 text-gray-600 hover:text-gray-900"
                      onClick={() => speakMessage(message.content)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in-50 slide-in-from-bottom-5">
                <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 rounded-bl-none shadow-sm">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              onClick={toggleRecording}
              className={cn("flex-shrink-0 relative", recognitionActive && "ring-2 ring-red-500 ring-opacity-50")}
            >
              <Mic className={cn("h-4 w-4", isRecording && "animate-pulse")} />
              {recognitionActive && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </Button>
            <div className="relative flex-grow">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isRecording ? "Listening..." : "Type your answer..."}
                className={cn(
                  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  isRecording && "border-red-400 focus-visible:ring-red-400",
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              {isRecording && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <div className="w-1 h-3 bg-red-500 animate-pulse"></div>
                  <div className="w-1 h-5 bg-red-500 animate-pulse" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1 h-3 bg-red-500 animate-pulse" style={{ animationDelay: "300ms" }}></div>
                </div>
              )}
            </div>
            <Button onClick={handleSendMessage} className="flex-shrink-0" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {recognitionError && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-600">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                Speech recognition error: {recognitionError}. Please try again or use text input.
              </p>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Question {currentQuestion + 1} of {interviewQuestions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / interviewQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
