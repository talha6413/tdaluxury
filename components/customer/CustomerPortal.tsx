"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Camera,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  FileSignature,
  Gift,
  HeartHandshake,
  LockKeyhole,
  LogIn,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import styles from "./CustomerPortal.module.css";

type PortalModule = {
  title: string;
  description: string;
  icon: typeof CalendarDays;
  badge?: string;
};

const modules: PortalModule[] = [
  { title: "Randevularım", description: "Yaklaşan ve geçmiş randevularınızı görüntüleyin.", icon: CalendarDays, badge: "2 yaklaşan" },
  { title: "Paketlerim", description: "Aktif paketlerinizi ve kalan seanslarınızı takip edin.", icon: PackageCheck, badge: "8 seans" },
  { title: "Ödemelerim", description: "Borç, kapora ve ödeme hareketlerinizi inceleyin.", icon: WalletCards },
  { title: "Fotoğraflarım", description: "İşlem sürecindeki izinli fotoğraf arşivinize ulaşın.", icon: Camera },
  { title: "Belgelerim", description: "Onam formları, sözleşmeler ve KVKK kayıtları.", icon: FileSignature },
  { title: "Sadakat Puanım", description: "Puan, kupon ve size özel avantajları görün.", icon: Gift, badge: "1.250 puan" },
  { title: "Bildirimler", description: "Randevu, bakım ve kampanya hatırlatmaları.", icon: Bell, badge: "3 yeni" },
  { title: "Arkadaşını Davet Et", description: "Davet bağlantınızı paylaşın, avantaj kazanın.", icon: Users },
];

export default function CustomerPortal() {
  const [phone, setPhone] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const normalizedPhone = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (normalizedPhone.length < 10) {
      setMessage("Geçerli bir telefon numarası girin.");
      return;
    }
    setMessage("Doğrulama altyapısı Supabase bağlantısı tamamlandığında aktif olacaktır.");
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.glow} />
        <div className={styles.container}>
          <span className={styles.eyebrow}>TDA LUXURY ÖZEL DENEYİM</span>
          <h1>Güzellik Yolculuğunuz<br /><em>Tek Bir Panelde.</em></h1>
          <p>Randevularınızı, paketlerinizi, ödemelerinizi, fotoğraflarınızı ve belgelerinizi güvenli hesabınızdan takip edin.</p>
          <div className={styles.trustRow}>
            <span><ShieldCheck size={18} /> Kişisel ve güvenli</span>
            <span><Bell size={18} /> Akıllı hatırlatmalar</span>
            <span><HeartHandshake size={18} /> Size özel deneyim</span>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.portalGrid}`}>
        <aside className={styles.loginCard}>
          <div className={styles.loginIcon}><CircleUserRound size={30} /></div>
          <span className={styles.miniTitle}>MÜŞTERİ GİRİŞİ</span>
          <h2>Hesabınıza giriş yapın</h2>
          <p>Salonumuzda kayıtlı telefon numaranızla güvenli doğrulama başlatın.</p>

          <form onSubmit={handleLogin} className={styles.form}>
            <label htmlFor="customer-phone">Telefon numarası</label>
            <div className={styles.inputWrap}>
              <span>+90</span>
              <input
                id="customer-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="5XX XXX XX XX"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <label className={styles.remember}>
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
              <span>Beni bu cihazda hatırla</span>
            </label>
            <button type="submit"><LogIn size={18} /> Doğrulama Kodu Gönder</button>
            {message ? <div className={styles.message} role="status">{message}</div> : null}
          </form>

          <div className={styles.security}><LockKeyhole size={17} /> Bilgileriniz yalnızca hesabınızı doğrulamak için kullanılır.</div>
          <Link href="/iletisim" className={styles.help}>Giriş konusunda destek alın <ChevronRight size={16} /></Link>
        </aside>

        <div className={styles.modulesArea}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.miniTitle}>HESABINIZDA NELER VAR?</span>
              <h2>Her şey elinizin altında</h2>
            </div>
            <Link href="/randevu">Yeni randevu al <CalendarDays size={17} /></Link>
          </div>

          <div className={styles.moduleGrid}>
            {modules.map(({ title, description, icon: Icon, badge }) => (
              <article className={styles.moduleCard} key={title}>
                <div className={styles.moduleTop}>
                  <span className={styles.moduleIcon}><Icon size={22} /></span>
                  {badge ? <small>{badge}</small> : null}
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={styles.disabledLink}>Giriş yaptıktan sonra görüntüleyin <ChevronRight size={15} /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.container}>
          <div className={styles.experienceIntro}>
            <span className={styles.miniTitle}>TDA LUXURY AYRICALIĞI</span>
            <h2>Sadece randevu değil,<br />kişisel bakım deneyimi.</h2>
          </div>
          <div className={styles.experienceCards}>
            <article><Sparkles /><h3>Kişiye Özel Plan</h3><p>İşlem geçmişiniz ve ihtiyaçlarınız tek profilde düzenli tutulur.</p></article>
            <article><CreditCard /><h3>Şeffaf Takip</h3><p>Paket, kalan seans, kapora ve ödeme bilgilerinizi net şekilde görün.</p></article>
            <article><ShieldCheck /><h3>Gizlilik Odaklı</h3><p>Fotoğraf ve belgeler yalnızca yetkilendirilmiş hesaplardan erişilebilir.</p></article>
          </div>
        </div>
      </section>
    </div>
  );
}
