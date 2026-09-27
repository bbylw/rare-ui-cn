export type RareCategory = "visual" | "navigation" | "control" | "data" | "layout";

export type RareProp = {
  name: string;
  type: string;
  fallback?: string;
  description: string;
};

export type RareComponent = {
  /** Registry item name — also the install path segment. */
  slug: string;
  /** Exported component name. */
  name: string;
  /** Chinese display title. */
  title: string;
  /** Chinese description. */
  description: string;
  category: RareCategory;
  /** Runtime packages the registry entry installs. */
  dependencies: string[];
  /** Short capability tags shown as chips. */
  tags: string[];
  usage: string;
  props: RareProp[];
};

export const CATEGORIES: Record<
  RareCategory,
  { label: string; blurb: string }
> = {
  visual: {
    label: "视觉与动效",
    blurb: "WebGL、Canvas 与粒子级的视觉表现，开箱即有质感。",
  },
  navigation: {
    label: "导航",
    blurb: "带物理反馈的导航与阅读进度，选中状态自己会说话。",
  },
  control: {
    label: "交互控件",
    blurb: "把常见的表单与操作控件，做成 iOS 级别的动效细节。",
  },
  data: {
    label: "数据展示",
    blurb: "让数字与热力图动起来，数据不再是一堆静态文本。",
  },
  layout: {
    label: "布局与内容",
    blurb: "抽屉、代码块等结构性组件，同样由一条强调色驱动。",
  },
};

