import { Metadata } from "next";
import { MyReservationsPage } from "./MyReservationsPage";

export const metadata: Metadata = {
  title: "Мои бронирования",
};

export default function Page() {
  return <MyReservationsPage />;
}
