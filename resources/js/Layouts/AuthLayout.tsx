import type React from "react"
import { School } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <School className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">ProActiva</h1>
          </Link>
          <h2 className="mt-2 text-lg text-gray-600 dark:text-gray-400">Sistema de Gestión Estudiantil</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
      </div>
    </div>
  )
}

