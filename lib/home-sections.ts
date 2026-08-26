import { createClient } from "@supabase/supabase-js";
export type HomeSection={id?:string;section_key:string;eyebrow:string;title:string;description:string;button_text:string;button_url:string;secondary_button_text:string;secondary_button_url:string;image_url:string;image_position:string;visible:boolean;sort_order:number;settings:Record<string,unknown>};
const fallback:HomeSection[]=[
{section_key:"hero",eyebrow:"UŞAK’IN PREMIUM GÜZELLİK DENEYİMİ",title:"Güzelliğinize Değer, Kendinize Zaman Ayırın",description:"Lazer epilasyon, kişiye özel cilt bakımı ve kalıcı makyaj uygulamalarında kontrollü, konforlu ve premium bir salon deneyimi.",button_text:"ONLINE RANDEVU",button_url:"/randevu",secondary_button_text:"WHATSAPP",secondary_button_url:"whatsapp",image_url:"/images/real/salon-03.webp",image_position:"center center",visible:true,sort_order:10,settings:{title_highlight:"Kendinize Zaman Ayırın",trust_title:"Size özel bakım planı, net iletişim",trust_description:"İlk görüşmeden uygulama sonrasına kadar süreç, ihtiyacınız ve beklentiniz dikkate alınarak planlanır.",trust_items:["Kişiye özel planlama","Hijyen ve mahremiyet odağı","Modern cihaz ve uygulamalar"],trust_bottom:"Şeffaf bilgilendirme ve gerçekçi beklenti"}},
...["stats","services","results","google_trust","about","consultation","instagram"].map((k,i)=>({section_key:k,eyebrow:"",title:k,description:"",button_text:"",button_url:"",secondary_button_text:"",secondary_button_url:"",image_url:"",image_position:"center center",visible:true,sort_order:(i+2)*10,settings:{}}))
];
export async function getHomeSections():Promise<HomeSection[]>{
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key)return fallback;
 const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await client.from("site_sections").select("*").eq("page_key","home").order("sort_order",{ascending:true});
 return error||!data?.length?fallback:data as HomeSection[];
}
