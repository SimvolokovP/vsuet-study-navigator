import { Metadata } from "next";
import { CertificatePage } from "./CertificatePage";

export const metadata: Metadata = {
  title: "Заказать справку",
};

export default function Page() {
  return <CertificatePage />;
}
