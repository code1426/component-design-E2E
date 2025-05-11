import { useEffect, useState } from "react";
import type { Task } from "@/types/task.type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Clock, AlarmClock, Edit, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TimedTaskProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
  onEdit?: (updatedTask: Task) => void;
}

const TimedTask = ({
  task,
  onToggleComplete,
  onRemove,
  onEdit,
}: TimedTaskProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
  );

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!task.dueDate) return "";

      const now = new Date();
      const dueDate = new Date(task.dueDate);
      const diff = dueDate.getTime() - now.getTime();

      if (diff <= 0) return "Overdue";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `${days}d ${hours}h remaining`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
      } else {
        return `${minutes}m remaining`;
      }
    };

    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [task.dueDate]);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  // Get the appropriate color for the time remaining
  const getTimeColor = () => {
    if (timeRemaining === "Overdue") return "text-red-500";
    if (timeRemaining.includes("d")) return "text-green-500"; // Days remaining
    if (timeRemaining.includes("h")) return "text-yellow-500"; // Hours remaining
    return "text-orange-500"; // Minutes remaining
  };

  const getTimeBackground = () => {
    if (timeRemaining === "Overdue") return "bg-red-100";
    if (timeRemaining.includes("d")) return "bg-green-100"; // Days remaining
    if (timeRemaining.includes("h")) return "bg-yellow-100"; // Hours remaining
    return "bg-orange-100"; // Minutes remaining
  };

  const handleEdit = () => {
    if (onEdit) {
      const updatedTask = {
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate ? new Date(editedDueDate) : undefined,
      };
      onEdit(updatedTask);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setEditedDueDate(
      task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
    );
    setIsEditing(false);
  };

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        task.completed ? "bg-gray-50" : "bg-white"
      } border-l-4 border-l-blue-500 ${
        isEditing ? "ring-2 ring-blue-300" : ""
      }`}
    >
      <CardHeader className="p-3 flex flex-row items-start space-y-0 gap-2">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            id={`task-${task.id}`}
            className="h-5 w-5 border-blue-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
          />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="font-semibold text-base border-blue-300 focus:border-blue-500"
              placeholder="Task title"
            />
          ) : (
            <CardTitle className="text-base font-semibold">
              <label
                htmlFor={`task-${task.id}`}
                className={`cursor-pointer ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </label>
            </CardTitle>
          )}
          <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
            <Clock className="h-3 w-3" />
            <span className="font-medium">Timed Task</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        {isEditing ? (
          <>
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-sm border-blue-300 focus:border-blue-500 min-h-[60px] mb-2"
              placeholder="Task description"
            />
            <div>
              <label
                htmlFor={`due-date-${task.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Due Date & Time
              </label>
              <Input
                id={`due-date-${task.id}`}
                type="datetime-local"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="text-sm border-blue-300 focus:border-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            {task.description && (
              <p
                className={`text-sm mb-2 ${
                  task.completed ? "text-gray-500" : "text-gray-700"
                }`}
              >
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-700">
                    Due: {formatDate(task.dueDate)}
                  </p>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTimeBackground()}`}
                  >
                    <span className={getTimeColor()}>{timeRemaining}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium mt-1 bg-blue-50 p-2 rounded-md">
                  <AlarmClock className={`h-4 w-4 ${getTimeColor()}`} />
                  <span className={getTimeColor()}>{timeRemaining}</span>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      <CardFooter className="p-3 pt-0 justify-end gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={cancelEdit}
              className="h-8 px-2 border-gray-300 hover:bg-gray-100"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleEdit}
              className="h-8 px-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </>
        ) : (
          <>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-gray-200"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default TimedTask;
