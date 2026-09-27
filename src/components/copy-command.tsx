"use client";

import { useState } from "react";
import { Check, Terminal, Copy } from "lucide-react";

type Props = {
  command: string;
  className?: string;
  compact?: boolean;
  /** Optional shorter text to render while still copying `command`. */
  display?: string;
};

export function CopyCommand({
  command,
  className = "",
  compact = false,
  display,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-border bg-card/60 ${
        compact ? "px-3 py-2" : "px-4 py-3"
      } ${className}`}
    >
      <Terminal
        className="size-4 shrink-0 text-[#fc4c01]"
        aria-hidden
      />
      <code
        title={command}
        className={`min-w-0 flex-1 overflow-x-auto font-mono whitespace-nowrap text-muted-foreground ${
          compact ? "text-xs" : "text-[13px] sm:text-sm"
        }`}
      >
        {display ?? command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="复制安装命令"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        {copied ? (
          <Check className="size-4 text-[#fc4c01]" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
      </button>
    </div>
  );
}
