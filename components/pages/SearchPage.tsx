"use client";

/**
 * SearchPage - Search bar, "search in" and date filters, results grid, pagination.
 * useSearch runs only when query is non-empty. Uses NewsContext filters.
 */
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Lightbulb } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/ui/ArticleCard";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import NewsModal from "@/components/NewsModal";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { useNewsContext } from "@/context/NewsContext";
import type { Article } from "@/types/news";

const SEARCH_IN_OPTIONS = [
  { value: "", label: "All fields" },
  { value: "title", label: "Title" },
  { value: "description", label: "Description" },
  { value: "content", label: "Content" },
  { value: "title,description", label: "Title & description" },
] as const;

const RESULTS_PER_PAGE = 10;

/** Inner content that uses useSearch; keyed so page resets when query/filters change */
function SearchResults({
  query,
  searchIn,
  dateFrom,
  dateTo,
  onArticleClick,
}: {
  query: string;
  searchIn: string;
  dateFrom: string;
  dateTo: string;
  onArticleClick: (article: Article) => void;
}) {
  const { filters } = useNewsContext();
  const { articles, totalArticles, loading, error, page, setPage } = useSearch(
    query,
    {
      lang: filters.lang || undefined,
      country: filters.country || undefined,
      max: RESULTS_PER_PAGE,
      in: searchIn || undefined,
      from: dateFrom ? `${dateFrom}T00:00:00Z` : undefined,
      to: dateTo ? `${dateTo}T23:59:59Z` : undefined,
    },
  );
  return (
    <>
      {error && (
        <div className="py-12 text-center px-4">
          <p className="text-red-400 font-outfit">{error}</p>
          <p className="text-sm font-outfit text-muted-foreground mt-2 max-w-md mx-auto">
            This can happen if the API key is missing, invalid, or the daily
            limit (~100 requests) has been reached. Check GNEWS_API_KEY in
            Vercel env vars or try again later.
          </p>
        </div>
      )}
      {loading && query && <SearchResultsSkeleton />}
      {!loading && query && !error && totalArticles > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="font-outfit text-foreground">
            {totalArticles} articles found
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="border-border text-foreground hover:bg-muted"
            >
              Previous
            </Button>
            <span className="font-outfit text-sm text-muted-foreground">
              Page {page}
              {totalArticles > RESULTS_PER_PAGE
                ? ` of ${Math.ceil(totalArticles / RESULTS_PER_PAGE)}`
                : ""}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page * RESULTS_PER_PAGE >= totalArticles}
              onClick={() => setPage(page + 1)}
              className="border-border text-foreground hover:bg-muted"
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {!query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-3 text-center min-h-[40vh]"
        >
          <p className="font-outfit text-muted-foreground text-base sm:text-lg flex items-center gap-2 justify-center flex-wrap">
            <Search className="size-5 shrink-0 text-primary" aria-hidden />
            Search for news across thousands of sources
          </p>
          <p className="font-outfit text-muted-foreground/80 text-sm flex items-center gap-2 justify-center flex-wrap">
            <Lightbulb
              className="size-4 shrink-0 text-primary/80"
              aria-hidden
            />
            Try keywords like technology, sports, or world events
          </p>
          <Link
            href="/"
            className="mt-4 font-outfit text-primary hover:text-foreground transition-colors underline"
          >
            Browse headlines to bookmark
          </Link>
        </motion.div>
      )}
      {!loading && query && articles.length === 0 && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="font-outfit text-muted-foreground text-base sm:text-lg mb-2">
            No articles found for &quot;{query}&quot;
          </p>
          <p className="font-outfit text-muted-foreground/80 text-sm">
            Try different keywords or adjust your country/language filters
          </p>
          <Link
            href="/"
            className="inline-block mt-4 font-outfit text-primary hover:text-foreground transition-colors underline"
          >
            Browse headlines instead
          </Link>
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article, index) => (
              <ArticleCard
                key={article.url + index}
                article={article}
                onClick={() => onArticleClick(article)}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Search page content - client component */
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchIn, setSearchIn] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  const searchKey = `${query}-${searchIn}-${dateFrom}-${dateTo}`;

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="max-w-9xl mx-auto w-full flex flex-col flex-1">
        <header className="w-full bg-card shrink-0">
          <Navbar />
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8 px-2 sm:px-4 flex-1 flex flex-col items-center"
        >
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
            <h1 className="font-playfair text-2xl sm:text-3xl text-foreground tracking-wider mb-6 text-center">
              Search News
            </h1>
            <div className="w-full mb-4">
              <SearchBar
                onSearch={setQuery}
                placeholder="e.g. technology, sports..."
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
              <label className="flex items-center gap-2 font-outfit text-sm text-foreground">
                Search in:
                <select
                  value={searchIn}
                  onChange={(e) => setSearchIn(e.target.value)}
                  className="bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-ring"
                >
                  {SEARCH_IN_OPTIONS.map((opt) => (
                    <option key={opt.value || "all"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 font-outfit text-sm text-foreground">
                From:
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-ring"
                />
              </label>
              <label className="flex items-center gap-2 font-outfit text-sm text-foreground">
                To:
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-ring"
                />
              </label>
            </div>
          </div>
          <div className="flex-1 flex flex-col w-full max-w-9xl mx-auto mt-4">
            <SearchResults
              key={searchKey}
              query={query}
              searchIn={searchIn}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onArticleClick={handleArticleClick}
            />
          </div>
        </motion.div>
        <Footer />
      </div>
      <NewsModal
        show={showModal}
        article={selectedArticle}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
