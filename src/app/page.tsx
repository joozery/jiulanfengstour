"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import mountainHero from "../../public/images/mountain-hero.png";
import { ExploreRoutes } from "@/components/explore-routes";
import { OurTrips } from "@/components/our-trips";
import { PopularTours } from "@/components/popular-tours";
import { Faq } from "@/components/faq";
import { Navbar } from "@/components/navbar";
import { destinations } from "@/data/destinations";
import { ContactButton, Icon } from "@/components/travel-ui";


export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroSlides = [
    { image: mountainHero, alt: "ภาพประกอบภูเขาจีนและทะเลหมอกยามเช้า", name: "CHINA", location: "MOUNTAINS & MOMENTS" },
    { image: destinations[1].image, alt: "ภาพประกอบวิวเมืองเซี่ยงไฮ้ยามเย็น", name: "SHANGHAI", location: "CITY LIGHTS, CHINA" },
    { image: destinations[2].image, alt: "ภาพประกอบกำแพงเมืองจีนท่ามกลางภูเขา", name: "BEIJING", location: "THE GREAT WALL, CHINA" },
  ];
  const heroSlideCount = heroSlides.length;
  useEffect(() => {
    if (heroPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setHeroSlide((slide) => (slide + 1) % heroSlideCount);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [heroSlide, heroPaused, heroSlideCount]);

  const [selected, setSelected] = useState("all");


  return (
    <main>
      <Navbar />
      <section id="home" className="hero cinematic-hero relative" aria-label="แนะนำการท่องเที่ยวจีน">
        {heroSlides.map((slide, index) => <Image key={slide.name} src={slide.image} alt={heroSlide === index ? slide.alt : ""} aria-hidden={heroSlide !== index} fill sizes="100vw" priority={index === 0} loading={index === 0 ? undefined : "eager"} className={`hero-image hero-fade-image ${heroSlide === index ? "is-visible" : ""}`} />)}
        <div className="hero-copy page-width"><p className="eyebrow">JIULANFENGS</p><h1><span className="hero-title-gold">เที่ยวจีน</span><span className="hero-title-sub">ให้มากกว่าการเดินทาง</span></h1><p className="hero-description">สัมผัสเสน่ห์ของดินแดนมังกร กับประสบการณ์ที่คัดสรรมาเพื่อคุณ</p><div className="hero-actions"><a href="#popular-tours" className="gold-button hero-primary" onClick={() => setSelected("all")}>ดูแพ็กเกจทัวร์ทั้งหมด<Icon name="arrow" /></a><ContactButton className="hero-line-button"><span className="line-bubble" aria-hidden="true">LINE</span>สอบถามผ่าน LINE</ContactButton></div><a href="#popular-tours" className="hero-scroll"><span className="hero-scroll-icon">↓</span><span>SCROLL<br />TO EXPLORE</span></a></div>
        <div className="hero-location"><span>0{heroSlide + 1}</span><p>{heroSlides[heroSlide].name}<br /><small>{heroSlides[heroSlide].location}</small></p><i aria-hidden="true" /></div>
        <div className="hero-slide-controls page-width" role="group" aria-label="เลือกภาพจุดหมาย">{heroSlides.map((slide, index) => <button key={slide.name} onClick={() => setHeroSlide(index)} aria-label={`ภาพ ${slide.name}`} aria-pressed={heroSlide === index} className={heroSlide === index ? "active" : ""}>0{index + 1}</button>)}<button className="hero-autoplay-toggle" onClick={() => setHeroPaused((paused) => !paused)} aria-label={heroPaused ? "เล่นภาพอัตโนมัติ" : "หยุดภาพอัตโนมัติ"}>{heroPaused ? "▶" : "Ⅱ"}</button></div>
      </section>

      <PopularTours />



      <ExploreRoutes selected={selected} onClear={() => setSelected("all")} />

      <OurTrips />

      <Faq />

      <footer id="contact" className="site-footer">
        <div className="page-width">
          <div className="footer-invitation"><div><p className="eyebrow">YOUR NEXT JOURNEY STARTS HERE</p><h2>พร้อมออกเดินทาง<span>ไปด้วยกันไหม?</span></h2><p>เลือกจุดหมายที่ใช่ แล้วให้เราช่วยวางแผนทริปของคุณ</p></div><ContactButton>สอบถามโปรแกรมทัวร์</ContactButton></div>
          <div className="footer-grid">
            <div className="footer-identity"><Link href="#home" className="footer-logo" aria-label="JIULANFENGS หน้าแรก"><Image src="/logo/logo.jpeg" width={48} height={48} alt="" /><span>JIULANFENGS<small>CHINA TRAVEL</small></span></Link><p>ค้นพบเสน่ห์ของจีน ฮ่องกง และไต้หวัน<br />ผ่านการเดินทางที่น่าจดจำ</p><span className="footer-signature">Explore more. Remember more.</span></div>
            <nav aria-label="เมนูส่วนท้าย" className="footer-links"><h3>ค้นพบการเดินทาง</h3><a href="#home">หน้าแรก</a><a href="#popular-tours">แพ็กเกจทัวร์ยอดนิยม</a><a href="#destinations" onClick={() => setSelected("all")}>เส้นทางท่องเที่ยว</a><a href="#faq">คำถามที่พบบ่อย</a></nav>
            <nav aria-label="จุดหมายทัวร์ส่วนท้าย" className="footer-links"><h3>จุดหมายยอดนิยม</h3><div className="footer-destinations">{destinations.map(city => <a key={city.id} href="#destinations" onClick={() => setSelected(city.id)}>{city.name}</a>)}</div></nav>
          </div>
          <div className="footer-legal"><span>© JIULANFENGS. All rights reserved.</span><a href="#home">กลับขึ้นด้านบน <span aria-hidden="true">↑</span></a></div>
        </div>
      </footer>
    </main>
  );
}
