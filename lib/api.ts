/**
 * Client-side API fetchers - Call our Next.js API routes (not GNews directly).
 * Used by useNews and useSearch hooks. Replaces null images with placeholder.
 */
import type { Article, GNewsResponse } from "@/types/news";

const NO_IMG = "/images/no-img.png";

/** Ensures every article has an image URL (fallback to placeholder); passes through id, lang, source.url, source.country */
function normalizeArticles(articles: Article[]): Article[] {
  return articles.map((a) => ({
    ...a,
    image: a.image ?? NO_IMG,
  }));
}

export interface FetchHeadlinesParams {
  category: string;
  country?: string;
  lang?: string;
  max?: number;
  page?: number;
}

export async function fetchHeadlinesClient(
  params: FetchHeadlinesParams
): Promise<{ headline: Article | null; news: Article[] }> {
  const searchParams = new URLSearchParams({ category: params.category });
  if (params.country) searchParams.set("country", params.country);
  if (params.lang) searchParams.set("lang", params.lang);
  if (params.max) searchParams.set("max", String(params.max));
  if (params.page) searchParams.set("page", String(params.page));
  const res = await fetch(`/api/headlines?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch headlines");
  const data: GNewsResponse = await res.json();
  const articles = normalizeArticles(data.articles ?? []);
  /* Split: first article as featured headline, rest as grid */
  return {
    headline: articles[0] ?? null,
    news: articles.slice(1, 10),
  };
}

export interface FetchSearchParams {
  q: string;
  page?: number;
  lang?: string;
  country?: string;
  max?: number;
  sortby?: "publishedAt" | "relevance";
  in?: string;
  from?: string;
  to?: string;
  nullable?: string;
  truncate?: "content";
}

export async function fetchSearchClient(
  params: FetchSearchParams
): Promise<{ articles: Article[]; totalArticles: number }> {
  const searchParams = new URLSearchParams({ q: params.q.trim() });
  if (params.page) searchParams.set("page", String(params.page));
  if (params.lang) searchParams.set("lang", params.lang);
  if (params.country) searchParams.set("country", params.country);
  if (params.max) searchParams.set("max", String(params.max));
  if (params.sortby) searchParams.set("sortby", params.sortby);
  if (params.in) searchParams.set("in", params.in);
  if (params.from) searchParams.set("from", params.from);
  if (params.to) searchParams.set("to", params.to);
  if (params.nullable) searchParams.set("nullable", params.nullable);
  if (params.truncate) searchParams.set("truncate", params.truncate);
  const res = await fetch(`/api/search?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to search");
  const data: GNewsResponse = await res.json();
  return {
    articles: normalizeArticles(data.articles ?? []),
    totalArticles: data.totalArticles ?? 0,
  };
}
