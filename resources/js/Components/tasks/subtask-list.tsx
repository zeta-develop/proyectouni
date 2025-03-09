import { Plus } from "lucide-react"
import { SubtaskItem } from "./subtask-item"
import { Button } from "../ui/button"

interface SubtaskListProps {
  subtasks: any[]
  taskId: number
  onCheckboxClick: (taskId: number, subtask: any) => void
  onAddSubtask: () => void
  uploadedFiles: Record<number, { name: string; type: string }>
}

export function SubtaskList({ subtasks, taskId, onCheckboxClick, onAddSubtask, uploadedFiles }: SubtaskListProps) {
  return (
    <div className="mt-2 space-y-2 border-t pt-2">
      <h4 className="text-sm font-medium">Subtareas</h4>
      <ul className="space-y-2">
        {subtasks.map((subtask) => (
          <SubtaskItem
            key={subtask.id}
            subtask={subtask}
            taskId={taskId}
            onCheckboxClick={onCheckboxClick}
            uploadedFile={uploadedFiles[subtask.id]}
          />
        ))}
      </ul>
      <Button variant="outline" size="sm" className="w-full" onClick={onAddSubtask}>
        <Plus className="h-3 w-3 mr-1" />
        Añadir subtarea
      </Button>
    </div>
  )
}

