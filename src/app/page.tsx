import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  Blocks,
  Boxes,
  CodeXml,
  Command,
  GitFork,
  Layers,
  MousePointer2,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CopyCommand } from "@/components/copy-command";
import { ComponentPreview } from "@/components/previews";
import { PreviewBoundary } from "@/components/preview-boundary";
import { AccentPlayground } from "@/components/accent-playground";
import { CodeBlock } from "@/components/ui/code-block";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TaskList } from "@/components/ui/task-list";
import FluidOrb from "@/components/ui/fluid-orb";
import {
  CATEGORIES,
  CATEGORY_ORDER,
  COMPONENTS,
  COMPONENT_BY_SLUG,
  componentsByCategory,
  installCommand,
} from "@/lib/rare-registry";

const SECTIONS = [
  { id: "capabilities", label: "核心能力" },
  { id: "showcase", label: "精选组件" },
  { id: "categories", label: "分类浏览" },
  { id: "quickstart", label: "快速开始" },
  { id: "theme", label: "主题定制" },
  { id: "license", label: "许可" },
];

const CAPABILITIES = [
  {
    icon: Command,
    title: "一条命令，装进你的代码库",
    body: "走标准 shadcn CLI。组件以源码形式落到 components/ui，不引入任何需要长期依赖的封装包，也不存在版本锁定。",
  },
  {
    icon: CodeXml,
    title: "代码归你所有",
    body: "没有黑盒组件、没有运行时包装层。打开文件就能改，任意样式、任意结构，改坏了也只是你自己的分支。",
  },
  {
    icon: Sparkles,
    title: "Motion 驱动的动画",
    body: "弹簧、布局动画、共享元素过渡全部由 Motion 完成，动效不是后期贴上去的装饰，而是组件本身的一部分。",
  },
  {
    icon: Accessibility,
    title: "遵循 prefers-reduced-motion",
    body: "所有动画都会读取系统的减少动效设置，自动降级为瞬变，同时保留完整的语义与焦点管理。",
  },
  {
    icon: Palette,
    title: "一条色驱动整套主题",
    body: "CodeBlock、TaskList、VoiceNote 等等都接受任意 hex 强调色，内部自行推导出完整的明暗色阶。",
  },
  {
    icon: Layers,
    title: "与 shadcn 体系天然兼容",
    body: "组件遵循同样的注册表协议、别名约定与 CSS 变量主题，可以直接放进任何已经使用 shadcn 的项目。",
  },
] as const;

const SHOWCASE_LAYOUT: { slug: string; blurb: string; span: string }[] = [
  {
    slug: "matrix-orb",
    blurb: "idle / listening / thinking 三态之间平滑过渡，适合做语音入口。",
    span: "lg:col-span-5",
  },
  {
    slug: "gravity-letters",
    blurb: "字母会真的掉下来并堆叠，支持自定义字形与重力参数。",
    span: "lg:col-span-7",
  },
  {
    slug: "grid-reveal",
    blurb: "网格随进度分裂，图片到位后无缝揭示，专为 AI 生成场景设计。",
    span: "lg:col-span-7",
  },
  {
    slug: "duration-picker",
    blurb: "gooey 形变 + squircle 圆角，把枯燥的时长输入做成一个有手感的控件。",
    span: "lg:col-span-5",
  },
  {
    slug: "emoji-reaction",
    blurb: "Apple emoji 面板，选中后会有副本从按钮里飘出来。",
    span: "lg:col-span-5",
  },
  {
    slug: "step-player",
    blurb: "iOS 风格分段进度，当前步骤拉伸成正在填充的进度条。",
    span: "lg:col-span-7",
  },
  {
    slug: "family-drawer",
    blurb: "底部抽屉在多个视图之间形变切换，高度自适应。",
    span: "lg:col-span-7",
  },
  {
    slug: "code-block",
    blurb: "传代码和一个 hex，整套语法配色由这一条色推导出来。",
    span: "lg:col-span-5",
  },
];

const QUICKSTART_CODE = `# 1. 用 shadcn CLI 安装任意组件
npx shadcn@latest add swamimalode07/rare-ui/fluid-orb

# 2. 直接在页面里使用
import FluidOrb from "@/components/ui/fluid-orb"

export default function Page() {
  return <FluidOrb size={220} color="#fc4c01" />
}`;

const LOCAL_CODE = `git clone https://github.com/swamimalode07/rare-ui.git
cd rare-ui
npm install
npm run dev

# 组件位于 components/ui
# 修改组件或 registry.json 后，用下面的命令重建注册表输出
npm run registry:build`;

