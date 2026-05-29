import { Metadata } from "next";
import DepartmentsPage from "./DepartmentsPage";

export const metadata: Metadata = {
  title: "Кафедры",
};

export default function Page() {
  return <DepartmentsPage />;
}
