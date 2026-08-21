import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const content = await readFile(join(process.cwd(), "scripts", "validate-content.ts"), "utf8");

test("content validation covers every published content collection", () => {
  assert.match(content, /posts/);
  assert.match(content, /novels/);
  assert.match(content, /events/);
  assert.match(content, /about/);
});
