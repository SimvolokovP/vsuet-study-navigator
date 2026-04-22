import { Loader as LoaderIcon } from "lucide-react";

interface LoaderProps {
  size?: number;
}

export function Loader({ size = 5 }: LoaderProps) {
  return (
    <div className="flex justify-center items-center">
      <LoaderIcon size={size} className={`animate-spin text-inner`} />
    </div>
  );
}
