"use client";

import { useState } from "react";

import { BounceSidebar } from "@/components/ui/bounce-sidebar";

export default function BounceSidebarPreview() {
  const [value, setValue] = useState(1);

  return (
    <BounceSidebar
      value={value}
      onChange={setValue}
      dotColor="#fc4c01"
      className="w-48"
      items={[
        { label: "开始", heading: true },
        "安装组件",
        "属性说明",
        "示例代码",
        { label: "进阶", heading: true },
        "主题定制",
      ]}
    />
  );
}
