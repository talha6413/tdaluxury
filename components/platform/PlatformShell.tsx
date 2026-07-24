"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  ArrowLeft, Bell, CalendarDays, ClipboardCheck, CreditCard,
  FileSignature, Gift, LayoutDashboard, Package, ShieldCheck,
  Sparkles, Users, Warehouse
} from "lucide-react";
import styles from "./PlatformShell.module.css";

type Item = { href: string; label: string; icon: ReactNode };

const items: Item[] = [
  { href: "/yonetim-v2", label: "Kontrol Merkezi", icon: <LayoutDashboard size={18} /> },
  { href: "/yonetim-v2/musteriler", label: "CRM", icon: <Users size={18} /> },
  { href: "/yonetim-v2/randevular", label: "Randevular", icon: <CalendarDays size={18} /> },
  { href: "/yonetim-v2/finans", label: "Finans", icon: <CreditCard size={18} /> },
  { href: "/yonetim-v2/stok", label: "Stok", icon: <Warehouse size={18} /> },
  { href: "/dijital-onam", label: "Dijital Onam", icon: <FileSignature size={18} /> },
  { href: "/personel-paneli", label: "Personel", icon: <ClipboardCheck size={18} /> },
  { href: "/ai-cilt-analizi", label: "AI Analiz", icon: <Sparkles size={18} /> },
];

export default function PlatformShell({
  title,
  eyebrow = "TDA LUXURY OPERATIONS",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <b>TDA</b><span>LUXURY</span><small>YÖNETİM PLATFORMU</small>
        </Link>
        <nav>
          {items.map((item) => (
            <Link key={item.href} href={item.href}>{item.icon}<span>{item.label}</span></Link>
          ))}
        </nav>
        <div className={styles.security}><ShieldCheck size={18}/><span>Güvenli oturum altyapısı hazır</span></div>
        <Link href="/" className={styles.back}><ArrowLeft size={16}/> Siteye dön</Link>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div><span>{eyebrow}</span><h1>{title}</h1></div>
          <button aria-label="Bildirimler"><Bell size={20}/><i>3</i></button>
        </header>
        {children}
      </section>
    </main>
  );
}
