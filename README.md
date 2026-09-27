# Rare UI 中文展示站

一个用来**完整展示 Rare UI 能力**的中文站点：落地页、组件总览与每个组件的文档页，站上所有预览都是**真实挂载、可交互**的 Rare UI 组件，不是录屏或截图。

> Rare UI 是一个收录稀有、开箱即用组件与动画的 shadcn 注册表。本站基于它构建，用于演示各组件的实际表现。

---

## 技术栈

| 能力 | 选型 |
| --- | --- |
| 框架 | [Next.js 16](https://nextjs.org)（App Router + Turbopack） |
| 语言 | TypeScript 5（全量类型，`strict`） |
| UI 运行时 | React 19 |
| 样式 | Tailwind CSS v4（`@theme` / `@utility`，无 config 文件） |
| 组件体系 | [shadcn CLI](https://ui.shadcn.com)（`radix-nova` preset，静态导出注册表条目） |
| 组件来源 | [Rare UI](https://rareui.com) 注册表（22 个组件） |
| 动画 | [Motion](https://motion.dev)（组件内部自带） |
| 图标 | lucide-react |

## 快速开始

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 生产构建 + 类型检查
npm run lint     # ESLint
```

## 站点结构

```
/                      落地页：Hero、核心能力、精选组件实时展示、分类浏览、
                       快速开始、主题定制、本地运行、许可、赞助商、FAQ
/components            组件总览：GooeyNav 分类过滤 + 关键词搜索 + 22 张实时预览卡片
/components/[slug]     组件文档页：实时预览、安装命令、用法示例、完整属性表、
                       依赖清单、同分类组件、上一个 / 下一个
```

## 代码结构

```
src/
├─ app/
│  ├─ layout.tsx                 # zh-CN、强制 dark、字体与 metadata
│  ├─ page.tsx                   # 落地页
│  ├─ not-found.tsx              # 中文 404
│  ├─ globals.css                # 品牌 token（--brand: #fc4c01）、中文字体栈、工具类
│  └─ components/
│     ├─ page.tsx                # 组件总览
│     └─ [slug]/page.tsx         # 组件文档（generateStaticParams 全量预渲染）
├─ components/
│  ├─ ui/                        # ← Rare UI 组件源码（通过 shadcn CLI 安装）
│  ├─ previews.tsx               # 22 个组件的实时预览注册表
│  ├─ gallery.tsx                # 总览页的过滤 + 搜索
│  ├─ accent-playground.tsx      # 「换一个 hex，整套主题跟着换」交互演示
│  ├─ site-header.tsx            # 粘性导航（GooeyNav）
│  ├─ site-footer.tsx            # 页脚（含许可要求的署名链接）
│  ├─ copy-command.tsx           # 一键复制安装命令
│  └─ preview-boundary.tsx       # 预览级错误边界，WebGL 不可用时不拖垮整页
├─ lib/rare-registry.ts          # 组件元数据：中文标题/描述、分类、依赖、用法、属性表
└─ types/flubber.d.ts            # flubber 无类型声明的补充
docs/rare-ui-registry-README.md  # Rare UI 上游 README（存档）
```

## 安装 Rare UI 组件

组件通过 shadcn CLI 直接从 Rare UI 注册表安装，源码会写入 `src/components/ui/`：

```bash
npx shadcn@latest add swamimalode07/rare-ui/fluid-orb
```

站上共安装了 22 个组件：

| 分类 | 组件 |
| --- | --- |
| 视觉与动效 | `fluid-orb`、`matrix-orb`、`gravity-letters`、`grid-reveal`、`folder-component` |
| 导航 | `scroll-progress`、`gooey-nav`、`bounce-sidebar`、`hook-sidebar`、`proximity-sidebar` |
| 交互控件 | `delete-button`、`otp-input`、`duration-picker`、`emoji-reaction`、`notification-bell`、`step-player`、`task-list`、`voice-note` |
| 数据展示 | `animated-counter`、`github-activity` |
| 布局与内容 | `family-drawer`、`code-block` |

> `src/components/ui/**` 是注册表原样下发的第三方源码，已在 `eslint.config.mjs` 中排除出项目 lint 范围，以便将来升级注册表组件时保持零冲突。

## 部署（GitHub Pages + 自定义域）

站点部署在 **https://rare-ui.ndjp.net**，由 GitHub Actions 自动发布。

```
仓库  https://github.com/bbylw/rare-ui-cn
工作流 .github/workflows/deploy-pages.yml
产物  out/  （纯静态）
域名  rare-ui.ndjp.net
```

**为什么是静态导出**

全站 27 个路由在 `next build` 中都是 `○ Static` / `● SSG`，没有任何服务端数据依赖，所以直接导出成静态文件最省事：不需要 Node 运行时，CDN 缓存命中率最高，也没有免费的 serverless 额度限制。

导出走环境变量开关，本地与其它托管平台完全不受影响：

| 命令 | 行为 |
| --- | --- |
| `npm run build` | 常规构建，保留 SSR 能力，可部署到 Vercel / Cloudflare Workers |
| `npm run build:static` | 加 `STATIC_EXPORT=true`，产出 `out/` 目录 |
| `npm run preview:static` | 本地静态预览 `out/` |

**流水线**

`push` 到 `main` 后由 `.github/workflows/deploy-pages.yml` 执行：

1. `npm ci`
2. `tsc --noEmit` —— 类型不过就不发布
3. `npm run lint`
4. `npm run build:static`
5. 上传 `out/` 并用 `actions/deploy-pages` 发布

**自定义域需要的 DNS 记录**

在 ndjp.net 的 DNS 控制台添加：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| `CNAME` | `rare-ui` | `bbylw.github.io` |

`public/CNAME` 已写入 `rare-ui.ndjp.net`，会随产物一起发布，告诉 Pages 该用哪个域名。DNS 生效后到仓库 **Settings → Pages** 勾选 **Enforce HTTPS** 即可拿到证书。

> 若换成仓库自带的 `bbylw.github.io/rare-ui-cn/` 地址访问，需要在 `next.config.ts` 里补 `basePath: "/rare-ui-cn"`；本站是按根域名部署的，所以没有设置。

## 设计说明

- **品牌色**：`#fc4c01`（Rare UI 橙），在 `globals.css` 中注册为 `--brand`，并映射到 Tailwind 的 `text-brand` / `bg-brand`。
- **深色优先**：`<html class="dark">` 固定深色，所有组件依赖的 CSS 变量都已对齐。
- **中文排版**：字体栈在 Geist 之后追加 `PingFang SC` / `Hiragino Sans GB` / `Microsoft YaHei` / `Noto Sans SC`，中英混排不塌陷。
- **动效可访问性**：站上的重动效组件全部遵循 `prefers-reduced-motion`，减少动效时自动降级。

## 许可证与署名

Rare UI 采用 **MIT 许可证 + Commons Clause + 署名要求**：

- ✅ 可以在个人、商业、闭源项目中使用、修改和发布这些组件。
- ⚠️ **必须保留署名**：任何使用了 Rare UI 组件的项目，都要以可见链接指向 [rareui.com](https://rareui.com) 的方式署名，并保留所复制源码中的版权声明。本站已在页脚完成署名。
- ❌ 不得单独、打包或移植到其他框架后，出售、再许可或重新分发组件本身。
- ℹ️ Rare UI 的名称、Logo 与站点设计不在许可证涵盖范围内。

完整条款见 [LICENSE](https://github.com/swamimalode07/rare-ui/blob/main/LICENSE)。

---

由 [@swamimalode](https://x.com/swamimalode) 构建 Rare UI · [rareui.com](https://rareui.com)
