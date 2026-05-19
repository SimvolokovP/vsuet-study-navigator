"use client"

import { AuthContent } from "@/features/auth/components/AuthContent";

export function AuthPage() {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center h-full">
        <AuthContent />
      </div>
    </div>
  );
}
