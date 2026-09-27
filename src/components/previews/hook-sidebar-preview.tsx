"use client";

import { useState } from "react";

import { HookSidebar } from "@/components/ui/hook-sidebar";

export default function HookSidebarPreview() {
  const [value, setValue] = useState(2);

  return (
    <HookSidebar
      label="本章目录"
      color="#fc4c01"
      value={value}
      onChange={setValue}
      className="w-56"
      items={["概览", "快速开始", "组件列表", "常见问题"]}
    />
  );
}
