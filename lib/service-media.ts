export function getServiceImage(slug: string): string {
  const map: Record<string, string> = {
    "/lazer-epilasyon": "/images/real/salon-03.webp",
    "/lazer-epilasyon/kadin-lazer-epilasyon": "/images/real/salon-04.webp",
    "/lazer-epilasyon/erkek-lazer-epilasyon": "/images/real/salon-03.webp",
    "/lazer-epilasyon/yuz-lazer-epilasyon": "/images/real/salon-05.webp",
    "/lazer-epilasyon/tum-vucut-lazer-epilasyon": "/images/real/salon-04.webp",
    "/igneli-epilasyon": "/images/real/salon-05.webp",
    "/cilt-bakimi": "/images/real/salon-06.webp",
    "/cilt-bakimi/hydrafacial": "/images/real/salon-05.webp",
    "/cilt-bakimi/erkek-cilt-bakimi": "/images/real/salon-03.webp",
    "/cilt-bakimi/akne-bakimi": "/images/real/salon-06.webp",
    "/cilt-bakimi/leke-bakimi": "/images/real/salon-05.webp",
    "/cilt-bakimi/anti-aging": "/images/real/salon-06.webp",
    "/cilt-bakimi/cilt-analizi": "/images/real/salon-05.webp",
    "/bolgesel-incelme": "/images/real/salon-04.webp",
    "/bolgesel-incelme/g5-masaji": "/images/real/salon-03.webp",
    "/bolgesel-incelme/lenf-drenaj": "/images/real/salon-04.webp",
    "/kalici-makyaj/dudak-renklendirme": "/images/real/dudak-oncesi-sonrasi.webp",
  };

  if (map[slug]) return map[slug];
  if (slug.includes("kalici-makyaj")) return "/images/real/dudak-oncesi-sonrasi.webp";
  if (slug.includes("kas-kirpik")) return "/images/real/salon-05.webp";
  if (slug.includes("tirnak")) return "/images/real/salon-06.webp";
  if (slug.includes("bolgesel-incelme")) return "/images/real/salon-04.webp";
  return "/images/real/salon-03.webp";
}
