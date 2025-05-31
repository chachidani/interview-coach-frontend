import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">IC</span>
            </div>
            <Link href="/dashboard" className="font-semibold text-xl">
              InterviewCoach
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/performance" className="text-sm font-medium text-muted-foreground">
              Performance
            </Link>
            <Link href="/settings" className="text-sm font-medium text-muted-foreground">
              Settings
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-8 space-y-6">{children}</main>
    </div>
  )
}
