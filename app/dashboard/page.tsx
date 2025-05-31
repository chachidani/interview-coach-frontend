"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Plus, Calendar, Briefcase, Clock, ArrowRight, AlertCircle, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { WavyBackground } from "@/components/ui/wavy-background"
import { useTheme } from "next-themes"

// Sample data for past interview rooms
const pastInterviews = [
  {
    id: "1",
    role: "Frontend Developer",
    topic: "React & JavaScript",
    date: "May 5, 2025",
    company: "Tech Solutions Inc.",
    duration: "32 min",
    score: 85,
    status: "completed",
  },
  {
    id: "2",
    role: "Product Manager",
    topic: "Product Strategy",
    date: "May 2, 2025",
    company: "InnovateCorp",
    duration: "45 min",
    score: 78,
    status: "completed",
  },
  {
    id: "3",
    role: "UX Designer",
    topic: "User Research",
    date: "April 28, 2025",
    company: "DesignHub",
    duration: "28 min",
    score: 92,
    status: "completed",
  },
  {
    id: "4",
    role: "Backend Developer",
    topic: "Node.js & APIs",
    date: "May 10, 2025",
    company: "ServerStack",
    duration: "15 min",
    score: null,
    status: "active",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  const ReactComponent = React
  ReactComponent.useEffect(() => {
    setMounted(true)
  }, [])

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate room creation
    setTimeout(() => {
      setIsCreating(false)
      setOpen(false)
      router.push("/interview/new-room")
    }, 1500)
  }

  const words = [
    {
      text: "ready",
      className: "text-blue-500 dark:text-blue-400",
    },
    {
      text: "prepared",
      className: "text-green-500 dark:text-green-400",
    },
    {
      text: "confident",
      className: "text-purple-500 dark:text-purple-400",
    },
    {
      text: "skilled",
      className: "text-yellow-500 dark:text-yellow-400",
    },
    {
      text: "impressive",
      className: "text-red-500 dark:text-red-400",
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <DashboardShell>
      <div className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="w-full absolute inset-0 h-screen">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-10 dark:opacity-30" />
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent dark:via-blue-500/20" />
        </div>

        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-lg " />
            <h1 className="relative text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Welcome to InterviewCoach
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl mb-8 h-8"
          >
            <TypewriterEffect words={words} className="h-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-lg " />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full px-8 py-6 text-lg transition-all duration-300 ease-out hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    <Plus className="h-5 w-5" />
                    <span>Start New Interview</span>
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Interview Session</DialogTitle>
                  <DialogDescription>Set up your practice interview by selecting a role and topic.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRoom}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="role">Job Role</Label>
                      <Select defaultValue="frontend">
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                          <SelectItem value="product">Product Manager</SelectItem>
                          <SelectItem value="design">UX Designer</SelectItem>
                          <SelectItem value="data">Data Scientist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="topic">Interview Topic</Label>
                      <Select defaultValue="technical">
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Skills</SelectItem>
                          <SelectItem value="behavioral">Behavioral Questions</SelectItem>
                          <SelectItem value="system">System Design</SelectItem>
                          <SelectItem value="problem">Problem Solving</SelectItem>
                          <SelectItem value="culture">Cultural Fit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Target Company (Optional)</Label>
                      <Input id="company" placeholder="e.g. Google, Amazon, etc." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isCreating} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      {isCreating ? (
                        <div className="flex items-center">
                          <motion.div
                            className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                          />
                          Creating...
                        </div>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>
      </div>

      <DashboardHeader heading="Interview Dashboard" text="View your past interviews or start a new practice session.">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="mr-2 h-4 w-4" /> New Interview
              </span>
              <span className="absolute inset-0 z-0 bg-blue-600 opacity-0 transition-opacity group-hover:opacity-20"></span>
            </Button>
          </DialogTrigger>
        </Dialog>
      </DashboardHeader>

      <Tabs defaultValue="past" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-4 mx-auto">
          <TabsTrigger value="past" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Past
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Active
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="past" className="space-y-4">
          {pastInterviews.filter((interview) => interview.status === "completed").length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No completed interviews</CardTitle>
                <CardDescription>
                  You haven't completed any practice interviews yet. Start your first one!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Interview
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {pastInterviews
                  .filter((interview) => interview.status === "completed")
                  .map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CardContainer className="w-full">
                        <CardBody className="bg-card relative group/card rounded-xl border p-0 shadow-md hover:shadow-xl transition-all duration-300">
                          <CardItem translateZ={50} className="w-full">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{interview.role}</CardTitle>
                                  <CardDescription>{interview.topic}</CardDescription>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="group-hover/card:bg-blue-100 dark:group-hover/card:bg-blue-900"
                                >
                                  Completed
                                </Badge>
                              </div>
                            </CardHeader>
                          </CardItem>
                          <CardItem translateZ={60} className="w-full">
                            <CardContent className="pb-2">
                              <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{interview.date}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{interview.company}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{interview.duration}</span>
                                </div>
                                <div className="mt-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Performance Score</span>
                                    <div className="flex items-center">
                                      <Sparkles className="h-3 w-3 text-yellow-500 dark:text-yellow-400 mr-1" />
                                      <span className="font-medium">{interview.score}%</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${interview.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </CardItem>
                          <CardItem translateZ={100} className="w-full">
                            <CardFooter className="pt-2">
                              <Button
                                variant="outline"
                                asChild
                                className="w-full group-hover/card:border-blue-500 dark:group-hover/card:border-blue-400"
                              >
                                <Link href={`/interview/${interview.id}`} className="flex items-center justify-center">
                                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    </motion.div>
                  ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <AnimatedGradientBorder
                    className="h-full"
                    gradientClassName={
                      theme === "dark"
                        ? "from-blue-800 via-purple-800 to-cyan-800"
                        : "from-blue-600 via-purple-600 to-cyan-600"
                    }
                  >
                    <Card className="border-0 h-full bg-transparent">
                      <CardHeader>
                        <CardTitle>Practice Again</CardTitle>
                        <CardDescription>Start a new interview session to improve your skills.</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center py-8">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setOpen(true)}
                          className="w-full group relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <Plus className="mr-2 h-5 w-5" /> New Interview
                          </span>
                          <span className="absolute inset-0 z-0 bg-blue-600 opacity-0 transition-opacity group-hover:opacity-20"></span>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedGradientBorder>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {pastInterviews.filter((interview) => interview.status === "active").length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No active interviews</CardTitle>
                <CardDescription>
                  You don't have any active interviews. Start a new one to practice your skills!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Interview
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {pastInterviews
                  .filter((interview) => interview.status === "active")
                  .map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AnimatedGradientBorder
                        gradientClassName={
                          theme === "dark"
                            ? "from-blue-800 via-purple-800 to-cyan-800"
                            : "from-blue-600 via-purple-600 to-cyan-600"
                        }
                      >
                        <Card className="border-0 bg-transparent overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{interview.role}</CardTitle>
                                <CardDescription>{interview.topic}</CardDescription>
                              </div>
                              <Badge className="animate-pulse">In Progress</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-3">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{interview.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{interview.company}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <AlertCircle className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                                <span className="text-blue-700 dark:text-blue-400 font-medium">
                                  Resume this interview to continue
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button asChild className="w-full">
                              <Link href={`/interview/${interview.id}`} className="flex items-center justify-center">
                                Resume Interview <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </AnimatedGradientBorder>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>
                You don't have any scheduled interviews. You can schedule mock interviews with AI or human coaches.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">Schedule Interview</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Questions</CardTitle>
              <CardDescription>
                You haven't saved any interview questions yet. Questions you save during practice will appear here.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" onClick={() => setOpen(true)}>
                Start Practicing
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
