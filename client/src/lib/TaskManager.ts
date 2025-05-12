import { useState } from "react";
import type { Task } from "@/types/task.type";

// Singleton Pattern: Using a custom hook instead of a class
export function TaskManager() {
  const baseUrl = "http://localhost:3001/api/tasks";
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = async (task: Task) => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      setTasks((prev) => [...prev, task]);
      return task;
    }
  };

  // Remove a task by id
  const removeTask = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error removing task:", error);
      // Fallback to local state if API fails
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  // Toggle task completion status
  const toggleTaskComplete = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
      // Fallback to local state if API fails
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  // Toggle checklist item completion
  const toggleChecklistItem = async (taskId: string, itemId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task || !task.checklistItems) return;

      const item = task.checklistItems.find((i) => i.id === itemId);
      if (!item) return;

      const updatedItems = task.checklistItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );

      const response = await fetch(`${baseUrl}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checklistItems: updatedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update checklist item");
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error toggling checklist item:", error);
      // Fallback to local state if API fails
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId && task.checklistItems) {
            return {
              ...task,
              checklistItems: task.checklistItems.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            };
          }
          return task;
        })
      );
    }
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      // Adapter pattern: Convert API data to our Task interface
      const adaptedTasks = data.map((apiTask: any) => ({
        id: apiTask.id,
        title: apiTask.title,
        description: apiTask.description || "",
        completed: apiTask.completed,
        dueDate: apiTask.dueDate ? new Date(apiTask.dueDate) : undefined,
        type: apiTask.type || "basic",
        checklistItems: apiTask.checklistItems || [],
      }));

      setTasks(adaptedTasks);
      return adaptedTasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return {
    tasks,
    addTask,
    removeTask,
    toggleTaskComplete,
    toggleChecklistItem,
    fetchTasks,
  };
}
