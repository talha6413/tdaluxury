import type {Metadata} from "next";import SkinAnalysis from "@/components/ai/SkinAnalysis";
export const metadata:Metadata={title:"AI Cilt Analizi | TDA Luxury",description:"TDA Luxury yapay zekâ destekli cilt ön değerlendirme ekranı."};
export default function Page(){return <SkinAnalysis/>}
