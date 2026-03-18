/**
 * First-party image proxy - Fetches external images server-side and streams to client.
 * Served from same origin so ad blockers do not block; upstream 4xx/5xx redirect to placeholder.
 * SSRF-safe: only allows http/https to external hosts.
 */
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PROTOCOLS = ["http:", "https:"];
const BLOCKED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "169.254.169.254", /* AWS metadata */
];

/** Browser-like UA to reduce 401 from strict image hosts (e.g. guim.co.uk). */
const IMAGE_PROXY_UA =
  "Mozilla/5.0 (compatible; NewsWorld/1.0; +https://github.com)";

function isValidImageUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase();
    if (BLOCKED_HOSTS.includes(host)) return false;
    if (host.endsWith(".local")) return false;
    if (/^10\.|^172\.(1[6-9]|2[0-9]|3[01])\.|^192\.168\./.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

/** Redirect to app placeholder so img never sees 401/400/502; no console errors. */
function redirectToPlaceholder(request: NextRequest) {
  return NextResponse.redirect(new URL("/images/no-img.png", request.url), 302);
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || !url.trim()) {
    return redirectToPlaceholder(request);
  }

  let decodedUrl: string;
  try {
    decodedUrl = decodeURIComponent(url.trim());
  } catch {
    return redirectToPlaceholder(request);
  }
  if (!isValidImageUrl(decodedUrl)) {
    return redirectToPlaceholder(request);
  }

  try {
    const res = await fetch(decodedUrl, {
      headers: {
        "User-Agent": IMAGE_PROXY_UA,
        Accept: "image/*,*/*",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return redirectToPlaceholder(request);
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const cacheControl =
      res.headers.get("cache-control") ??
      "public, max-age=3600, s-maxage=3600";

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch {
    return redirectToPlaceholder(request);
  }
}
