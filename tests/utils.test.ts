import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins classes and lets the later Tailwind class win", () => {
    expect(cn("px-2", false && "hidden", "px-4")).toBe("px-4");
  });
});
