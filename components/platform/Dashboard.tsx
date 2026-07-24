"use client";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, CircleDollarSign, Gift, MessageCircle, Star, UserPlus, Users } from "lucide-react";
import PlatformShell from "./PlatformShell";
import styles from "./Dashboard.module.css";

const stats = [
  ["Bugünkü Ciro","₺18.450","+12%",<CircleDollarSign key="a"/>],
  ["Bugünkü Randevu","17","4 boş saat",<CalendarClock key="b"/>],
  ["Aktif Müşteri","842","+19 bu ay",<Users key="c"/>],
  ["Yeni Müşteri","28","+8%",<UserPlus key="d"/>],
];
const alerts = [
  "Bugün 4 boş randevu saati bulunuyor.",
  "Lazer paket satışları son 7 günde %9 azaldı.",
  "5 müşteri 60 gündür işlem yaptırmadı.",
  "Bugün 3 müşterinin doğum günü.",
];
export default function Dashboard(){
  return <PlatformShell title="İşletme Kontrol Merkezi">
    <section className={styles.stats}>{stats.map(([a,b,c,d])=><article key={String(a)}><div>{d}<span>{c}</span></div><small>{a}</small><strong>{b}</strong></article>)}</section>
    <section className={styles.grid}>
      <article className={styles.large}><header><div><span>AI YÖNETİCİ ÖZETİ</span><h2>Bugün dikkat edilmesi gerekenler</h2></div><Star/></header>{alerts.map((x,i)=><p key={x}><b>0{i+1}</b>{x}</p>)}</article>
      <article className={styles.quick}><span>HIZLI İŞLEMLER</span>
        <Link href="/yonetim-v2/randevular">Randevu oluştur <ArrowUpRight/></Link>
        <Link href="/yonetim-v2/musteriler">Müşteri ekle <ArrowUpRight/></Link>
        <Link href="/dijital-onam">Onam formu aç <ArrowUpRight/></Link>
        <Link href="/musteri-paneli">Müşteri paneli <ArrowUpRight/></Link>
      </article>
    </section>
    <section className={styles.bottom}>
      <article><MessageCircle/><div><b>WhatsApp Otomasyonu</b><span>API anahtarı girildiğinde aktifleşir.</span></div></article>
      <article><Gift/><div><b>Sadakat Sistemi</b><span>Puan, kupon ve referans altyapısı hazır.</span></div></article>
    </section>
  </PlatformShell>
}
