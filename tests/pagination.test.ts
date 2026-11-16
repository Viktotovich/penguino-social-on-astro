import { describe, it, expect } from "vitest";
import { parsePage, nextOffset } from "@/lib/posts/pagination";

describe("parsePage", () => {
  it("empty params returns defaults", () => {
    expect(parsePage(new URLSearchParams(""))).toEqual({ offset: 0, limit: 10 });
  });

  it("parses valid offset and limit", () => {
    expect(parsePage(new URLSearchParams("offset=20&limit=5"))).toEqual({ offset: 20, limit: 5 });
  });

  it("clamps invalid offset to 0 and invalid limit to default", () => {
    expect(parsePage(new URLSearchParams("offset=-3&limit=0"))).toEqual({ offset: 0, limit: 10 });
  });

  it("clamps non-numeric values to defaults", () => {
    expect(parsePage(new URLSearchParams("offset=abc&limit=xyz"))).toEqual({ offset: 0, limit: 10 });
  });

  it("clamps limit above MAX_LIMIT to MAX_LIMIT", () => {
    expect(parsePage(new URLSearchParams("limit=500"))).toEqual({ offset: 0, limit: 50 });
  });
});

describe("nextOffset", () => {
  it("returns next offset when returned === limit", () => {
    expect(nextOffset(0, 10, 10)).toBe(10);
    expect(nextOffset(20, 10, 10)).toBe(30);
  });

  it("returns null when returned < limit (short page)", () => {
    expect(nextOffset(0, 10, 4)).toBe(null);
    expect(nextOffset(0, 10, 0)).toBe(null);
  });
});
