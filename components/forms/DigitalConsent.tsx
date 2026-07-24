"use client";
import { FormEvent, useState } from "react";
import { CheckCircle2, Eraser, FileSignature, ShieldCheck } from "lucide-react";
import PlatformShell from "@/components/platform/PlatformShell";
import styles from "./DigitalConsent.module.css";
export default function DigitalConsent(){
 const [saved,setSaved]=useState(false);
 function submit(e:FormEvent){e.preventDefault();setSaved(true)}
 return <PlatformShell title="Dijital Onam Formu" eyebrow="KVKK · ELEKTRONİK İMZA">
 <form className={styles.form} onSubmit={submit}>
  <div className={styles.grid}><label>Ad Soyad<input required placeholder="Müşteri adı"/></label><label>Telefon<input required placeholder="05xx xxx xx xx"/></label><label>İşlem<select><option>Lazer Epilasyon</option><option>Cilt Bakımı</option><option>Kalıcı Makyaj</option></select></label><label>Doğum Tarihi<input type="date"/></label></div>
  <label>Sağlık notları<textarea placeholder="Alerji, ilaç, gebelik durumu ve önemli bilgiler"/></label>
  <div className={styles.notice}><ShieldCheck/><p>Form; aydınlatma, açık rıza ve işleme özel onam metinlerinin dijital kaydını oluşturmak üzere tasarlanmıştır. Canlı kullanımdan önce işletmenizin hukuk danışmanına kontrol ettirin.</p></div>
  <label className={styles.check}><input required type="checkbox"/> Bilgilendirme ve onam metnini okudum, kabul ediyorum.</label>
  <div className={styles.signature}><span><FileSignature/> Müşteri imzası</span><p>Bu alanda parmak veya fare ile imza bileşeni entegrasyonu için yer ayrılmıştır.</p><button type="button"><Eraser size={16}/> Temizle</button></div>
  <button className={styles.submit}>{saved?<><CheckCircle2/> Kayıt hazır</>:<>Formu kaydet</>}</button>
 </form></PlatformShell>
}
