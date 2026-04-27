// タスク一覧をまとめて表示するためのコンポーネント
// 「繰り返し表示」と「1個表示」を分けるため
import { Task } from "@/types/task";
import { Dispatch, SetStateAction } from "react";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  openTaskId: string | null;
  setOpenTaskId: Dispatch<SetStateAction<string | null>>;
  editingTaskId: string | null;
  setEditingTaskId: Dispatch<SetStateAction<string | null>>;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  openTaskId,
  setOpenTaskId,
  editingTaskId,
  setEditingTaskId,
  onEdit,
}: Props) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          openTaskId={openTaskId}
          setOpenTaskId={setOpenTaskId}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
