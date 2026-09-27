"use client";

import Link from "next/link";
import { GitFork } from "lucide-react";

import { GooeyNav, type GooeyNavItem } from "@/components/ui/gooey-nav";
import { NotificationBell } from "@/components/ui/notification-bell";
import { COMPONENTS } from "@/lib/rare-registry";

// GooeyNav matches the active item by comparing href with usePathname(), and
// trailingSlash makes that pathname end in a slash.
const NAV_ITEMS: GooeyNavItem[] = [
  { label: "总览", href: "/" },
  { label: "组件", href: "/components/" },
  { label: "快速开始", href: "/#quickstart" },
  { label: "许可", href: "/#license" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight"
          aria-label="Rare UI 首页"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-[#fc4c01] text-[13px] font-bold text-white">
            R
          </span>
          <span className="hidden sm:inline">Rare UI</span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <GooeyNav
            items={NAV_ITEMS}
            size="sm"
            activeColor="#fc4c01"
            activeLabelColor="#ffffff"
          />
        </div>

        {/* 小屏降级为普通链接，避免粘性导航被压缩 */}
        <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto text-sm text-muted-foreground md:hidden">
          {NAV_ITEMS.map((item) => {
            const entry = typeof item === "string" ? { label: item } : item;
            return (
              <Link
                key={entry.label}
                href={entry.href ?? "#"}
                prefetch={false}
                className="whitespace-nowrap transition-colors hover:text-foreground"
              >
                {entry.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <NotificationBell
            count={COMPONENTS.length}
            max={99}
            variant="count"
            color="orange"
            size={34}
          />
          <Link
            href="https://github.com/swamimalode07/rare-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="在 GitHub 上查看 Rare UI"
            className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitFork className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
