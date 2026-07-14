import { MessageCircle } from "lucide-react";
import { waUrl } from "@/lib/site";
export default function FloatingWhatsApp(){return <a className="floating-wa" href={waUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle/></a>}
