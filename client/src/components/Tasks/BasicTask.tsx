import { useState } from "react";
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
import { Trash2, FileText, Edit, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicTaskProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
  onEdit?: (updatedTask: Task) => void;
}

const BasicTask = ({
  task,
  onToggleComplete,
  onRemove,
  onEdit,
}: BasicTaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const handleEdit = () => {
    if (onEdit) {
      const updatedTask = {
        ...task,
        title: editedTitle,
        description: editedDescription,
      };
      onEdit(updatedTask);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setIsEditing(false);
  };

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        task.completed ? "bg-gray-50" : "bg-white"
      } border-l-4 border-l-purple-500 ${
        isEditing ? "ring-2 ring-purple-300" : ""
      }`}
    >
      <CardHeader className="p-3 flex flex-row items-start space-y-0 gap-2">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            id={`task-${task.id}`}
            className="h-5 w-5 border-purple-400 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
          />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="font-semibold text-base border-purple-300 focus:border-purple-500"
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
          <div className="flex items-center gap-1 text-xs text-purple-600 mt-1">
            <FileText className="h-3 w-3" />
            <span className="font-medium">Basic Task</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="text-sm border-purple-300 focus:border-purple-500 min-h-[60px]"
            placeholder="Task description"
          />
        ) : (
          task.description && (
            <p
              className={`text-sm ${
                task.completed ? "text-gray-500" : "text-gray-700"
              }`}
            >
              {task.description}
            </p>
          )
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
              className="h-8 px-2 bg-purple-600 hover:bg-purple-700 text-white"
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
                className="h-8 px-2 text-purple-600 border-purple-200 hover:bg-purple-50"
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

export default BasicTask;
