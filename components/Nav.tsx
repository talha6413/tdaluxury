"use client";

import Link from "next/link";
import { CalendarDays, ChevronDown, Menu, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["ANA SAYFA", "/"],
  ["HAKKIMIZDA", "/hakkimizda"],
  ["HİZMETLERİMİZ", "/hizmetler"],
  ["ÖNCESİ SONRASI", "/sonuclar"],
  ["BLOG", "/blog"],
  ["İLETİŞİM", "/iletisim"],
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`stage15-nav ${compact ? "is-compact" : ""} ${open ? "is-open" : ""}`}>
      <div className="container stage15-nav-inner">
        <Link href="/" className="stage15-logo" aria-label="TDA Luxury ana sayfa">
          <span className="stage15-logo-main">TDA</span>
          <span className="stage15-logo-mid">LUXURY</span>
          <span className="stage15-logo-sub">GÜZELLİK SALONU</span>
        </Link>

        <nav className="stage15-nav-links" aria-label="Ana menü">
          {links.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={active ? "active" : ""}>
                {label}
                {label === "HİZMETLERİMİZ" ? <ChevronDown size={14} /> : null}
              </Link>
            );
          })}
        </nav>

        <Link href="/musteri-paneli" className="stage15-nav-account" aria-label="Müşteri paneli" title="Müşteri Paneli">
          <UserRound size={18} />
        </Link>
        <Link href="/randevu" className="stage15-nav-cta" data-conversion-event="appointment_click" data-conversion-source="desktop_nav">
          <CalendarDays size={18} /> RANDEVU AL
        </Link>

        <button type="button" className="stage15-mobile-menu" onClick={() => setOpen((v) => !v)} aria-label="Menü" aria-expanded={open} aria-controls="stage15-mobile-navigation">
          {open ? <X size={29} /> : <Menu size={29} />}
        </button>
      </div>
      {open ? (
        <nav id="stage15-mobile-navigation" className="stage15-mobile-nav" aria-label="Mobil menü">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href="/musteri-paneli" onClick={() => setOpen(false)}>MÜŞTERİ GİRİŞİ</Link>
          <Link href="/randevu" onClick={() => setOpen(false)} data-conversion-event="appointment_click" data-conversion-source="mobile_nav">RANDEVU AL</Link>
        </nav>
      ) : null}
    </header>
  );
}
