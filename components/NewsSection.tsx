"use client";

/**
 * NewsSection - Main home layout: header, category sidebar, hero + reel, article grid, footer.
 * Scrolls main content to top smoothly when sidebar category changes.
 */
import { useState, useMemo, useRef, useCallback } from "react";
import type { Article } from "@/types/news";
import type { NewsCategory } from "@/data/categories";
import { useNews } from "@/hooks/useNews";
import { useNewsContext } from "@/context/NewsContext";
import NewsSidebar from "./NewsSidebar";
import NewsGrid from "./NewsGrid";
import NewsModal from "./NewsModal";
import HeroBanner from "./HeroBanner";
import BannerSlider from "./BannerSlider";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import AnimatedSection from "./ui/AnimatedSection";
import NewsGridSkeleton from "./ui/NewsGridSkeleton";

interface NewsSectionProps {
  initialArticles: Article[];
}

export default function NewsSection({ initialArticles }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory>("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { filters } = useNewsContext();

  const { headline, news, loading, error } = useNews(
    selectedCategory,
    selectedCategory === "general"
      ? initialArticles
      : undefined /* SSR data only for general */,
    {
      country: filters.country || undefined,
      lang: filters.lang || undefined,
      max: 10,
    },
  );

  const mainRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = useCallback((category: NewsCategory) => {
    setSelectedCategory(category);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const bannerArticles = useMemo(() => {
    const list = headline ? [headline, ...news] : news;
    return list;
  }, [headline, news]);

  const bannerSeed = useMemo(
    () =>
      selectedCategory.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0),
    [selectedCategory],
  );

  return (
    <div className="w-full min-w-0 h-screen flex flex-col overflow-hidden">
      <div className="w-full h-full flex flex-col shadow-2xl rounded-2xl overflow-hidden">
        <header className="w-full bg-card shrink-0">
          <Navbar />
        </header>

        <div className="flex gap-4 flex-1 min-h-0 px-2 sm:px-4 pt-4 pb-8 max-[900px]:flex-col max-[900px]:gap-6">
          <NewsSidebar
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />

          <main
            ref={mainRef}
            className="flex-1 min-w-0 w-full overflow-y-auto scrollbar-custom flex flex-col min-h-0"
          >
            <div className="flex flex-col min-h-full">
              <AnimatedSection
                delay={0.1}
                direction="up"
                className="flex flex-col flex-1"
              >
                {error ? (
                  <div className="flex flex-col items-center justify-center h-64 text-foreground/80 gap-4 text-center px-4">
                    <p className="text-red-400 font-outfit">{error}</p>
                    <p className="text-sm font-outfit text-muted-foreground max-w-md">
                      This can happen if the API key is missing, invalid, or the
                      daily limit (~100 requests) has been reached. Check
                      GNEWS_API_KEY in Vercel env vars or try again later.
                    </p>
                  </div>
                ) : loading && !headline && news.length === 0 ? (
                  <NewsGridSkeleton count={10} />
                ) : (
                  <>
                    {bannerArticles.length > 0 && (
                      <>
                        <HeroBanner
                          articles={bannerArticles}
                          onArticleClick={handleArticleClick}
                        />
                        <h2 className="font-playfair text-xl sm:text-2xl text-foreground tracking-wider mb-3">
                          Headlines
                        </h2>
                        <BannerSlider
                          articles={bannerArticles}
                          onArticleClick={handleArticleClick}
                          seed={bannerSeed}
                        />
                      </>
                    )}
                    <NewsGrid
                      articles={bannerArticles}
                      onArticleClick={handleArticleClick}
                    />
                  </>
                )}
              </AnimatedSection>

              <div className="mt-auto shrink-0 pt-4">
                <Footer />
              </div>
            </div>
          </main>
        </div>

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
