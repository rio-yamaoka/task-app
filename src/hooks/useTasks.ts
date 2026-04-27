import { useState, useEffect } from "react";
import { Task } from "@/types/task";

export function useTasks(initialTasks: Task[]) {
  // ✅ 初期は絶対同じにする
  // useState<型>(初期値)・最初の値（mockTasksが入る）
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // ✅ マウント後に読み込む
  // 「後から実行する」
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // ✅ 変更時に保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: string, updated: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updated } : task)),
    );
  };

  return {
    tasks,
    toggleTask,
    deleteTask,
    addTask,
    editTask,
  };
}
