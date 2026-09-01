import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This worktree and the parent checkout (D:\Full time Grind\Portfolio)
  // each have their own package-lock.json. Without an explicit root, Next
  // infers the parent as the workspace root and resolves shared packages
  // (including `next` itself) from the parent's node_modules instead of
  // this worktree's own — which is corrupted at the OS level in the parent
  // and caused intermittent "module not found" failures in both `next dev`
  // and `next build` (not caused by this session, but exposed by it; see
  // docs/redesign/MIGRATION-INVENTORY.md and CURRENT-HANDOFF.md). Pinning
  // both roots to this directory removes the ambiguity Next's own warning
  // asked for, without touching any dependency.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/experience",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
