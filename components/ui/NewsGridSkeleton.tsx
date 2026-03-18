"use client";

/**
 * NewsGridSkeleton - Grid of ArticleCardSkeletons. Matches NewsGrid layout.
 * isHeadline: one large (kept for potential reuse; not used—hero + reel instead). Else: count cards.
 */
import ArticleCardSkeleton from "./ArticleCardSkeleton";

interface NewsGridSkeletonProps {
  isHeadline?: boolean;
  count?: number;
}

export default function NewsGridSkeleton({
  isHeadline = false,
  count = 6,
}: NewsGridSkeletonProps) {
  if (isHeadline) {
    return (
      <div className="mb-4">
        <ArticleCardSkeleton isHeadline />
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-xl grid grid-cols-2 gap-4 p-4 justify-items-center items-stretch max-[500px]:grid-cols-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-full min-h-60">
          <ArticleCardSkeleton />
        </div>
      ))}
    </div>
  );
}
