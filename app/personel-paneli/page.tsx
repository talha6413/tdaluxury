import type { Metadata } from "next"; import StaffPortal from "@/components/staff/StaffPortal";
export const metadata:Metadata={title:"Personel Paneli | TDA Luxury",robots:{index:false,follow:false}};
export default function Page(){return <StaffPortal/>}
