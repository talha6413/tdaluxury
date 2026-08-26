"use client";
import Image from "next/image"; import Link from "next/link";
import {ArrowRight,CalendarDays,CheckCircle2,MapPin,MessageCircle,Phone,ShieldCheck,Sparkles} from "lucide-react";
import {useSiteSettings,useWhatsAppUrl} from "@/components/SiteSettingsProvider";
import HeroVideoButton from "@/components/HeroVideoButton"; import type {HomeSection} from "@/lib/home-sections";

export default function Hero({section}:{section?:HomeSection}){
 const settings=useSiteSettings();
 const whatsappUrl=useWhatsAppUrl("Merhaba, TDA Luxury web siteniz üzerinden ulaşıyorum. Hizmetler ve uygun randevu saatleri hakkında bilgi almak istiyorum.");
 const title=section?.title||"Güzelliğinize Değer, Kendinize Zaman Ayırın";
 const highlight=String(section?.settings?.title_highlight||"Kendinize Zaman Ayırın");
 const firstPart=title.includes(highlight)?title.replace(highlight,"").replace(/,\s*$/,","):title;
 const trustItems=Array.isArray(section?.settings?.trust_items)?section!.settings.trust_items.map(String):["Kişiye özel planlama","Hijyen ve mahremiyet odağı","Modern cihaz ve uygulamalar"];
 const primaryHref=section?.button_url||"/randevu";
 const secondaryHref=section?.secondary_button_url==="whatsapp"?whatsappUrl:(section?.secondary_button_url||whatsappUrl);
 return <section className="v20-hero" aria-labelledby="hero-title">
  <Image src={section?.image_url||"/images/real/salon-03.webp"} alt="TDA Luxury Uşak güzellik salonu iç mekânı" fill priority fetchPriority="high" sizes="100vw" className="v20-hero-bg" style={{objectPosition:section?.image_position||"center center"}}/>
  <div className="v20-hero-overlay" aria-hidden="true"/><div className="v20-hero-glow v20-hero-glow-one" aria-hidden="true"/><div className="v20-hero-glow v20-hero-glow-two" aria-hidden="true"/>
  <div className="container v20-hero-inner"><div className="v20-hero-copy">
   <p className="v20-kicker">{section?.eyebrow||"UŞAK’IN PREMIUM GÜZELLİK DENEYİMİ"}</p>
   <h1 id="hero-title" className="v20-title">{firstPart}<span>{highlight}</span></h1>
   <p className="v20-lead">{section?.description||"Lazer epilasyon, kişiye özel cilt bakımı ve kalıcı makyaj uygulamalarında kontrollü, konforlu ve premium bir salon deneyimi."}</p>
   <div className="v20-actions">
    <Link href={primaryHref} className="v20-primary-btn" data-conversion-event="appointment_click" data-conversion-source="hero_primary"><CalendarDays size={20}/>{section?.button_text||"ONLINE RANDEVU"}<ArrowRight size={18}/></Link>
    <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className="v20-secondary-btn" data-conversion-source="hero_whatsapp"><MessageCircle size={20}/>{section?.secondary_button_text||"WHATSAPP"}</a>
    <HeroVideoButton/>
   </div>
   <div className="v20-quick-links" aria-label="Hızlı iletişim"><a href={`tel:+${settings.whatsappNumber}`}><Phone size={16}/>{settings.phoneDisplay}</a><a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>Uşak Merkez</a></div>
  </div>
  <aside className="v20-trust-card" aria-label="TDA Luxury hizmet yaklaşımı"><div className="v20-trust-icon"><Sparkles size={25}/></div><p className="v20-trust-kicker">TDA LUXURY</p><h2>{String(section?.settings?.trust_title||"Size özel bakım planı, net iletişim")}</h2><p className="v20-trust-copy">{String(section?.settings?.trust_description||"İlk görüşmeden uygulama sonrasına kadar süreç, ihtiyacınız ve beklentiniz dikkate alınarak planlanır.")}</p><div className="v20-trust-list">{trustItems.map(item=><div key={item}><CheckCircle2 size={18}/><span>{item}</span></div>)}</div><div className="v20-trust-bottom"><ShieldCheck size={20}/><span>{String(section?.settings?.trust_bottom||"Şeffaf bilgilendirme ve gerçekçi beklenti")}</span></div></aside>
  </div><div className="v20-scroll-cue" aria-hidden="true"><span/>HİZMETLERİMİZİ KEŞFEDİN</div>
 </section>;
}
