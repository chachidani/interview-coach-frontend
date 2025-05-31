"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Zap, Target, CheckCircle, Play } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { LampContainer } from "@/components/ui/lamp"
import { motion } from "framer-motion"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { Spotlight } from "@/components/ui/spotlight"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

const testimonials = [
  {
    quote:
      "InterviewCoach helped me prepare for my tech interviews and land my dream job at a top company. The AI feedback was incredibly detailed and actionable.",
    name: "Alex Johnson",
    title: "Software Engineer at Google",
  },
  {
    quote:
      "The feedback I received was incredibly valuable. I felt much more confident in my actual interviews and improved my communication skills significantly.",
    name: "Sarah Chen",
    title: "Product Manager at Meta",
  },
  {
    quote:
      "I went from failing interviews to getting multiple offers. The practice sessions were so realistic and the analytics helped me track my progress.",
    name: "Michael Rodriguez",
    title: "Data Scientist at Netflix",
  },
  {
    quote:
      "The behavioral question practice was a game-changer. I learned how to structure my answers using the STAR method effectively.",
    name: "Emily Davis",
    title: "UX Designer at Airbnb",
  },
  {
    quote:
      "As someone with interview anxiety, this platform helped me build confidence through repeated practice in a safe environment.",
    name: "David Kim",
    title: "Backend Engineer at Stripe",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">IC</span>
          </div>
          <span className="font-semibold text-xl text-gray-900 dark:text-gray-100">InterviewCoach</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/auth"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium transition-colors"
          >
            Log in
          </Link>
          <ThemeToggle />
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/auth">Sign up</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section with Enhanced Background */}
      <HeroHighlight containerClassName="relative">
        <BackgroundBeams className="opacity-20" />
        <div className="relative z-20 container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master Your Interviews with <Highlight className="text-black dark:text-white">AI Coaching</Highlight>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Practice interviews anytime, anywhere with our AI-powered coach. Get real-time feedback and improve your
              skills with personalized insights.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                asChild
                className="rounded-full px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/auth" className="flex items-center">
                  Start Practicing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
            <motion.div
              className="flex items-center mt-8 space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.9/5 from 2,000+ users</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CardContainer className="w-full max-w-md">
              <CardBody className="relative group/card rounded-xl border border-black/[0.1] dark:border-white/[0.2] w-full h-auto p-0 overflow-hidden">
                <CardItem translateZ={50} className="w-full">
                  <AnimatedGradientBorder className="w-full h-full">
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6">
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mt-8 space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AI</span>
                          </div>
                          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              Tell me about your experience with React...
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 justify-end">
                          <div className="flex-1 bg-blue-600 rounded-lg p-3 max-w-xs">
                            <p className="text-sm text-white">
                              I have 3 years of experience building React applications...
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 mt-6">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </AnimatedGradientBorder>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
      </HeroHighlight>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: "10K+", label: "Interviews Completed", icon: Target },
              { number: "95%", label: "Success Rate", icon: CheckCircle },
              { number: "2K+", label: "Happy Users", icon: Users },
              { number: "24/7", label: "AI Availability", icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <Spotlight className="w-full">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Choose <Highlight>InterviewCoach?</Highlight>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the future of interview preparation with our cutting-edge AI technology
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Practice",
                  description:
                    "Practice with our intelligent AI that adapts to your responses and provides realistic interview scenarios tailored to your industry.",
                  icon: "🤖",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Instant Feedback",
                  description:
                    "Get immediate, detailed feedback on your answers to improve your communication and interview skills with actionable insights.",
                  icon: "⚡",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Track Progress",
                  description:
                    "Monitor your improvement over time with detailed performance analytics, skill assessments, and personalized recommendations.",
                  icon: "📊",
                  gradient: "from-green-500 to-teal-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <CardContainer>
                    <CardBody className="bg-white dark:bg-gray-800 relative group/card rounded-xl border border-black/[0.1] dark:border-white/[0.2] w-full h-auto p-6 hover:shadow-2xl transition-all duration-300">
                      <CardItem translateZ={50} className="w-full">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-6 mx-auto`}
                        >
                          {feature.icon}
                        </div>
                      </CardItem>
                      <CardItem translateZ={60} className="w-full">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center">
                          {feature.title}
                        </h3>
                      </CardItem>
                      <CardItem translateZ={40} className="w-full">
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                          {feature.description}
                        </p>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>
          </div>
        </Spotlight>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our <Highlight>Users Say</Highlight>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Join thousands of professionals who have transformed their interview skills
            </p>
          </motion.div>
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>
      </section>

      {/* CTA Section with Lamp Effect */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Ready to Ace <br /> Your Next Interview?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto text-center"
        >
          Join thousands of professionals who have improved their interview skills with InterviewCoach.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="rounded-full px-8 py-6 text-lg font-medium transform transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
          >
            <Link href="/auth">Start Practicing Now</Link>
          </Button>
        </motion.div>
      </LampContainer>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">IC</span>
                </div>
                <span className="font-semibold text-xl text-white">InterviewCoach</span>
              </div>
              <p className="max-w-xs">Helping you prepare for interviews with AI-powered coaching and feedback.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} InterviewCoach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
