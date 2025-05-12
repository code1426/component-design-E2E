import { useState, useEffect } from "react";
import { TaskFactory } from "@/components/Tasks/TaskFactory";
import TaskForm from "@/components/Tasks/TaskForm";
import { TaskManager } from "@/lib/TaskManager";
import { TaskSortingStrategy } from "@/lib/TaskSortingStrategy";
import { Notification } from "@/components/Tasks/Notification";
import type { Task } from "@/types/task.type";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  LayoutGrid,
  List,
  CheckSquare,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MidtermsPage = () => {
  const taskManager = TaskManager();
  const [sortMethod, setSortMethod] = useState("date");
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch tasks on component mount
    taskManager.fetchTasks();
  }, []);

  useEffect(() => {
    // Apply sorting strategy based on selected method
    let filteredTasks = taskManager.tasks;

    // Apply sorting strategy
    if (sortMethod === "date") {
      setSortedTasks(TaskSortingStrategy.sortByDate(filteredTasks));
    } else if (sortMethod === "name") {
      setSortedTasks(TaskSortingStrategy.sortByName(filteredTasks));
    } else {
      setSortedTasks(TaskSortingStrategy.sortById(filteredTasks));
    }
  }, [taskManager.tasks, sortMethod]);

  const handleAddTask = (task: Task) => {
    taskManager.addTask(task);
    setDialogOpen(false);
  };

  return (
    <div className="w-screen p-4 text-center h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Task Manager
            </h1>
            <div className="flex items-center gap-2">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <PlusCircle className="h-5 w-5" />
                    <span>New Task</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-800">
                      Create New Task
                    </DialogTitle>
                  </DialogHeader>
                  <TaskForm
                    onSubmit={handleAddTask}
                    onCancel={() => setDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <Label
                  htmlFor="sortMethod"
                  className="font-medium text-gray-700"
                >
                  Sort By:
                </Label>
                <Select value={sortMethod} onValueChange={setSortMethod}>
                  <SelectTrigger className="w-[150px] border-gray-300">
                    <SelectValue placeholder="Select sort method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Due Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="id">ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1 shrink-0">
              <Button
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only ml-1">Grid</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }
              >
                <List className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only ml-1">List</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Task List */}
        {sortedTasks.length === 0 ? (
          <Card className="bg-white border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-indigo-100 p-3 mb-4">
                <CheckSquare className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 mb-4 text-center">
                Create your first task to get started
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                New Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                : "flex flex-col space-y-2"
            }
          >
            {sortedTasks.map((task) => (
              <div key={task.id} className="relative">
                {/* Observer Pattern: Show notification for overdue tasks */}
                {task.dueDate &&
                  new Date(task.dueDate) < new Date() &&
                  !task.completed && (
                    <Notification>This task is overdue!</Notification>
                  )}

                {/* Factory Pattern: Render different task types */}
                <TaskFactory
                  type={task.type}
                  task={task}
                  onToggleComplete={() =>
                    taskManager.toggleTaskComplete(task.id)
                  }
                  onRemove={() => taskManager.removeTask(task.id)}
                  onToggleChecklistItem={(itemId) =>
                    taskManager.toggleChecklistItem(task.id, itemId)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MidtermsPage;
