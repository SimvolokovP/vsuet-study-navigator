"use client";

import { IRatingItem } from "@/shared/types/rating.model";
import {
  MOCK_RATING_DATA,
  MOCK_SEARCH_DATA,
} from "@/shared/data/mockSubjects.data";
import { useState, useCallback } from "react";
import { Layout } from "@/layout/Layout";
import { RatingCard } from "@/features/rating/components/RatingCard";
import { TRatingMode } from "@/features/rating/types/rating.models";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { ErrorMessage } from "@/widgets/ErrorMessage";
import { PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RatingPage() {
  const [ratingMode, setRatingMode] = useState<TRatingMode>("my");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayData, setDisplayData] =
    useState<IRatingItem[]>(MOCK_RATING_DATA);

  const { userInLocalStorage } = useUserLocalStorage();

  const handleSearch = useCallback((searchValue: string) => {
    if (searchValue) {
      setIsSearching(true);
      setSearchQuery(searchValue);
      console.log("Поиск по номеру:", searchValue);

      setDisplayData(MOCK_SEARCH_DATA);
    } else {
      setIsSearching(false);
      setSearchQuery("");
      setDisplayData(MOCK_RATING_DATA);
    }
  }, []);

  const handleRatingModeChange = useCallback((mode: TRatingMode) => {
    setRatingMode(mode);
    setIsSearching(false);
    setSearchQuery("");
    setDisplayData(MOCK_RATING_DATA);
  }, []);

  const getEmptyStateMessage = () => {
    if (ratingMode === "search" && !isSearching && searchQuery) {
      return "Введите номер зачетки и нажмите 'Найти'";
    }
    if (ratingMode === "search" && isSearching && displayData.length === 0) {
      return "По вашему запросу ничего не найдено";
    }
    return null;
  };

  const emptyMessage = getEmptyStateMessage();

  if (!userInLocalStorage) {
    return (
      <Layout title="Рейтинг">
        <div className="w-full flex justify-center">
          <div className="max-w-170">
            <ErrorMessage
              text="Вы не вошли в систему, поэтому мы не смогли найти данные о рейтинге."
              error={{
                message: "Нет данных пользователя",
                name: "Нет данных пользователя",
              }}
            />

            <div className="flex justify-center items-center gap-4 mt-2 md:mt-4">
              <Link href={PAGES.AUTH}>
                <Button variant="primary">Вход в систему</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Рейтинг">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-180 w-full">
          {/* <div className="mb-4 md:mb-6">
            <RatingSearchForm
              ratingMode={ratingMode}
              onRatingModeChange={handleRatingModeChange}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
          </div> */}

          <div className="w-full flex flex-col gap-2 justify-center">
            {emptyMessage ? (
              <div className="text-center text-muted-foreground py-8">
                {emptyMessage}
              </div>
            ) : (
              displayData.map((item, index) => (
                <RatingCard
                  key={`${item.subjectName}-${index}`}
                  isDefaultOpen={index === 0}
                  ratingItem={item}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
