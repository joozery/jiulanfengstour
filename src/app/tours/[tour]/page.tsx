import { Suspense } from "react";
import { notFound } from "next/navigation";
import { popularTours } from "@/data/popular-tours";
import { TourDetail } from "@/components/tour-detail";
export function generateStaticParams() { return [...popularTours.map(tour => ({ tour: tour.id })), { tour: "baikal-ice-journey" }]; }
async function Content({ params, searchParams }: { params: Promise<{ tour: string }>; searchParams: Promise<{ round?: string }> }) {
  const { tour } = await params;
  const { round } = await searchParams;
  if (tour !== "baikal-ice-journey" && !popularTours.some(item => item.id === tour)) notFound();
  return <TourDetail id={tour} initialRound={round} />;
}
export default function Page(props: { params: Promise<{ tour: string }>; searchParams: Promise<{ round?: string }> }) {
  return <Suspense fallback={<div className="inside-page page-width">กำลังโหลดทริป...</div>}><Content {...props} /></Suspense>;
}
