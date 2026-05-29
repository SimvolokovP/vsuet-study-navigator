"use client";

import { Column, DataTable } from "@/components/ui/data-table";
import { Layout } from "@/layout/Layout";
import { useState } from "react";

interface Department {
  id: number;
  name: string;
  name_short: string;
}

const ITEMS_PER_PAGE = 5;

const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Кафедра управление качеством, гостиничного дела и туризма",
    name_short: "УКГДиТ",
  },
  {
    id: 2,
    name: "Кафедра информационных технологий, моделирования и управления",
    name_short: "ИТМиУ",
  },
  {
    id: 3,
    name: "Кафедра высшей математики",
    name_short: "ВМ",
  },
  {
    id: 4,
    name: "Кафедра неорганической химии и химической технологии",
    name_short: "НХХТ",
  },
  {
    id: 5,
    name: "Кафедра информационной безопасности",
    name_short: "ИБ",
  },
  {
    id: 6,
    name: "Кафедра управления, организации производства и отраслевой экономики",
    name_short: "УОПОЭ",
  },
  {
    id: 7,
    name: "Кафедра теории экономики и учетной политики",
    name_short: "ТЭУП",
  },
  {
    id: 8,
    name: "Кафедра торгового дела и товароведения",
    name_short: "ТДиТ",
  },
  {
    id: 9,
    name: "Кафедра корпоративных информационных систем и программирования",
    name_short: "КИСиП",
  },
  {
    id: 10,
    name: "Кафедра физики, теплотехники и теплоэнергетики",
    name_short: "ФТТ",
  },
  {
    id: 11,
    name: "Кафедра технологии бродильных и сахаристых производств",
    name_short: "ТБСП",
  },
  {
    id: 12,
    name: "Кафедра технической механики",
    name_short: "ТМ",
  },
  {
    id: 13,
    name: "Кафедра физической и аналитической химии",
    name_short: "ФАХ",
  },
  {
    id: 14,
    name: "Кафедра технологии органических соединений и переработки полимеров",
    name_short: "ТОСиПП",
  },
  {
    id: 15,
    name: "Кафедра философии и истории",
    name_short: "ФИ",
  },
  {
    id: 16,
    name: "Кафедра управление качеством, гостиничного дела и туризма",
    name_short: "УКГДиТ",
  },
  {
    id: 17,
    name: "Кафедра технологии хлебопекарного, кондитерского, макаронного и зерноперерабатывающего производств",
    name_short: "ТХКМЗП",
  },
  {
    id: 18,
    name: "Кафедра русского языка",
    name_short: "РЯ",
  },
  {
    id: 19,
    name: "Кафедра автоматизированных систем управления процессами и производствами",
    name_short: "АСУПП",
  },
  {
    id: 20,
    name: "Кафедра экономической безопасности и финансового мониторинга",
    name_short: "ЭБФМ",
  },
  {
    id: 21,
    name: "Кафедра машин и аппаратов пищевых производств",
    name_short: "МАПП",
  },
  {
    id: 22,
    name: "Базовая кафедра современных пищевых производств",
    name_short: "БББ",
  },
  {
    id: 23,
    name: "Кафедра технологии жиров, процессов и аппаратов химических и пищевых производств",
    name_short: "ТЖПАХПП",
  },
  {
    id: 24,
    name: "Кафедра технологии продуктов животного происхождения",
    name_short: "ТПЖП",
  },
  {
    id: 25,
    name: "УМУ",
    name_short: "УМУ",
  },
  {
    id: 26,
    name: "Кафедра иностранных языков",
    name_short: "ИЯ",
  },
  {
    id: 27,
    name: "Кафедра биохимии и биотехнологии",
    name_short: "ББ",
  },
  {
    id: 28,
    name: "Кафедра промышленной экологии и техносферной безопасности",
    name_short: "ИЭ",
  },
  {
    id: 29,
    name: "Кафедра технологии сахаристых веществ",
    name_short: "ТСВ",
  },
  {
    id: 30,
    name: "Кафедра информационных и управляющих систем",
    name_short: "ИУС",
  },
  {
    id: 31,
    name: "Кафедра гостиничного дела, туризма, физической культуры и спорта",
    name_short: "ГДТФКиС",
  },
  {
    id: 32,
    name: "Кафедра сервиса и ресторанного бизнеса",
    name_short: "СРБ",
  },
  {
    id: 33,
    name: "Кафедра естественных дисциплин",
    name_short: "ЕД",
  },
  {
    id: 34,
    name: "Резерв УМУ_4",
    name_short: "ХХТОСПП",
  },
  {
    id: 35,
    name: "Внешний ГЭК",
    name_short: "ГЭК",
  },
  {
    id: 36,
    name: "Базовая кафедра технологии неорганических веществ",
    name_short: "ТНВ",
  },
  {
    id: 37,
    name: "Факультет среднего профессионального образования",
    name_short: "ФСПО",
  },
  {
    id: 38,
    name: 'Базовая кафедра "Сельскохозяйственная биотехнология"',
    name_short: "СБ",
  },
  {
    id: 39,
    name: 'Базовая кафедра "Ветеринарно-санитарная экспертиза и биологическая безопасность"',
    name_short: "",
  },
];

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);

  const columns: Column<Department>[] = [
    { header: "Название", accessor: "name" },
    { header: "Сокращение", accessor: "name_short" },
  ];

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = mockDepartments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Layout title="Кафедры" withBackButton>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-180 w-full flex flex-col gap-2 justify-center">
          <DataTable
            columns={columns}
            data={paginatedData}
            totalCount={mockDepartments.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </Layout>
  );
}
