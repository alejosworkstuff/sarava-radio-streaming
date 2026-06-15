import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const docsDir = join(root, "docs");

if (!existsSync(outDir)) {
  console.error("out/ not found — run `next build` first.");
  process.exit(1);
}

rmSync(docsDir, { recursive: true, force: true });
cpSync(outDir, docsDir, { recursive: true });
console.log("Copied out/ → docs/");
