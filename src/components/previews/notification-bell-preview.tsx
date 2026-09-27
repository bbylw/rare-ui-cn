"use client";

import { NotificationBell } from "@/components/ui/notification-bell";

export default function NotificationBellPreview() {
  return (
    <div className="flex items-center gap-8">
      <NotificationBell count={12} max={99} variant="count" color="red" />
      <NotificationBell count={1} variant="dot" color="blue" />
    </div>
  );
}
