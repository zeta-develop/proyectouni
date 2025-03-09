import { Plus } from "lucide-react"
import { Button } from "../ui/button"

interface TaskHeaderProps {
  onCreateTask: () => void
}

export function TaskHeader({ onCreateTask }: TaskHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tareas</h1>
        <p className="text-muted-foreground">Gestiona tus tareas individuales y grupales</p>
      </div>
      <Button className="w-full sm:w-auto" onClick={onCreateTask}>
        <Plus className="mr-2 h-4 w-4" />
        Nueva Tarea
      </Button>
    </div>
  )
}

