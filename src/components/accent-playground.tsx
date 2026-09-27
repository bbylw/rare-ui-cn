"use client";

import { useState } from "react";

import FluidOrb from "@/components/ui/fluid-orb";
import { CodeBlock } from "@/components/ui/code-block";

const ACCENTS = [
  { name: "Rare 橙", value: "#fc4c01" },
  { name: "电紫", value: "#7c3aed" },
  { name: "青柠", value: "#39d353" },
  { name: "深海", value: "#0a84ff" },
  { name: "品红", value: "#ec4899" },
  { name: "琥珀", value: "#f5b301" },
];

const SNIPPET = `import FluidOrb from "@/components/ui/fluid-orb"

// 换一个 hex，整套视觉就跟着换
export function Brand() {
  return <FluidOrb size={140} color="ACCENT" />
}`;

export function AccentPlayground() {
  const [accent, setAccent] = useState(ACCENTS[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card/40 p-8">
        <FluidOrb size={168} color={accent.value} />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">当前强调色</p>
          <p className="mt-1 font-mono text-sm text-foreground">
            {accent.value}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {ACCENTS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAccent(option)}
              aria-label={option.name}
              aria-pressed={accent.value === option.value}
              className={`size-8 rounded-full ring-offset-2 ring-offset-background transition ${
                accent.value === option.value
                  ? "ring-2 ring-foreground"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: option.value }}
            />
          ))}
        </div>
      </div>

      <CodeBlock
        code={SNIPPET.replace("ACCENT", accent.value)}
        language="tsx"
        accent={accent.value}
        filename="brand.tsx"
        showLineNumbers
        highlightLines={[4]}
      />
    </div>
  );
}
