"use client";
import { MENU } from "@/shared/data/menu.data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="z-20 fixed bottom-0 left-0 right-0 mx-auto w-full max-w-96 px-4 pb-4 block md:hidden">
      <div className="rounded-3xl border-2 border-border bg-card/80 backdrop-blur-md p-2 shadow-2xl">
        <ul className="flex justify-around relative">
          {MENU.map((menuItem) => {
            const isActive = !!match(menuItem.href)(pathname);

            return (
              <li className="flex-1 relative" key={menuItem.href}>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-3xl"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
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
                    rounded-3xl
                    transition-colors
                    duration-200
                    z-10
                    ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground"}
                  `}
                  href={menuItem.href}
                >
                  <motion.div
                    initial={false}
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                  >
                    <menuItem.icon size={24} />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isActive && menuItem.label && (
                      <motion.span
                        initial={{ opacity: 0, x: -5, width: 0 }}
                        animate={{ opacity: 1, x: 0, width: "auto" }}
                        exit={{ opacity: 0, x: -5, width: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="text-[12px] font-medium overflow-hidden whitespace-nowrap"
                      >
                        {menuItem.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
