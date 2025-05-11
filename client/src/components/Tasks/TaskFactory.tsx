import type { Task } from "@/types/task.type";
import BasicTask from "./BasicTask";
import TimedTask from "./TimedTask";
import ChecklistTask from "./ChecklistTask";

// Factory Pattern: Creates different types of task components based on the type parameter
interface TaskFactoryProps {
  type: string;
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
  onToggleChecklistItem?: (itemId: string) => void;
}

export function TaskFactory({
  type,
  task,
  onToggleComplete,
  onRemove,
  onToggleChecklistItem,
}: TaskFactoryProps) {
  switch (type) {
    case "basic":
      const basicTask = { ...task, dueDate: undefined };
      return (
        <BasicTask
          task={basicTask}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      );
    case "timed":
      return (
        <TimedTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      );
    case "checklist":
      return (
        <ChecklistTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
          onToggleChecklistItem={onToggleChecklistItem}
        />
      );
    default:
      const defaultTask = { ...task, dueDate: undefined };
      return (
        <BasicTask
          task={defaultTask}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      );
  }
}
