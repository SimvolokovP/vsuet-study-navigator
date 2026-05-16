import { Metadata } from "next";
import { FreeAudienceSearchPage } from "./FreeAudienceSearchPage";

export const metadata: Metadata = {
  title: "Поиск свободной аудитории",
};

export default function Page() {
  return <FreeAudienceSearchPage />;
}
