"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * One lazy chunk per preview: the overview page mounts all of them at once,
 * while a detail page needs exactly one, so each page's JS stays proportional
 * to the previews it actually renders.
 */
const PREVIEWS: Record<string, ComponentType> = {
  "fluid-orb": dynamic(() => import("@/components/previews/fluid-orb-preview")),
  "matrix-orb": dynamic(() => import("@/components/previews/matrix-orb-preview")),
  "gravity-letters": dynamic(() => import("@/components/previews/gravity-letters-preview")),
  "grid-reveal": dynamic(() => import("@/components/previews/grid-reveal-preview")),
  "folder-component": dynamic(() => import("@/components/previews/folder-component-preview")),
  "scroll-progress": dynamic(() => import("@/components/previews/scroll-progress-preview")),
  "gooey-nav": dynamic(() => import("@/components/previews/gooey-nav-preview")),
  "bounce-sidebar": dynamic(() => import("@/components/previews/bounce-sidebar-preview")),
  "hook-sidebar": dynamic(() => import("@/components/previews/hook-sidebar-preview")),
  "proximity-sidebar": dynamic(() => import("@/components/previews/proximity-sidebar-preview")),
  "delete-button": dynamic(() => import("@/components/previews/delete-button-preview")),
  "otp-input": dynamic(() => import("@/components/previews/otp-input-preview")),
  "duration-picker": dynamic(() => import("@/components/previews/duration-picker-preview")),
  "emoji-reaction": dynamic(() => import("@/components/previews/emoji-reaction-preview")),
  "notification-bell": dynamic(() => import("@/components/previews/notification-bell-preview")),
  "step-player": dynamic(() => import("@/components/previews/step-player-preview")),
  "task-list": dynamic(() => import("@/components/previews/task-list-preview")),
  "voice-note": dynamic(() => import("@/components/previews/voice-note-preview")),
  "animated-counter": dynamic(() => import("@/components/previews/animated-counter-preview")),
  "github-activity": dynamic(() => import("@/components/previews/github-activity-preview")),
  "family-drawer": dynamic(() => import("@/components/previews/family-drawer-preview")),
  "code-block": dynamic(() => import("@/components/previews/code-block-preview")),
};

export function ComponentPreview({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const Preview = PREVIEWS[slug];

  if (!Preview) {
    return (
      <p className="text-sm text-muted-foreground">暂无预览</p>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center ${className}`}
    >
      <Preview />
    </div>
  );
}
