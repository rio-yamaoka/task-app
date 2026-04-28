import { Task } from "@/types/task";
import TaskForm from "./TaskForm";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Calendar } from "lucide-react";

const priorityMap = {
  high: "高",
  medium: "中",
  low: "低",
};

const priorityStyle = {
  high: "bg-red-100 text-red-500",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
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
      onClick={() => setOpenTaskId(openTaskId === task.id ? null : task.id)}
      className={`
          p-4
          rounded-xl
          bg-white
          shadow-sm

          flex justify-between items-center
          transition-all duration-200
          active:opacity-70
          ${openTaskId === task.id ? "ring-2 ring-blue-200" : ""}
        `}
    >
      <div className="flex items-center gap-2 sm:gap-6">
        <input
          type="checkbox"
          checked={task.completed}
          onClick={(e) => e.stopPropagation()}
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
              className={`
                          font-semibold text-base
                          ${task.completed ? "line-through text-gray-400" : "text-gray-800"}
                        `}
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
              <span
                className="
                    flex items-center gap-1
                    px-2 py-0.5
                    text-xs
                    rounded-full
                    bg-gray-100 text-gray-600
                  "
              >
                <Calendar size={14} />
                {task.dueDate}
              </span>
            )}

            {/* {task.dueDate && (
              <p className="text-sm text-gray-500">期限: {task.dueDate}</p>
            )} */}

            {/* <p className="text-sm">優先度: {priorityMap[task.priority]}</p> */}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-2">
          <span
            className={`
              ${priorityStyle[task.priority]} 
              px-2 py-4 rounded text-xs
            `}
          >
            {priorityMap[task.priority]}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenTaskId(task.id);
              setEditingTaskId(task.id);
            }}
            className="
              text-gray-400
              transition
              active:scale-90
            "
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="text-red-400 text-sm transition active:scale-90"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>

          {/* <button
            onClick={() => setEditingTaskId(task.id)}
            className="text-blue-400 text-sm"
          >
            編集
          </button> */}
        </div>
      )}
    </li>
  );
}
