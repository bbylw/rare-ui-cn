"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import FluidOrb from "@/components/ui/fluid-orb";
import MatrixOrb, { type MatrixOrbState } from "@/components/ui/matrix-orb";
import GravityLetters from "@/components/ui/gravity-letters";
import { GridReveal } from "@/components/ui/grid-reveal";
import Folder from "@/components/ui/folder-component";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { BounceSidebar } from "@/components/ui/bounce-sidebar";
import { HookSidebar } from "@/components/ui/hook-sidebar";
import ProximitySidebar from "@/components/ui/proximity-sidebar";
import { DeleteButton } from "@/components/ui/delete-button";
import { OtpInput } from "@/components/ui/otp-input";
import { DurationPicker, type DurationValue } from "@/components/ui/duration-picker";
import { EmojiReaction } from "@/components/ui/emoji-reaction";
import { NotificationBell } from "@/components/ui/notification-bell";
import { StepPlayer } from "@/components/ui/step-player";
import { TaskList } from "@/components/ui/task-list";
import { VoiceNote } from "@/components/ui/voice-note";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  GitHubActivity,
  type Contribution,
  type ContributionLevel,
  type RepoContribution,
} from "@/components/ui/github-activity";
import FamilyDrawer from "@/components/ui/family-drawer";
import { CodeBlock } from "@/components/ui/code-block";

/* ───────────────────────── 演示数据 ───────────────────────── */

const CODE_SAMPLE = `import FluidOrb from "@/components/ui/fluid-orb"

export function Hero() {
  return (
    <FluidOrb size={220} color="#fc4c01" />
  )
}`;

const REPOS: RepoContribution[] = [
  { name: "swamimalode07/rare-ui", count: 412 },
  { name: "swamimalode07/portfolio", count: 188 },
  { name: "swamimalode07/motion-lab", count: 96 },
];

function buildContributions(): Contribution[] {
  const days: Contribution[] = [];
  const end = Date.UTC(2026, 8, 27);
  let seed = 20260927;
  const next = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let offset = 26 * 7 - 1; offset >= 0; offset -= 1) {
    const date = new Date(end - offset * 86400000).toISOString().slice(0, 10);
    const roll = next();
    const count = roll > 0.58 ? Math.floor(roll * 24) : 0;
    const level: ContributionLevel =
      count === 0 ? 0 : count < 5 ? 1 : count < 11 ? 2 : count < 17 ? 3 : 4;
    days.push({ date, count, level });
  }

  return days;
}

const CONTRIBUTIONS = buildContributions();

/* ───────────────────────── 各个组件的实时预览 ───────────────────────── */

function FluidOrbPreview() {
  return (
    <div className="flex items-center gap-10">
      <FluidOrb size={168} color="#fc4c01" />
      <div className="hidden sm:block">
        <FluidOrb size={104} color="#7c3aed" />
      </div>
    </div>
  );
}

function MatrixOrbPreview() {
  const [state, setState] = useState<MatrixOrbState>("idle");
  const [level, setLevel] = useState(0.55);

  useEffect(() => {
    if (state !== "listening") return;
    const id = window.setInterval(
      () => setLevel(0.25 + Math.random() * 0.7),
      240,
    );
    return () => window.clearInterval(id);
  }, [state]);

  const labels = { idle: "待机", listening: "聆听中", thinking: "思考中" };

  return (
    <div className="flex flex-col items-center gap-5">
      <MatrixOrb
        state={state}
        level={state === "listening" ? level : undefined}
        size={168}
        color="#fc4c01"
        labels={labels}
      />
      <div className="flex flex-wrap justify-center gap-2">
        {(["idle", "listening", "thinking"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setState(option)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              state === option
                ? "border-[#fc4c01] bg-[#fc4c01]/15 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}

function GravityLettersPreview() {
  return (
    <GravityLetters
      type="both"
      size={26}
      maxGlyphs={70}
      color="#fc4c01"
      className="h-[320px] w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-grid"
    />
  );
}

function GridRevealPreview() {
  const [progress, setProgress] = useState(0.45);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <GridReveal
        src="/demo-art.svg"
        alt="示例插画"
        progress={progress}
        aspect={16 / 10}
        caption="正在生成画面…"
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={progress}
        onChange={(event) => setProgress(Number(event.target.value))}
        className="w-full accent-[#fc4c01]"
        aria-label="生成进度"
      />
    </div>
  );
}

function FolderPreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      <Folder color="blue" size="md" />
      <Folder color="black" size="sm" />
    </div>
  );
}

function ScrollProgressPreview() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div
        ref={ref}
        className="relative h-[260px] overflow-y-auto rounded-3xl border border-border bg-card/40"
      >
        <div className="space-y-6 p-6 text-sm leading-relaxed text-muted-foreground">
          <section id="preview-scroll-1">
            <h4 className="mb-2 text-base font-medium text-foreground">
              一、滚动进度
            </h4>
            <p>
              底部的胶囊会实时反映你的阅读位置。它固定在视口下方，滚动条走到哪里，胶囊就填到哪里。
            </p>
            <p className="mt-2">
              当页面足够长时，进度本身就成了导航的一部分，而不是一个额外要看的指示器。
            </p>
          </section>
          <section id="preview-scroll-2">
            <h4 className="mb-2 text-base font-medium text-foreground">
              二、展开成菜单
            </h4>
            <p>
              点击胶囊，它会展开成一个 squircle 菜单，把 sections 里的章节列出来。
            </p>
            <p className="mt-2">
              选中任意一项即可平滑跳转，弹簧动画让这个展开动作有明确的重量感。
            </p>
          </section>
          <section id="preview-scroll-3">
            <h4 className="mb-2 text-base font-medium text-foreground">
              三、无障碍与 reduced motion
            </h4>
            <p>
              组件遵循 prefers-reduced-motion：当系统要求减少动效时，位移被移除，只保留必要的状态变化。
            </p>
          </section>
        </div>

        <ScrollProgress
          containerRef={ref}
          className="absolute bottom-4"
          sections={[
            { id: "preview-scroll-1", label: "滚动进度" },
            { id: "preview-scroll-2", label: "展开菜单" },
            { id: "preview-scroll-3", label: "无障碍" },
          ]}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        在上面的区域里滚动，然后点击底部的胶囊。
      </p>
    </div>
  );
}

