"use client";

import { useState } from "react";

import { OtpInput } from "@/components/ui/otp-input";

export default function OtpInputPreview() {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput
        length={6}
        value={code}
        onChange={setCode}
        onComplete={() => undefined}
        status={code.length === 6 ? "success" : "idle"}
      />
      <p className="text-xs text-muted-foreground">
        直接输入数字试试，填满后进入成功状态。
      </p>
    </div>
  );
}
