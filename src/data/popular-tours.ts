import jiuzhaigou from "../../public/images/jiuzhaigou.png";
import zhangjiajie from "../../public/images/mountain-hero.png";
import lijiang from "../../public/images/lijiang.png";
import themepark from "../../public/images/themepark.png";
import { destinations } from "./destinations";

// Design examples from the supplied reference; replace with confirmed tour data.
export const popularTours = [
  { id: "chengdu-jiuzhaigou", title: "เฉิงตู - จิ่วจ้ายโกว", duration: "6 วัน 5 คืน", image: jiuzhaigou, badge: "ยอดนิยม", price: 25900, highlights: ["บินตรง", "พักโรงแรม 4 ดาว", "เที่ยวครบไฮไลต์"], description: "ไอเดียทริปสัมผัสธรรมชาติจิ่วจ้ายโกวและเสน่ห์เมืองเฉิงตู เหมาะสำหรับคนที่อยากชมวิวทะเลสาบและภูเขา พร้อมเก็บประสบการณ์เมืองในทริปเดียว" },
  { id: "zhangjiajie", title: "จางเจียเจี้ย", duration: "5 วัน 4 คืน", image: zhangjiajie, badge: "ฮอตฮิต", price: 23900, highlights: ["บินตรง", "พักโรงแรม 4 ดาว", "เที่ยวครบไฮไลต์"], description: "ไอเดียทริปชมขุนเขาและทะเลหมอกของจางเจียเจี้ย เปิดมุมมองใหม่ผ่านภูมิประเทศที่โดดเด่นและบรรยากาศธรรมชาติ" },
  { id: "kunming-dali-lijiang", title: "คุนหมิง - ต้าหลี่ - ลี่เจียง", duration: "6 วัน 5 คืน", image: lijiang, badge: "", price: 22900, highlights: ["บินตรง", "พักโรงแรม 4 ดาว", "เที่ยวครบไฮไลต์"], description: "ไอเดียทริปค้นพบเสน่ห์ยูนนาน ผ่านบรรยากาศเมืองเก่า สถาปัตยกรรม และภูเขาที่โอบล้อมคุนหมิง ต้าหลี่ และลี่เจียง" },
  { id: "hongkong-disneyland", title: "ฮ่องกง ดิสนีย์แลนด์", duration: "3 วัน 2 คืน", image: themepark, badge: "", price: 16900, highlights: ["บินตรง", "พักโรงแรม 4 ดาว", "เที่ยวครบไฮไลต์"], description: "ไอเดียทริปฮ่องกงที่ผสมการเที่ยวเมืองกับวันสนุกในสวนสนุก เหมาะกับครอบครัวและคนที่อยากเติมสีสันให้วันหยุด" },
  { id: "fujian", title: "ฝูเจี้ยน - เซี่ยเหมิน", duration: "สอบถามวันเดินทาง", image: destinations[3].image, badge: "", price: null, highlights: ["บ้านดินถู่โหลว", "เที่ยวเมืองชายฝั่ง", "สัมผัสวัฒนธรรม"], description: destinations[3].description },
  { id: "taiwan", title: "ไต้หวัน - จิ่วเฟิ่น", duration: "สอบถามวันเดินทาง", image: destinations[5].image, badge: "", price: null, highlights: ["เมืองเก่าจิ่วเฟิ่น", "สีสันตลาดกลางคืน", "ธรรมชาติและอาหาร"], description: destinations[5].description },
];