const LICENSE_POINTS = [
  {
    title: "可以自由使用",
    body: "MIT 许可证。个人项目、商业项目、闭源项目都可以使用、修改、发布这些组件。",
  },
  {
    title: "必须保留署名",
    body: "任何使用了 Rare UI 组件的项目，都要以可见链接指向 rareui.com 的方式署名，放在页脚、关于页、致谢界面或 README 中，并保留源码里的版权声明。",
  },
  {
    title: "不得转售或转授权",
    body: "不允许单独、打包或移植到其他框架之后，出售、再许可或重新分发组件本身。",
  },
  {
    title: "品牌不在许可范围内",
    body: "Rare UI 的名称、Logo 与站点设计不包含在许可证涵盖范围之内。",
  },
];

const SPONSORS = [
  {
    name: "Runable",
    tier: "钻石赞助商",
    href: "https://runable.com/?utm_source=rareui&utm_medium=referral&utm_campaign=readme",
    note: "让 Rare UI 保持免费。",
  },
  {
    name: "PrivateAlps",
    tier: "钻石赞助商",
    href: "https://privatealps.net/?utm_source=rareui&utm_medium=referral&utm_campaign=readme",
    note: "让 Rare UI 保持免费。",
  },
];

const FAQ = [
  {
    q: "Rare UI 和普通组件库有什么区别？",
    a: "它不是 npm 依赖，而是 shadcn 注册表。安装后组件源码直接进入你的仓库，你拥有全部代码。组件本身也更偏向「稀有」的交互：WebGL 光球、重力场、gooey 形变、贡献热力图这类平时要自己从零写的效果。",
  },
  {
    q: "需要额外安装动画库吗？",
    a: "不需要手动处理。注册表条目的 dependencies 会在安装时自动带上，例如 motion、vaul、prism-react-renderer。你只需要正常使用 shadcn CLI。",
  },
  {
    q: "能在 Next.js 之外的框架里用吗？",
    a: "可以。组件是标准的 React + TypeScript，样式来自 Tailwind CSS。shadcn 本身支持多种框架模板，只是本示范站用 Next.js App Router 搭建。",
  },
  {
    q: "支持深色模式和中文吗？",
    a: "支持。所有组件都基于 CSS 变量主题，跟随 .dark 类切换；中文文案、字体栈和排版都不需要额外配置。",
  },
  {
    q: "动效会影响性能或无障碍吗？",
    a: "重动效的组件（光球、重力场、热力图）使用 Canvas / WebGL，不产生大量 DOM 节点；同时全部读取 prefers-reduced-motion，在减少动效时自动降级。",
  },
];

