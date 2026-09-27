"use client";

import { useRef } from "react";

import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function ScrollProgressPreview() {
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
