import { Metadata } from "next";
import { SearchPage } from "./SearchPage";

export const metadata: Metadata = {
  title: "Поиск",
};

export default function Page() {
  return <SearchPage />;
}
