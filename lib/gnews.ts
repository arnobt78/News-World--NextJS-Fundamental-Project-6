/**
 * GNews API client - Server-side only.
 * Used by API routes and SSR. Never call from client (exposes API key).
 * Docs: https://gnews.io/docs/v4
 */
import type {
  GNewsResponse,
  HeadlinesParams,
  SearchParams,
} from "@/types/news";

const GNEWS_HEADLINES = "https://gnews.io/api/v4/top-headlines";
const GNEWS_SEARCH = "https://gnews.io/api/v4/search";

/** Reads API key from env; throws if missing */
function getApiKey(): string {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    throw new Error("GNEWS_API_KEY is not configured");
  }
  return apiKey;
}

/** Build URL with common params */
function buildUrl(
  base: string,
  params: Record<string, string | number | undefined>
): string {
  const url = new URL(base);
  url.searchParams.set("apikey", getApiKey());
  Object.entries(params).forEach(([key, value]) => {
    if (key !== "apikey" && value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

/** Server-side fetch for GNews top-headlines; supports country, lang, max, page */
export async function fetchHeadlines(
  category: string,
  params?: Partial<HeadlinesParams>
): Promise<GNewsResponse> {
  const url = buildUrl(GNEWS_HEADLINES, {
    category: params?.category ?? category,
    lang: params?.lang ?? "en",
    country: params?.country,
    max: params?.max ?? 10,
    page: params?.page ?? 1,
    q: params?.q,
    nullable: params?.nullable,
    truncate: params?.truncate,
  });

  const res = await fetch(url, {
    next: { revalidate: 300 }, /* Cache for 5 min in Next.js data cache */
  });

  if (!res.ok) {
    throw new Error(`GNews API error: ${res.status}`);
  }

  return res.json();
}

/** Server-side fetch for GNews search endpoint; requires q param */
export async function fetchSearch(
  params: SearchParams
): Promise<GNewsResponse> {
  const url = buildUrl(GNEWS_SEARCH, {
    q: params.q,
    lang: params.lang ?? "en",
    country: params.country,
    max: params.max ?? 10,
    page: params.page ?? 1,
    from: params.from,
    to: params.to,
    sortby: params.sortby ?? "publishedAt",
    in: params.in,
    nullable: params.nullable,
    truncate: params.truncate,
  });

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`GNews API error: ${res.status}`);
  }

  return res.json();
}
