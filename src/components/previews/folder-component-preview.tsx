"use client";

import Folder from "@/components/ui/folder-component";

export default function FolderPreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      <Folder color="blue" size="md" />
      <Folder color="black" size="sm" />
    </div>
  );
}
