import { useState } from "react";
import type { Task } from "@/types/task.type";
import { useToast } from "@/hooks/use-toast";

// Singleton Pattern: Using a custom hook instead of a class
export function TaskManager() {
  const baseUrl = "http://localhost:3001/api/tasks";
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  // Add a new task
  const addTask = async (task: Task) => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to add task");
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      toast({
        title: "Task added",
        description: newTask.title,
        variant: "default",
      });
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      setTasks((prev) => [...prev, task]);
      toast({
        title: "Add failed",
        description: task.title,
        variant: "destructive",
      });
      return task;
    }
  };

  // Remove a task by id
  const removeTask = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({ title: "Task removed", variant: "default" });
    } catch (error) {
      console.error("Error removing task:", error);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({ title: "Remove failed", variant: "destructive" });
    }
  };

  // Toggle task completion status
  const toggleTaskComplete = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const updatedTask = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      toast({ title: "Task updated", description: updatedTask.title });
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  // Update a task
  const updateTask = async (updated: Task) => {
    try {
      const response = await fetch(`${baseUrl}/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const saved = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      toast({
        title: "Task updated",
        description: saved.title,
        variant: "default",
      });
      return saved;
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      toast({
        title: "Update failed",
        description: updated.title,
        variant: "destructive",
      });
      return updated;
    }
  };

  // Toggle checklist item completion
  const toggleChecklistItem = async (taskId: string, itemId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task || !task.checklistItems) return;
      const updatedItems = task.checklistItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      const response = await fetch(`${baseUrl}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checklistItems: updatedItems }),
      });
      if (!response.ok) throw new Error("Failed to update checklist item");
      const reloaded = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === taskId ? reloaded : t)));
      toast({ title: "Checklist item toggled", variant: "default" });
    } catch (error) {
      console.error("Error toggling checklist item:", error);
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === taskId && t.checklistItems) {
            return {
              ...t,
              checklistItems: t.checklistItems.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            };
          }
          return t;
        })
      );
      toast({ title: "Toggle failed", variant: "destructive" });
    }
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      // Adapter: Convert API data to Task[]
      const adapted = data.map((api: any) => ({
        id: api.id,
        title: api.title,
        description: api.description || "",
        completed: api.completed,
        dueDate: api.dueDate ? new Date(api.dueDate) : undefined,
        type: api.type || "basic",
        checklistItems: api.checklistItems || [],
      }));
      setTasks(adapted);
      toast({ title: "Tasks loaded", variant: "default" });
      return adapted;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({ title: "Fetch failed", variant: "destructive" });
    }
  };

  return {
    tasks,
    addTask,
    removeTask,
    toggleTaskComplete,
    updateTask,
    toggleChecklistItem,
    fetchTasks,
  };
}
