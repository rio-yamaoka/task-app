import { useState } from "react";
import { Task } from "@/types/task";

type Props = {
  initialValues: {
    title: string;
    description: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
  };
  onSave: (values: Partial<Task>) => void;
  onCancel: () => void;
};

export default function TaskForm({ initialValues, onSave, onCancel }: Props) {
  const [values, setValues] = useState(initialValues);

  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        className="border px-1"
      />

      <textarea
        value={values.description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
        maxLength={100}
        className="border px-1"
      />

      <input
        type="date"
        value={values.dueDate}
        onChange={(e) => setValues({ ...values, dueDate: e.target.value })}
      />

      <select
        value={values.priority}
        onChange={(e) =>
          setValues({
            ...values,
            priority: e.target.value as "high" | "medium" | "low",
          })
        }
      >
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>

      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onSave(values)}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
        >
          保存
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 text-white text-sm rounded "
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
