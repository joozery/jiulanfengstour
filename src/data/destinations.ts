import chengduImage from "../../public/images/chengdu.png";
import shanghaiImage from "../../public/images/shanghai.png";
import beijingImage from "../../public/images/beijing.png";
import fujianImage from "../../public/images/fujian.png";
import hongkongImage from "../../public/images/hongkong.png";
import taiwanImage from "../../public/images/taiwan.png";

export const destinations = [
  { id: "chengdu", name: "เฉิงตู", english: "CHENGDU", category: "ธรรมชาติ & วัฒนธรรม", tagline: "หลงรักแพนด้า สัมผัสเสน่ห์เสฉวน", description: "เปิดประสบการณ์เมืองที่มีทั้งธรรมชาติ วัฒนธรรม และรสชาติอาหารเสฉวน เหมาะกับการเดินทางที่ผสมความสนุกและการพักผ่อน", highlights: ["สัมผัสโลกของแพนด้า", "เดินเล่นย่านเมืองเก่า", "ลิ้มรสอาหารเสฉวน"], image: chengduImage, label: "ธรรมชาติและแพนด้า" },
  { id: "shanghai", name: "เซี่ยงไฮ้", english: "SHANGHAI", category: "เมือง & ไลฟ์สไตล์", tagline: "สีสันมหานคร ที่มากกว่าคำว่าทันสมัย", description: "ค้นพบสองมุมของเซี่ยงไฮ้ ตั้งแต่สถาปัตยกรรมริมแม่น้ำไปจนถึงเส้นขอบฟ้าของมหานคร เลือกจังหวะทริปที่ลงตัวกับคุณ", highlights: ["ชมวิวเดอะบันด์", "สัมผัสมหานครผู่ตง", "เดินเล่นและช้อปปิ้ง"], image: shanghaiImage, label: "มหานครริมแม่น้ำ" },
  { id: "beijing", name: "ปักกิ่ง", english: "BEIJING", category: "ประวัติศาสตร์ & วัฒนธรรม", tagline: "ย้อนรอยเมืองหลวง สู่กำแพงเมืองจีน", description: "สัมผัสเรื่องราวของเมืองหลวงผ่านสถาปัตยกรรมและสถานที่สำคัญ พร้อมเปิดมุมมองใหม่ของเมืองที่เชื่อมอดีตกับปัจจุบัน", highlights: ["กำแพงเมืองจีน", "สถาปัตยกรรมราชสำนัก", "เสน่ห์ย่านหูท่ง"], image: beijingImage, label: "ประวัติศาสตร์มีชีวิต" },
  { id: "fujian", name: "ฝูเจี้ยน", english: "FUJIAN", category: "วัฒนธรรม & วิถีชีวิต", tagline: "บ้านดินโบราณ และเสน่ห์เมืองชายฝั่ง", description: "ชวนออกเดินทางไปพบวิถีชีวิตและสถาปัตยกรรมที่มีเอกลักษณ์ ตั้งแต่บ้านดินถู่โหลวไปจนถึงบรรยากาศเมืองชายฝั่ง", highlights: ["บ้านดินถู่โหลว", "เสน่ห์เมืองเซี่ยเหมิน", "วิถีชีวิตท้องถิ่น"], image: fujianImage, label: "เสน่ห์มรดกวัฒนธรรม" },
  { id: "hongkong", name: "ฮ่องกง", english: "HONG KONG", category: "เมือง & อาหาร", tagline: "วิวอ่าวสุดประทับใจ กินเที่ยวได้เต็มที่", description: "สัมผัสเมืองที่มีชีวิตชีวา ผ่านวิวอ่าว สตรีตฟู้ด และย่านช้อปปิ้ง ผสมการพักผ่อนกับการค้นพบมุมใหม่ในทริปเดียว", highlights: ["วิวอ่าววิกตอเรีย", "อาหารและติ่มซำ", "เที่ยวเมืองและช้อปปิ้ง"], image: hongkongImage, label: "กิน เที่ยว ช้อป" },
  { id: "taiwan", name: "ไต้หวัน", english: "TAIWAN", category: "ธรรมชาติ & อาหาร", tagline: "เมืองน่ารัก วิวสวย และรสชาติที่คิดถึง", description: "เดินทางไปพบความอบอุ่นของเมืองและผู้คน ชมบรรยากาศเมืองเก่า สำรวจตลาดกลางคืน และเติมช่วงเวลาพักผ่อนให้ทริปของคุณ", highlights: ["เมืองเก่าจิ่วเฟิ่น", "สีสันตลาดกลางคืน", "วิวเมืองและธรรมชาติ"], image: taiwanImage, label: "เมืองเก่าและธรรมชาติ" },
];
export type Destination = (typeof destinations)[number];
