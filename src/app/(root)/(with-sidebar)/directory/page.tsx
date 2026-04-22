import { Metadata } from "next";
import { DirectoryPage } from "./DirectoryPage";

export const metadata: Metadata = {
  title: "Справочник",
};

export default function Page() {
  return <DirectoryPage />;
}
