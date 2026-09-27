"use client";

import { useEffect, useState } from "react";

import MatrixOrb, { type MatrixOrbState } from "@/components/ui/matrix-orb";

export default function MatrixOrbPreview() {
  const [state, setState] = useState<MatrixOrbState>("idle");
  const [level, setLevel] = useState(0.55);

  useEffect(() => {
    if (state !== "listening") return;
    const id = window.setInterval(
      () => setLevel(0.25 + Math.random() * 0.7),
      240,
    );
    return () => window.clearInterval(id);
  }, [state]);

  const labels = { idle: "待机", listening: "聆听中", thinking: "思考中" };

  return (
    <div className="flex flex-col items-center gap-5">
      <MatrixOrb
        state={state}
        level={state === "listening" ? level : undefined}
        size={168}
        color="#fc4c01"
        labels={labels}
      />
      <div className="flex flex-wrap justify-center gap-2">
        {(["idle", "listening", "thinking"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setState(option)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              state === option
                ? "border-[#fc4c01] bg-[#fc4c01]/15 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
