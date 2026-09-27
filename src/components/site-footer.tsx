import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const LINKS: { title: string; items: FooterLink[] }[] = [
  {
    title: "资源",
    items: [
      { label: "组件总览", href: "/components" },
      { label: "快速开始", href: "/#quickstart" },
      { label: "本地运行", href: "/#local" },
      { label: "常见问题", href: "/#faq" },
    ],
  },
  {
    title: "外部链接",
    items: [
      { label: "rareui.com", href: "https://rareui.com", external: true },
      {
        label: "GitHub 仓库",
        href: "https://github.com/swamimalode07/rare-ui",
        external: true,
      },
      { label: "在 X 上关注", href: "https://x.com/swamimalode", external: true },
      {
        label: "贡献指南",
        href: "https://github.com/swamimalode07/rare-ui/blob/main/CONTRIBUTING.md",
        external: true,
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid size-7 place-items-center rounded-lg bg-[#fc4c01] text-[13px] font-bold text-white">
              R
            </span>
            Rare UI
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            一个收录稀有、开箱即用组件与动画的 shadcn
            注册表。本站为 Rare UI 的中文展示站，用于演示各组件的实际表现。
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            组件由{" "}
            <Link
              href="https://x.com/swamimalode"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-dotted underline-offset-4"
            >
              @swamimalode
            </Link>{" "}
            构建。基于{" "}
            <Link
              href="https://rareui.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#fc4c01] underline decoration-dotted underline-offset-4"
            >
              Rare UI
            </Link>{" "}
            （rareui.com）构建。
          </p>
        </div>

        {LINKS.map((group) => (
          <div key={group.title} className="space-y-4">
            <p className="text-sm font-medium">{group.title}</p>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    {...(item.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            采用 MIT 许可证，附带 Commons Clause 与署名要求。请在使用组件的项目中保留指向
            rareui.com 的可见链接。
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} Rare UI · 保留署名
          </p>
        </div>
      </div>
    </footer>
  );
}
