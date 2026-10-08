"use client";

import { useEffect, useRef, useState } from "react";
import { destinations } from "@/data/destinations";
import { TourCard } from "./travel-ui";

export function ExploreRoutes({ selected, onClear }: { selected: string; onClear: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const routes = destinations.filter(city => selected === "all" || city.id === selected);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    element.scrollTo({ left: 0, behavior: "instant" });
    const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft >= element.scrollWidth - element.clientWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, [selected]);

  function move(direction: number) {
    const element = track.current;
    if (!element?.firstElementChild) return;
    const step = element.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(element).gap || "0");
    const max = element.scrollWidth - element.clientWidth;
    const target = Math.max(0, Math.min(max, element.scrollLeft + direction * step));
    element.scrollTo({ left: target, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section id="destinations" className="explore-routes" aria-labelledby="explore-title">
      <div className="explore-inner">
        <div className="explore-heading"><p className="explore-eyebrow">EXPLORE OUR ROUTES</p><h2 id="explore-title">เส้นทางท่องเที่ยว<span>สุดตื่นตา</span></h2><p className="explore-description">เปิดประสบการณ์ท่องเที่ยวหลากหลายเส้นทาง คัดสรรจุดหมายที่ดีที่สุด เพื่อการเดินทางที่น่าจดจำ</p></div>
        {selected !== "all" && <div className="explore-selection" aria-live="polite"><span>จุดหมายที่เลือก: {routes[0]?.name}</span><button onClick={onClear}>ดูทุกเส้นทาง <span aria-hidden="true">↗</span></button></div>}
        <div className="explore-gallery"><div id="explore-track" ref={track} className="explore-track" role="region" aria-label="เส้นทางท่องเที่ยวทั้ง 6 จุดหมาย" tabIndex={0}>{routes.map(city => <TourCard key={city.id} destination={city} />)}</div>{routes.length > 1 && <div className="explore-controls"><button disabled={edges.start} onClick={() => move(-1)} aria-label="เส้นทางก่อนหน้า" aria-controls="explore-track"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button><button disabled={edges.end} onClick={() => move(1)} aria-label="เส้นทางถัดไป" aria-controls="explore-track"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button></div>}</div>
      </div>
    </section>
  );
}
