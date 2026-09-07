import { PAGES } from "@/shared/config/pages-url.config";
import {
  LucideIcon,
  Settings,
  Award,
  SwatchBook,
  Home,
  Calendar,
} from "lucide-react";

export interface IMenuItem {
  href: string;
  label?: string;
  icon: LucideIcon;
}

export const MENU: IMenuItem[] = [
  { href: PAGES.HOME, label: "Главная", icon: Home },
  { href: PAGES.SCHEDULE, label: "Расписание", icon: Calendar },
  // { href: PAGES.SEARCH, label: "Поиск", icon: Search },
  // { href: PAGES.TEACHERS, label: "Преподаватели", icon: UserRoundSearch },
  { href: PAGES.RATING, label: "Рейтинг", icon: Award },
  { href: PAGES.DIRECTORY, label: "Справочник", icon: SwatchBook },
  { href: PAGES.PROFILE, label: "Профиль", icon: Settings },
];
