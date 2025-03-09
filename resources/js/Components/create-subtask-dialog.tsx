import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CreateSubtaskDialog({ open, onOpenChange, task }: { open: boolean; onOpenChange: (open: boolean) => void; task: any }) {
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.post("/subtareas", {
      titulo: title,
      tarea_id: task.id,
      usuario_id: selectedUser,
    }, {
      onSuccess: () => {
        setTitle("");
        setSelectedUser("");
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Crear nueva subtarea</DialogTitle>
          <DialogDescription>Completa los detalles para crear una nueva subtarea</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título de la subtarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user">Asignar a</Label>
              <Select onValueChange={setSelectedUser} value={selectedUser}>
                <SelectTrigger id="user" className="w-full">
                  <SelectValue placeholder="Selecciona un miembro del grupo" />
                </SelectTrigger>
                <SelectContent>
                  {task.grupo?.miembros?.map((miembro: any) => (
                    <SelectItem key={miembro.id} value={miembro.id}>
                      {miembro.name}
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
              Crear subtarea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

