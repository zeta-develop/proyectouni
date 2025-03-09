import type React from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function FileUploadDialog({ open, onOpenChange, onFileUpload }: FileUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] p-3 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Subir entregable</DialogTitle>
          <DialogDescription>
            Para marcar esta subtarea como completada, debes subir un archivo de Word, Excel o PowerPoint.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-2 sm:py-4">
          <div className="grid gap-2">
            <Label htmlFor="file-upload">Archivo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={onFileUpload}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Formatos permitidos: Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx)
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="button" className="w-full sm:w-auto" disabled>
            Subir archivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

