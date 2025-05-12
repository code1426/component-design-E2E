import type { Task } from "@/types/task.type";
import { BasicTask } from "./BasicTask";
import { TimedTask } from "./TimedTask";
import { ChecklistTask } from "./ChecklistTask";

// Factory Pattern: Creates different types of task components based on the type parameter
interface TaskFactoryProps {
  type: string;
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
  onToggleChecklistItem?: (itemId: string) => void;
  onEdit: (updatedTask: Task) => void;
}

export function TaskFactory({
  type,
  task,
  onToggleComplete,
  onRemove,
  onToggleChecklistItem = () => {},
  onEdit,
}: TaskFactoryProps) {
  switch (type) {
    case "basic":
      return (
        <BasicTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      );
    case "timed":
      return (
        <TimedTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      );
    case "checklist":
      return (
        <ChecklistTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
          onToggleChecklistItem={onToggleChecklistItem}
          onEdit={onEdit}
        />
      );
    default:
      return (
        <BasicTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      );
  }
}
