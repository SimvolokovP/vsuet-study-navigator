"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PAGES } from "@/config/pages-url.config";
import { Divider } from "@/components/ui/divider";
import { Logo } from "@/widgets/Logo";
import { QuickAuthForm } from "@/features/auth/components/QuickAuthForm";
import { CredentialsAuthForm } from "@/features/auth/components/CredentialsAuthForm";
import { Toggler } from "@/components/ui/toggler";

export function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const typeParam = searchParams.get("type");
  const activeTab = typeParam === "credentials" ? "credentials" : "quick";

  const toggleList = [
    { label: "Быстрый вход", value: "quick" },
    { label: "По аккаунту", value: "credentials" },
  ];

  const handleToggleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 min-w-77.5 anim-hover">
      <div className="flex flex-col items-center">
        <div className="mb-3">
          <Logo />
        </div>

        <Toggler
          className="w-full mb-4 justify-center"
          toggleList={toggleList}
          activeToggleItem={activeTab}
          onToggleChange={handleToggleChange}
        />

        {activeTab === "quick" ? <QuickAuthForm /> : <CredentialsAuthForm />}

        <Divider className="w-full my-4" />

        <div className="flex flex-col items-center gap-1 text-sm">
          <Link className="text-accent" href={PAGES.HOME}>
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