function GooeyNavPreview() {
  const [value, setValue] = useState(0);

  return (
    <GooeyNav
      items={["总览", "组件", "文档", "定价"]}
      value={value}
      onChange={setValue}
      activeColor="#fc4c01"
      activeLabelColor="#ffffff"
      size="md"
    />
  );
}

function BounceSidebarPreview() {
  const [value, setValue] = useState(1);

  return (
    <BounceSidebar
      value={value}
      onChange={setValue}
      dotColor="#fc4c01"
      className="w-48"
      items={[
        { label: "开始", heading: true },
        "安装组件",
        "属性说明",
        "示例代码",
        { label: "进阶", heading: true },
        "主题定制",
      ]}
    />
  );
}

function HookSidebarPreview() {
  const [value, setValue] = useState(2);

  return (
    <HookSidebar
      label="本章目录"
      color="#fc4c01"
      value={value}
      onChange={setValue}
      className="w-56"
      items={["概览", "快速开始", "组件列表", "常见问题"]}
    />
  );
}

function ProximitySidebarPreview() {
  return (
    <div className="relative h-[320px] w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card/40">
      <div className="h-full overflow-y-auto pr-16">
        <div className="space-y-8 p-6 text-sm leading-relaxed text-muted-foreground">
          <section id="preview-prox-1">
            <h3 className="mb-2 text-lg font-medium text-foreground">
              指针邻近
            </h3>
            <p>
              把指针移到右侧的虚线上：离得越近，那一条越长。距离本身变成了可读的信息。
            </p>
            <p className="mt-2">
              它比传统的圆点导航更安静，也比单纯的进度条承载更多结构——标题、小节与正文可以有不同的权重。
            </p>
            <p className="mt-2">
              继续在这个框里滚动，激活的那一条会保持高亮。
            </p>
          </section>
          <section id="preview-prox-2">
            <h4 className="mb-2 text-base font-medium text-foreground">
              子章节
            </h4>
            <p>
              kind 为 subtitle 的章节使用更短的基准长度，于是层级一眼可见，不需要额外的缩进或编号。
            </p>
            <p className="mt-2">
              所有长度变化都在同一个弹性系统里，所以指针移动时整列会像水波一样响应。
            </p>
          </section>
          <section id="preview-prox-3">
            <h4 className="mb-2 text-base font-medium text-foreground">
              滚动同步
            </h4>
            <p>
              组件会监听最近的滚动容器，用 activeOffset 判定当前章节，滚动时自动更新激活项。
            </p>
          </section>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0">
        <ProximitySidebar
          side="right"
          activeOffset={60}
          sections={[
            { id: "preview-prox-1", label: "指针邻近", kind: "title" },
            { id: "preview-prox-2", label: "子章节", kind: "subtitle" },
            { id: "preview-prox-3", label: "滚动同步", kind: "body" },
          ]}
        />
      </div>
    </div>
  );
}

function DeleteButtonPreview() {
  const [log, setLog] = useState("等待操作…");

  return (
    <div className="flex flex-col items-center gap-4">
      <DeleteButton
        onConfirm={() => setLog("已确认删除")}
        onCancel={() => setLog("已撤销")}
      />
      <p className="text-xs text-muted-foreground">{log}</p>
    </div>
  );
}

