"use client";

import { TaskList } from "@/components/ui/task-list";

export default function TaskListPreview() {
  return (
    <TaskList
      className="w-full max-w-sm"
      accent="#fc4c01"
      defaultTasks={[
        { id: "a", label: "接入 shadcn 注册表" },
        { id: "b", label: "替换品牌强调色" },
        { id: "c", label: "补齐中文文案" },
        { id: "d", label: "发布到生产环境", done: true },
      ]}
    />
  );
}
