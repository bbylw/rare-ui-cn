import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this repo — otherwise it walks up and picks up
  // lockfiles in a parent directory.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
