"use client";

import { Dialog } from "radix-ui";
import Image from "next/image";
import type { Destination } from "@/data/destinations";

export function Icon({ name, className = "" }: { name: "arrow" | "pin" | "plane" | "people" | "check" | "compass" | "menu"; className?: string }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    plane: <path d="m22 2-7 20-4-9-9-4L22 2ZM11 13 22 2" />,
    people: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-3-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    compass: <><circle cx="12" cy="12" r="10" /><path d="m16 8-3 5-5 3 3-5 5-3Z" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>;
}

export function ContactButton({ children = "ปรึกษาทริปกับเรา", className = "", destination }: { children?: React.ReactNode; className?: string; destination?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={`gold-button ${className}`.trim()}>{children}<Icon name="arrow" /></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <p className="eyebrow">LET’S PLAN YOUR JOURNEY</p>
          <Dialog.Title className="text-2xl font-semibold">เริ่มวางแผนทริป{destination ? ` ${destination}` : "ของคุณ"}</Dialog.Title>
          <Dialog.Description className="mt-4 leading-7 text-stone-600">ช่องทางติดต่อกำลังเตรียมพร้อม สามารถกลับมาสอบถามโปรแกรมทัวร์ วันเดินทาง และรายละเอียดบริการได้เมื่อเปิดให้ติดต่อ</Dialog.Description>
          <Dialog.Close className="gold-button mt-6">รับทราบ</Dialog.Close>
          <Dialog.Close aria-label="ปิดหน้าต่าง" className="dialog-x">×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function TourCard({ destination }: { destination: Destination }) {
  return (
    <article className="explore-route-card">
      <Dialog.Root>
        <Dialog.Trigger className="explore-route-trigger" aria-label={`สำรวจเส้นทาง${destination.name}`}>
          <Image src={destination.image} alt={`ภาพประกอบจุดหมาย${destination.name}`} fill sizes="(max-width: 640px) 75vw, (max-width: 1000px) 35vw, 20vw" className="explore-route-image" />
          <span className="explore-route-shade" aria-hidden="true" />
          <span className="explore-route-copy"><span className="explore-route-country">{destination.id === "hongkong" ? "HONG KONG" : destination.id === "taiwan" ? "TAIWAN" : "CHINA"}</span><span className="explore-route-title">{destination.name}</span><span className="explore-route-description">{destination.tagline}<br />{destination.highlights[0]}</span></span>
          <span className="explore-route-arrow" aria-hidden="true">›</span>
        </Dialog.Trigger>
        <Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content tour-dialog">
          <div className="dialog-destination-image relative"><Image src={destination.image} alt={`ภาพประกอบ${destination.name}`} fill sizes="500px" className="tour-image" /></div>
          <p className="eyebrow mt-5">{destination.english}</p><Dialog.Title className="text-3xl font-semibold">เที่ยว{destination.name}</Dialog.Title><Dialog.Description className="mt-4 leading-7 text-stone-600">{destination.description}</Dialog.Description>
          <h4 className="mt-6 font-semibold">ไอเดียสำหรับทริปของคุณ</h4><ul className="mt-3 space-y-2">{destination.highlights.map(item => <li key={item} className="flex items-center gap-2"><Icon name="check" className="size-4 text-amber-700" />{item}</li>)}</ul>
          <p className="mt-5 text-sm leading-6 text-stone-500">รายการนี้เป็นแนวทางเที่ยว โปรแกรมจริง ราคา และวันเดินทาง กรุณาสอบถามทีมงานเมื่อเปิดให้ติดต่อ</p><ContactButton className="mt-6" destination={destination.name} /><Dialog.Close aria-label="ปิดรายละเอียด" className="dialog-x">×</Dialog.Close>
        </Dialog.Content></Dialog.Portal>
      </Dialog.Root>
    </article>
  );
}
