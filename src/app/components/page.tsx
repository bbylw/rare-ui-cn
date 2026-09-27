import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Gallery } from "@/components/gallery";
import { COMPONENTS, CATEGORY_ORDER, CATEGORIES } from "@/lib/rare-registry";

export const metadata: Metadata = {
  title: "组件总览",
  description:
    "浏览 Rare UI 的全部组件：每一个都带实时预览、安装命令与属性说明。",
};

export default function ComponentsPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            className="pointer-events-none absolute inset-0 bg-grid opacity-50"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                首页
              </Link>
              <span aria-hidden>/</span>
              <span className="text-foreground">组件总览</span>
            </nav>

            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {COMPONENTS.length} 个稀有组件，全部实时运行
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              这一页上每一个预览都是真实挂载的 React 组件，不是录屏。
              点开任意一个查看它的安装命令、用法示例与完整属性表。
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORY_ORDER.map((key) => (
                <span
                  key={key}
                  className="rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground"
                >
                  {CATEGORIES[key].label}
                  <span className="ml-1.5 text-foreground/60">
                    {COMPONENTS.filter((c) => c.category === key).length}
                  </span>
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/#quickstart"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                不知道从哪开始？先看快速开始
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Gallery />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
