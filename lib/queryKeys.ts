/**
 * React Query key factory. Keys include params so cache is per-category/filter.
 * Invalidating .all refetches all headlines or search queries.
 */
export const queryKeys = {
  headlines: {
    all: ["headlines"] as const,
    list: (category: string, country?: string, lang?: string) =>
      ["headlines", category, country, lang] as const,
  },
  search: {
    all: ["search"] as const,
    list: (
      q: string,
      page: number,
      country?: string,
      lang?: string,
      inParam?: string,
      from?: string,
      to?: string
    ) => ["search", q, page, country, lang, inParam, from, to] as const,
  },
};
