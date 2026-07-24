import ManagementList from "@/components/platform/ManagementList";
export default function Page(){return <ManagementList title="Finans ve Cari" eyebrow="GELİR · GİDER · ÖDEME" rows={[
{name:"Günlük tahsilat",detail:"Kart + Nakit + Havale",status:"Tamamlandı",value:"₺18.450"},
{name:"Bekleyen müşteri borcu",detail:"27 açık cari kayıt",status:"Takip",value:"₺42.700"},
{name:"Aylık cihaz taksiti",detail:"Lazer cihazı ödeme planı",status:"Yaklaşıyor",value:"₺60.000"},
{name:"Personel primi",detail:"Bu ay hesaplanan toplam",status:"Taslak",value:"₺8.350"}]}/>;}