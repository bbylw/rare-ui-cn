"use client";

import { StepPlayer } from "@/components/ui/step-player";

export default function StepPlayerPreview() {
  return (
    <StepPlayer
      className="w-full max-w-md"
      steps={[
        { label: "解析需求" },
        { label: "生成代码" },
        { label: "运行测试" },
        { label: "部署上线" },
      ]}
      duration={4}
      loop
      seekable
      controlPosition="left"
    />
  );
}
