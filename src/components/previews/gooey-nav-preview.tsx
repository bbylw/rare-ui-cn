"use client";

import { useState } from "react";

import { GooeyNav } from "@/components/ui/gooey-nav";

export default function GooeyNavPreview() {
  const [value, setValue] = useState(0);

  return (
    <GooeyNav
      items={["总览", "组件", "文档", "定价"]}
      value={value}
      onChange={setValue}
      activeColor="#fc4c01"
      activeLabelColor="#ffffff"
      size="md"
    />
  );
}
