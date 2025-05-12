import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Plus, X } from "lucide-react";
import type { Task, ChecklistItem } from "@/types/task.type";

// Zod schema
const editTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean(),
  dueDate: z.string().optional(),
  dueTime: z.string().optional(),
  newItem: z.string().optional(),
});

type EditTaskForm = z.infer<typeof editTaskSchema>;

interface EditTaskDialogProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ task, onSave }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditTaskForm>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      completed: task.completed,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().slice(0, 10)
        : "",
      dueTime: task.dueDate
        ? new Date(task.dueDate).toTimeString().slice(0, 5)
        : "",
      newItem: "",
    },
  });
  const [open, setOpen] = React.useState(false);
  const [checklistItems, setChecklistItems] = React.useState<ChecklistItem[]>(
    task.checklistItems || []
  );

  const taskType = task.type;

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description || "",
      completed: task.completed,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().slice(0, 10)
        : "",
      dueTime: task.dueDate
        ? new Date(task.dueDate).toTimeString().slice(0, 5)
        : "",
      newItem: "",
    });
    setChecklistItems(task.checklistItems || []);
  }, [task, reset]);

  const onSubmit = (data: EditTaskForm) => {
    let updatedDueDate: Date | undefined;
    if (data.dueDate) {
      updatedDueDate = data.dueTime
        ? new Date(`${data.dueDate}T${data.dueTime}:00`)
        : new Date(`${data.dueDate}T00:00:00`);
    }

    const updated: Task = {
      ...task,
      title: data.title,
      description: data.description,
      completed: data.completed,
      dueDate: updatedDueDate,
    };
    if (taskType === "checklist") updated.checklistItems = checklistItems;
    onSave(updated);
    setOpen(false);
  };

  const addItem = () => {
    const text = watch("newItem");
    if (text?.trim()) {
      setChecklistItems([
        ...checklistItems,
        { id: `item-${Date.now()}`, text, completed: false },
      ]);
      setValue("newItem", "");
    }
  };

  const removeItem = (id: string) =>
    setChecklistItems(checklistItems.filter((i) => i.id !== id));
  const toggleItem = (id: string) =>
    setChecklistItems(
      checklistItems.map((i) =>
        i.id === id ? { ...i, completed: !i.completed } : i
      )
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>
            Edit {taskType.charAt(0).toUpperCase() + taskType.slice(1)} Task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="title"
              className={errors.title ? "text-red-500" : ""}
            >
              Title
            </Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} rows={3} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="completed"
              {...register("completed")}
              className="bg-white border-black"
            />
            <Label htmlFor="completed">Mark as completed</Label>
          </div>

          {(taskType === "timed" || taskType === "checklist") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <input
                  type="date"
                  id="dueDate"
                  {...register("dueDate")}
                  className="border p-2 rounded"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueTime">Due Time</Label>
                <input
                  type="time"
                  id="dueTime"
                  {...register("dueTime")}
                  className="border p-2 rounded"
                />
              </div>
            </div>
          )}

          {taskType === "checklist" && (
            <div className="border rounded-md p-3 space-y-3">
              <Label>Checklist Items</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="New item"
                  {...register("newItem")}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addItem())
                  }
                />
                <Button type="button" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {checklistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-2 border p-2 rounded"
                  >
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <span
                      className={
                        item.completed
                          ? "line-through text-gray-500 flex-1"
                          : "flex-1"
                      }
                    >
                      {item.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
