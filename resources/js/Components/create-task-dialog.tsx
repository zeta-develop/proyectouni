import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { Grupo } from "@/types"
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export interface PageProps extends InertiaPageProps {
  grupos: Grupo[];
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  grupos
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  grupos: any[]
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    router.post("/tareas", {
      titulo: title,
      descripcion: description,
      fecha_entrega: dueDate,
      grupo_id: selectedGroup,
    }, {
      onSuccess: () => {
        setTitle("")
        setDescription("")
        setDueDate("")
        setSelectedGroup("")
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Crear nueva tarea</DialogTitle>
          <DialogDescription>Completa los detalles para crear una nueva tarea</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Fecha de entrega</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="group">Grupo</Label>
              <Select onValueChange={setSelectedGroup} value={selectedGroup}>
                <SelectTrigger id="group" className="w-full">
                  <SelectValue placeholder="Selecciona un grupo" />
                </SelectTrigger>
                <SelectContent>
                  {grupos.map((grupo) => (
                    <SelectItem key={grupo.id} value={grupo.id}>
                      {grupo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Crear tarea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

