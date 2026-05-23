import { Metadata } from "next";
import { ApplicantChatPage } from "./ApplicantChatPage";

export const metadata: Metadata = {
  title: "Для абитуриентов",
};

export default function Home() {
  return <ApplicantChatPage />;
}