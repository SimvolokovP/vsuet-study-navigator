import { Metadata } from "next";
import FacultiesPage from "./FacultiesPage";

export const metadata: Metadata = {
  title: "Факультеты",
};

export default function Page() {
  return <FacultiesPage />;
}
