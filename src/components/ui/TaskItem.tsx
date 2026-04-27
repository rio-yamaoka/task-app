import { Task } from "@/types/task";
import TaskForm from "./TaskForm";

const priorityMap = {
  high: "高",
  medium: "中",
  low: "低",
};

const priorityStyle = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-400 text-black",
  low: "bg-green-500 text-white",
};

type Props = {
  task: Task;
  openTaskId: string | null;
  setOpenTaskId: (id: string | null) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
};

// TaskItem = 「タスク1個を画面に表示する部品」
// TaskListの中で呼ばれて表示されてる
export default function TaskItem({
  task,
  openTaskId,
  setOpenTaskId,
  editingTaskId,
  setEditingTaskId,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const isEditing = editingTaskId === task.id;

  const handleToggleOpen = () => {
    setOpenTaskId(openTaskId === task.id ? null : task.id);
  };

  return (
    <li
      className={`border p-3 rounded flex justify-between items-center ${
        openTaskId === task.id ? "bg-blue-50 border-blue-400" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <TaskForm
            initialValues={{
              title: task.title,
              description: task.description || "",
              dueDate: task.dueDate || "",
              priority: task.priority,
            }}
            onSave={(values) => {
              onEdit(task.id, values);
              setEditingTaskId(null);
            }}
            onCancel={() => setEditingTaskId(null)}
          />
        ) : (
          <div>
            <p
              onClick={() => {
                setOpenTaskId(task.id); // 詳細開く
                setEditingTaskId(task.id); // 編集モード
              }}
              //   onClick={handleToggleOpen}
              className={
                task.completed
                  ? "line-through text-gray-400 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              {task.title}
            </p>

            {task.description && (
              <p className="text-sm text-gray-500">
                {openTaskId === task.id
                  ? task.description
                  : task.description.slice(0, 10) + "..."}
              </p>
            )}

            {task.dueDate && (
              <p className="text-sm text-gray-500">期限: {task.dueDate}</p>
            )}

            {/* <p className="text-sm">優先度: {priorityMap[task.priority]}</p> */}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`${priorityStyle[task.priority]} px-2 py-1 rounded text-xs`}
        >
          {priorityMap[task.priority]}
        </span>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-300 text-sm"
        >
          削除
        </button>

        {/* <button
          onClick={() => setEditingTaskId(task.id)}
          className="text-blue-400 text-sm"
        >
          編集
        </button> */}
      </div>
    </li>
  );
}
