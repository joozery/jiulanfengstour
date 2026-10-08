import { Suspense } from "react";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import { InsidePage } from "@/components/inside-page";
export function generateStaticParams() { return destinations.map(city => ({ city: city.id })); }
async function PageContent({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (!destinations.some(item => item.id === city)) notFound();
  return <InsidePage section="destinations" city={city} />;
}

export default function Page({ params }: { params: Promise<{ city: string }> }) {
  return <Suspense fallback={<div className="inside-page page-width">กำลังโหลด...</div>}><PageContent params={params} /></Suspense>;
}
