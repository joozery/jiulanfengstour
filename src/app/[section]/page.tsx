import { Suspense } from "react";
import { notFound } from "next/navigation";
import { InsidePage } from "@/components/inside-page";
const sections = ["tours", "destinations", "gallery", "faq", "contact"];
export function generateStaticParams() { return sections.map(section => ({ section })); }
async function PageContent({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section)) notFound();
  return <InsidePage section={section} />;
}

export default function Page({ params }: { params: Promise<{ section: string }> }) {
  return <Suspense fallback={<div className="inside-page page-width">กำลังโหลด...</div>}><PageContent params={params} /></Suspense>;
}
