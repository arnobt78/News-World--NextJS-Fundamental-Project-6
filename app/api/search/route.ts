/**
 * API Route: GET /api/search
 * Proxies GNews search API. Requires query param "q". Keeps API key server-side.
 */
import { NextRequest, NextResponse } from "next/server";
import { fetchSearch } from "@/lib/gnews";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? "";
  const lang = searchParams.get("lang") ?? undefined;
  const country = searchParams.get("country") ?? undefined;
  const maxParam = searchParams.get("max");
  const pageParam = searchParams.get("page");
  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;
  const sortby = searchParams.get("sortby") as "publishedAt" | "relevance" | undefined;
  const inParam = searchParams.get("in") ?? undefined;
  const nullable = searchParams.get("nullable") ?? undefined;
  const truncate = searchParams.get("truncate") === "content" ? ("content" as const) : undefined;

  if (!q.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchSearch({
      q: q.trim(),
      lang: lang || undefined,
      country: country || undefined,
      max: maxParam ? parseInt(maxParam, 10) : undefined,
      page: pageParam ? parseInt(pageParam, 10) : undefined,
      from: from || undefined,
      to: to || undefined,
      sortby: sortby || undefined,
      in: inParam || undefined,
      nullable: nullable || undefined,
      truncate: truncate,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search" },
      { status: 500 }
    );
  }
}
