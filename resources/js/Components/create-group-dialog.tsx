"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Textarea } from "./ui/textarea"

export function CreateGroupDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (newGroup: any) => void
}) {
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [groupCode, setGroupCode] = useState("")

  // Generar un código aleatorio para el grupo
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setGroupCode(result)
  }

  // Generar un código al abrir el diálogo
  useEffect(() => {
    if (open && !groupCode) {
      generateRandomCode()
    }
  }, [open])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    onCreate({
      nombre: groupName,
      descripcion: groupDescription,
      codigo: groupCode,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Crear nuevo grupo</DialogTitle>
          <DialogDescription>Completa los detalles para crear un nuevo grupo de estudio</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
            <div className="grid gap-2">
              <Label htmlFor="group-name">Nombre del grupo</Label>
              <Input
                id="group-name"
                placeholder="Ej: Matemáticas Avanzadas"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="group-description">Descripción</Label>
              <Textarea
                id="group-description"
                placeholder="Describe el propósito del grupo"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="w-full resize-none"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="group-code">Código del grupo</Label>
                <Button variant="ghost" size="sm" type="button" onClick={generateRandomCode} className="h-8 px-2 text-xs">
                  Generar nuevo
                </Button>
              </div>
              <Input
                id="group-code"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                className="font-mono text-center uppercase"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Comparte este código con tus compañeros para que puedan unirse al grupo
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Miembros iniciales</Label>
              <div className="flex items-center gap-2 p-3 border rounded-md">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Tu" />
                  <AvatarFallback>TU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Tú (Administrador)</p>
                  <p className="text-xs text-muted-foreground">usuario@ejemplo.com</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Crear grupo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

