"use client";
import { MENU } from "@/shared/data/menu.data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="z-20 fixed bottom-0 left-0 right-0 mx-auto w-full max-w-96 px-4 pb-4 block md:hidden">
      <div className="rounded-xl border-2 border-border bg-card/80 backdrop-blur-md p-2 shadow-2xl">
        <ul className="flex justify-around">
          {MENU.map((menuItem) => (
            <li className="flex-1" key={menuItem.href}>
              <Link
                className={`
        relative 
        flex 
        justify-center 
        items-center
        gap-1
        p-1.5
        w-full 
        h-full 
        rounded-md
        transition-colors
        duration-300
        ${!!match(menuItem.href)(pathname) ? "text-inner bg-secondary" : "text-muted-foreground"}
      `}
                href={menuItem.href}
              >
                <menuItem.icon size={24} />
                {!!match(menuItem.href)(pathname) && menuItem.label && (
                  <span className="text-[12px] font-medium">
                    {menuItem.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
