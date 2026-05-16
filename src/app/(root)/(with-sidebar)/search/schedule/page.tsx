import { Metadata } from "next";
import { ScheduleSearchPage } from "./ScheduleSearchPage";

export const metadata: Metadata = {
  title: "Поиск расписания",
};

export default function Page() {
  return <ScheduleSearchPage />;
}
