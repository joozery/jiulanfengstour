import type { StaticImageData } from "next/image";
import { popularTours } from "./popular-tours";
import { destinations } from "./destinations";

export type DayPhoto = { src: string | StaticImageData; caption: string };
export type ItineraryDay = {
  title: string;
  introduction: string;
  activities: { period: string; title: string; description: string }[];
  photos: DayPhoto[];
  meals: string;
  stay: string;
};

// Preview content. Replace individual days with the confirmed itinerary.
export function getTourItinerary(id: string): ItineraryDay[] {
  const ice = id === "baikal-ice-journey";
  const tour = popularTours.find(item => item.id === id);
  const count = ice ? 6 : Number(tour?.duration.match(/^\d+/)?.[0] ?? 3);
  const titles = ice ? ["เริ่มต้นการเดินทางสู่ดินแดนฤดูหนาว", "สัมผัสทะเลสาบน้ำแข็งสีฟ้า", "ตามหามุมถ่ายภาพและลวดลายน้ำแข็ง", "เก็บประสบการณ์ท่ามกลางธรรมชาติ", "ใช้เวลาสำรวจและเก็บความทรงจำ", "เดินทางกลับพร้อมภาพประทับใจ"] : Array.from({ length: count }, (_, i) => i === 0 ? "เริ่มต้นการเดินทาง" : i === count - 1 ? "เดินทางกลับ" : tour?.highlights[(i - 1) % tour.highlights.length] ?? "สำรวจจุดหมาย");
  const extra = id === "chengdu-jiuzhaigou" ? destinations[0] : id === "hongkong-disneyland" ? destinations[4] : id === "taiwan" ? destinations[5] : id === "fujian" ? destinations[3] : null;
  const photos: DayPhoto[] = ice ? [
    { src: "/images/baikal-ice.png", caption: "บรรยากาศการเดินทางบนทะเลสาบน้ำแข็ง" },
    { src: "/images/baikal-ice-cave.png", caption: "ลวดลายและความงามของน้ำแข็ง" },
  ] : [
    { src: tour!.image, caption: `บรรยากาศทริป${tour!.title}` },
    ...(extra && extra.image !== tour!.image ? [{ src: extra.image, caption: `จุดหมาย${extra.name}` }] : [{ src: "/images/explore-background.png", caption: "ภาพประกอบบรรยากาศการเดินทาง" }]),
  ];
  return titles.map((title, i) => ({
    title,
    introduction: i === 0 ? "เริ่มต้นทริปอย่างสบายใจ พบเพื่อนร่วมเดินทางและเตรียมพร้อมสำหรับประสบการณ์ใหม่" : i === count - 1 ? "เก็บช่วงเวลาประทับใจ แล้วเตรียมเดินทางกลับพร้อมความทรงจำของทริป" : `เต็มอิ่มกับ${title} ให้เวลาตัวเองได้ชมวิว ถ่ายภาพ และสัมผัสบรรยากาศของจุดหมาย`,
    activities: i === 0 ? [
      { period: "ก่อนออกเดินทาง", title: "พบกันที่จุดนัดหมาย", description: "ตรวจเอกสารและสัมภาระ พร้อมรับข้อมูลโปรแกรมจากทีมงาน จุดนัดหมายและเวลาจะยืนยันตามเที่ยวบินจริง" },
      { period: "ระหว่างวัน", title: "เดินทางสู่จุดหมาย", description: "เดินทางตามเส้นทางที่กำหนด เมื่อถึงปลายทางพบทีมดูแลและเดินทางเข้าสู่ที่พัก" },
      { period: "ช่วงเย็น", title: "พักผ่อนและเตรียมตัวสำหรับวันถัดไป", description: "เช็กอินที่พัก พูดคุยเกี่ยวกับกิจกรรมและอุปกรณ์ที่ควรเตรียม พร้อมพักผ่อนตามอัธยาศัย" },
    ] : i === count - 1 ? [
      { period: "ช่วงเช้า", title: "เก็บภาพส่งท้าย", description: "รับประทานอาหารและเก็บสัมภาระ ใช้เวลาพักผ่อนก่อนเช็กเอาต์ตามเวลาเที่ยวบิน" },
      { period: "ก่อนเดินทางกลับ", title: "เดินทางสู่สนามบิน", description: "ตรวจสัมภาระและเอกสาร พร้อมเดินทางไปยังสนามบินตามเวลานัดหมายของทีมงาน" },
      { period: "สิ้นสุดทริป", title: "เดินทางกลับ", description: "กลับถึงปลายทางตามเที่ยวบินที่ยืนยัน สิ้นสุดการเดินทางพร้อมภาพและเรื่องราวที่น่าจดจำ" },
    ] : [
      { period: "ช่วงเช้า", title: title, description: ice ? "เริ่มกิจกรรมชมทะเลสาบและลวดลายน้ำแข็งกับทีมดูแล สำรวจเฉพาะพื้นที่ที่ทีมงานยืนยันความพร้อมในวันเดินทาง" : "ออกเดินทางจากที่พักไปยังจุดหมายหลักของวัน ชมบรรยากาศและฟังเรื่องราวของสถานที่จากทีมดูแล" },
      { period: "ช่วงบ่าย", title: "สำรวจมุมสวยและเก็บภาพประทับใจ", description: "ใช้เวลาชมวิวและถ่ายภาพตามจุดที่จัดไว้ พักระหว่างกิจกรรมและสัมผัสบรรยากาศโดยรอบ โปรแกรมอาจปรับตามสภาพอากาศ" },
      { period: "ช่วงเย็น", title: "กลับที่พักและพักผ่อน", description: "เดินทางกลับที่พัก ใช้เวลาพักผ่อนและเตรียมตัวสำหรับการเดินทางในวันถัดไป" },
    ],
    photos: i % 2 === 0 ? photos : [...photos].reverse(),
    meals: "ยืนยันมื้ออาหารตามโปรแกรมจริง",
    stay: i === count - 1 ? "สิ้นสุดการเดินทาง" : "ยืนยันโรงแรมและรูปแบบห้องกับทีมงาน",
  }));
}
