import type { Metadata } from "next";
import Dashboard from "@/components/platform/Dashboard";
export const metadata: Metadata = { title:"TDA Luxury Yönetim Merkezi", robots:{index:false,follow:false} };
export default function Page(){ return <Dashboard/>; }
