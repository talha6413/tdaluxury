import type { Metadata } from "next";
import FullSiteEditor from "@/components/admin/FullSiteEditor";

export const metadata: Metadata = {
  title: "TDA Site Editörü",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminEditorPage() {
  return <FullSiteEditor />;
}
