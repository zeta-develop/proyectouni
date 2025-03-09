import { TaskCard } from "./task-card"

interface TaskListProps {
  tasks: any[]
  expandedTasks: number[]
  toggleTaskExpand: (taskId: number) => void
  handleEditTask: (task: any) => void
  handleAssignTask: (task: any) => void
  handleCreateSubtask: (task: any) => void
  handleDeleteTask: (task: any) => void
  handleSubtaskCheckbox: (taskId: number, subtask: any) => void
  uploadedFiles: Record<number, { name: string; type: string }>
}

export function TaskList({
  tasks,
  expandedTasks,
  toggleTaskExpand,
  handleEditTask,
  handleAssignTask,
  handleCreateSubtask,
  handleDeleteTask,
  handleSubtaskCheckbox,
  uploadedFiles,
}: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isExpanded={expandedTasks.includes(task.id)}
          onToggleExpand={() => toggleTaskExpand(task.id)}
          onEditTask={() => handleEditTask(task)}
          onAssignTask={() => handleAssignTask(task)}
          onCreateSubtask={() => handleCreateSubtask(task)}
          onDeleteTask={() => handleDeleteTask(task)}
          onSubtaskCheckbox={handleSubtaskCheckbox}
          uploadedFiles={uploadedFiles}
        />
      ))}
    </div>
  )
}

