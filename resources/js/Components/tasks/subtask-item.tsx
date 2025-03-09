import { CheckCircle, FileText, FileSpreadsheet, FileIcon as FilePresentation } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface SubtaskItemProps {
  subtask: any
  taskId: number
  onCheckboxClick: (taskId: number, subtask: any) => void
  uploadedFile?: { name: string; type: string }
}

export function SubtaskItem({ subtask, taskId, onCheckboxClick, uploadedFile }: SubtaskItemProps) {
  return (
    <li className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => onCheckboxClick(taskId, subtask)}
            className={`h-5 w-5 rounded border flex items-center justify-center ${
              subtask.completada ? "bg-primary border-primary" : "border-muted-foreground hover:border-primary"
            }`}
          >
            {subtask.completada && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
          </button>
        </div>
        <div className="flex flex-col">
          <span className={`text-sm truncate ${subtask.completada ? "line-through text-muted-foreground" : ""}`}>
            {subtask.titulo}
          </span>
          {uploadedFile && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              {uploadedFile.type === "document" && <FileText className="h-3 w-3" />}
              {uploadedFile.type === "spreadsheet" && <FileSpreadsheet className="h-3 w-3" />}
              {uploadedFile.type === "presentation" && <FilePresentation className="h-3 w-3" />}
              <span className="truncate">{uploadedFile.name}</span>
            </div>
          )}
        </div>
      </div>
      {subtask.asignado && (
        <div className="flex items-center gap-1 ml-6">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={subtask.asignado} />
            <AvatarFallback>{subtask.asignado.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{subtask.asignado}</span>
        </div>
      )}
    </li>
  )
}