export const COMPONENTS: RareComponent[] = [
  /* ───────────────────────── 视觉与动效 ───────────────────────── */
  {
    slug: "fluid-orb",
    name: "FluidOrb",
    title: "流体光球",
    description:
      "一个 WebGL 光球，内部有缓慢漂移的流体着色。支持 size 与 color 属性，跟随系统主题减少动效设置。",
    category: "visual",
    dependencies: [],
    tags: ["WebGL", "Canvas", "零依赖"],
    usage: `import FluidOrb from "@/components/ui/fluid-orb"

export function Demo() {
  return (
    <div className="flex items-center gap-10">
      <FluidOrb size={180} color="#fc4c01" />
      <FluidOrb size={120} color="#7c3aed" />
    </div>
  )
}`,
    props: [
      { name: "size", type: "number", fallback: "160", description: "光球直径（px）。" },
      { name: "color", type: "string", fallback: "#fc4c01", description: "流体着色的基色，任意 hex。" },
      { name: "className", type: "string", description: "额外的外层样式。" },
    ],
  },
  {
    slug: "matrix-orb",
    name: "MatrixOrb",
    title: "点阵光球",
    description:
      "一个由点阵构成的光球，可以在 idle、listening、thinking 三个状态之间动画切换，常用于语音助手入口。",
    category: "visual",
    dependencies: [],
    tags: ["Canvas", "状态机", "语音助手"],
    usage: `import { useState } from "react"
import MatrixOrb, { type MatrixOrbState } from "@/components/ui/matrix-orb"

const LABELS = { idle: "待机", listening: "聆听中", thinking: "思考中" }

export function Demo() {
  const [state, setState] = useState<MatrixOrbState>("idle")

  return (
    <div className="flex flex-col items-center gap-6">
      <MatrixOrb state={state} size={180} color="#fc4c01" labels={LABELS} />
      <div className="flex gap-2">
        {(["idle", "listening", "thinking"] as const).map((s) => (
          <button key={s} onClick={() => setState(s)}>
            {LABELS[s]}
          </button>
        ))}
      </div>
    </div>
  )
}`,
    props: [
      { name: "state", type: '"idle" | "listening" | "thinking"', fallback: '"idle"', description: "当前状态，切换时自动过渡。" },
      { name: "level", type: "number", description: "0–1 的强度，通常绑定音量。" },
      { name: "size", type: "number", fallback: "160", description: "画布尺寸（px）。" },
      { name: "color", type: "string", description: "点阵颜色。" },
      { name: "dots", type: "number", description: "点阵密度。" },
      { name: "labels", type: "Partial<Record<MatrixOrbState, string>>", description: "自定义状态文案。" },
    ],
  },
  {
    slug: "gravity-letters",
    name: "GravityLetters",
    title: "重力字母",
    description:
      "一个可玩的引力场：字母、数字、emoji，或者任何你传入的组件都会真实下落并堆叠起来。",
    category: "visual",
    dependencies: [],
    tags: ["物理", "拖拽", "可玩"],
    usage: `import GravityLetters from "@/components/ui/gravity-letters"

export function Demo() {
  return (
    <GravityLetters
      type="both"
      size={30}
      maxGlyphs={90}
      color="#fc4c01"
      className="h-[420px] rounded-3xl border"
    />
  )
}`,
    props: [
      { name: "type", type: '"letters" | "numbers" | "both"', fallback: '"letters"', description: "内置字形池。" },
      { name: "items", type: "ReactNode[]", description: "自定义掉落内容，会覆盖 type。" },
      { name: "gravity", type: "number", description: "重力强度。" },
      { name: "size", type: "number", description: "单个字形字号。" },
      { name: "color", type: "string", description: "字形颜色。" },
      { name: "maxGlyphs", type: "number", description: "场上最大字形数量。" },
      { name: "deviceTilt", type: "boolean", description: "移动端跟随设备倾斜。" },
    ],
  },
  {
    slug: "grid-reveal",
    name: "GridReveal",
    title: "网格揭示",
    description:
      "给 AI 图片生成用的加载态：网格会随着进度分裂、抖动，图片就绪后无缝变成真实画面。",
    category: "visual",
    dependencies: [],
    tags: ["加载态", "AI 图片", "进度驱动"],
    usage: `import GridReveal from "@/components/ui/grid-reveal"

export function Demo() {
  return (
    <GridReveal
      src="/assets/demo.png"
      alt="由 AI 生成的画面"
      progress={0.6}          // 0–1，跟随你的生成进度
      aspect={16 / 10}
      caption="正在生成…"
    />
  )
}`,
    props: [
      { name: "src", type: "string | null", description: "图片地址；为 null 时一直保持加载态。" },
      { name: "alt", type: "string", description: "图片替代文本。" },
      { name: "progress", type: "number", description: "0–1 的生成进度，驱动网格分裂。" },
      { name: "aspect", type: "number", description: "宽高比，例如 16 / 9。" },
      { name: "caption", type: "string", description: "加载时显示在网格中央的文案。" },
      { name: "estimatedDuration", type: "number", description: "预估耗时（秒），用于自走进度。" },
      { name: "onRevealComplete", type: "() => void", description: "揭示动画结束回调。" },
      { name: "onError", type: "() => void", description: "图片加载失败回调。" },
    ],
  },
  {
    slug: "folder-component",
    name: "FolderComponent",
    title: "文件夹组件",
    description:
      "一个会呼吸的文件夹：悬停时里面的卡片扇形散开，点击时带 3D 倾斜的封盖抬起。支持颜色与尺寸。",
    category: "visual",
    dependencies: ["motion"],
    tags: ["3D 倾斜", "Motion", "悬停"],
    usage: `import Folder from "@/components/ui/folder-component"

export function Demo() {
  return <Folder color="blue" size="lg" />
}`,
    props: [
      { name: "color", type: '"black" | "white" | "blue"', fallback: '"black"', description: "文件夹主题。" },
      { name: "size", type: '"sm" | "md" | "lg"', fallback: '"md"', description: "整体尺寸。" },
      { name: "className", type: "string", description: "额外的外层样式。" },
    ],
  },

  /* ───────────────────────── 导航 ───────────────────────── */
  {
    slug: "scroll-progress",
    name: "ScrollProgress",
    title: "滚动进度",
    description:
      "跟随阅读位置的进度胶囊。点击后会展开成 squircle 菜单，直接跳到任意章节。",
    category: "navigation",
    dependencies: ["motion"],
    tags: ["阅读进度", "squircle", "Motion"],
    usage: `import ScrollProgress from "@/components/ui/scroll-progress"

const sections = [
  { id: "intro", label: "介绍" },
  { id: "install", label: "安装" },
  { id: "props", label: "属性" },
]

export function Demo() {
  return <ScrollProgress sections={sections} offset={120} />
}`,
    props: [
      { name: "sections", type: "{ id: string; label: string }[]", description: "可跳转的章节列表。" },
      { name: "containerRef", type: "RefObject<HTMLElement | null>", description: "滚动容器；默认跟随页面。" },
      { name: "offset", type: "number", fallback: "120", description: "判定激活章节的偏移量。" },
    ],
  },
  {
    slug: "gooey-nav",
    name: "GooeyNav",
    title: "粘性导航",
    description:
      "选中的那一项会从整条导航里「分离」出来，中间由一条收窄的粘性颈部连接。",
    category: "navigation",
    dependencies: ["motion"],
    tags: ["粘性形变", "SVG 路径", "Motion"],
    usage: `import { GooeyNav } from "@/components/ui/gooey-nav"

export function Demo() {
  return (
    <GooeyNav
      items={["总览", "组件", "文档", "定价"]}
      defaultValue={0}
      activeColor="#fc4c01"
      size="md"
    />
  )
}`,
    props: [
      { name: "items", type: "(string | { label, href?, icon? })[]", description: "导航项。" },
      { name: "value", type: "number", description: "受控选中项。" },
      { name: "defaultValue", type: "number", fallback: "0", description: "非受控默认选中项。" },
      { name: "onChange", type: "(index: number) => void", description: "选中变化回调。" },
      { name: "size", type: '"sm" | "md" | "lg"', fallback: '"md"', description: "整体尺寸。" },
      { name: "activeColor", type: "string", description: "选中项填充色。" },
      { name: "separation", type: "number", description: "分离间距。" },
      { name: "radius", type: "number", description: "圆角半径。" },
    ],
  },
  {
    slug: "bounce-sidebar",
    name: "BounceSidebar",
    title: "弹跳侧栏",
    description: "纵向导航列表，激活指示器带弹簧回弹。支持分组标题与链接项。",
    category: "navigation",
    dependencies: ["motion"],
    tags: ["弹簧动画", "分组", "Motion"],
    usage: `import { BounceSidebar } from "@/components/ui/bounce-sidebar"

export function Demo() {
  return (
    <BounceSidebar
      dotColor="#fc4c01"
      items={[
        { label: "开始", heading: true },
        "安装",
        { label: "属性说明", href: "#props" },
        "示例",
      ]}
    />
  )
}`,
    props: [
      { name: "items", type: "(string | { label; href? } | { label; heading: true })[]", description: "列表项，heading 为分组标题。" },
      { name: "value", type: "number", description: "受控选中索引。" },
      { name: "defaultValue", type: "number", fallback: "0", description: "非受控默认索引。" },
      { name: "onChange", type: "(index: number) => void", description: "选中变化回调。" },
      { name: "dotColor", type: "string", fallback: '"#FC4C01"', description: "指示点颜色。" },
    ],
  },
  {
    slug: "hook-sidebar",
    name: "HookSidebar",
    title: "钩子侧栏",
    description: "虚线轨道式的纵向导航，激活项会被一段钩形导轨标记出来。",
    category: "navigation",
    dependencies: ["motion"],
    tags: ["虚线轨道", "钩形导轨", "Motion"],
    usage: `import { HookSidebar } from "@/components/ui/hook-sidebar"

export function Demo() {
  return (
    <HookSidebar
      label="本章目录"
      color="#fc4c01"
      items={["概览", "快速开始", "组件列表", "常见问题"]}
    />
  )
}`,
    props: [
      { name: "items", type: "(string | { label; href? })[]", description: "导航项。" },
      { name: "label", type: "string", description: "轨道顶部的小标题。" },
      { name: "value", type: "number", description: "受控选中索引。" },
      { name: "defaultValue", type: "number", fallback: "0", description: "非受控默认索引。" },
      { name: "color", type: "string", description: "轨道强调色。" },
      { name: "dashed", type: "boolean", fallback: "true", description: "轨道是否使用虚线。" },
    ],
  },
  {
    slug: "proximity-sidebar",
    name: "ProximitySidebar",
    title: "邻近侧栏",
    description:
      "虚线式滚动侧栏：指针越靠近某一项，它的虚线就越长，形成远近景深。",
    category: "navigation",
    dependencies: ["motion"],
    tags: ["指针邻近", "景深", "阅读定位"],
    usage: `import ProximitySidebar from "@/components/ui/proximity-sidebar"

export function Demo() {
  return (
    <div className="relative min-h-[420px]">
      <ProximitySidebar
        side="right"
        activeOffset={120}
        sections={[
          { id: "intro", label: "介绍", kind: "title" },
          { id: "install", label: "安装", kind: "subtitle" },
          { id: "usage", label: "用法", kind: "body" },
        ]}
      />
    </div>
  )
}`,
    props: [
      { name: "sections", type: "{ id; label; kind?; level? }[]", description: "章节列表，kind 决定虚线权重。" },
      { name: "side", type: '"left" | "right"', description: "贴靠哪一侧。" },
      { name: "activeOffset", type: "number", description: "判定激活章节的偏移量。" },
      { name: "className", type: "string", description: "额外的外层样式。" },
    ],
  },

  /* ───────────────────────── 交互控件 ───────────────────────── */
  {
    slug: "delete-button",
    name: "DeleteButton",
    title: "删除按钮",
    description: "在原地二次确认的删除按钮，不需要弹窗，也不会打断用户的心流。",
    category: "control",
    dependencies: ["motion"],
    tags: ["就地确认", "无弹窗", "Motion"],
    usage: `import { DeleteButton } from "@/components/ui/delete-button"

export function Demo() {
  return (
    <DeleteButton
      onConfirm={() => console.log("已删除")}
      onCancel={() => console.log("已取消")}
    />
  )
}`,
    props: [
      { name: "onConfirm", type: "() => void", description: "确认删除回调。" },
      { name: "onCancel", type: "() => void", description: "取消回调。" },
      { name: "className", type: "string", description: "额外的外层样式。" },
    ],
  },
  {
    slug: "otp-input",
    name: "OtpInput",
    title: "验证码输入",
    description:
      "一次性验证码输入框：字符会滚动就位，光标从一个格子滑向下一个，并带成功 / 失败状态。",
    category: "control",
    dependencies: ["motion"],
    tags: ["滚动字符", "光标滑动", "状态反馈"],
    usage: `import { useState } from "react"
import { OtpInput } from "@/components/ui/otp-input"

export function Demo() {
  const [code, setCode] = useState("")

  return (
    <OtpInput
      length={6}
      value={code}
      onChange={setCode}
      onComplete={(value) => console.log("完成", value)}
      status={code.length === 6 ? "success" : "idle"}
    />
  )
}`,
    props: [
      { name: "length", type: "number", fallback: "6", description: "验证码位数。" },
      { name: "value", type: "string", description: "受控值。" },
      { name: "onChange", type: "(value: string) => void", description: "值变化回调。" },
      { name: "onComplete", type: "(value: string) => void", description: "填满时的回调。" },
      { name: "type", type: "string", description: "允许的字符类型。" },
      { name: "size", type: "string", fallback: '"md"', description: "格子尺寸。" },
      { name: "status", type: '"idle" | "success" | "error"', fallback: '"idle"', description: "校验状态。" },
      { name: "mask", type: "boolean", description: "以圆点遮蔽输入。" },
    ],
  },
  {
    slug: "duration-picker",
    name: "DurationPicker",
    title: "时长选择器",
    description:
      "用弹簧和形变（gooey）动画输入小时与分钟的选择器，squircle 圆角平滑过渡。",
    category: "control",
    dependencies: ["motion", "figma-squircle", "flubber", "react-use-measure"],
    tags: ["gooey", "squircle", "弹簧"],
    usage: `import { useState } from "react"
import { DurationPicker, type DurationValue } from "@/components/ui/duration-picker"

export function Demo() {
  const [value, setValue] = useState<DurationValue>({ hours: 1, minutes: 30 })

  return (
    <DurationPicker
      value={value}
      onChange={setValue}
      onConfirm={(v) => console.log(v)}
      maxHours={23}
      maxMinutes={59}
      hoursLabel="小时"
      minutesLabel="分钟"
    />
  )
}`,
    props: [
      { name: "value", type: "{ hours: number; minutes: number }", description: "受控值。" },
      { name: "defaultValue", type: "DurationValue", description: "非受控默认值。" },
      { name: "onChange", type: "(value: DurationValue) => void", description: "值变化回调。" },
      { name: "onConfirm", type: "(value: DurationValue) => void", description: "确认回调。" },
      { name: "onEditingChange", type: "(editing: boolean) => void", description: "编辑态变化回调。" },
      { name: "defaultEditing", type: "boolean", description: "初始是否处于编辑态。" },
      { name: "maxHours", type: "number", description: "小时上限。" },
      { name: "maxMinutes", type: "number", description: "分钟上限。" },
      { name: "hoursLabel", type: "string", description: "小时单位文案。" },
      { name: "minutesLabel", type: "string", description: "分钟单位文案。" },
      { name: "disabled", type: "boolean", description: "禁用交互。" },
    ],
  },
  {
    slug: "emoji-reaction",
    name: "EmojiReaction",
    title: "Emoji 反应",
    description:
      "tapback 风格的反应按钮：点开后弹出一排 Apple emoji，选中后会有复制体从按钮里飘出来。",
    category: "control",
    dependencies: ["motion", "react-apple-emojis"],
    tags: ["Apple Emoji", "粒子飘散", "tapback"],
    usage: `import { EmojiReaction } from "@/components/ui/emoji-reaction"

export function Demo() {
  return (
    <EmojiReaction
      size="md"
      align="center"
      onReact={(name) => console.log("反应：", name)}
    />
  )
}`,
    props: [
      { name: "emojis", type: "string[]", description: "可用 emoji 名称列表。" },
      { name: "emojiData", type: "EmojiData", description: "自定义 emoji 数据源。" },
      { name: "onReact", type: "(name: string) => void", description: "选择回调。" },
      { name: "size", type: '"sm" | "md" | "lg"', fallback: '"md"', description: "按钮尺寸。" },
      { name: "align", type: '"left" | "center" | "right"', fallback: '"center"', description: "弹出方向对齐。" },
      { name: "asChild", type: "boolean", fallback: "false", description: "把触发能力交给子元素。" },
    ],
  },
  {
    slug: "notification-bell",
    name: "NotificationBell",
    title: "通知铃铛",
    description: "iOS 风格的通知铃铛，带未读数量角标或纯圆点两种形态。",
    category: "control",
    dependencies: ["motion"],
    tags: ["iOS 风格", "角标", "asChild"],
    usage: `import { NotificationBell } from "@/components/ui/notification-bell"

export function Demo() {
  return (
    <NotificationBell count={12} max={99} variant="count" color="red" size={36} />
  )
}`,
    props: [
      { name: "count", type: "number", description: "未读数量。" },
      { name: "max", type: "number", fallback: "99", description: "超过后显示 99+。" },
      { name: "variant", type: '"count" | "dot"', fallback: '"count"', description: "角标形态。" },
      { name: "size", type: "number", description: "按钮尺寸。" },
      { name: "color", type: "string", description: "角标配色。" },
      { name: "asChild", type: "boolean", fallback: "false", description: "把触发能力交给子元素。" },
    ],
  },
  {
    slug: "step-player",
    name: "StepPlayer",
    title: "步骤播放器",
    description:
      "iOS 风格的分段进度轨道，带播放、暂停与重播控制。当前步骤会拉伸成一条正在填充的进度条。",
    category: "control",
    dependencies: ["motion", "flubber"],
    tags: ["分段进度", "播放控制", "flubber"],
    usage: `import { StepPlayer } from "@/components/ui/step-player"

export function Demo() {
  return (
    <StepPlayer
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
  )
}`,
    props: [
      { name: "steps", type: "number | { duration?; label? }[]", fallback: "4", description: "步骤数量或步骤定义。" },
      { name: "value", type: "number", description: "受控当前步骤。" },
      { name: "onValueChange", type: "(value: number) => void", description: "步骤变化回调。" },
      { name: "playing", type: "boolean", description: "受控播放状态。" },
      { name: "defaultPlaying", type: "boolean", description: "非受控初始播放状态。" },
      { name: "duration", type: "number", description: "每一步的时长（秒）。" },
      { name: "loop", type: "boolean", description: "播放结束后是否循环。" },
      { name: "onComplete", type: "() => void", description: "全部播完回调。" },
      { name: "size", type: "number", description: "轨道高度。" },
      { name: "showControl", type: "boolean", fallback: "true", description: "是否显示控制按钮。" },
      { name: "controlPosition", type: '"left" | "right"', description: "控制按钮位置。" },
      { name: "seekable", type: "boolean", fallback: "true", description: "是否可点击跳转步骤。" },
    ],
  },
  {
    slug: "task-list",
    name: "TaskList",
    title: "任务清单",
    description: "勾选完成的任务会被划掉并自动移动到列表底部，支持受控与非受控两种用法。",
    category: "control",
    dependencies: ["motion"],
    tags: ["拖底排序", "划除动效", "受控"],
    usage: `import { TaskList } from "@/components/ui/task-list"

export function Demo() {
  return (
    <TaskList
      accent="#fc4c01"
      defaultTasks={[
        { id: "1", label: "接入注册表" },
        { id: "2", label: "替换主题色" },
        { id: "3", label: "发布上线", done: true },
      ]}
      onTasksChange={(tasks) => console.log(tasks)}
    />
  )
}`,
    props: [
      { name: "tasks", type: "Task[]", description: "受控任务列表。" },
      { name: "defaultTasks", type: "Task[]", description: "非受控初始任务。" },
      { name: "size", type: '"sm" | "md" | "lg"', fallback: '"md"', description: "尺寸。" },
      { name: "accent", type: "string", description: "勾选强调色。" },
      { name: "onTasksChange", type: "(tasks: Task[]) => void", description: "列表变化回调。" },
    ],
  },
  {
    slug: "voice-note",
    name: "VoiceNote",
    title: "语音条",
    description:
      "带可拖动波形与播放控制的语音消息条，支持倍速切换，多条的播放会互相打断。",
    category: "control",
    dependencies: ["motion"],
    tags: ["波形拖动", "倍速", "播放互斥"],
    usage: `import { VoiceNote } from "@/components/ui/voice-note"

export function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <VoiceNote accent="#fc4c01" duration={12} seed={7} speeds={[1, 1.5, 2]} />
      <VoiceNote accent="#fc4c01" duration={7} seed={21} size="sm" />
    </div>
  )
}`,
    props: [
      { name: "src", type: "string", description: "音频地址；省略时使用模拟播放。" },
      { name: "duration", type: "number", description: "时长（秒）。" },
      { name: "waveform", type: "number[]", description: "自定义波形振幅数组。" },
      { name: "bars", type: "number", description: "波形柱数量。" },
      { name: "seed", type: "number", description: "随机波形种子，保证前后端一致。" },
      { name: "playing", type: "boolean", description: "受控播放状态。" },
      { name: "onPlayingChange", type: "(playing: boolean) => void", description: "播放状态回调。" },
      { name: "onEnded", type: "() => void", description: "播放结束回调。" },
      { name: "accent", type: "string", description: "进度强调色。" },
      { name: "size", type: '"sm" | "md" | "lg"', fallback: '"md"', description: "尺寸。" },
      { name: "seekable", type: "boolean", fallback: "true", description: "波形是否可拖动。" },
      { name: "speeds", type: "number[]", description: "可切换的倍速列表。" },
    ],
  },

  /* ───────────────────────── 数据展示 ───────────────────────── */
  {
    slug: "animated-counter",
    name: "AnimatedCounter",
    title: "数字滚动",
    description:
      "像机械里程表一样的数字滚动，逐位进位，支持小数、千分位与前后缀。",
    category: "data",
    dependencies: ["motion"],
    tags: ["里程表", "逐位进位", "格式化"],
    usage: `import { AnimatedCounter } from "@/components/ui/animated-counter"

export function Demo() {
  return (
    <AnimatedCounter
      value={128_400}
      decimals={1}
      duration={1.2}
      separator=","
      prefix="¥"
      suffix=" 起"
      className="text-5xl font-semibold"
    />
  )
}`,
    props: [
      { name: "value", type: "number", description: "目标数值。" },
      { name: "decimals", type: "number", fallback: "0", description: "小数位数。" },
      { name: "duration", type: "number", description: "滚动时长（秒）。" },
      { name: "padStart", type: "number", description: "最少显示位数，不足补零。" },
      { name: "separator", type: "string", description: "千分位分隔符。" },
      { name: "decimalSeparator", type: "string", description: "小数点符号。" },
      { name: "grouping", type: '"western" | "indian"', fallback: '"western"', description: "分组规则。" },
      { name: "prefix", type: "ReactNode", description: "前缀。" },
      { name: "suffix", type: "ReactNode", description: "后缀。" },
    ],
  },
  {
    slug: "github-activity",
    name: "GitHubActivity",
    title: "贡献热力图",
    description:
      "贡献热力图加一张可展开的底部面板，用来给你的贡献最多的仓库排名。",
    category: "data",
    dependencies: ["motion"],
    tags: ["热力图", "仓库排行", "展开面板"],
    usage: `import { GitHubActivity } from "@/components/ui/github-activity"

export function Demo() {
  return (
    <GitHubActivity
      username="swamimalode07"
      year={2026}
      accent="#fc4c01"
      months={6}
      cellSize={12}
      label="贡献最多的仓库"
      defaultOpen
    />
  )
}`,
    props: [
      { name: "username", type: "string", description: "GitHub 用户名；给了就会拉取真实数据。" },
      { name: "contributions", type: "Contribution[]", description: "直接传入贡献数据，跳过请求。" },
      { name: "repos", type: "RepoContribution[]", description: "面板里的仓库排行数据。" },
      { name: "year", type: "number", description: "统计年份。" },
      { name: "accent", type: "string | string[]", description: "热力色，可传渐变色阶。" },
      { name: "cellSize", type: "number", fallback: "11", description: "格子尺寸。" },
      { name: "months", type: "number", description: "展示的月份数量。" },
      { name: "showMonths", type: "boolean", fallback: "true", description: "是否显示月份标签。" },
      { name: "label", type: "string", description: "面板标题。" },
      { name: "defaultOpen", type: "boolean", fallback: "false", description: "初始展开状态。" },
      { name: "open", type: "boolean", description: "受控展开状态。" },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "展开状态回调。" },
    ],
  },

  /* ───────────────────────── 布局与内容 ───────────────────────── */
  {
    slug: "family-drawer",
    name: "FamilyDrawer",
    title: "家族抽屉",
    description:
      "底部抽屉，内部多个视图之间平滑地形变切换，灵感来自 Family 应用，基于 Vaul。",
    category: "layout",
    dependencies: ["motion", "vaul", "react-use-measure"],
    tags: ["Vaul", "视图形变", "高度自适应"],
    usage: `import FamilyDrawer from "@/components/ui/family-drawer"

export default function Page() {
  return <FamilyDrawer />
}`,
    props: [
      { name: "—", type: "无属性", description: "抽屉自带触发按钮与全部视图状态，直接挂载即可使用。" },
    ],
  },
  {
    slug: "code-block",
    name: "CodeBlock",
    title: "代码块",
    description:
      "干净的代码块，整套主题都由一条强调色推导而来。传代码和一个 hex，剩下的交给它。",
    category: "layout",
    dependencies: ["motion", "prism-react-renderer"],
    tags: ["单色驱动主题", "语法高亮", "复制按钮"],
    usage: `import { CodeBlock } from "@/components/ui/code-block"

const code = \`export function hello() {
  return "你好，Rare UI"
}\`

export function Demo() {
  return (
    <CodeBlock
      code={code}
      language="tsx"
      accent="#fc4c01"
      filename="hello.tsx"
      showLineNumbers
      highlightLines={[2]}
    />
  )
}`,
    props: [
      { name: "code", type: "string", description: "要渲染的源码。" },
      { name: "language", type: "string", fallback: '"tsx"', description: "Prism 语言 id。" },
      { name: "accent", type: "string", description: "任意 hex，整套配色由它推导。" },
      { name: "mode", type: '"auto" | "dark" | "light"', fallback: '"auto"', description: "明暗模式，auto 跟随页面。" },
      { name: "filename", type: "string", description: "标题栏文件名。" },
      { name: "showFrame", type: "boolean", fallback: "true", description: "是否显示外框。" },
      { name: "showHeader", type: "boolean", fallback: "true", description: "是否显示标题栏。" },
      { name: "showLineNumbers", type: "boolean", description: "是否显示行号。" },
      { name: "showCopyButton", type: "boolean", fallback: "true", description: "是否显示复制按钮。" },
      { name: "highlightLines", type: "number[]", description: "需要高亮的 1-based 行号。" },
    ],
  },
];

export const COMPONENT_BY_SLUG = new Map(
  COMPONENTS.map((component) => [component.slug, component]),
);

export const CATEGORY_ORDER: RareCategory[] = [
  "visual",
  "navigation",
  "control",
  "data",
  "layout",
];

export function installCommand(slug: string) {
  return `npx shadcn@latest add swamimalode07/rare-ui/${slug}`;
}

export function componentsByCategory(category: RareCategory) {
  return COMPONENTS.filter((component) => component.category === category);
}
