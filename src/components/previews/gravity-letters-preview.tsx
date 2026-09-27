"use client";

import GravityLetters from "@/components/ui/gravity-letters";

export default function GravityLettersPreview() {
  return (
    <GravityLetters
      type="both"
      size={26}
      maxGlyphs={70}
      color="#fc4c01"
      className="h-[320px] w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-grid"
    />
  );
}
