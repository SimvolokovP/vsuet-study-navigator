"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { IRatingItem } from "@/shared/types/rating.model";
import { cn } from "@/shared/utils/cn";

interface RatingCardProps {
  ratingItem: IRatingItem;
  isDefaultOpen?: boolean;
}

export function RatingCard({
  ratingItem,
  isDefaultOpen = false,
}: RatingCardProps) {
  const getAverageRating = () => {
    if (!ratingItem.ratingGrades) return 0;
    const sum = ratingItem.ratingGrades.reduce(
      (acc: number, grade: number) => acc + grade,
      0,
    );
    return Math.round((sum / ratingItem.ratingGrades.length) * 100) / 100;
  };

  const averageRating = getAverageRating();

  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "bg-success";
    if (rating >= 75) return "bg-info";
    if (rating >= 60) return "bg-warning";
    return "bg-error";
  };

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={isDefaultOpen ? "item-1" : undefined}
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          rightContent={
            <div
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded-full font-semibold text-white text-[12px]",
                getRatingColor(averageRating),
              )}
            >
              {averageRating}
            </div>
          }
        >
          {ratingItem.subjectName}
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full grid grid-cols-5 gap-2 p-3 bg-secondary rounded-b-sm">
            {ratingItem.ratingGrades.map((item: number, idx: number) => (
              <div
                key={idx}
                className="text-center p-2 bg-background rounded-md border border-border"
              >
                <div className="text-[12px] font-medium text-muted-foreground uppercase">
                  Кт {idx + 1}
                </div>
                <div className="text-xl font-bold mt-1">{item}</div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
