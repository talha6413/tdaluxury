"use client";
import { Search, Plus, Download, Filter } from "lucide-react";
import PlatformShell from "./PlatformShell";
import styles from "./ManagementList.module.css";

type Row={name:string; detail:string; status:string; value:string};
export default function ManagementList({title,eyebrow,rows}:{title:string;eyebrow:string;rows:Row[]}){
 return <PlatformShell title={title} eyebrow={eyebrow}>
  <div className={styles.toolbar}><label><Search size={17}/><input placeholder="Ara..."/></label><button><Filter size={17}/> Filtre</button><button><Download size={17}/> Dışa aktar</button><button className={styles.primary}><Plus size={17}/> Yeni kayıt</button></div>
  <div className={styles.table}>
   <div className={styles.head}><span>Kayıt</span><span>Detay</span><span>Durum</span><span>Tutar / Bilgi</span></div>
   {rows.map(r=><div className={styles.row} key={r.name}><b>{r.name}</b><span>{r.detail}</span><i>{r.status}</i><strong>{r.value}</strong></div>)}
  </div>
 </PlatformShell>
}
