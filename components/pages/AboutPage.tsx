"use client";

/**
 * AboutPage - Learn the basics: centered header + grid of feature cards with Lucide icons.
 * Same layout pattern as Search/Bookmarks with smooth staggered card animations.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Zap,
  LayoutList,
  Layers,
  Box,
  Type,
  Globe,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const FEATURES = [
  {
    icon: Zap,
    title: "How headlines are loaded",
    body: "Server-side fetch on the home page, then client-side category switching with React Query and optional SSR cache.",
  },
  {
    icon: LayoutList,
    title: "Headlines by category",
    body: "Browse general, world, business, technology, sports, science, health, and more via the GNews top-headlines API.",
  },
  {
    icon: Layers,
    title: "Context API",
    body: "Country and language filters live in NewsContext; bookmark state in BookmarkContext with localStorage sync.",
  },
  {
    icon: Box,
    title: "Reusable components",
    body: "ArticleCard, NewsGrid, HeroBanner, BannerSlider, Navbar, Footer, and modals are shared across the app.",
  },
  {
    icon: Type,
    title: "TypeScript types",
    body: "Article, ArticleSource, GNewsResponse, and API params are typed for safer refactors and editor support.",
  },
  {
    icon: Globe,
    title: "GNews API",
    body: "Powered by GNews for real-time news and top headlines. Supports search, filters by language and country, and pagination.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="max-w-9xl mx-auto w-full flex flex-col flex-1">
        <header className="w-full bg-card shrink-0">
          <Navbar />
        </header>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="py-8 flex-1 px-2 sm:px-4 flex flex-col items-center w-full max-w-7xl mx-auto"
        >
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6">
              <BookOpen className="size-7" aria-hidden />
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl text-foreground tracking-wider mb-4">
              Learn the basics
            </h1>
            <p className="font-outfit text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              This is an educational news app built with Next.js, React, and the
              GNews API. Below are the main concepts and features used in the
              project.
            </p>
          </motion.section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <motion.article
                key={title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-border bg-card p-6 text-left shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h2 className="font-playfair text-lg font-semibold text-foreground mb-2">
                  {title}
                </h2>
                <p className="font-outfit text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </motion.article>
            ))}
          </section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 py-3 px-6 bg-muted hover:bg-muted/80 rounded-xl text-foreground font-outfit transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.main>
        <Footer />
      </div>
    </div>
  );
}
