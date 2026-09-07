import { Button } from "@/shared/components/ui/button";

import { Layout } from "@/shared/layout/Layout";
import { ErrorMessage } from "@/widgets/ErrorMessage";

import Link from "next/link";

export default function NotFound() {
  return (
    <Layout title="Страница не найдена">
      <div className="text-center">
        <ErrorMessage text="Такой страницы не существует. Возможно, она была удалена или перемещена. Вернитесь на главную и попробуйте снова." />
        <Link href={"/"}>
          <Button className="mt-2 md:mt-4" size="lg" variant="default">
            На главную
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
