import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import FluidOrb from "@/components/ui/fluid-orb";

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6">
        <div className="flex max-w-lg flex-col items-center gap-6 text-center">
          <FluidOrb size={140} color="#fc4c01" />

          <p className="font-mono text-xs tracking-widest text-[#fc4c01]">
            404
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            这个组件不存在
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            你访问的页面或组件名没有对应的注册表条目。回到组件总览看看全部内容吧。
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/components"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#fc4c01] px-5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              <Search className="size-4" aria-hidden />
              浏览全部组件
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              返回首页
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
