"use client";

import { useState } from "react";

import { EmojiReaction } from "@/components/ui/emoji-reaction";

export default function EmojiReactionPreview() {
  const [reaction, setReaction] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <EmojiReaction
        size="md"
        align="center"
        onReact={(name) => setReaction(name)}
      />
      <p className="h-4 text-xs text-muted-foreground">
        {reaction ? `你选择了 ${reaction}` : "点击按钮打开 emoji 面板"}
      </p>
    </div>
  );
}
