
import { Clock, CheckCircle, AlertCircle, MoreVertical, ChevronDown, ChevronUp, User } from "lucide-react"
import { SubtaskList } from "./subtask-list"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
interface TaskCardProps {
  task: any
  isExpanded: boolean
  onToggleExpand: () => void
  onEditTask: () => void
  onAssignTask: () => void
  onCreateSubtask: () => void
  onDeleteTask: () => void
  onSubtaskCheckbox: (taskId: number, subtask: any) => void
  uploadedFiles: Record<number, { name: string; type: string }>
}

export function TaskCard({
  task,
  isExpanded,
  onToggleExpand,
  onEditTask,
  onAssignTask,
  onCreateSubtask,
  onDeleteTask,
  onSubtaskCheckbox,
  uploadedFiles,
}: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="flex items-center gap-2">
            {task.estado === "pendiente" ? (
              <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
            ) : task.estado === "en_progreso" ? (
              <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            )}
            <span className="line-clamp-1">{task.titulo}</span>
            {task.esGrupal && (
              <Badge variant="outline" className="ml-2">
                Grupal
              </Badge>
            )}
          </span>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 mt-2 sm:mt-0">
            <span className="text-xs sm:text-sm font-normal text-muted-foreground whitespace-nowrap">
              Vence: {task.fechaEntrega}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Opciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEditTask}>Editar tarea</DropdownMenuItem>
                {task.esGrupal && <DropdownMenuItem onClick={onAssignTask}>Asignar tarea</DropdownMenuItem>}
                <DropdownMenuItem onClick={onCreateSubtask}>Añadir subtarea</DropdownMenuItem>
                <DropdownMenuItem onClick={onDeleteTask} className="text-destructive">
                  Eliminar tarea
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <p className="text-sm">{task.descripcion}</p>
          {task.esGrupal && <p className="text-sm text-muted-foreground">Grupo: {task.grupo}</p>}
          {task.asignado && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Asignado a: {task.asignado}</p>
            </div>
          )}
          <div className="w-full h-2 bg-secondary rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: `${task.progreso}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{task.progreso}% completado</span>
            <span>{task.subtareas.length} subtareas</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center mt-2"
            onClick={onToggleExpand}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Ocultar subtareas
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Ver subtareas
              </>
            )}
          </Button>

          {isExpanded && (
            <SubtaskList
              subtasks={task.subtareas}
              taskId={task.id}
              onCheckboxClick={onSubtaskCheckbox}
              onAddSubtask={onCreateSubtask}
              uploadedFiles={uploadedFiles}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

