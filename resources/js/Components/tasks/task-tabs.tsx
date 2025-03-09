import type { ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface TaskTabsProps {
  children: ReactNode
}

export function TaskTabs({ children }: TaskTabsProps) {
  return (
    <Tabs defaultValue="asignadas" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="asignadas">Asignadas</TabsTrigger>
        <TabsTrigger value="grupales">Grupales</TabsTrigger>
        <TabsTrigger value="individuales">Individuales</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

