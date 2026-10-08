"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, Select } from "radix-ui";
import { getTourItinerary } from "@/data/tour-itineraries";
import { ItineraryDayContent } from "./itinerary-day";
import { Navbar } from "./navbar";
import { ContactButton, Icon } from "./travel-ui";
import { popularTours } from "@/data/popular-tours";
import { tripDepartures } from "@/data/trip-departures";

const faqs = [
  ["ราคาและสิ่งที่รวมในทริป", "ราคาในหน้านี้เป็นข้อมูลตัวอย่าง รายการที่รวม เช่น โรงแรม การเดินทาง และอาหาร ต้องยืนยันตามโปรแกรมและรอบเดินทางจริงกับทีมงานก่อนจอง"],
  ["สิ่งที่ไม่รวมในราคา", "สอบถามรายละเอียดค่าใช้จ่ายส่วนตัว ประกันการเดินทาง เอกสารเข้าเมือง ค่าทิป และกิจกรรมเพิ่มเติมตามโปรแกรมจริง"],
  ["การจอง การยกเลิก และเงื่อนไข", "ทีมงานจะยืนยันเงื่อนไขการชำระเงิน การเปลี่ยนแปลง และการยกเลิกตามรอบเดินทางก่อนรับจอง ยังไม่สามารถชำระเงินหรือยืนยันที่นั่งผ่านหน้านี้"],
  ["เที่ยวบินและเอกสารเดินทาง", "สายการบิน เวลาเที่ยวบิน และเอกสารขึ้นอยู่กับโปรแกรมและผู้เดินทาง กรุณายืนยันข้อมูลกับทีมงานก่อนจัดเตรียมเอกสาร"],
  ["สภาพอากาศและการเตรียมตัว", "เตรียมเสื้อผ้าและรองเท้าให้เหมาะกับฤดูกาล สำหรับทริปน้ำแข็งควรเตรียมเสื้อกันหนาว ถุงมือ หมวก และรองเท้ากันลื่น ทีมงานจะให้ข้อมูลที่เหมาะกับรอบเดินทางจริง"],
];
export function TourDetail({ id, initialRound }: { id: string; initialRound?: string }) {
  const ice = id === "baikal-ice-journey";
  const index = popularTours.findIndex(tour => tour.id === id);
  const tour = ice ? { title: "Baikal Ice Journey", duration: "6 วัน 5 คืน", description: "ออกเดินทางสู่โลกสีฟ้าของทะเลสาบน้ำแข็ง เก็บภาพลวดลายธรรมชาติใต้ฝ่าเท้า พบวิวภูเขาหิมะ และใช้เวลาร่วมกันท่ามกลางบรรยากาศฤดูหนาวที่น่าจดจำ", image: "/images/baikal-ice.png", highlights: ["ถ่ายภาพบนทะเลสาบน้ำแข็ง", "ชมลวดลายและฟองอากาศใต้ผืนน้ำแข็ง", "สัมผัสบรรยากาศฤดูหนาว"] } : popularTours[index];
  const rounds = ice ? [{ id: "period-1", date: "6–11 ก.พ. 2570", price: 69900 }, { id: "period-2", date: "13–18 ก.พ. 2570", price: 71900 }, { id: "period-3", date: "20–25 ก.พ. 2570", price: 69900 }] : (tripDepartures[index] ?? []);
  const [roundId, setRoundId] = useState(initialRound ?? rounds[0]?.id ?? "");
  const [people, setPeople] = useState(2);
  const [shareMessage, setShareMessage] = useState("");
  const round = rounds.find(item => item.id === roundId) ?? rounds[0];
  const days = getTourItinerary(id);
  async function share() {
    const url = `${window.location.origin}/tours/${id}${round ? `?round=${round.id}` : ""}`;
    try { if (navigator.share) await navigator.share({ title: tour.title, url }); else { await navigator.clipboard.writeText(url); setShareMessage("คัดลอกลิงก์ทริปแล้ว"); } } catch { setShareMessage("สามารถคัดลอกลิงก์จากแถบที่อยู่เพื่อแชร์ทริปได้"); }
  }
  return <main className="tour-detail-page"><Navbar /><section className="detail-hero"><Image src={tour.image} alt={`ภาพประกอบทริป ${tour.title}`} fill priority sizes="100vw" className="detail-hero-image" /><div className="detail-hero-shade" /><div className="detail-hero-copy page-width"><p>CURATED JOURNEYS · JIULANFENGS</p><h1>{tour.title}</h1><span><Icon name="compass" />{ice ? "ทะเลสาบน้ำแข็ง • ประสบการณ์ • ถ่ายภาพ" : "ธรรมชาติ • วัฒนธรรม • ความทรงจำ"}</span></div></section>
  <div className="detail-breadcrumb page-width"><Link href="/">หน้าแรก</Link><span>/</span><Link href="/tours">แพ็กเกจทัวร์</Link><span>/</span><span>{tour.title}</span></div>
  <div className="detail-layout page-width"><div className="detail-main">
    <section className="detail-box detail-intro"><p className="eyebrow">THE JOURNEY</p><h2>{tour.title}</h2><div className="detail-facts"><span><Icon name="plane" />{tour.duration}</span><span><Icon name="people" />ทริปกลุ่ม</span><span><Icon name="pin" />{ice ? "ทะเลสาบไบคาล" : tour.title}</span></div><p className="detail-description">{tour.description}</p><div className="detail-sample">โปรแกรม รอบเดินทาง และราคาเป็นตัวอย่างสำหรับหน้าออกแบบ กรุณายืนยันข้อมูลจริงกับทีมงาน</div></section>
    <section className="detail-box"><p className="eyebrow">TRIP HIGHLIGHTS</p><h2>ช่วงเวลาที่ไม่อยากให้พลาด</h2><div className="detail-highlights">{tour.highlights.map((item,i) => <div key={item}><span>0{i+1}</span><strong>{item}</strong><Icon name="check" /></div>)}</div></section>
    <section className="detail-box"><div className="detail-section-heading"><div><p className="eyebrow">DAY BY DAY</p><h2>เส้นทางแห่งความทรงจำ</h2></div><span>{tour.duration}</span></div><p className="detail-muted">กำหนดการตัวอย่าง เพื่อให้เห็นรูปแบบการเดินทาง</p><Accordion.Root type="multiple" defaultValue={["day-1"]} className="detail-itinerary">{days.map((day,i) => <Accordion.Item key={i} value={`day-${i+1}`} className="detail-day"><Accordion.Header><Accordion.Trigger><span className="detail-day-number">DAY {String(i+1).padStart(2,"0")}</span><strong>{day.title}</strong><span className="detail-day-chevron">⌄</span></Accordion.Trigger></Accordion.Header><Accordion.Content><ItineraryDayContent day={day} /></Accordion.Content></Accordion.Item>)}</Accordion.Root></section>
    <section className="detail-box"><p className="eyebrow">GOOD TO KNOW</p><h2>ก่อนออกเดินทาง</h2><Accordion.Root type="single" collapsible className="detail-faq">{faqs.map(([question,answer],i) => <Accordion.Item value={`faq-${i}`} key={question}><Accordion.Header><Accordion.Trigger>{question}<span>+</span></Accordion.Trigger></Accordion.Header><Accordion.Content><p>{answer}</p></Accordion.Content></Accordion.Item>)}</Accordion.Root></section>
  </div><aside className="detail-booking"><div className="detail-box detail-price-box"><p className="eyebrow">YOUR NEXT JOURNEY</p><span className="detail-price-label">ราคาเริ่มต้น / ท่าน</span><div className="detail-price">{round ? `฿${round.price.toLocaleString("en-US")}` : "สอบถามราคา"}</div><div className="detail-price-rule" /><label className="detail-booking-label" id="detail-round-label">เลือกรอบเดินทาง</label>{round ? <Select.Root value={round.id} onValueChange={setRoundId}><Select.Trigger className="our-trip-round-trigger" aria-labelledby="detail-round-label"><Select.Value /><Select.Icon>⌄</Select.Icon></Select.Trigger><Select.Portal><Select.Content position="popper" sideOffset={6} className="our-trip-round-menu"><Select.Viewport>{rounds.map(item => <Select.Item value={item.id} key={item.id} className="our-trip-round-option"><Select.ItemText>{item.date}</Select.ItemText><span className="our-trip-option-price">฿{item.price.toLocaleString("en-US")}</span></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal></Select.Root> : <p className="detail-muted">สอบถามรอบเดินทางกับทีมงาน</p>}<div className="detail-availability"><Icon name="people" /><span>จำนวนที่นั่งว่าง: รอยืนยันจากทีมงาน</span></div><div className="detail-people"><span>ผู้ร่วมเดินทาง</span><div><button aria-label="ลดจำนวนผู้เดินทาง" disabled={people <= 1} onClick={() => setPeople(n => n-1)}>−</button><output aria-live="polite">{people}</output><button aria-label="เพิ่มจำนวนผู้เดินทาง" disabled={people >= 20} onClick={() => setPeople(n => n+1)}>+</button></div></div>{round && <div className="detail-total"><span>รวมประมาณ {people} ท่าน</span><strong>฿{(people*round.price).toLocaleString("en-US")}</strong></div>}<ContactButton className="detail-book-button" destination={`${tour.title}${round ? ` รอบ ${round.date}` : ""} จำนวน ${people} ท่าน`}>สอบถาม / จองทริป</ContactButton><button className="detail-share" onClick={share}>แชร์ทริปนี้ <Icon name="arrow" /></button><p className="detail-share-message" role="status">{shareMessage}</p><small className="detail-booking-note">สอบถามข้อมูลและยืนยันความพร้อมก่อนจอง</small></div><div className="detail-assistance"><Icon name="compass" /><div><strong>ทริปที่ใช่ เริ่มจากการพูดคุย</strong><p>เราพร้อมช่วยวางแผนการเดินทางของคุณ</p><Link href="/contact">ติดต่อทีมงาน →</Link></div></div></aside></div>
  <section className="detail-end"><p className="eyebrow">TRAVEL FAR. FEEL MORE.</p><h2>ทุกการเดินทาง มีเรื่องราวของคุณ</h2><p>ออกไปค้นพบโลก แล้วกลับมาพร้อมความทรงจำที่มีความหมาย</p><ContactButton /><Link href="/tours">ดูทริปอื่น ๆ →</Link></section><footer className="detail-footer page-width"><Link href="/">JIULANFENGS <small>CHINA TRAVEL</small></Link><span>© JIULANFENGS. All rights reserved.</span></footer></main>;
}