function OtpInputPreview() {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput
        length={6}
        value={code}
        onChange={setCode}
        onComplete={() => undefined}
        status={code.length === 6 ? "success" : "idle"}
      />
      <p className="text-xs text-muted-foreground">
        直接输入数字试试，填满后进入成功状态。
      </p>
    </div>
  );
}

function DurationPickerPreview() {
  const [value, setValue] = useState<DurationValue>({
    hours: 1,
    minutes: 30,
  });

  return (
    <DurationPicker
      value={value}
      onChange={setValue}
      maxHours={23}
      maxMinutes={59}
      hoursLabel="小时"
      minutesLabel="分钟"
    />
  );
}

function EmojiReactionPreview() {
  const [reaction, setReaction] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <EmojiReaction
        size="md"
        align="center"
        onReact={(name) => setReaction(name)}
      />
      <p className="h-4 text-xs text-muted-foreground">
        {reaction ? `你选择了 ${reaction}` : "点击按钮打开 emoji 面板"}
      </p>
    </div>
  );
}

function NotificationBellPreview() {
  return (
    <div className="flex items-center gap-8">
      <NotificationBell count={12} max={99} variant="count" color="red" />
      <NotificationBell count={1} variant="dot" color="blue" />
    </div>
  );
}

function StepPlayerPreview() {
  return (
    <StepPlayer
      className="w-full max-w-md"
      steps={[
        { label: "解析需求" },
        { label: "生成代码" },
        { label: "运行测试" },
        { label: "部署上线" },
      ]}
      duration={4}
      loop
      seekable
      controlPosition="left"
    />
  );
}

function TaskListPreview() {
  return (
    <TaskList
      className="w-full max-w-sm"
      accent="#fc4c01"
      defaultTasks={[
        { id: "a", label: "接入 shadcn 注册表" },
        { id: "b", label: "替换品牌强调色" },
        { id: "c", label: "补齐中文文案" },
        { id: "d", label: "发布到生产环境", done: true },
      ]}
    />
  );
}

function VoiceNotePreview() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <VoiceNote accent="#fc4c01" duration={12} seed={7} speeds={[1, 1.5, 2]} />
      <VoiceNote accent="#fc4c01" duration={6} seed={21} size="sm" />
    </div>
  );
}

function AnimatedCounterPreview() {
  const [value, setValue] = useState(128400);

  return (
    <div className="flex flex-col items-center gap-5">
      <AnimatedCounter
        value={value}
        decimals={1}
        separator=","
        prefix="¥"
        suffix=" 起"
        className="text-4xl font-semibold tabular-nums sm:text-5xl"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue((current) => current + Math.round(Math.random() * 9000) + 1000)}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          增加数值
        </button>
        <button
          type="button"
          onClick={() => setValue(128400)}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          重置
        </button>
      </div>
    </div>
  );
}

function GitHubActivityPreview() {
  return (
    <div className="w-full max-w-xl overflow-x-auto">
      <GitHubActivity
        contributions={CONTRIBUTIONS}
        repos={REPOS}
        year={2026}
        accent="#fc4c01"
        months={6}
        cellSize={12}
        label="贡献最多的仓库"
        defaultOpen
      />
    </div>
  );
}

function FamilyDrawerPreview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <FamilyDrawer />
      <p className="text-xs text-muted-foreground">
        点击按钮打开抽屉，再在内部的多个视图之间来回切换。
      </p>
    </div>
  );
}

function CodeBlockPreview() {
  return (
    <CodeBlock
      code={CODE_SAMPLE}
      language="tsx"
      accent="#fc4c01"
      filename="hero.tsx"
      showLineNumbers
      className="w-full max-w-xl"
    />
  );
}

/* ───────────────────────── 预览注册表 ───────────────────────── */

const PREVIEWS: Record<string, () => ReactNode> = {
  "fluid-orb": FluidOrbPreview,
  "matrix-orb": MatrixOrbPreview,
  "gravity-letters": GravityLettersPreview,
  "grid-reveal": GridRevealPreview,
  "folder-component": FolderPreview,
  "scroll-progress": ScrollProgressPreview,
  "gooey-nav": GooeyNavPreview,
  "bounce-sidebar": BounceSidebarPreview,
  "hook-sidebar": HookSidebarPreview,
  "proximity-sidebar": ProximitySidebarPreview,
  "delete-button": DeleteButtonPreview,
  "otp-input": OtpInputPreview,
  "duration-picker": DurationPickerPreview,
  "emoji-reaction": EmojiReactionPreview,
  "notification-bell": NotificationBellPreview,
  "step-player": StepPlayerPreview,
  "task-list": TaskListPreview,
  "voice-note": VoiceNotePreview,
  "animated-counter": AnimatedCounterPreview,
  "github-activity": GitHubActivityPreview,
  "family-drawer": FamilyDrawerPreview,
  "code-block": CodeBlockPreview,
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

export function hasPreview(slug: string) {
  return Boolean(PREVIEWS[slug]);
}
