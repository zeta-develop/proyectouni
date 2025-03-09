import { useState } from "react"

import { router } from "@inertiajs/react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

export function JoinGroupDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [groupCode, setGroupCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [groupFound, setGroupFound] = useState<{ nombre: string; codigo: string } | null>(null)

  // Simular búsqueda de grupo
  const searchGroup = () => {
    if (groupCode.length < 6) return

    setIsSearching(true)

    // Simulamos una búsqueda con un timeout
    setTimeout(() => {
      setIsSearching(false)

      // Simulamos que encontramos un grupo si el código tiene 6 caracteres
      if (groupCode.length === 6) {
        setGroupFound({
          nombre: "Grupo de " + groupCode,
          codigo: groupCode,
        })
      } else {
        setGroupFound(null)
      }
    }, 1000)
  }

  const handleJoinGroup = () => {
    router.post('/grupos/join', { codigo: groupCode }, {
      onSuccess: () => {
        setGroupCode("")
        setGroupFound(null)
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Unirse a un grupo</DialogTitle>
          <DialogDescription>Ingresa el código del grupo al que deseas unirte</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
          <div className="grid gap-2">
            <Label htmlFor="join-group-code">Código del grupo</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="join-group-code"
                placeholder="Ej: ABC123"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                className="font-mono text-center uppercase w-full"
                maxLength={6}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={searchGroup}
                disabled={groupCode.length < 3 || isSearching}
                className="w-full sm:w-auto"
              >
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">El código debe tener 6 caracteres alfanuméricos</p>
          </div>

          {groupFound && (
            <div className="grid gap-2 mt-2">
              <Label>Grupo encontrado</Label>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium">{groupFound.nombre}</h3>
                <p className="text-sm text-muted-foreground">Código: {groupFound.codigo}</p>
                <p className="text-sm mt-2">¿Deseas unirte a este grupo?</p>
              </div>
            </div>
          )}

          {groupCode.length === 6 && !groupFound && !isSearching && (
            <div className="p-3 border border-destructive/50 bg-destructive/10 rounded-md text-sm">
              No se encontró ningún grupo con el código {groupCode}. Verifica el código e intenta nuevamente.
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="submit" className="w-full sm:w-auto" onClick={handleJoinGroup} disabled={!groupFound}>
            Unirse al grupo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

