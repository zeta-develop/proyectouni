import { useState, useEffect } from "react"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"

export function EditTaskDialog({
  open,
  onOpenChange,
  task,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any
}) {
  const [title, setTitle] = useState(task?.titulo || "")
  const [description, setDescription] = useState(task?.descripcion || "")
  const [date, setDate] = useState<Date | undefined>(
    task?.fechaEntrega ? new Date(task.fechaEntrega.split("/").reverse().join("-")) : undefined,
  )
  const [isGroupTask, setIsGroupTask] = useState(task?.esGrupal || false)
  const [group, setGroup] = useState(task?.grupo || "")

  useEffect(() => {
    if (task) {
      setTitle(task.titulo || "")
      setDescription(task.descripcion || "")
      setDate(task.fechaEntrega ? new Date(task.fechaEntrega.split("/").reverse().join("-")) : undefined)
      setIsGroupTask(task.esGrupal || false)
      setGroup(task.grupo || "")
    }
  }, [task])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
          <DialogDescription>Modifica los detalles de la tarea</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Descripción</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-date">Fecha de entrega</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="edit-group-task" checked={isGroupTask} onCheckedChange={setIsGroupTask} />
            <Label htmlFor="edit-group-task">Tarea grupal</Label>
          </div>

          {isGroupTask && (
            <div className="grid gap-2">
              <Label htmlFor="edit-group">Grupo</Label>
              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger id="edit-group">
                  <SelectValue placeholder="Seleccionar grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matemáticas Avanzadas">Matemáticas Avanzadas</SelectItem>
                  <SelectItem value="Estadística Aplicada">Estadística Aplicada</SelectItem>
                  <SelectItem value="Literatura Contemporánea">Literatura Contemporánea</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

