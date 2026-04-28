import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { Plus, Minus } from "lucide-react";
import { ChevronDown } from "lucide-react";

const priorityColor = {
  high: "bg-red-50 text-red-600 border-red-200",
  medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
  low: "bg-green-50 text-green-600 border-green-200",
};

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
    <div className="p-4 border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 sm:gap-10 sm:flex-row sm:items-center">
          <h1 className="flex items-center gap-2 font-bold text-lg sm:text-xl text-gray-800">
            <ClipboardList size={20} />
            タスクアプリ
          </h1>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
            group
            flex items-center justify-center gap-2
            text-lg sm:text-xl
            px-5 py-2
            rounded-full
            w-full sm:w-auto
            text-white
            bg-gradient-to-r from-blue-400 to-blue-600
            shadow-md
            transition-all duration-200 ease-out
            active:scale-95 active:shadow-inner active:brightness-90
          "
          >
            <Plus
              size={18}
              strokeWidth={3}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-45" : ""
              }`}
            />
            タスク追加
          </button>
        </div>

        {/* フォーム */}
        <div
          className={`
          overflow-hidden
          transition-all duration-300 ease-out
          ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}
        `}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap items-center">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              maxLength={30}
              placeholder="タイトル(30文字以内)"
              className="
              border p-2 rounded-lg w-full sm:w-auto flex-1
              transition
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset
            "
            />

            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              maxLength={100}
              placeholder="詳細（任意・100文字以内）"
              className="
              border px-3 py-2 rounded-lg
              w-full sm:w-auto flex-1
              h-[44px]
              resize-none
              transition-all
              leading-tight
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset
            "
            />

            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="
              border p-2 rounded-lg w-full sm:w-auto
              transition
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset
            "
            />
            <div className="relative w-full sm:w-auto">
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className={`
                      appearance-none
                      border p-2 pl-8 rounded-lg w-full
                      transition
                      focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset
                      ${priorityColor[newPriority]}
                    `}
              >
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>

              {/* ← ここが正解 */}
              <ChevronDown
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>

            <button
              onClick={() => {
                onAdd();
                setIsOpen(false);
              }}
              className="
              px-4 py-2 rounded-full w-full sm:w-auto
              text-white
              bg-gradient-to-r from-blue-400 to-blue-600
              transition-all duration-200
              active:scale-95 active:shadow-inner
            "
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
