"use client";

import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages-url.config";
import { Layout } from "@/layout/Layout";
import {
  Award,
  Calendar,
  CalendarSearch,
  GraduationCap,
  Settings,
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import dayjs from "dayjs";

export function MainPage() {
  const { userInLocalStorage } = useUserLocalStorage();

  const getGreeting = () => {
    const hour = dayjs().hour();

    if (hour >= 5 && hour < 12) return "Доброе утро";
    if (hour >= 12 && hour < 17) return "Добрый день";
    if (hour >= 17 && hour < 23) return "Добрый вечер";
    return "Доброй ночи";
  };

  const greeting = getGreeting();

  return (
    <Layout title="Главная">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-180 w-full flex flex-col gap-2 justify-center">
          <div className="relative bg-card border border-border rounded-xl p-4 anim-hover mb-2 md:mb-4">
            <div className="font-bold text-start text-lg md:text-xl mb-2">
              {greeting} &#128075;
            </div>
            <p className="text-sm md:text-base">
              {userInLocalStorage
                ? "Пусть эта неделя будет для тебя лёгкой и удачной!"
                : "Войдите в систему, чтобы мы сохранили данные о вас."}
            </p>
            {!userInLocalStorage && (
              <div className="flex w-full justify-center">
                <Link className="mt-2" href={PAGES.AUTH}>
                  <Button variant="primary">Войти</Button>
                </Link>
              </div>
            )}
            {userInLocalStorage && (
              <Link
                className="absolute right-4 top-4 text-foreground"
                href={PAGES.PROFILE}
              >
                <Settings size={16} />
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-bold">Учебное пространство</div>

            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem className="basis-[70%] md:basis-1/3">
                  <Link href={PAGES.SCHEDULE}>
                    <div className="bg-[#937EF0]/10 text-[#937EF0] rounded-xl p-4 flex flex-col gap-3 h-full transition-transform active:scale-95">
                      <Calendar size={32} />
                      <div className="font-semibold leading-tight">
                        Моё расписание
                      </div>
                    </div>
                  </Link>
                </CarouselItem>

                <CarouselItem className="basis-[70%] md:basis-1/3">
                  <Link href={PAGES.SEARCH}>
                    <div className="bg-[#F5C66C]/10 text-[#F5C66C] rounded-xl p-4 flex flex-col gap-3 h-full transition-transform active:scale-95">
                      <CalendarSearch size={32} />
                      <div className="font-semibold leading-tight">
                        Поиск расписания
                      </div>
                    </div>
                  </Link>
                </CarouselItem>

                <CarouselItem className="basis-[70%] md:basis-1/3">
                  <Link href={PAGES.RATING}>
                    <div className="bg-[#59C0CE]/10 text-[#59C0CE] rounded-xl p-4 flex flex-col gap-3 h-full transition-transform active:scale-95">
                      <Award size={32} />
                      <div className="font-semibold leading-tight">
                        Учебный рейтинг
                      </div>
                    </div>
                  </Link>
                </CarouselItem>

                <CarouselItem className="basis-[70%] md:basis-1/3 text-inner">
                  <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 h-full opacity-50">
                    <GraduationCap size={32} />
                    <div className="font-semibold">
                      Поиск свободной аудитории
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="-left-4 hidden md:flex" />
              <CarouselNext className="-right-4 hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </Layout>
  );
}
