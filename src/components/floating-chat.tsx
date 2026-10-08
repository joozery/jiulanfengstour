"use client";

import { Dialog, Tooltip } from "radix-ui";
import { contactChannels } from "@/data/contact";

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 3 4 1 1 5-3 2a16 16 0 0 0 6 6l2-3 5 1 1 4c0 2-2 3-4 2A23 23 0 0 1 3 7c-1-2 0-4 2-4Z" /></svg>;
}

export function FloatingChat() {
  const channels = [
    { label: "โทรศัพท์", href: contactChannels.phone ? `tel:${contactChannels.phone.replace(/[^+\d]/g, "")}` : "", className: "contact-rail-phone", icon: <PhoneIcon />, external: false },
    { label: "LINE", href: contactChannels.line, className: "contact-rail-line", icon: <span className="contact-rail-logo contact-rail-line-logo" aria-hidden="true" />, external: true },
    { label: "Facebook / Messenger", href: contactChannels.facebook, className: "contact-rail-messenger", icon: <span className="contact-rail-logo contact-rail-messenger-logo" aria-hidden="true" />, external: true },
  ];
  return <Tooltip.Provider delayDuration={200}><nav className="contact-rail" aria-label="ช่องทางติดต่อด่วน">{channels.map(channel => <Tooltip.Root key={channel.label}>
    {channel.href ? <Tooltip.Trigger asChild><a href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined} className={`contact-rail-button ${channel.className}`} aria-label={channel.label}>{channel.icon}</a></Tooltip.Trigger> : <Dialog.Root><Tooltip.Trigger asChild><Dialog.Trigger className={`contact-rail-button ${channel.className}`} aria-label={channel.label}>{channel.icon}</Dialog.Trigger></Tooltip.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content"><p className="eyebrow">CONTACT US</p><Dialog.Title className="text-xl font-semibold">ติดต่อผ่าน {channel.label}</Dialog.Title><Dialog.Description className="mt-3 text-sm leading-7 text-stone-600">ช่องทางนี้กำลังเตรียมพร้อม กรุณากลับมาติดต่ออีกครั้งเมื่อเปิดให้บริการ</Dialog.Description><Dialog.Close className="gold-button mt-5">รับทราบ</Dialog.Close><Dialog.Close aria-label="ปิดหน้าต่างติดต่อ" className="dialog-x">×</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>}
    <Tooltip.Portal><Tooltip.Content className="contact-rail-tooltip" side="left" sideOffset={10} collisionPadding={12}>{channel.label}</Tooltip.Content></Tooltip.Portal>
  </Tooltip.Root>)}</nav></Tooltip.Provider>;
}
