import ManagementList from "@/components/platform/ManagementList";
export default function Page(){return <ManagementList title="Stok Yönetimi" eyebrow="ÜRÜN · BARKOD · ALARM" rows={[
{name:"Hydrafacial solüsyonu",detail:"Depo A · Son kullanım 2027",status:"Yeterli",value:"18 adet"},
{name:"Lazer jel 5L",detail:"Depo B",status:"Kritik",value:"2 adet"},
{name:"Microblading pigment",detail:"Kahve ton 03",status:"Yeterli",value:"11 adet"},
{name:"İpek kirpik C kıvrım",detail:"0.07 mm",status:"Sipariş",value:"1 kutu"}]}/>;}