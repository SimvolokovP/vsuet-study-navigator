import { cn } from "@/shared/utils/cn";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="relative h-screen w-full flex bg-main-bg overflow-hidden">
        <div className={cn("flex-1 flex flex-col w-full transition-all overflow-hidden p-4 md:p-6")}>
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}