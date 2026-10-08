"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { Navbar } from "./navbar";
import { PopularTours } from "./popular-tours";
import { OurTrips } from "./our-trips";
import { ExploreRoutes } from "./explore-routes";
import { Faq } from "./faq";
import { ContactButton } from "./travel-ui";
import { destinations } from "@/data/destinations";

const titles: Record<string, [string, string]> = {
  tours: ["OUR TOURS", "แพ็กเกจทัวร์"], destinations: ["DESTINATIONS", "เส้นทางยอดนิยม"],
  gallery: ["TRAVEL GALLERY", "แกลเลอรี่"], faq: ["BEFORE YOU GO", "คำถามที่พบบ่อย"], contact: ["LET’S PLAN YOUR JOURNEY", "ติดต่อเรา"],
};
export function InsidePage({ section, city = "all" }: { section: string; city?: string }) {
  const router = useRouter();
  const destination = destinations.find(item => item.id === city);
  const title = titles[section];
  return <main className="inside-page"><Navbar /><header className="inside-heading page-width"><p className="eyebrow">{destination?.english ?? title[0]}</p><h1>{destination ? `เที่ยว${destination.name}` : title[1]}</h1><nav aria-label="เส้นทางหน้า"><Link href="/">หน้าแรก</Link><span>/</span>{destination ? <><Link href="/destinations">เส้นทางยอดนิยม</Link><span>/</span>{destination.name}</> : title[1]}</nav></header>
    {section === "tours" && <><PopularTours /><OurTrips /></>}
    {section === "destinations" && <ExploreRoutes selected={city} onClear={() => router.push("/destinations")} />}
    {section === "faq" && <Faq />}
    {section === "contact" && <section className="contact-page-content page-width"><h2>เริ่มวางแผนทริปของคุณ</h2><p>สนใจโปรแกรมทัวร์ วันเดินทาง หรือทริปส่วนตัว<br />เลือกจุดหมายที่อยากไป แล้วสอบถามรายละเอียดกับเรา</p><ContactButton /><p className="contact-page-note">ช่องทางติดต่อกำลังเตรียมพร้อม</p><Link href="/tours">ดูแพ็กเกจทัวร์ →</Link></section>}
    {section === "gallery" && <section className="gallery-page-grid page-width" aria-label="ภาพจุดหมายท่องเที่ยว">{destinations.map(item => <Dialog.Root key={item.id}><Dialog.Trigger className="gallery-tile" aria-label={`ดูภาพ${item.name}`}><Image src={item.image} alt={`ภาพประกอบ${item.name}`} fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw" className="tour-image" /><span>{item.name}<small>{item.english}</small></span></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content gallery-dialog"><Dialog.Title>{item.name}</Dialog.Title><Dialog.Description className="sr-only">ภาพประกอบจุดหมาย{item.name}</Dialog.Description><Image src={item.image} alt={`ภาพประกอบ${item.name}`} sizes="80vw" className="gallery-full-image" /><Dialog.Close aria-label="ปิดภาพ" className="dialog-x">×</Dialog.Close><Link href={`/destinations/${item.id}`}>สำรวจเส้นทาง{item.name} →</Link></Dialog.Content></Dialog.Portal></Dialog.Root>)}</section>}
    <footer className="inside-footer page-width"><Link href="/">JIULANFENGS <small>CHINA TRAVEL</small></Link><nav aria-label="เมนูท้ายหน้า"><Link href="/tours">แพ็กเกจทัวร์</Link><Link href="/gallery">แกลเลอรี่</Link><Link href="/contact">ติดต่อเรา</Link></nav></footer>
  </main>;
}
