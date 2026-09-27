"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { GooeyNav } from "@/components/ui/gooey-nav";
import { CopyCommand } from "@/components/copy-command";
import { ComponentPreview } from "@/components/previews";
import { PreviewBoundary } from "@/components/preview-boundary";
import {
  CATEGORIES,
  CATEGORY_ORDER,
  COMPONENTS,
  installCommand,
  type RareCategory,
} from "@/lib/rare-registry";

type Filter = RareCategory | "all";

const FILTER_ITEMS = [
  { label: `全部 ${COMPONENTS.length}` },
  ...CATEGORY_ORDER.map((key) => ({
    label: CATEGORIES[key].label,
  })),
];

const FILTER_KEYS: Filter[] = ["all", ...CATEGORY_ORDER];

export function Gallery() {
  const [filterIndex, setFilterIndex] = useState(0);
  const [query, setQuery] = useState("");

  const filter: Filter = FILTER_KEYS[filterIndex] ?? "all";

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return COMPONENTS.filter((component) => {
      const matchesCategory = filter === "all" || component.category === filter;
      if (!matchesCategory) return false;
      if (!keyword) return true;

      return (
        component.title.toLowerCase().includes(keyword) ||
        component.name.toLowerCase().includes(keyword) ||
        component.slug.includes(keyword) ||
        component.description.toLowerCase().includes(keyword) ||
        component.tags.some((tag) => tag.toLowerCase().includes(keyword))
      );
    });
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <GooeyNav
          items={FILTER_ITEMS}
          value={filterIndex}
          onChange={setFilterIndex}
          size="sm"
          activeColor="#fc4c01"
          activeLabelColor="#ffffff"
        />

        <label className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2.5 lg:w-72">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索组件、能力或标签…"
            aria-label="搜索组件、能力或标签"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              清除
            </button>
          ) : null}
        </label>
      </div>

      <p className="text-sm text-muted-foreground">
        共 <span className="text-foreground">{results.length}</span> 个组件
        {filter !== "all" ? ` · ${CATEGORIES[filter].label}` : ""}
        {query ? ` · 关键词「${query}」` : ""}
      </p>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card/30 px-6 py-20 text-center">
          <p className="text-sm text-muted-foreground">
            没有匹配的组件，换个关键词试试。
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((component) => (
            <article
              key={component.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card/30 transition-colors hover:border-foreground/25"
            >
              <div className="flex min-h-[240px] items-center justify-center overflow-hidden bg-grid p-5">
                <PreviewBoundary name={component.title}>
                  <ComponentPreview slug={component.slug} />
                </PreviewBoundary>
              </div>

              <div className="flex flex-1 flex-col gap-3 border-t border-border p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium">{component.title}</h3>
                  <span className="rounded-full bg-foreground/8 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {component.name}
                  </span>
                </div>

                <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                  {component.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {component.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <CopyCommand
                  compact
                  command={installCommand(component.slug)}
                  display={`rare-ui/${component.slug}`}
                />

                <Link
                  href={`/components/${component.slug}`}
                  // A static export does not emit per-route RSC payloads, so the
                  // default prefetch would only produce 404s.
                  prefetch={false}
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-[#fc4c01]"
                >
                  查看文档与属性
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
