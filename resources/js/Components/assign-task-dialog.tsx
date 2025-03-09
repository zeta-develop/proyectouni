import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function AssignTaskDialog({
  open,
  onOpenChange,
  task,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any
}) {
  const [assignee, setAssignee] = useState(task?.asignado || "")

  useEffect(() => {
    if (task) {
      setAssignee(task.asignado || "")
    }
  }, [task])

  // Datos de ejemplo para miembros del grupo
  const miembros = ["Juan Pérez", "Ana García", "Carlos López", "María Rodríguez", "Pedro Sánchez", "Laura Martínez"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Asignar tarea</DialogTitle>
          <DialogDescription>Asigna la tarea "{task?.titulo}" a un miembro del grupo</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-assignee">Asignar a</Label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger id="task-assignee">
                <SelectValue placeholder="Seleccionar miembro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                {miembros.map((miembro) => (
                  <SelectItem key={miembro} value={miembro === "" ? "Sin asignar" : miembro}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" alt={miembro} />
                        <AvatarFallback>{miembro.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {miembro}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {assignee && (
            <div className="flex items-center gap-3 p-3 sm:p-4 border rounded-md">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt={assignee} />
                <AvatarFallback>{assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{assignee}</p>
                <p className="text-sm text-muted-foreground">{task?.grupo || "Grupo no especificado"}</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Asignar tarea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

