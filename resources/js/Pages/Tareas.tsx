import { AssignTaskDialog } from "@/Components/assign-task-dialog";
import { CreateSubtaskDialog } from "@/Components/create-subtask-dialog";
import { CreateTaskDialog } from "@/Components/create-task-dialog";
import { DeleteTaskDialog } from "@/Components/delete-task-dialog";
import { EditTaskDialog } from "@/Components/edit-task-dialog";
import { FileUploadDialog } from "@/Components/tasks/file-upload-dialog";
import { TaskHeader } from "@/Components/tasks/task-header";
import { TaskList } from "@/Components/tasks/task-list";
import { TaskTabs } from "@/Components/tasks/task-tabs";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { TabsContent } from "@radix-ui/react-tabs";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Tarea, Grupo, PageProps as InertiaPageProps } from "@/types";

export interface PageProps extends InertiaPageProps {
  tareasAsignadas: Tarea[];
  tareasGrupales: Tarea[];
  tareasIndividuales: Tarea[];
  gruposCreados: Grupo[];
  [key: string]: any;
}

export default function TareasPage() {
  const { tareasAsignadas, tareasGrupales, tareasIndividuales, gruposCreados } = usePage<PageProps>().props;
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openCreateSubtask, setOpenCreateSubtask] = useState(false);
  const [openAssignTask, setOpenAssignTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedSubtask, setSelectedSubtask] = useState<any>(null);
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, { name: string; type: string }>>({});

  const toggleTaskExpand = (taskId: number) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setOpenEditTask(true);
  };

  const handleDeleteTask = (task: any) => {
    setSelectedTask(task);
    setOpenDeleteTask(true);
  };

  const handleCreateSubtask = (task: any) => {
    setSelectedTask(task);
    setOpenCreateSubtask(true);
  };

  const handleAssignTask = (task: any) => {
    setSelectedTask(task);
    setOpenAssignTask(true);
  };

  const handleSubtaskCheckbox = (taskId: number, subtask: any) => {
    if (subtask.completada) {
      // Si ya está completada, no hacemos nada
      return;
    }

    // Seleccionamos la subtarea y abrimos el diálogo de subida
    setSelectedSubtask({ ...subtask, taskId });
    setOpenUploadFile(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedSubtask) return;

    // Verificamos que sea un archivo permitido
    const fileType = file.name.split(".").pop()?.toLowerCase();
    const allowedTypes = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];

    if (!allowedTypes.includes(fileType || "")) {
      alert("Por favor, sube un archivo de Word, Excel o PowerPoint");
      return;
    }

    // Simulamos la subida del archivo (en una aplicación real, aquí se haría la subida al servidor)
    let fileIcon = "document";
    if (["xls", "xlsx"].includes(fileType || "")) {
      fileIcon = "spreadsheet";
    } else if (["ppt", "pptx"].includes(fileType || "")) {
      fileIcon = "presentation";
    }

    // Guardamos la información del archivo
    setUploadedFiles((prev) => ({
      ...prev,
      [selectedSubtask.id]: { name: file.name, type: fileIcon },
    }));

    // Cerramos el diálogo
    setOpenUploadFile(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TaskHeader onCreateTask={() => setOpenCreateTask(true)} />

        <TaskTabs>
          <TabsContent value="asignadas" className="space-y-4">
            <TaskList
              tasks={tareasAsignadas}
              expandedTasks={expandedTasks}
              toggleTaskExpand={toggleTaskExpand}
              handleEditTask={handleEditTask}
              handleAssignTask={handleAssignTask}
              handleCreateSubtask={handleCreateSubtask}
              handleDeleteTask={handleDeleteTask}
              handleSubtaskCheckbox={handleSubtaskCheckbox}
              uploadedFiles={uploadedFiles}
            />
          </TabsContent>

          <TabsContent value="grupales" className="space-y-4">
            <TaskList
              tasks={tareasGrupales}
              expandedTasks={expandedTasks}
              toggleTaskExpand={toggleTaskExpand}
              handleEditTask={handleEditTask}
              handleAssignTask={handleAssignTask}
              handleCreateSubtask={handleCreateSubtask}
              handleDeleteTask={handleDeleteTask}
              handleSubtaskCheckbox={handleSubtaskCheckbox}
              uploadedFiles={uploadedFiles}
            />
          </TabsContent>

          <TabsContent value="individuales" className="space-y-4">
            <TaskList
              tasks={tareasIndividuales}
              expandedTasks={expandedTasks}
              toggleTaskExpand={toggleTaskExpand}
              handleEditTask={handleEditTask}
              handleAssignTask={handleAssignTask}
              handleCreateSubtask={handleCreateSubtask}
              handleDeleteTask={handleDeleteTask}
              handleSubtaskCheckbox={handleSubtaskCheckbox}
              uploadedFiles={uploadedFiles}
            />
          </TabsContent>
        </TaskTabs>

        {/* Diálogos */}
        <CreateTaskDialog
          open={openCreateTask}
          onOpenChange={setOpenCreateTask}
          grupos={gruposCreados}
        />

        {selectedTask && (
          <>
            <EditTaskDialog
              open={openEditTask}
              onOpenChange={setOpenEditTask}
              task={selectedTask}
            />
            <CreateSubtaskDialog
              open={openCreateSubtask}
              onOpenChange={setOpenCreateSubtask}
              task={selectedTask}
            />
            <AssignTaskDialog
              open={openAssignTask}
              onOpenChange={setOpenAssignTask}
              task={selectedTask}
            />
            <DeleteTaskDialog
              open={openDeleteTask}
              onOpenChange={setOpenDeleteTask}
              task={selectedTask}
            />
          </>
        )}

        <FileUploadDialog
          open={openUploadFile}
          onOpenChange={setOpenUploadFile}
          onFileUpload={handleFileUpload}
        />
      </div>
    </DashboardLayout>
  );
}
