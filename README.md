# JIULANFENGS Travel

เว็บไซต์ทัวร์จีน ฮ่องกง และไต้หวัน ใช้ Next.js App Router, TypeScript, Tailwind CSS, Radix UI และ Noto Sans Thai ผ่าน next/font

## เริ่มใช้งาน

ใช้ Node.js 20.9 ขึ้นไป:

```bash
npm ci
npm run dev
```

เปิด http://localhost:3000

## ตรวจโปรเจค

```bash
npm run lint
npm run build
```

ใช้ `npm start` หลัง build สำเร็จเพื่อรัน production

## โครงสร้าง

- `src/app/page.tsx`: หน้าแรก แบบเลือกทริป ตัวกรองจุดหมาย และเมนูมือถือ
- `src/data/destinations.ts`: ข้อมูลเฉิงตู เซี่ยงไฮ้ ปักกิ่ง ฝูเจี้ยน ฮ่องกง และไต้หวัน
- `src/components/travel-ui.tsx`: การ์ดเส้นทาง Radix Dialog และปุ่มติดต่อ
- `src/app/globals.css`: ดีไซน์โทนน้ำเงิน ทอง ครีม และ responsive layout
- `src/app/layout.tsx`: Noto Sans Thai และ metadata
- `public/images/`: ภาพประกอบจุดหมายที่สร้างสำหรับดีไซน์เว็บ

## สถานะเนื้อหา

เส้นทางเป็นไอเดียท่องเที่ยว ยังไม่มีโปรแกรมทัวร์ ราคา วันเดินทาง หรือรายการบริการที่ยืนยัน แบบเลือกทริปกรองจุดหมายและแสดงรูปแบบ/จำนวนผู้เดินทาง ไม่มีการส่งข้อมูลหรือจองทัวร์

`ContactButton` ยังเปิดข้อความแจ้งสถานะ ต้องเพิ่มลิงก์ติดต่อจริงก่อนเปิดใช้งาน
