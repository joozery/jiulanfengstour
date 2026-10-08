import { FloatingChat } from "@/components/floating-chat";
import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JIULANFENGS | ทัวร์จีน ฮ่องกง ไต้หวัน",
  description: "ค้นพบเส้นทางทัวร์เฉิงตู เซี่ยงไฮ้ ปักกิ่ง ฝูเจี้ยน ฮ่องกง และไต้หวัน กับ JIULANFENGS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full antialiased`}>
      <body className="min-h-full" style={{ position: "relative" }}>{children}<FloatingChat /></body>
    </html>
  );
}
