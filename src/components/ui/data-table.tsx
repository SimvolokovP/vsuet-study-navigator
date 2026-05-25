"use client";

import React, { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  getRowClassName?: (item: T) => string;
}

export function DataTable<T>({
  columns,
  data,
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
  getRowClassName,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const showPagination = totalCount > itemsPerPage;

  return (
    <div className="w-full flex flex-col pt-4">
      <div className="overflow-auto border border-muted/30 rounded-xl bg-background">
        <table className="w-full border-collapse text-left text-xs md:text-sm text-foreground table-fixed">
          <thead className="bg-background sticky top-0 z-10 border-b-2 border-muted/30">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-3 py-3 font-semibold text-center border-r border-muted/30 last:border-r-0 text-muted-foreground uppercase tracking-wider text-[11px] md:text-xs",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-muted/30">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted-foreground bg-muted/5"
                >
                  Нет данных для отображения
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => {
                const customRowClass = getRowClassName
                  ? getRowClassName(item)
                  : "";

                return (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "hover:bg-muted/10 transition-colors min-h-12 md:min-h-16",
                      customRowClass,
                    )}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={cn(
                          "px-3 py-3 align-middle border-r border-muted/30 last:border-r-0 text-center font-medium",
                          column.className,
                        )}
                      >
                        {typeof column.accessor === "function"
                          ? column.accessor(item)
                          : (item[column.accessor] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-between border border-muted/30 p-2 rounded-xl mt-3 bg-background">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs font-medium bg-background border border-muted/30 rounded-lg hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Назад
          </button>

          <span className="text-xs md:text-sm font-medium text-muted-foreground">
            Страница{" "}
            <span className="text-foreground font-semibold">{currentPage}</span>{" "}
            из{" "}
            <span className="text-foreground font-semibold">{totalPages}</span>
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 text-xs font-medium bg-background border border-muted/30 rounded-lg hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}
