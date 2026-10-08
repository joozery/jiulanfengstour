"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { popularTours } from "@/data/popular-tours";
import { Icon } from "./travel-ui";

function FeatureIcon({ index }: { index: number }) {
  if (index === 0) return <Icon name="plane" />;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{index === 1 ? <><path d="M3 20V5h18v15M3 16h18M6 20v2m12-2v2M6 12h12v4H6z" /><path d="M7 8h3m4 0h3" /></> : <><path d="M3 8h4l2-3h6l2 3h4v13H3z" /><circle cx="12" cy="14" r="4" /><path d="M18 11h.01" /></>}</svg>;
}

export function PopularTours() {
  const carousel = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    const track = carousel.current;
    if (!track) return;
    const card = track.firstElementChild;
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || "0");
    const maximum = track.scrollWidth - track.clientWidth;
    const target = direction > 0 && track.scrollLeft >= maximum - 2 ? 0 : direction < 0 && track.scrollLeft <= 2 ? maximum : track.scrollLeft + direction * step;
    track.scrollTo({ left: target, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section id="popular-tours" className="popular-tours-section" aria-labelledby="popular-tours-title">
      <div className="popular-tours-inner">
        <div className="popular-tours-header">
          <div><p className="popular-tours-eyebrow"><span aria-hidden="true">◆</span> POPULAR TOURS <span aria-hidden="true">◆</span></p><h2 id="popular-tours-title">แพ็กเกจทัวร์ยอดนิยม</h2><p className="popular-tours-subtitle">เส้นทางยอดฮิต คัดสรรมาเพื่อประสบการณ์ที่ดีที่สุด</p></div>
          <div className="popular-tours-actions"><Link href="/destinations" className="popular-tours-view-all">ดูแพ็กเกจทั้งหมด<Icon name="arrow" /></Link><div className="popular-tours-arrows"><button onClick={() => move(-1)} aria-label="เลื่อนแพ็กเกจก่อนหน้า">‹</button><button onClick={() => move(1)} aria-label="เลื่อนแพ็กเกจถัดไป">›</button></div></div>
        </div>
        <div ref={carousel} className="popular-tours-track" role="region" aria-label="รายการแพ็กเกจทัวร์" tabIndex={0}>
          {popularTours.map((tour) => <article key={tour.id} className="popular-tour-card">
            <div className="popular-tour-photo relative"><Image src={tour.image} alt={`ภาพประกอบทัวร์${tour.title}`} fill sizes="(max-width: 640px) 85vw, (max-width: 1000px) 45vw, 25vw" className="tour-image" />{tour.badge && <span className="popular-tour-badge">{tour.badge}</span>}</div>
            <div className="popular-tour-body"><h3>{tour.title}</h3><p className="popular-tour-duration">{tour.duration}</p><ul className="popular-tour-features">{tour.highlights.map((highlight, index) => <li key={highlight}><FeatureIcon index={index} /><span>{highlight}</span></li>)}</ul><div className="popular-tour-price">{tour.price ? <><span>เริ่มต้น</span><strong>{tour.price.toLocaleString("en-US")}.-</strong></> : <span className="popular-tour-price-enquiry">สอบถามราคา</span>}</div>
              <Link href={`/tours/${tour.id}`} className="popular-tour-detail">ดูรายละเอียด<Icon name="arrow" /></Link>
            </div>
          </article>)}
        </div>
        <p className="popular-tours-note">โปรแกรมและราคาเป็นตัวอย่างสำหรับแสดงรูปแบบแพ็กเกจ รายละเอียดจริงกรุณาสอบถามทีมงาน</p>
      </div>
    </section>
  );
}
