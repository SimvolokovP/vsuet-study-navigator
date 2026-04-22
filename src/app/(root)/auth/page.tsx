import { Metadata } from "next";
import { AuthPage } from "./AuthPage";

export const metadata: Metadata = {
  title: "Вход",
};

export default function Page() {
  return <AuthPage />;
}
