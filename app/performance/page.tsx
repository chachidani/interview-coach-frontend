"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, Download } from "lucide-react"

// Sample performance data
const performanceData = {
  overallScore: 82,
  totalInterviews: 12,
  totalHours: 8.5,
  scoreByCategory: [
    { name: "Technical Knowledge", score: 85 },
    { name: "Communication", score: 78 },
    { name: "Problem Solving", score: 90 },
    { name: "Cultural Fit", score: 75 },
  ],
  recentScores: [65, 72, 78, 80, 85, 82, 88],
  commonFeedback: [
    "Provides detailed technical explanations",
    "Could improve conciseness in responses",
    "Strong problem-solving approach",
    "Sometimes uses too many technical terms",
    "Good at explaining design decisions",
  ],
  improvementAreas: ["Behavioral question responses", "System design explanations", "Concise communication"],
}

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("all")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Performance Analytics"
        text="Track your interview performance and improvement over time."
      >
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.overallScore}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${performanceData.overallScore}%` }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.totalHours}</div>
            <p className="text-xs text-muted-foreground">+1.5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Problem Solving</div>
            <p className="text-xs text-muted-foreground">90% score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Breakdown</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Score Progression</CardTitle>
                <CardDescription>Your interview scores over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-end justify-between space-x-2">
                  {performanceData.recentScores.map((score, index) => (
                    <div key={index} className="relative flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-600 rounded-t-sm transition-all duration-500"
                        style={{ height: `${score}%` }}
                      ></div>
                      <span className="text-xs mt-2">#{index + 1}</span>
                      <span className="absolute bottom-[calc(100%+5px)] text-xs font-medium">{score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Performance by interview category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.scoreByCategory.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm font-medium">{category.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${category.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Common Feedback</CardTitle>
                <CardDescription>Recurring themes from your interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {performanceData.commonFeedback.map((feedback, index) => (
                    <li key={index} className="flex items-start">
                      <div
                        className={`mt-0.5 w-2 h-2  => (
                    <li key={index} className="flex items-start">
                      <div className={\`mt-0.5 w-2 h-2 rounded-full ${index < 3 ? "bg-green-500" : "bg-blue-500"}`}
                      ></div>
                      <span className="ml-2">{feedback}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Focus on these areas to improve your score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.improvementAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <span className="text-amber-600 font-medium">{index + 1}</span>
                        </div>
                        <span>{area}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Practice <ChevronDown className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
              <CardDescription>Detailed breakdown of your technical knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "JavaScript", score: 92 },
                  { name: "React", score: 88 },
                  { name: "CSS/SCSS", score: 85 },
                  { name: "TypeScript", score: 80 },
                  { name: "State Management", score: 78 },
                  { name: "Testing", score: 72 },
                  { name: "Performance Optimization", score: 75 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
              <CardDescription>Assessment of your communication and behavioral skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Clear Communication", score: 82 },
                  { name: "Problem Solving Approach", score: 90 },
                  { name: "Teamwork Examples", score: 75 },
                  { name: "Handling Pressure", score: 78 },
                  { name: "Adaptability", score: 85 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analysis</CardTitle>
              <CardDescription>AI-generated insights from your interview responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Key Strengths</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="ml-2">Strong technical knowledge in React and JavaScript fundamentals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="ml-2">Able to explain complex concepts in a structured way</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="ml-2">Good at providing specific examples from past experience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="ml-2">Demonstrates problem-solving approach clearly</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h3 className="font-medium text-amber-800 mb-2">Areas for Growth</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="ml-2">Responses could be more concise - focus on key points first</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="ml-2">System design explanations need more structure and clarity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="ml-2">Could improve on providing business impact of technical decisions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="ml-2">Behavioral responses would benefit from the STAR method</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Recommended Practice Areas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="ml-2">System design interviews with focus on scalability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="ml-2">Behavioral questions using the STAR method</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="ml-2">Concise technical explanations with business context</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
