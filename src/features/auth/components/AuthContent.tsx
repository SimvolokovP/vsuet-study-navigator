"use client";

import Link from "next/link";
import { PAGES } from "@/shared/config/pages-url.config";
import { Divider } from "@/shared/components/ui/divider";
import { Logo } from "@/widgets/Logo";
import { CredentialsAuthForm } from "@/features/auth/components/CredentialsAuthForm";

export function AuthContent() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 min-w-77.5 anim-hover">
      <div className="flex flex-col items-center">
        <div className="mb-3">
          <Logo />
        </div>

        <CredentialsAuthForm />

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