function ShowcaseCard({
  slug,
  blurb,
  span,
}: {
  slug: string;
  blurb: string;
  span: string;
}) {
  const component = COMPONENT_BY_SLUG.get(slug);
  if (!component) return null;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-border bg-card/30 transition-colors hover:border-foreground/25 ${span}`}
    >
      <div className="flex min-h-[320px] flex-1 items-center justify-center overflow-hidden bg-grid p-6 sm:p-8">
        <PreviewBoundary name={component.title}>
          <ComponentPreview slug={slug} />
        </PreviewBoundary>
      </div>
      <div className="flex items-start justify-between gap-6 border-t border-border p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{component.title}</h3>
            <span className="rounded-full bg-foreground/8 px-2 py-0.5 text-[11px] text-muted-foreground">
              {component.name}
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {blurb}
          </p>
        </div>
        <Link
          href={`/components/${slug}`}
          // Static export has no per-route RSC payload, so prefetching 404s.
          prefetch={false}
          className="mt-0.5 flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-[#fc4c01]"
        >
          详情
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ScrollProgress sections={SECTIONS} offset={140} />

      <main className="flex-1">
        {/* ───────────── Hero ───────────── */}
        <section id="top" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
          <div
            className="pointer-events-none absolute -top-40 left-1/2 size-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(252,76,1,0.55) 0%, rgba(252,76,1,0.06) 55%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#fc4c01]" aria-hidden />
                shadcn 注册表 · {COMPONENTS.length} 个稀有组件
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-6xl">
                稀有、开箱即用的
                <br className="hidden sm:block" />
                <span className="text-[#fc4c01]">组件与动画</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                每个组件都用 Motion
                驱动动画，遵循 prefers-reduced-motion，并且能通过一条命令直接安装到你的代码库。代码归你所有，没有需要依赖的包，任何样式都可以自定义。
              </p>

              <div className="mt-9 flex w-full max-w-xl flex-col items-center gap-3">
                <CopyCommand
                  command={installCommand("fluid-orb")}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  点击右侧图标即可复制，然后直接粘贴到终端。
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/components"
                  prefetch={false}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#fc4c01] px-5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  <Blocks className="size-4" aria-hidden />
                  浏览全部组件
                </Link>
                <Link
                  href="https://rareui.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  rareui.com
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* 三个光球组成的主视觉 */}
            <div className="mt-16 flex items-end justify-center gap-6 sm:gap-12">
              <div className="hidden translate-y-6 sm:block">
                <FluidOrb size={112} color="#7c3aed" />
              </div>
              <FluidOrb size={196} color="#fc4c01" />
              <div className="hidden translate-y-10 sm:block">
                <FluidOrb size={88} color="#39d353" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── 数据 ───────────── */}
        <section className="border-y border-border/60 bg-card/20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {[
              { value: COMPONENTS.length, suffix: " 个", label: "开箱即用的组件" },
              { value: 1, suffix: " 条", label: "安装命令，仅此一条" },
              { value: 0, suffix: " 个", label: "需要长期依赖的包" },
              { value: 100, suffix: "%", label: "代码归你所有" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    duration={1.1}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── 核心能力 ───────────── */}
        <section id="capabilities" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <header className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
              Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              它不只是「好看」
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Rare UI 把最难写的那部分交互——物理感、形变、状态过渡——做成可以直接安装的源码。下面这六件事，是它在工程层面的取舍。
            </p>
          </header>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:border-foreground/20"
              >
                <item.icon className="size-5 text-[#fc4c01]" aria-hidden />
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card/30 p-6 lg:col-span-2">
              <div className="flex items-start gap-3">
                <MousePointer2 className="mt-0.5 size-5 shrink-0 text-[#fc4c01]" aria-hidden />
                <div>
                  <h3 className="text-sm font-medium">每个组件都真的能用鼠标玩</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    下面这张清单是组件本身（不是截图）。勾选任意一条，它会划掉并自己滑到列表底部。
                  </p>
                </div>
              </div>
              <TaskList
                accent="#fc4c01"
                className="max-w-md"
                defaultTasks={[
                  { id: "1", label: "接入 shadcn 注册表" },
                  { id: "2", label: "把强调色换成品牌色" },
                  { id: "3", label: "替换成中文文案" },
                  { id: "4", label: "发布上线", done: true },
                ]}
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/30 p-6">
              {[
                { icon: Zap, text: "弹簧物理，不靠固定时长堆关键帧" },
                { icon: Shield, text: "TypeScript 类型完整，props 有文档注释" },
                { icon: Boxes, text: "Canvas / WebGL 承担重动效，DOM 保持轻量" },
                { icon: GitFork, text: "开源仓库可直接提 issue 与 PR" },
                { icon: BadgeCheck, text: "MIT + Commons Clause + 署名要求" },
              ].map((row) => (
                <div key={row.text} className="flex items-start gap-3 text-sm">
                  <row.icon className="mt-0.5 size-4 shrink-0 text-[#fc4c01]" aria-hidden />
                  <span className="text-muted-foreground">{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── 精选组件 ───────────── */}
        <section id="showcase" className="border-y border-border/60 bg-card/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
                  Live showcase
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  这些全都是实时运行的组件
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  没有 GIF、没有截图。你可以拖、可以点、可以输入——包括 WebGL
                  光球和重力场。
                </p>
              </div>
              <Link
                href="/components"
                prefetch={false}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                查看全部 {COMPONENTS.length} 个组件
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </header>

            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              {SHOWCASE_LAYOUT.map((item) => (
                <ShowcaseCard key={item.slug} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── 分类浏览 ───────────── */}
        <section id="categories" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <header className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
              Categories
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              按场景找组件
            </h2>
          </header>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_ORDER.map((key) => {
              const list = componentsByCategory(key);
              return (
                <div
                  key={key}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-card/30 p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-medium">{CATEGORIES[key].label}</h3>
                    <span className="text-xs text-muted-foreground">
                      {list.length} 个
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {CATEGORIES[key].blurb}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {list.map((component) => (
                      <li key={component.slug}>
                        <Link
                          href={`/components/${component.slug}`}
                          prefetch={false}
                          className="inline-flex rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-[#fc4c01]/60 hover:text-foreground"
                        >
                          {component.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ───────────── 快速开始 ───────────── */}
        <section id="quickstart" className="border-y border-border/60 bg-card/20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
                Quick start
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                两步就能用上
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                如果你的项目已经用了 shadcn，那 init 这步都可以跳过。CLI
                会自动带上组件所需的依赖、写入文件、并合并 aliases。
              </p>

              <ol className="mt-8 space-y-5">
                {[
                  {
                    title: "安装组件",
                    body: "把 {component-name} 换成组件名，例如 fluid-orb、otp-input。",
                  },
                  {
                    title: "直接 import",
                    body: "组件会落在 @/components/ui 下，不需要额外的 provider 或注册代码。",
                  },
                  {
                    title: "按需改样式",
                    body: "源码就在你的仓库里，改颜色、圆角、节奏都可以，不会影响上游。",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[#fc4c01]/50 text-[11px] font-medium text-[#fc4c01]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <CodeBlock
              code={QUICKSTART_CODE}
              language="bash"
              accent="#fc4c01"
              filename="终端"
              showLineNumbers
            />
          </div>
        </section>

        {/* ───────────── 主题定制 ───────────── */}
        <section id="theme" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <header className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
              Theming
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              换一个 hex，整套视觉跟着换
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              点下面的色点试试。光球与右侧代码块的语法配色都来自同一个值——这就是 Rare UI
              的定制方式：不是覆盖一大串变量，而是给它一条色。
            </p>
          </header>

          <div className="mt-12">
            <AccentPlayground />
          </div>
        </section>

        {/* ───────────── 本地运行 ───────────── */}
        <section id="local" className="border-y border-border/60 bg-card/20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
                Run locally
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                把它跑在本地
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                仓库本身就是注册表的宿主项目：组件位于 components/ui，文档站就建在它上面。
                修改组件或 registry.json 之后，重新构建一次注册表输出即可。
              </p>
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-4">
                <Rocket className="mt-0.5 size-4 shrink-0 text-[#fc4c01]" aria-hidden />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  本地开发时建议先生成一遍注册表，这样 <code className="font-mono text-foreground">/r/[name].json</code>{" "}
                  与 CLI 拉取到的内容保持一致。
                </p>
              </div>
            </div>

            <CodeBlock
              code={LOCAL_CODE}
              language="bash"
              accent="#7c3aed"
              filename="终端"
              showLineNumbers
            />
          </div>
        </section>

        {/* ───────────── 许可 ───────────── */}
        <section id="license" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <header className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
              License
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              宽松使用，保留署名
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              采用 MIT 许可证，附带 Commons Clause 与署名要求。你可以把它用在任何项目里，
              包括商业与闭源项目，只有两件事不能做。
            </p>
          </header>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {LICENSE_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-border bg-card/30 p-6"
              >
                <h3 className="text-sm font-medium">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#fc4c01]/40 bg-[#fc4c01]/8 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted-foreground">
              本站已经按许可要求在页脚保留了指向{" "}
              <Link
                href="https://rareui.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#fc4c01] underline decoration-dotted underline-offset-4"
              >
                rareui.com
              </Link>{" "}
              的署名链接。你在自己的项目里也需要这样做。
            </p>
            <Link
              href="https://github.com/swamimalode07/rare-ui/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#fc4c01] px-4 py-2.5 text-sm font-medium text-white"
            >
              阅读完整许可证
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        {/* ───────────── 赞助商 ───────────── */}
        <section id="sponsors" className="border-y border-border/60 bg-card/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <header className="max-w-2xl">
              <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
                Sponsors
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Rare UI 是免费的，赞助让它保持免费
              </h2>
            </header>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {SPONSORS.map((sponsor) => (
                <Link
                  key={sponsor.name}
                  href={sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between gap-8 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-[#fc4c01]/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold tracking-tight">
                      {sponsor.name}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                      {sponsor.tier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{sponsor.note}</span>
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              各档位详情见{" "}
              <Link
                href="https://rareui.com/sponsors"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-dotted underline-offset-4"
              >
                rareui.com/sponsors
              </Link>
              。
            </p>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <header>
            <p className="text-xs font-medium tracking-widest text-[#fc4c01] uppercase">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              常见问题
            </h2>
          </header>

          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card/30">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                  {item.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-border bg-card/30 px-6 py-12 text-center">
            <FluidOrb size={120} color="#fc4c01" />
            <h3 className="max-w-lg text-2xl font-semibold tracking-tight">
              现在就从 {COMPONENTS.length} 个组件里挑一个开始
            </h3>
            <CopyCommand
              command={installCommand("fluid-orb")}
              className="w-full max-w-xl"
            />
            <Link
              href="/components"
              prefetch={false}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#fc4c01] px-5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              打开组件总览
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
