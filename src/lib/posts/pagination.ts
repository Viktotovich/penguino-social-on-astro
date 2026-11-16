export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;

export function parsePage(params: URLSearchParams): { offset: number; limit: number } {
  const offset = Number.parseInt(params.get("offset") ?? "", 10);
  const limit = Number.parseInt(params.get("limit") ?? "", 10);

  const parsedOffset = Number.isInteger(offset) && offset >= 0 ? offset : 0;

  let parsedLimit: number;
  if (Number.isInteger(limit) && limit >= 1 && limit <= MAX_LIMIT) {
    parsedLimit = limit;
  } else if (limit > MAX_LIMIT) {
    parsedLimit = MAX_LIMIT;
  } else {
    parsedLimit = DEFAULT_LIMIT;
  }

  return { offset: parsedOffset, limit: parsedLimit };
}

export function nextOffset(offset: number, limit: number, returned: number): number | null {
  return returned === limit ? offset + limit : null;
}
