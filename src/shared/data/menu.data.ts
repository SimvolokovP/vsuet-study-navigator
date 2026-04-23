import { PAGES } from "@/config/pages-url.config";
import {
  ClipboardClock,
  LucideIcon,
  Search,
  Settings,
  Award,
  SwatchBook,
} from "lucide-react";

export interface IMenuItem {
  href: string;
  label?: string;
  icon: LucideIcon;
}

export const MENU: IMenuItem[] = [
  { href: PAGES.HOME, label: "Расписание", icon: ClipboardClock },
  { href: PAGES.SEARCH, label: "Поиск", icon: Search },
  // { href: PAGES.TEACHERS, label: "Преподаватели", icon: UserRoundSearch },
  { href: PAGES.RATING, label: "Рейтинг", icon: Award },
  { href: PAGES.DIRECTORY, label: "Справочник", icon: SwatchBook },
  { href: PAGES.PROFILE, label: "Профиль", icon: Settings },
];
