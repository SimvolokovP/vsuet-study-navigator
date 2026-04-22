import { Metadata } from "next";
import { SchedulePage } from "./SchedulePage";

export const metadata: Metadata = {
  title: "Расписание",
};

export default function Home() {
  return <SchedulePage />;
}
