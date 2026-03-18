"use client";

/**
 * NewsSidebar - Category sidebar (General, World, Business, etc.).
 * Staggered Framer Motion animation. Selected category highlighted.
 * Renders Lucide icon per category from categoryIcons.
 */
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { categoryIcons } from "@/data/categoryIcons";
import type { NewsCategory } from "@/data/categories";

interface NewsSidebarProps {
  selectedCategory: NewsCategory;
  onCategoryClick: (category: NewsCategory) => void;
}

/* Framer Motion: stagger children for sequential reveal */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function NewsSidebar({
  selectedCategory,
  onCategoryClick,
}: NewsSidebarProps) {
  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-[16rem] shrink-0 h-full bg-card flex flex-col gap-8 rounded-xl p-4 max-lg:flex-row max-lg:flex-wrap max-lg:justify-center max-lg:w-full max-lg:h-auto max-lg:gap-4 sticky top-0 self-start"
    >
      <h2 className="font-playfair text-lg sm:text-xl text-muted-foreground tracking-wider max-lg:mb-0 max-lg:w-full max-lg:text-center">
        Categories
      </h2>
      <div className="flex flex-col gap-2 max-lg:flex-row max-lg:flex-wrap max-lg:justify-center max-lg:gap-2">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <motion.button
              key={category}
              type="button"
              variants={item}
              onClick={() => onCategoryClick(category)}
              className={`flex items-center gap-2 text-left text-sm sm:text-base font-light uppercase tracking-wider transition-all duration-200 rounded-lg px-3 py-2 ${
                selectedCategory === category
                  ? "text-foreground font-medium bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {category}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
