"use client";

/**
 * SearchBar - Debounced search input. Theme-aware for light/dark mode.
 * Uses Lucide Search icon. Focus state for border/scale animation.
 */
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search news...",
  debounceMs = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const debouncedSearch = useCallback(() => {
    onSearch(query.trim());
  }, [query, onSearch]);

  useEffect(() => {
    const timer = setTimeout(debouncedSearch, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, debouncedSearch]);

  return (
    <motion.div
      className={`flex items-center gap-2 rounded-xl border-2 transition-colors ${
        focused
          ? "border-primary bg-muted/50"
          : "border-border bg-muted/30"
      }`}
      animate={{ scale: focused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="pl-4 text-muted-foreground shrink-0" aria-hidden>
        <Search className="size-5" />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 py-3 px-2 bg-transparent text-foreground placeholder:text-muted-foreground outline-none font-outfit text-sm sm:text-base md:text-lg"
        aria-label="Search news"
      />
    </motion.div>
  );
}
