# Daily World News - Next.js, React, TypeScript, GNews API, TailwindCSS, Framer Motion, TanStack React Query, Context API Fundamental Project 6

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![GNews API](https://img.shields.io/badge/GNews-API-green)](https://gnews.io/)

A modern, full-featured news application that delivers live world headlines from thousands of sources. Built with Next.js 16, React 19, TypeScript, and the GNews API, it demonstrates server-side rendering (SSR), client-side data fetching, React Query, Context API, bookmarks with localStorage, and responsive design—ideal for learning and teaching modern web development.

- **Live Demo:** [https://daily-world-news.vercel.app/](https://daily-world-news.vercel.app/)

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [How to Run](#how-to-run)
8. [Routes & Pages](#routes--pages)
9. [API Endpoints](#api-endpoints)
10. [Components & Architecture](#components--architecture)
11. [Hooks & Data Fetching](#hooks--data-fetching)
12. [Context & State Management](#context--state-management)
13. [Libraries & Dependencies](#libraries--dependencies)
14. [Reusing Components](#reusing-components)
15. [Keywords](#keywords)
16. [Implementation highlights](#implementation-highlights-whats-included)
17. [Conclusion](#conclusion)
18. [License](#license)
19. [Happy Coding!](#happy-coding-)

---

## Introduction

News World is an educational news application that fetches real-time headlines from the GNews API. It combines server-side rendering for fast initial load with client-side interactivity for category switching, keyword search, and bookmarking. The project showcases Next.js App Router, React Server Components, API routes as a backend proxy, TanStack React Query for caching, and a clean component-based architecture—making it a practical reference for beginners and intermediate developers learning full-stack React development.

---

## Features

| Feature                        | Description                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Category Headlines**         | Browse news by category: General, World, Business, Technology, Entertainment, Sports, Science, Health, Nation |
| **Hero & Headlines Reel**      | Hero banner (responsive height) and infinite auto-scrolling film reel of articles on the home page          |
| **Keyword Search**            | Search across 80,000+ sources with "Search in", date range (From/To), and pagination; centered layout        |
| **Bookmarks**                  | Save articles; counter badge in navbar; full article data stored; same badges as Home; centered empty state   |
| **Country & Language Filters** | Filter headlines and search by 20+ countries and 15+ languages (NewsContext, shared across Home & Search)    |
| **Article Modal**              | Shadcn Dialog (90vw×90vh), theme-aware; source/date/lang/country badges; single body; Share, Bookmark, Read More |
| **Refresh**                    | Manually refresh headlines with a loading indicator                                                            |
| **Theme Toggle**               | Light/dark mode; consistent theme-aware UI; scrollbars and inputs adapt                                       |
| **Responsive Design**          | Mobile-first; Search/Bookmarks/About centered (max-w-7xl); Navbar border inset (mx-4)                        |
| **Skeleton Loading**          | Animated skeletons; hero/reel use mounted guard to avoid hydration mismatch                                   |
| **SEO Metadata**               | Title, description, author, Open Graph, Twitter cards                                                         |
| **Image Proxy**                | First-party `/api/image`; 4xx/5xx → placeholder; avoids ad blocker blocking                                   |
| **Category Icons**             | Lucide icons next to each category in the sidebar                                                             |
| **Unified Data Flow**          | Same Article shape and NewsModal on Home, Search, Bookmarks; single hooks/context pattern                    |

---

## Technology Stack

| Technology               | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| **Next.js 16**           | React framework with App Router, API routes, SSR |
| **React 19**             | UI library with hooks and server components      |
| **TypeScript**           | Type safety and better DX                        |
| **Tailwind CSS 4**       | Utility-first styling                            |
| **TanStack React Query** | Server state, caching, and invalidation          |
| **Framer Motion**        | Animations and transitions                       |
| **Lucide React**         | Icons                                            |
| **GNews API**            | News data provider (headlines + search)          |
| **ESLint**               | Code quality and linting                         |

---

## Project Structure

```bash
news-world/
├── app/
│   ├── api/
│   │   ├── headlines/route.ts   # GET /api/headlines - Top headlines proxy
│   │   ├── image/route.ts       # GET /api/image - Image proxy (avoids ad blocker blocking)
│   │   └── search/route.ts      # GET /api/search - Search proxy
│   ├── about/page.tsx           # About page
│   ├── bookmarks/page.tsx       # Bookmarks page
│   ├── search/page.tsx          # Search page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout, metadata, providers
│   └── page.tsx                 # Home page (SSR initial fetch)
├── components/
│   ├── pages/
│   │   ├── HomePage.tsx         # Home page content
│   │   ├── SearchPage.tsx       # Search page (centered form, empty state with icons)
│   │   ├── BookmarksPage.tsx    # Bookmarks page (centered, empty state with icons)
│   │   └── AboutPage.tsx        # About page (Framer Motion staggered cards)
│   ├── ui/
│   │   ├── ArticleCard.tsx      # Article card with badges, bookmark button
│   │   ├── ArticleCardSkeleton.tsx
│   │   ├── Navbar.tsx           # Top navbar; border-b + mx-4 for inset line
│   │   ├── Footer.tsx            # Reusable footer
│   │   ├── SearchBar.tsx        # Theme-aware search input (Lucide Search)
│   │   ├── SearchResultsSkeleton.tsx
│   │   ├── NewsGridSkeleton.tsx
│   │   └── ...                  # Button, Badge, Skeleton, Dialog, etc.
│   ├── NewsSection.tsx          # Home: header, sidebar, hero, reel, grid, footer
│   ├── NewsSidebar.tsx          # Category sidebar with Lucide icons
│   ├── HeroBanner.tsx           # Hero carousel (mounted guard for hydration)
│   ├── BannerSlider.tsx         # Infinite film reel (mounted guard)
│   ├── NewsGrid.tsx             # Article grid layout
│   ├── NewsModal.tsx            # Shadcn Dialog article detail (90vw×90vh)
│   ├── ThemeToggle.tsx          # Light/dark theme
│   └── providers/
│       ├── QueryProvider.tsx   # React Query client
│       └── InvalidationProvider.tsx
├── context/
│   ├── NewsContext.tsx         # Country/lang filters, query invalidation
│   └── BookmarkContext.tsx     # Bookmark state, localStorage sync
├── hooks/
│   ├── useNews.ts              # Headlines query
│   ├── useSearch.ts            # Search query
│   ├── useRefreshNews.ts       # Manual refresh
│   └── useBookmarks.ts         # (optional) bookmark helpers
├── lib/
│   ├── gnews.ts                # GNews API fetchers (server-side)
│   ├── api.ts                  # Client-side fetch wrappers
│   ├── imageProxy.ts           # getProxiedImageUrl() - proxy external images
│   ├── queryKeys.ts            # React Query key factory
│   ├── queryClient.ts          # Query client config
│   ├── invalidateNews.ts       # Invalidation helpers
│   └── utils.ts                # cn(), etc.
├── data/
│   ├── categories.ts            # GNews category list
│   ├── categoryIcons.tsx        # Lucide icon map per category
│   ├── countries.ts             # Country codes for filters
│   └── languages.ts             # Language codes for filters
├── types/
│   └── news.ts                 # Article, GNewsResponse, params
├── public/
│   ├── favicon.ico
│   └── images/                 # Placeholder images
├── .env.example                # Environment variable template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Installation & Setup

### Prerequisites

- **Node.js** 20.x or later ([nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/arnobt78/News--ReactVite.git
   cd news-world
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

You **do not need** any environment variables to run the app locally. The app will start and render, but news data will not load without a GNews API key.

To enable live news:

| Variable        | Required            | Description                                                                 |
| --------------- | ------------------- | --------------------------------------------------------------------------- |
| `GNEWS_API_KEY` | Optional (for data) | Your GNews API key from [gnews.io](https://gnews.io/docs/v4#authentication) |

### How to get `GNEWS_API_KEY`

1. Go to [gnews.io](https://gnews.io/)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Create a `.env.local` file in the project root:

   ```env
   GNEWS_API_KEY=your_api_key_here
   ```

5. Restart the dev server (`npm run dev`)

**Note:** The free tier allows ~100 requests per day. For production (e.g. Vercel), add `GNEWS_API_KEY` in your project's Environment Variables. If you see **403** from the API, check that the key is valid and not expired; 403 can also indicate rate limit or plan restrictions.

### `.env.example`

The project includes `.env.example` as a template:

```env
# Get your GNews API key from https://gnews.io/docs/v4#authentication
GNEWS_API_KEY=your_gnews_api_key_here
```

Copy to `.env.local` and replace with your key.

---

## How to Run

| Command            | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `npm run dev`      | Start development server (Turbopack) at [http://localhost:3000](http://localhost:3000) |
| `npm run build`    | Create production build                                                                |
| `npm run start`    | Run production server (after `npm run build`)                                          |
| `npm run lint`     | Run ESLint                                                                             |
| `npm run lint:fix` | Run ESLint with auto-fix                                                               |

---

## Routes & Pages

| Route        | Page      | Description                               |
| ------------ | --------- | ----------------------------------------- |
| `/`          | Home      | Category headlines, sidebar, article grid |
| `/search`    | Search    | Keyword search with filters               |
| `/bookmarks` | Bookmarks | Saved articles from localStorage          |
| `/about`     | About     | Project info, tech stack, features        |

All pages share the same header (Navbar), footer, and layout structure. The home page uses a sidebar for categories plus hero and reel; Search, Bookmarks, and About use a centered single-column layout (max-w-7xl) with consistent padding and empty states.

---

## API Endpoints

The app uses **Next.js API routes** as a backend proxy to the GNews API. This keeps the API key server-side and avoids CORS when fetching from the client.

### GET `/api/headlines`

Fetches top headlines from GNews.

**Query parameters:**

| Param      | Type   | Default   | Description                                                                                  |
| ---------- | ------ | --------- | -------------------------------------------------------------------------------------------- |
| `category` | string | `general` | One of: general, world, business, technology, entertainment, sports, science, health, nation |
| `country`  | string | -         | Country code (e.g. `us`, `gb`, `in`)                                                         |
| `lang`     | string | `en`      | Language code (e.g. `en`, `es`, `fr`)                                                        |
| `max`      | number | 10        | Max articles to return                                                                       |
| `page`     | number | 1         | Page number                                                                                  |
| `nullable` | string | -         | Optional GNews param                                                                         |
| `truncate` | string | -         | `content` to truncate article content                                                        |

**Example:**

```bash
GET /api/headlines?category=technology&country=us&max=10
```

### GET `/api/search`

Searches news articles by keyword.

**Query parameters:**

| Param     | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `q`       | string | Yes      | Search query                      |
| `country` | string | No       | Country filter                    |
| `lang`    | string | No       | Language filter                   |
| `max`     | number | No       | Max results                       |
| `page`    | number | No       | Page number                       |
| `sortby`  | string | No       | `publishedAt` or `relevance`      |
| `in`      | string | No       | Search in: title, description, content, or comma-separated |
| `from`    | string | No       | Start date (ISO)                  |
| `to`      | string | No       | End date (ISO)                    |
| `nullable`| string | No       | Optional GNews param             |
| `truncate`| string | No       | `content` to truncate             |

**Example:**

```bash
GET /api/search?q=technology&lang=en&page=1&in=title,description
```

### GET `/api/image`

First-party image proxy. Fetches external images server-side and streams to the client so ad blockers (which block third-party media) do not affect thumbnails. On upstream 4xx/5xx or invalid URL, redirects to `/images/no-img.png` so the UI shows a placeholder without console errors. SSRF-safe (only http/https, no localhost or private IPs). Configured in `next.config.ts` with Cache-Control headers.

**Query parameters:**

| Param | Type   | Required | Description                    |
| ----- | ------ | -------- | ------------------------------ |
| `url` | string | Yes      | Full URL of the image to fetch |

**Example:**

```bash
GET /api/image?url=https://media.cnn.com/.../image.jpg
```

---

## Components & Architecture

### Page Components (`components/pages/`)

- **HomePage** – Renders `NewsSection` with SSR initial articles
- **SearchPage** – Centered search form (theme-aware SearchBar, Search in, From/To dates), "Browse headlines to bookmark" link, empty state with Lucide icons; results grid with pagination
- **BookmarksPage** – Centered layout; grid of bookmarked articles (same ArticleCard badges as Home); empty state with Lucide icons and "Browse headlines to bookmark"
- **AboutPage** – Client component; "Learn the basics" header + grid of feature cards with Lucide icons; Framer Motion staggered card animations; same max-w-7xl centered layout as Search/Bookmarks

### Layout Components

- **NewsSection** – Home layout: header, NewsSidebar, scrollable main (HeroBanner, Headlines reel, NewsGrid), footer; scroll to top on category change
- **Navbar** – Top bar: logo, country/lang filters, refresh, theme toggle, nav links, bookmark count badge; border-b with mx-4 for inset bottom line
- **NewsSidebar** – Category list with Lucide icons per category
- **HeroBanner** – Hero carousel (responsive height); mounted guard for hydration
- **BannerSlider** – Infinite horizontal reel of article cards; mounted guard for hydration
- **Footer** – Copyright and links

### UI Components

- **ArticleCard** – Image, title, badges (source, date, lang, country), bookmark button; used on Home, Search, Bookmarks
- **NewsGrid** – Grid of ArticleCards
- **NewsModal** – Shadcn Dialog (90vw×90vh); theme-aware badges and text; single body (description or content); Share, Bookmark, Read More; same component on Home, Search, Bookmarks
- **SearchBar** – Theme-aware input with Lucide Search icon; debounced
- **ThemeToggle** – Light/dark theme switch

### Data Flow

1. **Home:** `app/page.tsx` (server) fetches initial headlines → `HomePage` → `NewsSection` uses `useNews` for category switching; same `Article` passed to `NewsModal`
2. **Search:** `SearchPage` uses `useSearch(query, params)` with NewsContext filters; "Search in", From/To; full `Article` to `NewsModal`
3. **Bookmarks:** `BookmarkContext` stores full article data (including description, content); `BookmarksPage` converts to `Article` and uses same `NewsModal`

---

## Hooks & Data Fetching

### `useNews(category, initialArticles?, params?)`

Fetches headlines for a category. Uses React Query with optional SSR initial data for "general".

```tsx
const { headline, news, loading, error, refetch } = useNews(
  "technology",
  undefined,
  { country: "us", lang: "en", max: 10 },
);
```

### `useSearch(query, params?)`

Fetches search results. Enabled only when `query` is non-empty.

```tsx
const { articles, totalArticles, loading, error, page, setPage } = useSearch(
  "climate change",
  { country: "us", lang: "en" },
);
```

### `useRefreshNews()`

Returns `{ refresh, isRefreshing }` to manually refetch headlines and invalidate queries.

### `useNewsContext()`

Returns `{ filters, setCountry, setLang }` for country and language filters.

### `useBookmarks()`

Returns `{ bookmarkedArticles, toggleBookmark, isBookmarked }` for bookmark state.

---

## Context & State Management

### NewsContext

- **Purpose:** Global country and language filters
- **Values:** `filters`, `setCountry`, `setLang`
- **Behavior:** Changing filters invalidates React Query cache for headlines and search

### BookmarkContext

- **Purpose:** Persist bookmarked articles in `localStorage` with full article data for modal parity
- **Stored:** url, title, image, publishedAt, source (name, country), lang, description, content
- **Values:** `bookmarkedArticles`, `toggleBookmark`, `isBookmarked`
- **Storage key:** `news-world-bookmarks`

---

## Libraries & Dependencies

### Core

- **next** – React framework with App Router, API routes, SSR
- **react** / **react-dom** – UI library
- **typescript** – Type checking

### Data & State

- **@tanstack/react-query** – Server state, caching, background refetch
- **Context API** – Filters and bookmarks

### Styling & UI

- **tailwindcss** – Utility CSS
- **framer-motion** – Animations
- **lucide-react** – Icons
- **class-variance-authority**, **clsx**, **tailwind-merge** – Conditional styling

### Utilities

- **lib/utils.ts** – `cn()` for merging class names

---

## Reusing Components

### ArticleCard

Use in any grid to display an article:

```tsx
import ArticleCard from "@/components/ui/ArticleCard";

<ArticleCard
  article={article}
  onClick={() => handleClick(article)}
  index={0}
/>;
```

### Navbar

Drop-in top navbar for any page:

```tsx
import Navbar from "@/components/ui/Navbar";

<header>
  <Navbar />
</header>;
```

### Footer

Reusable footer:

```tsx
import Footer from "@/components/ui/Footer";

<Footer />;
```

### useNews / useSearch

Use in other projects by copying the hooks and ensuring `/api/headlines` and `/api/search` exist or are replaced with your own API.

---

## Keywords

Next.js 16, React 19, TypeScript, Tailwind CSS, GNews API, News App, SSR, API Routes, Image Proxy, React Query, TanStack Query, Context API, localStorage, Bookmarks, Shadcn UI, Lucide Icons, Hero Banner, Light/Dark Theme, Responsive Design, Framer Motion, Hydration-Safe, Educational Project

---

## Implementation highlights (what’s included)

- **Hero & reel:** HeroBanner (responsive `h-64 sm:h-96 md:h-140`) and BannerSlider infinite film reel; both use a mounted guard so SSR and client render the same placeholder, avoiding hydration mismatch.
- **Theme:** Light/dark mode with theme-aware classes everywhere (no hardcoded dark colors); inline script in layout for instant theme apply; scrollbars and form inputs (SearchBar, date inputs with `color-scheme: dark` in dark mode) adapt.
- **Navbar:** Single place for the bottom border; `mx-4` so the line is inset; same header wrapper on all pages (no border on page headers).
- **Search page:** Centered search block; theme-aware SearchBar (Lucide Search icon); "Search in" and From/To date filters; pagination; "Browse headlines to bookmark" link; empty state with Lucide icons, x-y centered.
- **Bookmarks page:** Centered layout; bookmark counter in navbar; same badges on cards as Home (source, date, lang, country); full article data (description, content) stored so the modal shows the same content; empty state with Lucide icons.
- **Article modal:** Shadcn Dialog at 90vw×90vh; theme-aware text and badges; single body block (no duplicate description + content); GNews “[N chars]” suffix stripped; ring-0 for clean edges; same component and Article shape on Home, Search, Bookmarks.
- **Image proxy:** First-party only; 4xx/5xx redirect to placeholder (no 401/400 in console); browser-like User-Agent; documented in `next.config.ts`.
- **About page:** Client component with Framer Motion; staggered card animations; same centered layout (max-w-7xl) and hover styling as other pages.

---

## Conclusion

News World is a practical example of a modern full-stack React application. It combines:

- **Server-side rendering** for fast initial load
- **Client-side fetching** for category switching and search
- **API routes** as a secure backend proxy (headlines, search, image proxy)
- **React Query** for caching and invalidation
- **Context** for filters and bookmarks
- **localStorage** for persistence

The codebase is structured for clarity and reuse. You can extend it with more categories, pagination, or different news APIs. Contributions and feedback are welcome.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
