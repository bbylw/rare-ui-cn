"use client";

import { useState } from "react";

import { GridReveal } from "@/components/ui/grid-reveal";

export default function GridRevealPreview() {
  const [progress, setProgress] = useState(0.45);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <GridReveal
        src="/demo-art.svg"
        alt="示例插画"
        progress={progress}
        aspect={16 / 10}
        caption="正在生成画面…"
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={progress}
        onChange={(event) => setProgress(Number(event.target.value))}
        className="w-full accent-[#fc4c01]"
        aria-label="生成进度"
      />
    </div>
  );
}
