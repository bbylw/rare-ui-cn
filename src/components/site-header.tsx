"use client";

import Link from "next/link";

import { GooeyNav, type GooeyNavItem } from "@/components/ui/gooey-nav";
import { NotificationBell } from "@/components/ui/notification-bell";
import { COMPONENTS } from "@/lib/rare-registry";

// lucide no longer ships brand icons, so the GitHub mark is inlined.
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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
            <GitHubMark className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
