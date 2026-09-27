"use client";

import FluidOrb from "@/components/ui/fluid-orb";

export default function FluidOrbPreview() {
  return (
    <div className="flex items-center gap-10">
      <FluidOrb size={168} color="#fc4c01" />
      <div className="hidden sm:block">
        <FluidOrb size={104} color="#7c3aed" />
      </div>
    </div>
  );
}
