import { MobileNavigation } from "@/shared/layout/MobileNavigation";
import { Sidebar } from "@/shared/layout/Sidebar";
import { cn } from "@/shared/utils/cn";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative min-h-screen w-full flex bg-main-bg">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div
          className={cn(
            "flex-1 flex flex-col w-full transition-all",
            "md:ml-(--sider-width) md:pb-4 md:mr-4",
            "pb-[calc(var(--spacing-mobile-nav)+1rem)]",
          )}
        >
          <div className="min-h-full flex flex-col overflow-hidden">
            <main className="flex-1 container">{children}</main>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-(--mobile-menu-height) block md:hidden z-30">
          <MobileNavigation />
        </div>
      </div>
    </>
  );
}
