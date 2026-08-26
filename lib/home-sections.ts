import { createClient } from "@supabase/supabase-js";

export type HomeSection = {
  id?: string;
  section_key: string;
  eyebrow: string;
  title: string;
  description: string;
  button_text: string;
  button_url: string;
  secondary_button_text: string;
  secondary_button_url: string;
  image_url: string;
  image_position: string;
  visible: boolean;
  sort_order: number;
  settings: Record<string, unknown>;
};

const emptySection = (
  section_key: string,
  sort_order: number,
  title = section_key
): HomeSection => ({
  section_key,
  eyebrow: "",
  title,
  description: "",
  button_text: "",
  button_url: "",
  secondary_button_text: "",
  secondary_button_url: "",
  image_url: "",
  image_position: "center center",
  visible: true,
  sort_order,
  settings: {},
});

const fallback: HomeSection[] = [
  {
    section_key: "hero",
    eyebrow: "UŞAK’IN PREMIUM GÜZELLİK DENEYİMİ",
    title: "TDA Luxury Uşak: Güzellik ve Bakım Deneyimi",
    description:
      "Lazer epilasyon, kişiye özel cilt bakımı ve kalıcı makyaj uygulamalarında kontrollü, konforlu ve premium bir salon deneyimi.",
    button_text: "ONLINE RANDEVU",
    button_url: "/randevu",
    secondary_button_text: "WHATSAPP",
    secondary_button_url: "whatsapp",
    image_url: "/images/real/salon-03.webp",
    image_position: "center center",
    visible: true,
    sort_order: 10,
    settings: {
      title_highlight: "Güzellik ve Bakım Deneyimi",
      trust_title: "Size özel bakım planı, net iletişim",
      trust_description:
        "İlk görüşmeden uygulama sonrasına kadar süreç, ihtiyacınız ve beklentiniz dikkate alınarak planlanır.",
      trust_items: [
        "Kişiye özel planlama",
        "Hijyen ve mahremiyet odağı",
        "Modern cihaz ve uygulamalar",
      ],
      trust_bottom: "Şeffaf bilgilendirme ve gerçekçi beklenti",
    },
  },
  emptySection("stats", 20, "İstatistikler"),
  {
    ...emptySection(
      "services",
      30,
      "Uşak'ta Öne Çıkan Güzellik Hizmetlerimiz"
    ),
    eyebrow: "HİZMETLERİMİZ",
    description:
      "Lazer epilasyon, cilt bakımı ve kalıcı makyaj hizmetlerimizi inceleyin; ihtiyacınıza uygun uygulama için detaylı bilgi alın.",
  },
  emptySection("results", 40, "Öncesi / Sonrası"),
  emptySection("google_trust", 50, "Google Güven"),
  emptySection("about", 60, "Hakkımızda"),
  emptySection("consultation", 70, "Danışmanlık"),
  emptySection("instagram", 80, "Instagram"),
];

export async function getHomeSections(): Promise<HomeSection[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return fallback;

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client
    .from("site_sections")
    .select("*")
    .eq("page_key", "home")
    .order("sort_order", { ascending: true });

  return error || !data?.length ? fallback : (data as HomeSection[]);
}
