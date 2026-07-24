import ManagementList from "@/components/platform/ManagementList";
export default function Page(){return <ManagementList title="Müşteri Yönetimi" eyebrow="CRM" rows={[
{name:"Ayşe Yılmaz",detail:"Lazer epilasyon · Son ziyaret bugün",status:"Aktif",value:"6 seans"},
{name:"Elif Kaya",detail:"Cilt bakımı · 12 gün önce",status:"Takip",value:"₺1.250"},
{name:"Zeynep Demir",detail:"Kalıcı makyaj · 45 gün önce",status:"Aranacak",value:"2 belge"},
{name:"Merve Aydın",detail:"İpek kirpik · 3 gün önce",status:"Aktif",value:"340 puan"}]}/>;}