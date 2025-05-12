import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckSquare, Plus, X } from "lucide-react";
import type { Task } from "@/types/task.type";

// Define the schema for task validation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  type: z.enum(["basic", "timed", "checklist"]),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm = ({ onSubmit, onCancel }: TaskFormProps) => {
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [showDateFields, setShowDateFields] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      type: "basic",
    },
  });

  const taskType = watch("type");

  // Update date fields visibility based on task type
  useEffect(() => {
    setShowDateFields(taskType === "timed" || taskType === "checklist");
  }, [taskType]);

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklistItems([...checklistItems, newChecklistItem]);
      setNewChecklistItem("");
    }
  };

  const handleRemoveChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data: TaskFormValues) => {
    let dueDate: Date | undefined = undefined;

    if ((data.type === "timed" || data.type === "checklist") && data.date) {
      const dateStr = data.time
        ? `${data.date}T${data.time}:00`
        : `${data.date}T00:00:00`;
      dueDate = new Date(dateStr);
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description || "",
      completed: false,
      dueDate,
      type: data.type,
    };

    if (data.type === "checklist" && checklistItems.length > 0) {
      newTask.checklistItems = checklistItems.map((item, index) => ({
        id: `cl-${Date.now()}-${index}`,
        text: item,
        completed: false,
      }));
    }

    onSubmit(newTask);
  };

  const getTabStyle = (value: string) => {
    switch (value) {
      case "basic":
        return "bg-purple-100 data-[state=active]:bg-purple-200 text-purple-800";
      case "timed":
        return "bg-blue-100 data-[state=active]:bg-blue-200 text-blue-800";
      case "checklist":
        return "bg-green-100 data-[state=active]:bg-green-200 text-green-800";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Tabs
        value={taskType}
        onValueChange={(value) => setValue("type", value as any)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4 space-x-2 justify-between">
          <TabsTrigger
            value="basic"
            className={`flex items-center gap-2 px-4 py-2 rounded ${getTabStyle(
              "basic"
            )}`}
          >
            <FileText className="h-4 w-4" />
            <span>Basic</span>
          </TabsTrigger>
          <TabsTrigger
            value="timed"
            className={`flex items-center gap-2 px-4 py-2 rounded ${getTabStyle(
              "timed"
            )}`}
          >
            <Clock className="h-4 w-4" />
            <span>Timed</span>
          </TabsTrigger>
          <TabsTrigger
            value="checklist"
            className={`flex items-center gap-2 px-4 py-2 rounded ${getTabStyle(
              "checklist"
            )}`}
          >
            <CheckSquare className="h-4 w-4" />
            <span>Checklist</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
            Title
          </Label>
          <Input
            id="title"
            {...register("title")}
            className={errors.title ? "border-red-500" : ""}
            placeholder="Task title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Task description"
            rows={3}
          />
        </div>

        {showDateFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Due Date</Label>
              <input
                type="date"
                {...register("date")}
                className="w-full border p-2"
              />
            </div>
            <div>
              <Label htmlFor="time">Due Time</Label>
              <input
                type="time"
                {...register("time")}
                className="w-full border p-2"
              />
            </div>
          </div>
        )}

        {taskType === "checklist" && (
          <div className="border border-green-200 p-4 rounded-md bg-green-50 space-y-3">
            <Label>Checklist Items</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add checklist item"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                className="border-green-300"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddChecklistItem}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {checklistItems.length > 0 && (
              <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                {checklistItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-white p-2 rounded border border-green-200"
                  >
                    <span className="flex-1 truncate">• {item}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleRemoveChecklistItem(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-black text-white">
          Create Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
