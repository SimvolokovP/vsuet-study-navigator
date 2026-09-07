"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { CalendarX } from "lucide-react";
import { Layout } from "@/shared/layout/Layout";
import { Button } from "@/shared/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/components/ui/accordion";
import { useAuth } from "@/features/auth/hooks/use-auth";

import { PAGES } from "@/shared/config/pages-url.config";
import { useMyReservations } from "@/features/audiences/hooks/use-my-reservations";
import { useDeleteReservation } from "@/features/audiences/hooks/use-delete-reservation";
import { ConfirmDeleteReservationModal } from "@/features/audiences/components/ConfirmDeleteReservationModal";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ErrorMessage } from "@/widgets/ErrorMessage";

export function MyReservationsPage() {
  const [page, setPage] = useState<number>(1);

  const { userData, isPending: isUserPending } = useAuth();
  const {
    reservationsData,
    isPending: isResPending,
    error,
  } = useMyReservations(page);
  const { deleteReservation, isPending: isDeleting } = useDeleteReservation();

  const isLoading = isUserPending || (isResPending && !reservationsData);

  const ITEMS_PER_PAGE = 10;
  const count = reservationsData?.count || 0;
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  if (error) {
    return (
      <Layout title="Мои бронирования" withBackButton>
        <ErrorMessage
          error={error}
          text="Произошла ошибка при загрузке бронирований. Пожалуйста, перезагрузите
          страницу или попробуйте позже."
        />
      </Layout>
    );
  }

  return (
    <Layout title="Мои бронирования" withBackButton>
      <div className="w-full flex justify-center mt-4">
        <div className="max-w-170 w-full">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 w-48 mx-auto md:mx-0 rounded-xl" />
              <div className="flex flex-col gap-3">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-11 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : !userData ? (
            <div className="bg-card border border-border rounded-xl p-6 anim-hover text-center flex flex-col items-center gap-3">
              <CalendarX
                size={48}
                className="text-muted-foreground opacity-60"
              />
              <h3 className="font-bold text-lg md:text-xl">Доступ ограничен</h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-md">
                Просматривать и управлять забронированными аудиториями могут
                только авторизованные преподаватели и студенты.
              </p>
              <Link href={`${PAGES.AUTH}?type=credentials`}>
                <Button variant="primary" className="mt-2">
                  Войти в аккаунт
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                Всего забронировано аудиторий:{" "}
                <span className="font-bold text-foreground">{count}</span>
              </div>

              {!reservationsData || reservationsData.results.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-10 bg-muted/10 rounded-xl border border-dashed border-border">
                  У вас пока нет активных бронирований аудиторий.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Accordion
                    type="multiple"
                    className="w-full flex flex-col gap-3"
                  >
                    {reservationsData.results.map((res) => {
                      const dateStr = dayjs(res.start_reservation).format(
                        "DD.MM.YYYY",
                      );
                      const startStr = dayjs(res.start_reservation).format(
                        "HH:mm",
                      );
                      const endStr = dayjs(res.end_reservation).format("HH:mm");

                      return (
                        <AccordionItem key={res.id} value={`res-${res.id}`}>
                          <AccordionTrigger
                            rightContent={
                              <span className="text-xs md:text-sm font-bold text-success bg-success/10 border border-success/20 px-1 md:px-2.5 py-0.5 rounded-lg">
                                {dateStr} ({startStr}-{endStr})
                              </span>
                            }
                          >
                            Аудитория {res.audience.name.trim()}
                          </AccordionTrigger>
                          <AccordionContent className="bg-card border-x border-b border-border p-4 rounded-b-xl flex flex-col gap-3">
                            <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-1">
                              <div>
                                Этаж:{" "}
                                <span className="font-semibold text-foreground">
                                  {res.audience.floor || "—"}
                                </span>
                              </div>
                              <div>
                                Время брони:{" "}
                                <span className="font-semibold text-foreground">
                                  {startStr} - {endStr}
                                </span>
                              </div>
                            </div>

                            <div className="flex justify-end border-t border-border pt-2">
                              <ConfirmDeleteReservationModal
                                isDeleting={isDeleting}
                                onConfirm={() => deleteReservation(res.id)}
                                audienceName={res.audience.name}
                                dateStr={dateStr}
                                timeStr={`${startStr} - ${endStr}`}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>

                  {count > ITEMS_PER_PAGE && (
                    <div className="flex items-center justify-between bg-muted/5 border border-border p-2 rounded-xl mt-2">
                      <Button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Назад
                      </Button>

                      <span className="text-sm font-medium">
                        Страница {page} из {totalPages}
                      </span>

                      <Button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page >= totalPages}
                      >
                        Вперед
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
