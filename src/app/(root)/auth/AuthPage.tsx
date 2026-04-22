import { Divider } from "@/components/ui/divider";
import { PAGES } from "@/config/pages-url.config";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { Logo } from "@/widgets/Logo";
import Link from "next/link";

export function AuthPage() {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center h-full">
        <div className="card anim-hover">
          <div className="flex flex-col items-center">
            <div className="mb-3">
              <Logo />
            </div>
            <AuthForm />
            <Divider className="w-full my-4" />
            <div className="flex flex-col items-center gap-1 text-sm">
              <Link className="text-accent" href={PAGES.HOME}>
                На главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
