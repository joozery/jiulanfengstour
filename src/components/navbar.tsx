"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DropdownMenu } from "radix-ui";
import { destinations } from "@/data/destinations";
import { ContactButton, Icon } from "./travel-ui";

function DestinationFlag({ id }: { id: string }) {
  const country = id === "hongkong" ? "hk" : id === "taiwan" ? "tw" : "cn";
  return <span className={`fi fi-${country} nav-country-flag`} aria-hidden="true" />;
}

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/gallery", label: "แกลเลอรี่" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 60);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  function selectDestination(id: string) {
    router.push(id === "all" ? "/destinations" : `/destinations/${id}`);
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");

  }

  const brand = <><Image src="/logo/logo.jpeg" alt="" width={50} height={50} className="nav-logo" priority /><span className="nav-wordmark">JIULANFENGS<small>CHINA TRAVEL</small></span></>;

  return (
    <header className={`travel-navbar hero-navbar ${scrolled || (pathname !== "/" && !pathname.startsWith("/tours/")) ? "is-scrolled" : ""}`.trim()}>

      <div className="nav-main page-width">
        <Link href="/" aria-label="JIULANFENGS หน้าแรก" className="nav-brand">{brand}</Link>
        <nav aria-label="เมนูหลัก" className="nav-desktop">
          <Link href="/" className="nav-link">หน้าแรก</Link>
          <Link href="/tours" className="nav-link">แพ็กเกจทัวร์</Link>
          <DropdownMenu.Root><DropdownMenu.Trigger className="nav-link nav-destination-trigger">เส้นทางยอดนิยม<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="nav-dropdown" sideOffset={18} align="start" collisionPadding={16}><DropdownMenu.Label className="nav-dropdown-label">เลือกจุดหมายของคุณ</DropdownMenu.Label>{destinations.map(city => <DropdownMenu.Item key={city.id} onSelect={() => selectDestination(city.id)} className="nav-dropdown-item"><DestinationFlag id={city.id} /><span>{city.name}<small>{city.english}</small></span><Icon name="arrow" /></DropdownMenu.Item>)}<DropdownMenu.Separator className="nav-dropdown-separator" /><DropdownMenu.Item onSelect={() => selectDestination("all")} className="nav-dropdown-all">ดูเส้นทางทั้งหมด<Icon name="arrow" /></DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>
          {links.slice(1).map(link => <Link href={link.href} key={link.href} className="nav-link">{link.label}</Link>)}
        </nav>
        <div className="nav-actions"><Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}><Dialog.Trigger aria-label="ค้นหาเส้นทางทัวร์" className="nav-search-button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></svg></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content nav-search-dialog"><div className="search-dialog-heading"><p className="eyebrow">FIND YOUR DESTINATION</p><Dialog.Title className="search-dialog-title">อยากเดินทางไปที่ไหน?</Dialog.Title><Dialog.Description className="search-dialog-description">ค้นพบจุดหมายที่ใช่ สำหรับทริปครั้งต่อไป</Dialog.Description></div><div className="search-dialog-body"><label className="sr-only" htmlFor="destination-search">ค้นหาเมือง</label><div className="destination-search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg><input id="destination-search" placeholder="ค้นหาเมือง เช่น เฉิงตู หรือ Shanghai" value={query} onChange={event => setQuery(event.target.value)} className="destination-search-input" />{query && <button onClick={() => setQuery("")} aria-label="ล้างคำค้นหา">×</button>}</div><p className="search-results-label">{query ? "ผลการค้นหา" : "จุดหมายยอดนิยม"}</p><div className="search-destinations">{destinations.filter(city => `${city.name} ${city.english}`.toLowerCase().includes(query.trim().toLowerCase())).map(city => <button key={city.id} onClick={() => selectDestination(city.id)}><span className="search-city-photo"><Image src={city.image} alt="" fill sizes="56px" className="tour-image" /></span><span className="search-city-copy"><strong>{city.name}</strong><small>{city.english}</small></span><DestinationFlag id={city.id} /><Icon name="arrow" /></button>)}</div>{!destinations.some(city => `${city.name} ${city.english}`.toLowerCase().includes(query.trim().toLowerCase())) && <div className="search-empty"><Icon name="compass" /><strong>ยังไม่พบจุดหมายนี้</strong><p>ลองค้นหาด้วยชื่อเมืองภาษาไทยหรืออังกฤษ</p><button onClick={() => setQuery("")}>ดูจุดหมายทั้งหมด</button></div>}<button className="search-view-all" onClick={() => selectDestination("all")}>สำรวจทุกเส้นทาง<Icon name="arrow" /></button></div><Dialog.Close aria-label="ปิดการค้นหา" className="dialog-x">×</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root><ContactButton className="nav-contact"><span className="line-bubble" aria-hidden="true">LINE</span>สอบถามทัวร์</ContactButton><Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}><Dialog.Trigger aria-label="เปิดเมนู" className="nav-mobile-trigger"><Icon name="menu" /></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay nav-sheet-overlay" /><Dialog.Content className="nav-mobile-sheet"><div className="nav-sheet-header"><Link href="/" onClick={() => setMenuOpen(false)} className="nav-brand">{brand}</Link><Dialog.Close aria-label="ปิดเมนู" className="nav-sheet-close">×</Dialog.Close></div><Dialog.Title className="sr-only">เมนู JIULANFENGS</Dialog.Title><Dialog.Description className="sr-only">เลือกเมนูหรือจุดหมายสำหรับทริปของคุณ</Dialog.Description><nav aria-label="เมนูมือถือ" className="nav-sheet-links"><Link href="/" onClick={() => setMenuOpen(false)}>หน้าแรก<Icon name="arrow" /></Link><Link href="/tours" onClick={() => setMenuOpen(false)}>แพ็กเกจทัวร์<Icon name="arrow" /></Link><div className="nav-sheet-destinations"><p>จุดหมายยอดนิยม <span>6 เส้นทาง</span></p><div>{destinations.map(city => <button key={city.id} onClick={() => selectDestination(city.id)}><DestinationFlag id={city.id} /><span>{city.name}<small>{city.english}</small></span></button>)}</div><button className="nav-sheet-all" onClick={() => selectDestination("all")}>ดูเส้นทางทั้งหมด<Icon name="arrow" /></button></div>{links.slice(1).map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<Icon name="arrow" /></Link>)}</nav><div className="nav-sheet-footer"><p>มีทริปในใจแล้ว? ให้เราช่วยวางแผน</p><ContactButton className="w-full" /></div></Dialog.Content></Dialog.Portal></Dialog.Root></div>
      </div>
    </header>
  );
}
