import { SITE_NAME_SHORT } from "@/shared/constants/seo.constants";

export function Logo() {
  return (
    <h1 className="font-bold flex flex-col items-center">
      <div className="text-xl">
        {SITE_NAME_SHORT}
        <span className="text-accent text-3xl">.</span>
      </div>
    </h1>
  );
}
