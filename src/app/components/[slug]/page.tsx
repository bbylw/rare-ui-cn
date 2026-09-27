import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Boxes, Package } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CopyCommand } from "@/components/copy-command";
import { ComponentPreview } from "@/components/previews";
import { PreviewBoundary } from "@/components/preview-boundary";
import { CodeBlock } from "@/components/ui/code-block";
import {
  CATEGORIES,
  COMPONENTS,
  COMPONENT_BY_SLUG,
  componentsByCategory,
  installCommand,
} from "@/lib/rare-registry";

// The site ships as a static export, so every slug must be known at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPONENTS.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const component = COMPONENT_BY_SLUG.get(slug);

  if (!component) {
    return { title: "组件未找到" };
  }

  return {
    title: `${component.title} · ${component.name}`,
    description: component.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const component = COMPONENT_BY_SLUG.get(slug);

  if (!component) {
    notFound();
  }

  const index = COMPONENTS.findIndex((item) => item.slug === component.slug);
  const previous = COMPONENTS[index - 1];
  const next = COMPONENTS[index + 1];
  const related = componentsByCategory(component.category).filter(
    (item) => item.slug !== component.slug,
  );

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" prefetch={false} className="transition-colors hover:text-foreground">
              首页
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/components"
              prefetch={false}
              className="transition-colors hover:text-foreground"
            >
              组件总览
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">{component.title}</span>
          </nav>

          <header className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#fc4c01]/15 px-2.5 py-1 text-[11px] font-medium text-[#fc4c01]">
                {CATEGORIES[component.category].label}
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                {component.name}
              </span>
              {component.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
              {component.title}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {component.description}
            </p>
          </header>

          {/* 实时预览 */}
          <section className="mt-12">
            <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-grid p-6 sm:p-10">
              <PreviewBoundary name={component.title}>
                <ComponentPreview slug={component.slug} />
              </PreviewBoundary>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              上面的组件正在页面上实时运行，可以直接交互。
            </p>
          </section>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="min-w-0 space-y-12">
              {/* 安装 */}
              <section id="install">
                <h2 className="text-lg font-medium tracking-tight">安装</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  在项目根目录执行下面的命令，组件源码会写入{" "}
                  <code className="font-mono text-foreground">
                    @/components/ui/{component.slug}.tsx
                  </code>
                  。
                </p>
                <CopyCommand
                  className="mt-4"
                  command={installCommand(component.slug)}
                />
              </section>

              {/* 用法 */}
              <section id="usage">
                <h2 className="text-lg font-medium tracking-tight">用法</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  组件默认导出（或具名导出）即可直接使用，不需要额外的 Provider。
                </p>
                <CodeBlock
                  className="mt-4"
                  code={component.usage}
                  language="tsx"
                  accent="#fc4c01"
                  filename={`${component.slug}.tsx`}
                  showLineNumbers
                />
              </section>

              {/* 属性 */}
              <section id="props">
                <h2 className="text-lg font-medium tracking-tight">属性</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  下表列出了该组件公开的主要属性，所有未列出的原生属性都会透传到根元素。
                </p>

                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-card/50 text-xs text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">属性</th>
                        <th className="px-4 py-3 font-medium">类型</th>
                        <th className="px-4 py-3 font-medium">默认值</th>
                        <th className="px-4 py-3 font-medium">说明</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {component.props.map((prop) => (
                        <tr key={prop.name} className="align-top">
                          <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-foreground">
                            {prop.name}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-[#fc4c01]">
                            {prop.type}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                            {prop.fallback ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 相关组件 */}
              {related.length > 0 && (
                <section id="related">
                  <h2 className="text-lg font-medium tracking-tight">
                    同分类组件
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/components/${item.slug}`}
                        // Static export emits no per-route RSC payload to prefetch.
                        prefetch={false}
                        className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card/30 p-5 transition-colors hover:border-[#fc4c01]/50"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* 侧栏 */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-card/30 p-5">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Boxes className="size-3.5" aria-hidden />
                  分类
                </p>
                <p className="mt-2 text-sm">{CATEGORIES[component.category].label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {CATEGORIES[component.category].blurb}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/30 p-5">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Package className="size-3.5" aria-hidden />
                  依赖
                </p>
                {component.dependencies.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {component.dependencies.map((dependency) => (
                      <li
                        key={dependency}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {dependency}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    无额外运行时依赖
                  </p>
                )}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  shadcn CLI 会在安装时自动处理这些依赖。
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/30 p-5">
                <p className="text-xs text-muted-foreground">本页导航</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    { href: "#install", label: "安装" },
                    { href: "#usage", label: "用法" },
                    { href: "#props", label: "属性" },
                    { href: "#related", label: "同分类组件" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* 上一个 / 下一个 */}
          <nav className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            {previous ? (
              <Link
                href={`/components/${previous.slug}`}
                prefetch={false}
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                <span>
                  <span className="block text-xs">上一个</span>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/components/${next.slug}`}
                prefetch={false}
                className="group flex items-center gap-3 text-right text-sm text-muted-foreground transition-colors hover:text-foreground sm:justify-end"
              >
                <span>
                  <span className="block text-xs">下一个</span>
                  {next.title}
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
