import { Metadata } from "next";
import { ScheduleTeacherPage } from "./ScheduleTeacherPage";

export const metadata: Metadata = {
  title: "Преподаватели",
};

export default function Home() {
  return <ScheduleTeacherPage />;
}
