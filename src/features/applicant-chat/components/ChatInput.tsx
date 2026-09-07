import { useRef, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { SendHorizonal, X } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
    <div className="flex items-end gap-2 w-full mx-auto bg-background border border-input rounded-xl p-2 focus-within:ring-1 focus-within:ring-ring">
      <textarea
        ref={textareaRef}
        rows={2}
        placeholder="Уточните что-нибудь"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-1 resize-none bg-transparent text-sm px-2 py-1 outline-none min-h-6 max-h-40 scrollbar-none text-foreground placeholder:text-muted-foreground"
      />

      <div className="flex flex-col items-center gap-1.5 shrink-0 self-end">
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            title="Очистить текст"
          >
            <X size={16} />
          </button>
        )}

        <Button
          onClick={() => onSend(value)}
          disabled={!value.trim() || isLoading}
          variant={"primary"}
          size="icon"
          className="h-8 w-8 rounded-full"
        >
          <SendHorizonal size={16} />
        </Button>
      </div>
    </div>
  );
}
