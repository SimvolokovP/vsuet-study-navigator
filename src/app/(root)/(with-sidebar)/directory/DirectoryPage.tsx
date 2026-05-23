"use client";

import { DirectoryItem } from "@/features/directory/components/DirectoryItem";
import { Layout } from "@/layout/Layout";
import { BriefcaseBusiness, Landmark, Newspaper, UserCog } from "lucide-react";

export function DirectoryPage() {
  return (
    <Layout title="Справочник">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-180 w-full flex flex-col gap-2 justify-center">
          <DirectoryItem disabled title="Факультеты" icon={Landmark} />
          <DirectoryItem disabled title="Кафедры" icon={BriefcaseBusiness} />
          <DirectoryItem disabled title="Специальности" icon={UserCog} />
          <DirectoryItem
            disabled
            title="Бланки заявлений"
            icon={Newspaper}
            // href={PAGES.DIRECTORY_CERTIFICATE}
          />
        </div>
      </div>
    </Layout>
  );
}
