"use client";

import FamilyDrawer from "@/components/ui/family-drawer";

export default function FamilyDrawerPreview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <FamilyDrawer />
      <p className="text-xs text-muted-foreground">
        点击按钮打开抽屉，再在内部的多个视图之间来回切换。
      </p>
    </div>
  );
}
