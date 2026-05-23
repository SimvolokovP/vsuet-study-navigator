import { Bot } from "lucide-react";

interface ChatWelcomeProps {
  suggestedQuestions: string[];
  onSelectQuestion: (question: string) => void;
}

export function ChatWelcome({
  suggestedQuestions,
  onSelectQuestion,
}: ChatWelcomeProps) {
  return (
    <>
      <div></div>
      <div className="flex flex-col items-center gap-6 w-full my-auto shrink-0">
        <div className="bg-primary/10 text-primary p-4 flex items-center justify-center rounded-full shadow-sm">
          <Bot size={52} />
        </div>

        <div className="text-2xl font-semibold tracking-tight">
          Что вы хотите найти?
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl px-4">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="bg-muted/5 hover:bg-muted w-full md:w-auto text-sm font-medium px-2 md:px-4 py-1.25 md:py-2.5 rounded-md border border-border transition-colors cursor-pointer text-muted-foreground hover:bg-primary/10"
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
