import { AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"

export function DeleteTaskDialog({
  open,
  onOpenChange,
  task,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Eliminar tarea
          </DialogTitle>
          <DialogDescription>¿Estás seguro de que deseas eliminar la tarea "{task?.titulo}"?</DialogDescription>
        </DialogHeader>
        <div className="py-2 sm:py-4">
          <p className="text-sm text-muted-foreground">
            Esta acción no se puede deshacer. Se eliminará permanentemente la tarea y todas sus subtareas.
          </p>

          {task?.esGrupal && (
            <p className="text-sm text-muted-foreground mt-2">
              Esta es una tarea grupal. Todos los miembros del grupo "{task?.grupo}" perderán acceso a esta tarea.
            </p>
          )}
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button variant="destructive" type="submit" className="w-full sm:w-auto">
            Eliminar tarea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

