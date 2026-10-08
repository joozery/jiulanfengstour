"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Select } from "radix-ui";
import { popularTours } from "@/data/popular-tours";
import { Icon } from "./travel-ui";

const categories = ["ธรรมชาติ", "ภูเขา", "วัฒนธรรม", "ครอบครัว"];

import { tripDepartures } from "@/data/trip-departures";

export function OurTrips() {
  const [selectedRounds, setSelectedRounds] = useState<Record<string, string>>({});
  return (
    <section id="our-trips" className="our-trips" aria-labelledby="our-trips-title">
      <div className="our-trips-inner">
        <header className="our-trips-heading"><p>OUR TRIPS</p><h2 id="our-trips-title">ทริปท่องเที่ยว<span>สุดพิเศษ</span></h2><div>เลือกประสบการณ์การเดินทางที่ใช่สำหรับคุณ<br />ค้นพบรายละเอียดทริปและจุดหมายที่น่าประทับใจ</div></header>
        <div className="our-trips-grid">
          {popularTours.slice(0, 4).map((tour, index) => {
            const rounds = tripDepartures[index];
            const round = rounds.find(item => item.id === selectedRounds[tour.id]) ?? rounds[0];
            return <article className="our-trip-card" key={tour.id}>
            <div className="our-trip-photo"><Image src={tour.image} alt={`ภาพประกอบ${tour.title}`} fill sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 25vw" className="tour-image" /><span className="our-trip-category"><Icon name={index === 3 ? "people" : "compass"} />{categories[index]}</span></div>
            <div className="our-trip-body"><h3>{tour.title}</h3><div className="our-trip-schedule"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18" /></svg>รอบเดินทาง</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" /></svg>{tour.duration}</span></div>
              <Select.Root value={round.id} onValueChange={value => setSelectedRounds(previous => ({ ...previous, [tour.id]: value }))}><Select.Trigger className="our-trip-round-trigger" aria-label={`เลือกรอบเดินทาง ${tour.title}`}><Select.Value /><Select.Icon><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></Select.Icon></Select.Trigger><Select.Portal><Select.Content className="our-trip-round-menu" position="popper" sideOffset={6} collisionPadding={16}><Select.Viewport>{rounds.map(item => <Select.Item key={item.id} value={item.id} className="our-trip-round-option"><Select.ItemText>{item.date}</Select.ItemText><span className="our-trip-option-price">฿{item.price.toLocaleString("en-US")}</span><Select.ItemIndicator><Icon name="check" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal></Select.Root>
              <ul className="our-trip-features">{tour.highlights.map((feature, i) => <li key={feature}><Icon name={i === 0 ? "plane" : "check"} />{feature}</li>)}</ul>
              <div className="our-trip-bottom"><div className="our-trip-price"><span>เริ่มต้น</span><strong>฿{round.price.toLocaleString("en-US")}</strong></div>
                <Link href={`/tours/${tour.id}?round=${round.id}`} className="our-trip-detail">ดูรายละเอียด<Icon name="arrow" /></Link>
              </div>
            </div>
          </article>; })}
        </div>
      </div>
    </section>
  );
}
