import { PropsWithChildren, ReactNode } from "react";

interface LayoutProps {
  title?: string | ReactNode;
  description?: string;
  actions?: ReactNode;
}

export function Layout({
  children,
  title = "",
  description = "",
  actions,
}: PropsWithChildren<LayoutProps>) {
  return (
    <div className="container">
      <div className="shrink-0 pt-4 md:pt-9 px-1 md:px-2">
        <div className="flex w-full flex-wrap items-start justify-between mb-2 md:mb-4 gap-2">
          <h3 className="font-bold text-2xl md:text-3xl">{title}</h3>
          {actions}
        </div>
        <p className="font-normal text-sm md:text-lg mb-2">{description}</p>
      </div>

      <div className="flex-1 px-1 md:px-8 pb-19 md:pb-9 overflow-auto">
        {children}
      </div>
    </div>
  );
}
