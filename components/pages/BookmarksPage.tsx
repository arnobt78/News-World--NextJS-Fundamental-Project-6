"use client";

/**
 * BookmarksPage - Displays articles saved via BookmarkContext (localStorage).
 * Converts BookmarkArticle to Article for ArticleCard. Empty state with link to home.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bookmark, Save } from "lucide-react";
import ArticleCard from "@/components/ui/ArticleCard";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import NewsModal from "@/components/NewsModal";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types/news";
import type { BookmarkArticle } from "@/context/BookmarkContext";

/** Convert bookmark data to full Article shape for ArticleCard and NewsModal */
function toArticle(b: BookmarkArticle): Article {
  return {
    title: b.title,
    url: b.url,
    image: b.image,
    publishedAt: b.publishedAt,
    source: { name: b.source.name, country: b.source.country },
    lang: b.lang,
    content: b.content ?? "",
    description: b.description ?? "",
  };
}

export default function BookmarksPage() {
  const { bookmarkedArticles } = useBookmarks();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

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
          className="py-8 flex-1 px-2 sm:px-4 flex flex-col items-center w-full max-w-9xl mx-auto"
        >
          <h1 className="font-playfair text-2xl sm:text-3xl text-foreground tracking-wider mb-6 w-full text-center">
            Bookmarks
          </h1>
          {bookmarkedArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 flex flex-col items-center justify-center flex-1 min-h-[40vh] text-center"
            >
              <p className="font-outfit text-muted-foreground text-base sm:text-lg mb-2 flex items-center justify-center gap-2 flex-wrap">
                <Bookmark className="size-5 shrink-0 text-primary" aria-hidden />
                No bookmarked articles yet
              </p>
              <p className="font-outfit text-muted-foreground/80 text-sm mb-4 flex items-center justify-center gap-2 flex-wrap">
                <Save className="size-4 shrink-0 text-primary/80" aria-hidden />
                Save articles you want to read later by clicking the bookmark
                icon
              </p>
              <Link
                href="/"
                className="font-outfit text-primary hover:text-foreground transition-colors underline"
              >
                Browse headlines to bookmark
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
              >
                {bookmarkedArticles.map((b, index) => (
                  <ArticleCard
                    key={b.url}
                    article={toArticle(b)}
                    onClick={() => handleArticleClick(toArticle(b))}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
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
