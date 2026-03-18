/**
 * Category → Lucide icon mapping for sidebar navigation.
 * Used by NewsSidebar to show an icon beside each category label.
 */
import type { LucideIcon } from "lucide-react";
import {
  Newspaper,
  Globe,
  Briefcase,
  Monitor,
  Film,
  Trophy,
  FlaskConical,
  Heart,
  Landmark,
} from "lucide-react";
import type { NewsCategory } from "./categories";

export const categoryIcons: Record<NewsCategory, LucideIcon> = {
  general: Newspaper,
  world: Globe,
  business: Briefcase,
  technology: Monitor,
  entertainment: Film,
  sports: Trophy,
  science: FlaskConical,
  health: Heart,
  nation: Landmark,
};
