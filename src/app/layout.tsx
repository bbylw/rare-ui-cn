import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rare UI — 稀有、开箱即用的 shadcn 组件注册表",
    template: "%s · Rare UI",
  },
  description:
    "Rare UI 是一个收录稀有、开箱即用组件与动画的 shadcn 注册表。基于 Next.js、Tailwind CSS 与 TypeScript 构建，每个组件都用 Motion 驱动动画，支持 prefers-reduced-motion，并且直接安装进你的代码库。",
  keywords: [
    "Rare UI",
    "shadcn",
    "shadcn 注册表",
    "React 组件",
    "Next.js",
    "Tailwind CSS",
    "Motion",
    "动画组件",
  ],
  authors: [{ name: "swamimalode", url: "https://x.com/swamimalode" }],
  openGraph: {
    title: "Rare UI — 稀有、开箱即用的 shadcn 组件注册表",
    description:
      "22 个稀有组件与动画，一条命令安装进你的项目。代码归你所有，没有需要依赖的包。",
    type: "website",
    locale: "zh_CN",
    url: "https://rareui.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#fc4c01",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className="dark h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
