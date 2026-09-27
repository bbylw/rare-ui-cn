"use client";

import { useState } from "react";

import { DeleteButton } from "@/components/ui/delete-button";

export default function DeleteButtonPreview() {
  const [log, setLog] = useState("等待操作…");

  return (
    <div className="flex flex-col items-center gap-4">
      <DeleteButton
        onConfirm={() => setLog("已确认删除")}
        onCancel={() => setLog("已撤销")}
      />
      <p className="text-xs text-muted-foreground">{log}</p>
    </div>
  );
}
