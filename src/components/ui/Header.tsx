import { useState } from "react";

type Props = {
  newTitle: string;
  setNewTitle: (v: string) => void;
  newDescription: string;
  setNewDescription: (v: string) => void;
  newPriority: "high" | "medium" | "low";
  setNewPriority: (v: "high" | "medium" | "low") => void;
  newDueDate: string;
  setNewDueDate: (v: string) => void;
  onAdd: () => void;
};

export default function Header({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  newDueDate,
  setNewDueDate,
  newPriority,
  setNewPriority,
  onAdd,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 border-b bg-white">
      {/* 上段 */}
      <div className="flex flex-col gap-3 sm:gap-10 sm:flex-row sm:items-center ">
        <h1 className="font-bold text-lg sm:text-xl">タスクアプリ</h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-lg sm:text-xl bg-blue-500 text-white px-4 py-2 rounded-full w-full sm:w-auto"
        >
          タスク追加
        </button>
      </div>

      {/* フォーム */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={30}
            placeholder="タイトル(30文字以内)"
            className="border p-2 rounded w-full sm:w-auto flex-1"
          />

          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            maxLength={100}
            placeholder="詳細（任意・100文字以内）"
            className="border p-2 rounded w-full sm:w-auto flex-1"
          />

          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto"
          />

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as any)}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>

          <button
            onClick={() => {
              onAdd();
              setIsOpen(false);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-full w-full sm:w-auto
                     hover:bg-green-600 active:scale-95 transition"
          >
            追加
          </button>
        </div>
      )}
    </div>
  );
}
