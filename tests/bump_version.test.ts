import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

describe("bump_version", () => {
  it("should bump the version", () => {
    execSync("node bump_version.mjs", { cwd: process.cwd() });
  });
});
