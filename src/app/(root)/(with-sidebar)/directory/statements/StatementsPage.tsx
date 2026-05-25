"use client";

import { useState } from "react";
import { Column, DataTable } from "@/components/ui/data-table";
import { Layout } from "@/layout/Layout";
import { cn } from "@/shared/utils/cn";

interface Statement {
  id: number;
  title: string;
  pdfUrl?: string; 
  wordUrl?: string; 
}

const ITEMS_PER_PAGE = 10;

const mockStatements: Statement[] = [
  {
    id: 1,
    title: "Заявление на академический отпуск",
    pdfUrl: "/docs/academic-leave.pdf",
    wordUrl: "/docs/academic-leave.docx",
  },
  {
    id: 2,
    title: "Заявление на материальную помощь",
    pdfUrl: "/docs/financial-aid.pdf",
  },
  {
    id: 3,
    title: "Заявление на смену персональных данных (фамилии)",
    wordUrl: "/docs/name-change.docx",
  },
  {
    id: 4,
    title: "Заявление о переводе на бюджетную форму обучения",
    pdfUrl: "/docs/transfer-budget.pdf",
    wordUrl: "/docs/transfer-budget.docx",
  },
  {
    id: 5,
    title: "Заявление на предоставление места в общежитии",
    pdfUrl: "/docs/dormitory.pdf",
    wordUrl: "/docs/dormitory.docx",
  },
];

export default function StatementsPage() {
  const [page, setPage] = useState(1);

  // Конфигурация колонок таблицы
  const columns: Column<Statement>[] = [
    {
      header: "Название документа",
      // Выравнивание по левому краю для названий документов выглядит аккуратнее
      className: "text-left pl-4",
      accessor: "title",
    },
    {
      header: "Скачать",
      className: "w-48 text-center", // Фиксированная ширина для колонки скачивания
      accessor: (statement) => (
        <div className="flex items-center justify-center gap-2">
          {statement.pdfUrl ? (
            <a
              href={statement.pdfUrl}
              download
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors",
                "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
              )}
            >
              PDF
            </a>
          ) : (
            <span className="px-2.5 py-1 text-xs border border-transparent text-muted-foreground/40 select-none">
              —
            </span>
          )}

          {statement.wordUrl ? (
            <a
              href={statement.wordUrl}
              download
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors",
                "bg-blue-500/10 border-blue-500/20 text-blue-500 hover:bg-blue-500/20"
              )}
            >
              WORD
            </a>
          ) : (
            <span className="px-2.5 py-1 text-xs border border-transparent text-muted-foreground/40 select-none">
              —
            </span>
          )}
        </div>
      ),
    },
  ];

  // Расчет пагинации
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = mockStatements.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Layout title="Бланки заявлений" withBackButton>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-200 w-full flex flex-col gap-2 justify-center">
          <DataTable
            columns={columns}
            data={paginatedData}
            totalCount={mockStatements.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </Layout>
  );
}
