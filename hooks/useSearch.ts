"use client";

/**
 * useSearch - Fetches search results via React Query.
 * Only runs when query is non-empty (enabled: !!query.trim()).
 * Page state is local. To reset page when query/filters change, remount the
 * component that calls useSearch (e.g. give it a key from query + filter values).
 */
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchClient } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface UseSearchParams {
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

export function useSearch(query: string, params?: UseSearchParams) {
  const [page, setPageState] = useState(1);

  const queryTrimmed = query.trim();
  const paramIn = params?.in;
  const paramFrom = params?.from;
  const paramTo = params?.to;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.search.list(
      queryTrimmed,
      page,
      params?.country,
      params?.lang,
      paramIn,
      paramFrom,
      paramTo
    ),
    queryFn: () =>
      fetchSearchClient({
        q: queryTrimmed,
        page,
        lang: params?.lang,
        country: params?.country,
        max: params?.max,
        sortby: params?.sortby,
        in: paramIn,
        from: paramFrom,
        to: paramTo,
        nullable: params?.nullable,
        truncate: params?.truncate,
      }),
    enabled: !!queryTrimmed, /* No fetch when search is empty */
  });

  const setPage = useCallback((p: number) => {
    setPageState(p);
  }, []);

  return {
    articles: data?.articles ?? [],
    totalArticles: data?.totalArticles ?? 0,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? "Unknown error" : null,
    page,
    setPage,
    refetch,
  };
}
