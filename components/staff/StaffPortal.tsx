"use client";
import { CheckCircle2, Clock3, Camera, Wallet, CalendarDays } from "lucide-react";
import PlatformShell from "@/components/platform/PlatformShell";
import styles from "./StaffPortal.module.css";
const jobs=[["10:00","Ayşe Yılmaz","Lazer Epilasyon","Oda 1"],["11:30","Elif Kaya","VIP Cilt Bakımı","Oda 3"],["14:00","Merve Aydın","İpek Kirpik","Oda 5"]];
export default function StaffPortal(){return <PlatformShell title="Personel Paneli" eyebrow="BUGÜNKÜ PROGRAM">
<div className={styles.cards}><article><CalendarDays/><span>Bugünkü işlem</span><b>7</b></article><article><Wallet/><span>Bu ay prim</span><b>₺4.850</b></article><article><Clock3/><span>Toplam süre</span><b>6 sa 20 dk</b></article></div>
<div className={styles.list}>{jobs.map(j=><article key={j[0]}><time>{j[0]}</time><div><b>{j[1]}</b><span>{j[2]} · {j[3]}</span></div><button><Camera size={17}/> Fotoğraf</button><button className={styles.done}><CheckCircle2 size={17}/> Tamamla</button></article>)}</div>
</PlatformShell>}
