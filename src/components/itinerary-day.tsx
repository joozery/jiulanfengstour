"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import type { ItineraryDay } from "@/data/tour-itineraries";

export function ItineraryDayContent({ day }: { day: ItineraryDay }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = day.photos[photoIndex];
  return <div className="detail-day-content">
    <p className="day-introduction">{day.introduction}</p>
    <ol className="day-timeline">{day.activities.map(activity => <li key={activity.period}><span className="day-period">{activity.period}</span><div><h4>{activity.title}</h4><p>{activity.description}</p></div></li>)}</ol>
    <div className="day-gallery-heading"><strong>ภาพบรรยากาศ</strong><span>{day.photos.length} ภาพ · กดเพื่อดูภาพใหญ่</span></div>
    <Dialog.Root><div className="day-gallery">{day.photos.map((item,i) => <Dialog.Trigger key={i} className="day-gallery-photo" onClick={() => setPhotoIndex(i)} aria-label={`ดูภาพ ${item.caption}`}><Image src={item.src} alt={item.caption} fill sizes="(max-width:640px) 44vw,25vw" className="tour-image" /><span>{item.caption}<span aria-hidden="true">↗</span></span></Dialog.Trigger>)}</div><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content day-gallery-dialog"><Dialog.Title>{photo.caption}</Dialog.Title><Dialog.Description className="sr-only">ภาพประกอบกำหนดการ {day.title}</Dialog.Description><div className="day-lightbox-photo"><Image src={photo.src} alt={photo.caption} fill sizes="(max-width:640px) 90vw,800px" className="day-lightbox-image" /></div><div className="day-lightbox-controls"><button aria-label="ภาพก่อนหน้า" disabled={photoIndex === 0} onClick={() => setPhotoIndex(n => n-1)}>‹</button><span>{photoIndex+1} / {day.photos.length}</span><button aria-label="ภาพถัดไป" disabled={photoIndex === day.photos.length-1} onClick={() => setPhotoIndex(n => n+1)}>›</button></div><Dialog.Close aria-label="ปิดภาพกำหนดการ" className="dialog-x">×</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
    <dl className="day-practical"><div><dt>มื้ออาหาร</dt><dd>{day.meals}</dd></div><div><dt>ที่พัก</dt><dd>{day.stay}</dd></div></dl>
  </div>;
}
