"use client";

import { useState } from "react";

import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function AnimatedCounterPreview() {
  const [value, setValue] = useState(128400);

  return (
    <div className="flex flex-col items-center gap-5">
      <AnimatedCounter
        value={value}
        decimals={1}
        separator=","
        prefix="¥"
        suffix=" 起"
        className="text-4xl font-semibold tabular-nums sm:text-5xl"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue((current) => current + Math.round(Math.random() * 9000) + 1000)}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          增加数值
        </button>
        <button
          type="button"
          onClick={() => setValue(128400)}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          重置
        </button>
      </div>
    </div>
  );
}
