"use client";

import { Accordion } from "@/components/ui/accordion";
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
  const getAverageRating = (): number => {
    if (!ratingItem.ratingGrades) {
      return 0;
    }

    const sum = ratingItem.ratingGrades.reduce((acc, grade) => acc + grade, 0);
    const average = sum / ratingItem.ratingGrades.length;

    return Math.round(average * 100) / 100;
  };

  const averageRating = getAverageRating();

  const getRatingColor = (rating: number): string => {
    if (rating >= 85) return "bg-success";
    if (rating >= 75) return "bg-info";
    if (rating >= 60) return "bg-warning";
    if (rating <= 59) return "bg-error";
    return "unsatisfactory";
  };

  return (
    <Accordion
      title={ratingItem.subjectName}
      rightContent={
        <div
          className={cn(
            "w-7 h-7 flex items-center justify-center rounded-full font-semibold",
            getRatingColor(averageRating),
          )}
        >
          {averageRating}
        </div>
      }
      defaultOpen={isDefaultOpen}
    >
      <div className="w-full grid grid-cols-5 gap-2 p-3 bg-secondary rounded-b-sm">
        {ratingItem.ratingGrades.map((item, idx) => (
          <div key={idx} className="text-center p-2 bg-background rounded-md">
            <div className="text-sm font-medium text-muted-foreground">
              Кт {idx + 1}
            </div>
            <div className="text-xl font-bold mt-1">{item}</div>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
