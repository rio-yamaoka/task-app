// http://localhost:3000開いたらこのコードが実行される
// 「このコードはブラウザで動くよ」
"use client";
import { Task } from "@/types/task";
import TaskList from "@/components/ui/TaskList";
import { useState } from "react";
import Header from "@/components/ui/Header";
import { useTasks } from "@/hooks/useTasks";

// 初期データ
// localStorageがなければこれが表示される
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Reactの勉強",
    priority: "high",
    completed: false,
    dueDate: "2026-06-30",
  },
  {
    id: "2",
    title: "買い物",
    priority: "medium",
    completed: true,
    dueDate: "2026-04-28",
  },
];

// フィルターの一覧データ（UI用）
// ボタンの一覧（すべて・未完了など）
// key → 内部で使う値・label → 表示する文字
const filters = [
  { key: "all", label: "すべて" },
  { key: "active", label: "未完了" },
  { key: "completed", label: "完了" },
  { key: "high", label: "高" },
  { key: "medium", label: "中" },
  { key: "low", label: "低" },
] as const;

// filtersのkeyだけを取り出して型にする
// "all" | "active" | ... になる
type FilterType = (typeof filters)[number]["key"];

// このページの本体
export default function Home() {
  // useTasksから全部受け取る
  const { tasks, toggleTask, deleteTask, addTask, editTask } =
    useTasks(mockTasks);
  // タイトル入力、詳細入力、日付入力、優先度を保存
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">(
    "medium",
  );
  // 開いてるタスク、編集中のタスク、今の表示条件
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterType>("all");

  // タスク追加ボタンが押されたときに実行される関数
  const handleAdd = () => {
    if (!newTitle || newTitle.length > 30) return;
    // 新しいタスク作成
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: newDescription || undefined,
      dueDate: newDueDate || undefined,
      priority: newPriority,
      completed: false,
    };

    addTask(newTask);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
  };
  // 編集処理
  const handleEdit = (id: string, updatedTask: Partial<Task>) => {
    editTask(id, updatedTask);
  };

  // フィルタ処理
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "high") return task.priority === "high";
    if (filter === "medium") return task.priority === "medium";
    if (filter === "low") return task.priority === "low";
    return true;
  });

  // 画面開始
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          newPriority={newPriority}
          setNewPriority={setNewPriority}
          newDueDate={newDueDate}
          setNewDueDate={setNewDueDate}
          onAdd={handleAdd}
        />

        <div className="p-6">
          {/* フィルタボタン */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1 border rounded text-sm transition
                  ${
                    filter === f.key
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            openTaskId={openTaskId}
            setOpenTaskId={setOpenTaskId}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
}
