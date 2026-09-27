"use client";

import { VoiceNote } from "@/components/ui/voice-note";

export default function VoiceNotePreview() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <VoiceNote accent="#fc4c01" duration={12} seed={7} speeds={[1, 1.5, 2]} />
      <VoiceNote accent="#fc4c01" duration={6} seed={21} size="sm" />
    </div>
  );
}
