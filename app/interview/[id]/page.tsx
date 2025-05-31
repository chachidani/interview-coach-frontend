"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  Send,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  ArrowLeft,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Spotlight } from "@/components/ui/spotlight"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { MovingBorder } from "@/components/ui/moving-border"
import { TextRevealEffect } from "@/components/ui/text-reveal-effect"
import { useTheme } from "next-themes"

// Sample interview data
const interviewData = {
  role: "Frontend Developer",
  topic: "React & JavaScript",
  date: "May 5, 2025",
  company: "Tech Solutions Inc.",
  duration: "32 min",
  score: 85,
  status: "active", // or "completed"
  conversation: [
    {
      id: 1,
      type: "ai",
      content: "Tell me about your experience with React and how you've used it in your previous projects.",
    },
    {
      id: 2,
      type: "user",
      content:
        "I've been working with React for about 3 years now. In my most recent project, I built a dashboard application that visualized data from multiple APIs. I used React with TypeScript, Redux for state management, and React Query for data fetching. I implemented custom hooks for shared logic and used styled-components for styling.",
    },
    {
      id: 3,
      type: "ai",
      content:
        "That's great. Can you explain the difference between useState and useReducer hooks in React, and when you would choose one over the other?",
    },
    {
      id: 4,
      type: "user",
      content:
        "useState is simpler and good for managing independent pieces of state that don't depend on each other. useReducer is more powerful and better for complex state logic where the next state depends on the previous state, or when you have multiple sub-values. I typically use useState for simple flags or form inputs, and useReducer when I need to manage more complex objects or when state transitions follow specific patterns.",
    },
    {
      id: 5,
      type: "ai",
      content:
        "Excellent explanation. Now, how would you optimize the performance of a React application that renders a large list of items?",
    },
  ],
  feedback: [
    {
      question: "Tell me about your experience with React and how you've used it in your previous projects.",
      answer:
        "I've been working with React for about 3 years now. In my most recent project, I built a dashboard application that visualized data from multiple APIs. I used React with TypeScript, Redux for state management, and React Query for data fetching. I implemented custom hooks for shared logic and used styled-components for styling.",
      strengths: [
        "Provided specific details about technologies used (TypeScript, Redux, React Query)",
        "Mentioned specific implementation details (custom hooks, styled-components)",
        "Quantified experience (3 years)",
      ],
      improvements: ["Could mention specific challenges overcome", "Could highlight business impact of the dashboard"],
      score: 85,
    },
    {
      question:
        "Can you explain the difference between useState and useReducer hooks in React, and when you would choose one over the other?",
      answer:
        "useState is simpler and good for managing independent pieces of state that don't depend on each other. useReducer is more powerful and better for complex state logic where the next state depends on the previous state, or when you have multiple sub-values. I typically use useState for simple flags or form inputs, and useReducer when I need to manage more complex objects or when state transitions follow specific patterns.",
      strengths: [
        "Clear comparison between the two hooks",
        "Provided practical examples of when to use each",
        "Demonstrated understanding of state management concepts",
      ],
      improvements: [
        "Could provide a code example to illustrate the difference",
        "Could mention performance considerations",
      ],
      score: 90,
    },
  ],
}

