"use client";

import { CertificateForm } from "@/features/directory/components/forms/CertificateForm";
import { Layout } from "@/layout/Layout";

export function CertificatePage() {
  return (
    <Layout title="Заказать справку">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-180 w-full rounded-md p-4 bg-card text-card-foreground border border-border shadow-sm anim-hover">
          <CertificateForm />
        </div>
      </div>
    </Layout>
  );
}
