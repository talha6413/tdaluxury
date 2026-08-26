"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, GripVertical, ImageIcon, RefreshCw, Save } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type SectionRow = {
  id:string; page_key:string; section_key:string; eyebrow:string; title:string; description:string;
  button_text:string; button_url:string; secondary_button_text:string; secondary_button_url:string;
  image_url:string; image_position:string; visible:boolean; sort_order:number; settings:Record<string,unknown>;
};

const labels:Record<string,string> = {
  hero:"Hero / Üst Karşılama", stats:"İstatistikler", services:"Hizmetler", results:"Öncesi / Sonrası",
  google_trust:"Google Güven", about:"Hakkımızda", consultation:"Danışmanlık CTA", instagram:"Instagram"
};

export default function HomePageManagementPanel() {
  const supabase = getSupabaseBrowserClient();
  const [sections,setSections] = useState<SectionRow[]>([]);
  const [selectedKey,setSelectedKey] = useState("hero");
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState("");

  async function load() {
    if (!supabase) return;
    setBusy(true);
    const {data,error}=await supabase.from("site_sections").select("*").eq("page_key","home").order("sort_order",{ascending:true});
    if (error) setMessage(error.message); else setSections((data??[]) as SectionRow[]);
    setBusy(false);
  }
  useEffect(()=>{ void load(); },[]);
  const selected = useMemo(()=>sections.find(x=>x.section_key===selectedKey) ?? sections[0],[sections,selectedKey]);

  function updateLocal(key:string,value:unknown){
    if(!selected)return;
    setSections(cur=>cur.map(x=>x.id===selected.id?{...x,[key]:value}:x));
  }
  function updateSetting(key:string,value:unknown){
    if(!selected)return;
    setSections(cur=>cur.map(x=>x.id===selected.id?{...x,settings:{...(x.settings??{}),[key]:value}}:x));
  }

  async function saveSelected(e?:FormEvent){
    e?.preventDefault(); if(!supabase||!selected)return;
    setBusy(true); setMessage("");
    const payload = {
      eyebrow:selected.eyebrow,title:selected.title,description:selected.description,
      button_text:selected.button_text,button_url:selected.button_url,
      secondary_button_text:selected.secondary_button_text,secondary_button_url:selected.secondary_button_url,
      image_url:selected.image_url,image_position:selected.image_position,visible:selected.visible,
      sort_order:selected.sort_order,settings:selected.settings??{},updated_at:new Date().toISOString()
    };
    const {error}=await supabase.from("site_sections").update(payload).eq("id",selected.id);
    setMessage(error?`Kaydedilemedi: ${error.message}`:`${labels[selected.section_key]??selected.title} kaydedildi.`);
    setBusy(false);
  }

  async function quickUpdate(id:string,patch:Partial<SectionRow>){
    if(!supabase)return;
    setSections(cur=>cur.map(x=>x.id===id?{...x,...patch}:x));
    const {error}=await supabase.from("site_sections").update({...patch,updated_at:new Date().toISOString()}).eq("id",id);
    if(error){ setMessage(error.message); await load(); }
  }

  async function uploadHeroImage(file:File){
    if(!supabase||!selected)return;
    setBusy(true);
    const ext=file.name.split(".").pop()?.toLowerCase()||"webp";
    const safe=file.name.replace(/\.[^.]+$/,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
    const path=`site/home-${Date.now()}-${safe}.${ext}`;
    const {error}=await supabase.storage.from("tda-media").upload(path,file,{cacheControl:"3600"});
    if(error) setMessage(`Görsel yüklenemedi: ${error.message}`);
    else { const {data}=supabase.storage.from("tda-media").getPublicUrl(path); updateLocal("image_url",data.publicUrl); setMessage("Görsel yüklendi. Kaydet butonuna basın."); }
    setBusy(false);
  }

  const field=(key:keyof SectionRow,label:string,placeholder="")=>(
    <label className="admin-field"><span>{label}</span><input value={String(selected?.[key]??"")} placeholder={placeholder} onChange={e=>updateLocal(key,e.target.value)}/></label>
  );

  return <div className="admin-home-management">
    <header className="admin-header"><div><span>ANA SAYFA YÖNETİMİ</span><h1>Ana Sayfanın Tam Kontrolü</h1><p>Bölümleri açıp kapatın, sıralarını değiştirin ve Hero alanını kod açmadan yönetin.</p></div>
      <button className="admin-secondary-button" onClick={()=>void load()} disabled={busy}><RefreshCw size={17}/> Yenile</button></header>
    {message?<div className="admin-message">{message}</div>:null}
    <div className="admin-home-layout">
      <aside className="admin-settings-card admin-home-sections">
        <div className="admin-settings-card-head"><div><span>BÖLÜMLER</span><h2>Sıra ve Görünürlük</h2></div></div>
        <div className="admin-home-section-list">{sections.map(section=><button type="button" key={section.id} className={`admin-home-section-item ${selected?.id===section.id?"active":""}`} onClick={()=>setSelectedKey(section.section_key)}>
          <GripVertical size={16}/><span className="admin-home-section-name"><b>{labels[section.section_key]??section.title}</b><small>Sıra: {section.sort_order}</small></span>
          <span className={`admin-home-visibility ${section.visible?"on":"off"}`} onClick={e=>{e.stopPropagation();void quickUpdate(section.id,{visible:!section.visible});}}>{section.visible?<Eye size={15}/>:<EyeOff size={15}/>}</span>
        </button>)}</div>
      </aside>

      {selected?<form onSubmit={saveSelected} className="admin-settings-card admin-home-editor">
        <div className="admin-settings-card-head"><div><span>DÜZENLE</span><h2>{labels[selected.section_key]??selected.title}</h2><p>Kaydettikten sonra canlı siteye yansır.</p></div></div>
        <div className="admin-form-grid">
          <label className="admin-field"><span>Sıra</span><input type="number" value={selected.sort_order} onChange={e=>updateLocal("sort_order",Number(e.target.value))}/></label>
          <label className="admin-check"><input type="checkbox" checked={selected.visible} onChange={e=>updateLocal("visible",e.target.checked)}/><span>Bölüm aktif</span></label>
        </div>

        {selected.section_key==="hero"?<>
          <div className="admin-form-grid">{field("eyebrow","Üst küçük başlık")}{field("title","Ana başlık")}</div>
          <label className="admin-field"><span>Açıklama</span><textarea rows={4} value={selected.description??""} onChange={e=>updateLocal("description",e.target.value)}/></label>
          <div className="admin-form-grid">{field("button_text","Birincil buton metni")}{field("button_url","Birincil buton bağlantısı")}{field("secondary_button_text","İkincil buton metni")}{field("secondary_button_url","İkincil buton bağlantısı")}</div>
          <div className="admin-form-grid">{field("image_url","Arka plan görsel URL")}{field("image_position","Görsel pozisyonu","center center")}</div>
          <label className="admin-upload-box"><ImageIcon size={24}/><span><b>Hero görseli yükle</b><small>JPG, PNG veya WebP</small></span><input type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&void uploadHeroImage(e.target.files[0])}/></label>
          <div className="admin-settings-card admin-home-trust-card">
            <div className="admin-settings-card-head"><div><span>GÜVEN KARTI</span><h2>Hero Sağ Kart</h2></div></div>
            <div className="admin-form-grid">
              <label className="admin-field"><span>Kart başlığı</span><input value={String(selected.settings?.trust_title??"")} onChange={e=>updateSetting("trust_title",e.target.value)}/></label>
              <label className="admin-field"><span>Vurgulu başlık</span><input value={String(selected.settings?.title_highlight??"")} onChange={e=>updateSetting("title_highlight",e.target.value)}/></label>
            </div>
            <label className="admin-field"><span>Kart açıklaması</span><textarea rows={3} value={String(selected.settings?.trust_description??"")} onChange={e=>updateSetting("trust_description",e.target.value)}/></label>
            <label className="admin-field"><span>Alt güven mesajı</span><input value={String(selected.settings?.trust_bottom??"")} onChange={e=>updateSetting("trust_bottom",e.target.value)}/></label>
          </div>
        </>:<>
          <div className="admin-form-grid">{field("title","Bölüm adı")}{field("eyebrow","Küçük başlık")}</div>
          <label className="admin-field"><span>Yönetim notu / açıklama</span><textarea rows={3} value={selected.description??""} onChange={e=>updateLocal("description",e.target.value)}/></label>
        </>}

        <div className="admin-settings-actions"><a href="/" target="_blank" rel="noreferrer" className="admin-secondary-button">Canlı Sayfayı Aç</a><button type="submit" className="admin-primary-button" disabled={busy}><Save size={17}/>{busy?"Kaydediliyor…":"Değişiklikleri Kaydet"}</button></div>
      </form>:null}
    </div>
  </div>;
}
