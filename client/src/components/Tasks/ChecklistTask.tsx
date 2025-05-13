import type React from "react";
import { useState } from "react";
import type { Task, ChecklistItem } from "@/types/task.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, X } from "lucide-react";
import DeleteTaskDialog from "./DeleteTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ChecklistTaskProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
  onToggleChecklistItem: (itemId: string) => void;
  onAddChecklistItem?: (text: string) => void;
  onRemoveChecklistItem?: (itemId: string) => void;
  onEdit: (updatedTask: Task) => void;
}

export const ChecklistTask: React.FC<ChecklistTaskProps> = ({
  task,
  onToggleComplete,
  onRemove,
  onToggleChecklistItem,
  onAddChecklistItem,
  onRemoveChecklistItem,
  onEdit,
}) => {
  const [newText, setNewText] = useState("");
  const items: ChecklistItem[] = task.checklistItems ?? [];

  const addItem = () => {
    if (!newText.trim() || !onAddChecklistItem) return;
    onAddChecklistItem(newText.trim());
    setNewText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <Card
      className={`transition-all hover:shadow-md border-l-4 border-green-500 relative ${
        task.completed ? "bg-gray-50" : "bg-white"
      }`}
    >
      <CardHeader className="flex justify-between p-3 border-b">
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200"
          >
            Task # {task.id}
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200"
          >
            Checklist
          </Badge>
          {task.dueDate && (
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-800 flex items-center space-x-1"
            >
              <Clock className="h-3 w-3" />
              <span className="text-xs">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              Checklist
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <h3
            className={`text-left font-bold text-base truncate mb-1 ${
              task.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
          <div className="h-16 mb-2">
            {task.description && (
              <p className="text-sm text-left text-gray-700 overflow-y-auto">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-3 md:ml-0">
          <div className="flex flex-col h-full">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Checklist Items
            </h4>

            <div className="flex-1 overflow-hidden">
              <div className="max-h-24 overflow-y-auto pr-1 custom-scrollbar">
                {items.length > 0 ? (
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-1 text-sm"
                      >
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => onToggleChecklistItem(item.id)}
                          id={`item-${item.id}`}
                          className="h-4 w-4 border-green-400 data-[state=checked]:bg-green-600"
                        />
                        <Label
                          className={`flex-1 truncate text-sm ${
                            item.completed
                              ? "line-through text-gray-500"
                              : "text-gray-700"
                          }`}
                        >
                          {item.text}
                        </Label>
                        {onRemoveChecklistItem && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveChecklistItem(item.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">No items yet</p>
                )}
              </div>
            </div>

            {onAddChecklistItem && (
              <div className="flex items-center gap-1 mt-2">
                <Input
                  placeholder="Add item"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-7 text-sm"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addItem}
                  className="h-7 w-7 p-0 bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 flex justify-between items-center border-t mt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            id={task.id}
            className="h-4 w-4 bg-white border-black"
          />
          <span className="text-sm">Mark as complete</span>
        </div>
        <div className="space-x-2">
          <EditTaskDialog task={task} onSave={onEdit} />
          <DeleteTaskDialog onConfirm={onRemove} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChecklistTask;
