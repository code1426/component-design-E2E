import { useState } from "react";
import type { Task, ChecklistItem } from "@/types/task.type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, ListChecks, Clock, Edit, Check, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ChecklistTaskProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
  onToggleChecklistItem?: (itemId: string) => void;
  onEdit?: (updatedTask: Task) => void;
}

const ChecklistTask = ({
  task,
  onToggleComplete,
  onRemove,
  onToggleChecklistItem,
  onEdit,
}: ChecklistTaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
  );
  const [editedChecklistItems, setEditedChecklistItems] = useState<
    ChecklistItem[]
  >(task.checklistItems || []);
  const [newItemText, setNewItemText] = useState("");

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  const handleToggleChecklistItem = (itemId: string) => {
    if (onToggleChecklistItem) {
      onToggleChecklistItem(itemId);
    }
  };

  const handleAddChecklistItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: `new-${Date.now()}`,
        text: newItemText,
        completed: false,
      };
      setEditedChecklistItems([...editedChecklistItems, newItem]);
      setNewItemText("");
    }
  };

  const handleRemoveChecklistItem = (itemId: string) => {
    setEditedChecklistItems(
      editedChecklistItems.filter((item) => item.id !== itemId)
    );
  };

  const handleEdit = () => {
    if (onEdit) {
      const updatedTask = {
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate ? new Date(editedDueDate) : undefined,
        checklistItems: editedChecklistItems,
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
    setEditedChecklistItems(task.checklistItems || []);
    setIsEditing(false);
  };

  const completedItems =
    task.checklistItems?.filter((item) => item.completed).length || 0;
  const totalItems = task.checklistItems?.length || 0;
  const progress =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        task.completed ? "bg-gray-50" : "bg-white"
      } border-l-4 border-l-green-500 ${
        isEditing ? "ring-2 ring-green-300" : ""
      }`}
    >
      <CardHeader className="p-3 flex flex-row items-start space-y-0 gap-2">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            id={`task-${task.id}`}
            className="h-5 w-5 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
          />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="font-semibold text-base border-green-300 focus:border-green-500"
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
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <ListChecks className="h-3 w-3" />
            <span className="font-medium">Checklist Task</span>
          </div>
        </div>
        {!isEditing && task.dueDate && (
          <div className="flex items-center text-xs font-medium text-gray-700">
            <Clock className="h-3 w-3 mr-1" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-3 pt-0">
        {isEditing ? (
          <>
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-sm border-green-300 focus:border-green-500 min-h-[60px] mb-2"
              placeholder="Task description"
            />
            <div className="mb-3">
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
                className="text-sm border-green-300 focus:border-green-500"
              />
            </div>

            <div className="border border-green-200 p-3 rounded-md bg-green-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Checklist Items
              </label>

              <div className="flex gap-2 mb-2">
                <Input
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Add new item"
                  className="text-sm border-green-300 focus:border-green-500"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddChecklistItem}
                  className="h-8 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {editedChecklistItems.length > 0 ? (
                <ul className="space-y-1">
                  {editedChecklistItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 bg-white p-2 rounded border border-green-200"
                    >
                      <Input
                        value={item.text}
                        onChange={(e) => {
                          const updatedItems = editedChecklistItems.map((i) =>
                            i.id === item.id
                              ? { ...i, text: e.target.value }
                              : i
                          );
                          setEditedChecklistItems(updatedItems);
                        }}
                        className="text-sm border-green-200 flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveChecklistItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No checklist items yet. Add some above.
                </p>
              )}
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
              <p className="text-sm font-medium text-gray-700 mb-2">
                Due: {formatDate(task.dueDate)}
              </p>
            )}

            {task.checklistItems && task.checklistItems.length > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700 font-medium">Progress</span>
                  <span className="font-medium text-gray-700">
                    {completedItems}/{totalItems}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <ul className="mt-3 space-y-1.5">
                  {task.checklistItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-2 bg-green-50 p-2 rounded-md"
                    >
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() =>
                          handleToggleChecklistItem(item.id)
                        }
                        id={`item-${item.id}`}
                        className="mt-0.5 h-4 w-4 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                      />
                      <label
                        htmlFor={`item-${item.id}`}
                        className={`text-sm cursor-pointer ${
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {item.text}
                      </label>
                    </li>
                  ))}
                </ul>
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
              className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white"
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
                className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
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

export default ChecklistTask;
