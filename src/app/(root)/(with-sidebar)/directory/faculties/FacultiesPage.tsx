"use client";

import { Column, DataTable } from "@/shared/components/ui/data-table";
import { Layout } from "@/layout/Layout";
import { useState } from "react";

interface Faculty {
  id: number;
  name: string;
  name_short: string;
}

const ITEMS_PER_PAGE = 5;

const mockFaculties: Faculty[] = [
  {
    id: 1,
    name: "Факультет управления и информатики в технологических системах",
    name_short: "УИТС",
  },
  {
    id: 2,
    name: "Инженерно-технический факультет",
    name_short: "ИТФ",
  },
  {
    id: 3,
    name: "Факультет экологии и химической технологии",
    name_short: "ФЭиХТ",
  },
  {
    id: 4,
    name: "Факультет экономики и управления",
    name_short: "ФЭиУ",
  },
  {
    id: 5,
    name: "Технологический факультет",
    name_short: "ТФ",
  },
  {
    id: 6,
    name: "Факультет экономики и управления",
    name_short: "ФЭиУ",
  },
  {
    id: 7,
    name: "Факультет среднего профессионального образования",
    name_short: "ФЭиУ",
  },
  {
    id: 8,
    name: "Центр довузовской подготовки и организации приема",
    name_short: "ЦДПиОП",
  },
];

export default function FacultiesPage() {
  const [page, setPage] = useState(1);

  const columns: Column<Faculty>[] = [
    { header: "Название", accessor: "name" },
    { header: "Сокращение", accessor: "name_short" },
  ];

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = mockFaculties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Layout title="Факультеты" withBackButton>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-180 w-full flex flex-col gap-2 justify-center">
          <DataTable
            columns={columns}
            data={paginatedData}
            totalCount={mockFaculties.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </Layout>
  );
}
