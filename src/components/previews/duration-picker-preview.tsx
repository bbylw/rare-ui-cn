"use client";

import { useState } from "react";

import { DurationPicker, type DurationValue } from "@/components/ui/duration-picker";

export default function DurationPickerPreview() {
  const [value, setValue] = useState<DurationValue>({
    hours: 1,
    minutes: 30,
  });

  return (
    <DurationPicker
      value={value}
      onChange={setValue}
      maxHours={23}
      maxMinutes={59}
      hoursLabel="小时"
      minutesLabel="分钟"
    />
  );
}
