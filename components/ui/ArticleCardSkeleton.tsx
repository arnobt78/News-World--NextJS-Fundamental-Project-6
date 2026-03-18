"use client";

/**
 * ArticleCardSkeleton - Loading placeholder matching ArticleCard layout.
 * isHeadline: larger card (kept for potential reuse; featured headline not used in NewsGrid).
 * Else: standard card with title lines + badge.
 */
import { Skeleton } from "./skeleton";

interface ArticleCardSkeletonProps {
  isHeadline?: boolean;
}

export default function ArticleCardSkeleton({
  isHeadline = false,
}: ArticleCardSkeletonProps) {
  return (
    <div
      className={`w-full rounded-xl overflow-hidden relative ${
        isHeadline ? "h-64 sm:h-96 md:h-[35rem]" : "h-full min-h-60"
      }`}
    >
      <Skeleton
        className={`w-full h-full rounded-xl block ${
          isHeadline ? "h-64 sm:h-96 md:h-[35rem]" : "min-h-60"
        }`}
      />
      <div className="absolute left-0 bottom-0 w-full p-4 pr-12 rounded-b-xl space-y-1.5">
        <Skeleton
          className={`rounded ${
            isHeadline
              ? "h-8 sm:h-9 md:h-10 w-3/4 sm:w-4/5"
              : "h-4 sm:h-5 md:h-6 w-full"
          }`}
        />
        {!isHeadline && (
          <>
            <Skeleton className="h-4 sm:h-5 md:h-6 w-3/4 rounded" />
            <Skeleton className="h-4 sm:h-5 md:h-6 w-2/3 rounded" />
            <Skeleton className="h-3 sm:h-4 w-24 rounded mt-1" />
          </>
        )}
      </div>
    </div>
  );
}
