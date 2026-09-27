"use client";

import ProximitySidebar from "@/components/ui/proximity-sidebar";

export default function ProximitySidebarPreview() {
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
