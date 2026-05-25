import { Metadata } from "next";
import StatementsPage from "./StatementsPage";

export const metadata: Metadata = {
  title: "Бланки заявлений",
};

export default function Page() {
  return <StatementsPage />;
}
