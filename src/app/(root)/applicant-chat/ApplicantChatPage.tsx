"use client";

import { ChatLayout } from "@/layout/ChatLayout";


// import { ChatWelcome } from "@/features/chat/components/ChatWelcome";
// import { ChatInput } from "@/features/chat/components/ChatInput";
// import { UserMessageItem } from "@/features/chat/components/UserMessageItem";
// import { useChat } from "@/features/chat/hooks/use-chat";

const SUGGESTED_QUESTIONS = [
  "Какие документы нужны для поступления?",
  "Какой проходной балл на IT-направления?",
  "Предоставляется ли общежитие первокурсникам?",
  "Когда заканчивается приемная комиссия?",
];

export function ApplicantChatPage() {
  //   const {
  //     inputValue,
  //     setInputValue,
  //     messages,
  //     isLoading,
  //     messagesEndRef,
  //     messagesContainerRef,
  //     handleSendMessage,
  //   } = useChat();

  return (
    <ChatLayout title="ИИ помощник">
      <div className="h-full max-h-full flex flex-col justify-between overflow-hidden">
        {/* {messages.length === 0 ? (
          <ChatWelcome
            suggestedQuestions={SUGGESTED_QUESTIONS}
            onSelectQuestion={handleSendMessage}
          />
        ) : (
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto w-full min-h-0 custom-scrollbar pr-1 md:pr-2"
          >
            <div className="max-w-3xl w-full mx-auto p-4 space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className="w-full flex">
                  {msg.role === "user" ? (
                    <UserMessageItem
                      content={msg.content}
                      timestamp={msg.timestamp}
                    />
                  ) : (
                    <div className="w-full text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="w-full flex mr-auto">
                  <div className="bg-muted/30 border border-border/40 rounded-2xl px-4 py-2 text-sm flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )} */}

        <div className="flex flex-col gap-2 items-center pt-2 pb-4 shrink-0 px-4 max-w-3xl w-full mx-auto p-4 space-y-6">
          {/* <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            isLoading={isLoading}
          /> */}
          <p className="text-[10px] md:text-[12px] text-muted-foreground">
            ИИ работает на основе GigaChat и может ошибаться
          </p>
        </div>
      </div>
    </ChatLayout>
  );
}
