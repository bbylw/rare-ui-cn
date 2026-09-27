"use client";

import { CodeBlock } from "@/components/ui/code-block";

const CODE_SAMPLE = `import FluidOrb from "@/components/ui/fluid-orb"

export function Hero() {
  return (
    <FluidOrb size={220} color="#fc4c01" />
  )
}`;

export default function CodeBlockPreview() {
  return (
    <CodeBlock
      code={CODE_SAMPLE}
      language="tsx"
      accent="#fc4c01"
      filename="hero.tsx"
      showLineNumbers
      className="w-full max-w-xl"
    />
  );
}
