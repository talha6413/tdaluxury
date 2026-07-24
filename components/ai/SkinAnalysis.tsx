"use client";
import { ChangeEvent, useState } from "react";
import { Camera, ShieldCheck, Sparkles, Upload } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./SkinAnalysis.module.css";
export default function SkinAnalysis(){
 const [name,setName]=useState("");
 function pick(e:ChangeEvent<HTMLInputElement>){setName(e.target.files?.[0]?.name||"")}
 return <><Nav/><main className={styles.page}><section><span>YAPAY ZEKÂ DESTEKLİ ÖN DEĞERLENDİRME</span><h1>Cildinizi daha yakından tanıyın.</h1><p>Fotoğrafınızı yükleyin; gözenek, nem, yağlanma, ton eşitsizliği ve bakım ihtiyacına yönelik ön değerlendirme akışı başlasın.</p>
 <label className={styles.upload}><input type="file" accept="image/*" capture="user" onChange={pick}/><Camera size={40}/><b>{name||"Fotoğraf çek veya yükle"}</b><small>JPG, PNG · Doğal ışıkta, filtresiz fotoğraf</small><em><Upload size={16}/> Dosya seç</em></label>
 <div className={styles.notice}><ShieldCheck/><span>Fotoğraf işleme servisi bağlanmadan dosya sunucuya gönderilmez. Bu ekran tıbbi tanı koymaz; uzman görüşmesinin yerini tutmaz.</span></div>
 <button disabled={!name}><Sparkles/> Analizi başlat</button>
 </section></main><Footer/></>
}