export default function InterviewPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [interviewStatus, setInterviewStatus] = useState(interviewData.status)
  const [conversation, setConversation] = useState(interviewData.conversation)
  const [isTyping, setIsTyping] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [recognitionActive, setRecognitionActive] = useState(false)
  const [recognitionError, setRecognitionError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

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

          setMessage(transcript)
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
    if (message.trim() && interviewStatus === "active") {
      // Add user message to conversation
      const newConversation = [...conversation, { id: Date.now(), type: "user", content: message }]
      setConversation(newConversation)
      setMessage("")

      // Simulate AI typing
      setIsTyping(true)

      // Simulate AI response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const aiResponse = {
          id: Date.now() + 1,
          type: "ai",
          content:
            "Thank you for your response. Let's move on to the next question. How do you handle state management in large React applications?",
        }
        setConversation([...newConversation, aiResponse])
      }, 2000)
    }
  }

  const toggleRecording = () => {
    if (interviewStatus !== "active") return

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
    setInterviewStatus("completed")
    setConfirmDialogOpen(false)

    toast({
      title: "Interview Completed",
      description: "This interview has been marked as completed and can no longer be resumed.",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <TextRevealEffect
            text={`${interviewData.role} Interview`}
            className="text-2xl font-bold"
            revealText={true}
            revealOnHover={true}
            revealClassName={
              theme === "dark"
                ? "bg-gradient-to-r from-blue-400 to-purple-400"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={interviewStatus === "completed" ? "secondary" : "default"}
            className="transition-all duration-300 hover:scale-105"
          >
            {interviewStatus === "completed" ? "Completed" : "Active"}
          </Badge>

          {interviewStatus === "active" && (
            <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="group transition-all duration-300 hover:scale-105">
                  <CheckCircle className="mr-2 h-4 w-4 group-hover:text-green-500 transition-colors" />
                  Complete Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Complete Interview</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to complete this interview? Once completed, you won't be able to resume it.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={completeInterview}>Complete Interview</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="chat" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Interview Chat
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Feedback & Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Spotlight className="rounded-3xl">
            <AnimatedGradientBorder
              containerClassName="w-full"
              className="p-0"
              gradientClassName={
                theme === "dark"
                  ? "from-blue-800 via-purple-800 to-cyan-800"
                  : "from-blue-600 via-purple-600 to-cyan-600"
              }
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Interview Session</CardTitle>
                    <CardDescription>
                      {interviewData.topic} • {interviewData.date} • {interviewData.duration}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSpeech}
                    className="h-8 w-8 transition-all duration-300 hover:scale-110"
                    title={speechEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
                  >
                    {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto p-2 chat-container">
                    <AnimatePresence initial={false}>
                      {conversation.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: index * 0.1,
                          }}
                          className={cn(
                            "flex message-bubble",
                            message.type === "user" ? "justify-end" : "justify-start",
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg",
                              message.type === "user"
                                ? "bg-blue-600 text-white rounded-br-none dark:bg-blue-700"
                                : "bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-800 dark:text-gray-100",
                            )}
                          >
                            <p>{message.content}</p>
                            {message.type === "ai" && (
                              <div className="flex items-center mt-2 space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                >
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                                {speechEnabled && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                    onClick={() => speakMessage(message.content)}
                                  >
                                    <Volume2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex justify-start"
                        >
                          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 dark:bg-gray-800 rounded-bl-none shadow-md">
                            <div className="flex space-x-2">
                              <motion.div
                                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                              ></motion.div>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                              ></motion.div>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                              ></motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>

                  <div
                    className={cn(
                      "flex items-center space-x-2 transition-all duration-500",
                      interviewStatus === "completed" ? "opacity-50 pointer-events-none" : "opacity-100",
                    )}
                  >
                    <MovingBorder
                      containerClassName="rounded-full"
                      className="rounded-full"
                      as={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      borderClassName={theme === "dark" ? "bg-gradient-to-r from-blue-500 to-purple-500" : undefined}
                    >
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        size="icon"
                        onClick={toggleRecording}
                        className={cn(
                          "flex-shrink-0 relative rounded-full transition-all duration-300",
                          recognitionActive && "ring-2 ring-red-500 ring-opacity-50",
                        )}
                        disabled={interviewStatus === "completed"}
                      >
                        <Mic className={cn("h-4 w-4", isRecording && "animate-pulse")} />
                        {recognitionActive && (
                          <motion.span
                            className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                          ></motion.span>
                        )}
                      </Button>
                    </MovingBorder>
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          interviewStatus === "completed"
                            ? "Interview completed"
                            : isRecording
                              ? "Listening..."
                              : "Type your answer..."
                        }
                        className={cn(
                          "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                          isRecording && "border-red-400 focus-visible:ring-red-400",
                        )}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage()
                          }
                        }}
                        disabled={interviewStatus === "completed"}
                      />
                      {isRecording && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <motion.div
                            className="w-1 h-3 bg-red-500"
                            animate={{ scaleY: [1, 1.5, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                          ></motion.div>
                          <motion.div
                            className="w-1 h-5 bg-red-500"
                            animate={{ scaleY: [1, 1.8, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                          ></motion.div>
                          <motion.div
                            className="w-1 h-3 bg-red-500"
                            animate={{ scaleY: [1, 1.5, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                          ></motion.div>
                        </div>
                      )}
                    </div>
                    <MovingBorder
                      containerClassName="rounded-full"
                      className="rounded-full"
                      as={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      borderClassName={theme === "dark" ? "bg-gradient-to-r from-blue-500 to-purple-500" : undefined}
                    >
                      <Button
                        onClick={handleSendMessage}
                        className="flex-shrink-0 rounded-full transition-all duration-300"
                        disabled={interviewStatus === "completed" || !message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </MovingBorder>
                  </div>

                  {interviewStatus === "completed" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
                    >
                      <AlertCircle className="h-5 w-5 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        This interview is completed and cannot be resumed. You can only view the conversation.
                      </p>
                    </motion.div>
                  )}

                  {recognitionError && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30"
                    >
                      <p className="text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Speech recognition error: {recognitionError}. Please try again or use text input.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </AnimatedGradientBorder>
          </Spotlight>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Spotlight className="rounded-3xl">
            <AnimatedGradientBorder
              containerClassName="w-full"
              className="p-0"
              gradientClassName={
                theme === "dark"
                  ? "from-blue-800 via-purple-800 to-cyan-800"
                  : "from-blue-600 via-purple-600 to-cyan-600"
              }
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Performance Summary</CardTitle>
                    <motion.div
                      className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-bold text-blue-600 dark:text-blue-400">{interviewData.score}%</span>
                    </motion.div>
                  </div>
                  <CardDescription>Overall interview performance</CardDescription>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                    <motion.div
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${interviewData.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <AnimatePresence>
                      {interviewData.feedback.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300 dark:border-gray-700"
                        >
                          <div className="mb-2">
                            <h3 className="font-medium text-lg">Question {index + 1}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{item.question}</p>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Your Answer:</h4>
                            <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/30"
                            >
                              <h4 className="font-medium text-sm text-green-600 dark:text-green-400 mb-2">
                                Strengths:
                              </h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {item.strengths.map((strength, i) => (
                                  <motion.li
                                    key={i}
                                    className="text-sm dark:text-gray-300"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                  >
                                    {strength}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/30"
                            >
                              <h4 className="font-medium text-sm text-amber-600 dark:text-amber-400 mb-2">
                                Areas for Improvement:
                              </h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {item.improvements.map((improvement, i) => (
                                  <motion.li
                                    key={i}
                                    className="text-sm dark:text-gray-300"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                  >
                                    {improvement}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>

                          <div className="mt-4 pt-3 border-t dark:border-gray-700">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Score:</span>
                              <span className="text-sm font-bold">{item.score}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 overflow-hidden">
                              <motion.div
                                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                              ></motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </AnimatedGradientBorder>
          </Spotlight>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
