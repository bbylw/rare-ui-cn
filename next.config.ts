import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// The whole site is statically renderable (every route is SSG), so GitHub Pages
// gets a plain `out/` folder. Local `next build` stays untouched so the project
// can still be dropped onto an SSR host (Vercel, Workers, ...) later.
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this repo — otherwise it walks up and picks up
  // lockfiles in a parent directory.
  turbopack: {
    root: projectRoot,
  },
  // `components/` directories instead of `components.html`, which is what a
  // plain static host like GitHub Pages expects.
  trailingSlash: true,
  images: {
    unoptimized: staticExport,
  },
  ...(staticExport ? { output: "export" as const } : {}),
};

export default nextConfig;
