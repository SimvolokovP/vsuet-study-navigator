import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function UserMessageItem({
  content,
  timestamp,
}: {
  content: string;
  timestamp?: string;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isLongText = content.length > 200;

  return (
    <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%] w-auto">
      <div
        className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap border border-border/80 bg-background/50 transition-all duration-200`}
      >
        {isLongText && !isExpanded ? `${content.slice(0, 200)}...` : content}

        {timestamp && (
          <div className="text-[10px] text-muted-foreground text-right mt-1 select-none">
            {timestamp}
          </div>
        )}
      </div>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs hover:text-primary transition-colors px-1 cursor-pointer"
        >
          {isExpanded ? (
            <>
              Свернуть <ChevronUp size={14} />
            </>
          ) : (
            <>
              Показать полностью <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
