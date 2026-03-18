/**
 * News types - Match GNews API response shape.
 * Used across API routes, hooks, and components.
 */

/** GNews API source object */
export interface ArticleSource {
  id?: string;
  name: string;
  url?: string;
  country?: string;
}

/** Single news article from GNews API */
export interface Article {
  id?: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  image: string | null;
  publishedAt: string;
  lang?: string;
  source: ArticleSource;
}

/** GNews API top-headlines response shape */
export interface GNewsResponse {
  totalArticles: number;
  articles: Article[];
}

/** Params for top-headlines endpoint */
export interface HeadlinesParams {
  category?: string;
  lang?: string;
  country?: string;
  max?: number;
  page?: number;
  q?: string;
  nullable?: string;
  truncate?: "content";
}

/** Params for search endpoint */
export interface SearchParams {
  q: string;
  lang?: string;
  country?: string;
  max?: number;
  page?: number;
  from?: string;
  to?: string;
  sortby?: "publishedAt" | "relevance";
  in?: string;
  nullable?: string;
  truncate?: "content";
}
