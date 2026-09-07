"use client";

import { Layout } from "@/shared/layout/Layout";
import { ThemeToggle } from "@/widgets/ThemeToggle";
import { useUserLocalStorage } from "@/features/auth/store/use-user-local-storage.store";
import { useEffect, useState } from "react";
import { ProfileAuthBlock } from "@/features/auth/components/ProfileAuthBlock";
import { DataSettingsBlock } from "@/features/auth/components/DataSettingsBlock";

export function ProfilePage() {
  const {
    userInLocalStorage,
    loadUserFromLocalStorage,
    saveUserInLocalStorage,
  } = useUserLocalStorage();
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLocalLoading(true);
      try {
        await loadUserFromLocalStorage();
      } finally {
        setIsLocalLoading(false);
      }
    };
    loadData();
  }, [loadUserFromLocalStorage]);

  const handleSaveSchedule = (data: {
    group?: string;
    subgroup?: string;
    number?: string;
  }) => {
    saveUserInLocalStorage(data);
  };

  return (
    <Layout title="Профиль">
      <div className="w-full flex justify-center">
        <div className="max-w-170 w-full flex flex-col gap-4">
          <ProfileAuthBlock isLoading={isLocalLoading} />

          <DataSettingsBlock
            userInLocalStorage={userInLocalStorage}
            isLoading={isLocalLoading}
            onSave={handleSaveSchedule}
          />

          <div className="flex justify-center w-full mt-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Layout>
  );
}
