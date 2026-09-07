"use client";

import { PAGES } from "@/shared/config/pages-url.config";
import { MENU } from "@/shared/data/menu.data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/utils/cn";
import { Logo } from "@/widgets/Logo";
import { LogIn, LogOut } from "lucide-react";
import { LogoutConfirm } from "@/widgets/LogoutConfirm";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Sidebar() {
  const pathname = usePathname();

  const { userData } = useAuth();

  return (
    <aside className="fixed z-30 hidden md:flex border-r-2 border-border h-full flex-col bg-card w-(--sider-width) shrink py-9">
      <div className="h-full flex flex-col items-center justify-between w-full">
        <div className="flex flex-col gap-10 w-full items-center">
          <Link href={PAGES.HOME}>
            <Logo />
          </Link>

          <nav className="w-full">
            <ul className="flex flex-col gap-5 items-center justify-center">
              {MENU.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li className="w-full" key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "relative flex justify-center w-full h-9 items-center transition-all",
                            "before:absolute before:left-0 before:w-1 before:h-full before:rounded-r-sm before:transition-colors",
                            isActive
                              ? "before:bg-inner text-inner"
                              : "before:bg-transparent text-muted-foreground hover:text-inner",
                          )}
                        >
                          <item.icon size={24} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={10}>
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 w-full items-center">
          <div className="w-full flex justify-center">
            {userData ? (
              <LogoutConfirm>
                <button className="relative cursor-pointer flex justify-center w-full h-9 items-center transition-all text-muted-foreground hover:text-destructive group">
                  <LogOut size={24} />
                </button>
              </LogoutConfirm>
            ) : (
              <Link href={`${PAGES.AUTH}?type=credentials`}>
                <button className="relative cursor-pointer flex justify-center w-full h-9 items-center transition-all text-muted-foreground group">
                  <LogIn size={24} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
