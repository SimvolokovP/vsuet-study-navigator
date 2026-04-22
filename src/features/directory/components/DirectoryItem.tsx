import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DirectoryItemProps {
  title: string;
  icon: LucideIcon;
  href?: string;
  disabled?: boolean;
}

export function DirectoryItem({
  title,
  icon: Icon,
  href = "",
  disabled = false,
}: DirectoryItemProps) {
  return (
    <>
      {!disabled && href ? (
        <Link href={href}>
          <div className="w-full flex items-center gap-4 whitespace-nowrap rounded-md font-medium justify-start h-12 md:h-20 text-lg md:text-2xl px-4 bg-card text-card-foreground border border-border shadow-sm anim-hover">
            <Icon className="text-xl md:text-2xl" />
            {title}
          </div>
        </Link>
      ) : (
        <div className="w-full opacity-50 flex items-center gap-4 whitespace-nowrap rounded-md font-medium justify-start h-12 md:h-20 text-lg md:text-2xl px-4 bg-card text-card-foreground border border-border shadow-sm anim-hover">
          <Icon className="text-xl md:text-2xl" />
          {title}
        </div>
      )}
    </>
  );
}
