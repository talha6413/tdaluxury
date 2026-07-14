export function getServiceImage(slug: string): string {
  const map: Record<string, string> = {
    "/lazer-epilasyon": "lazer-epilasyon.webp",
    "/lazer-epilasyon/kadin-lazer-epilasyon": "kadin-lazer.webp",
    "/lazer-epilasyon/erkek-lazer-epilasyon": "erkek-lazer.webp",
    "/lazer-epilasyon/yuz-lazer-epilasyon": "yuz-lazer.webp",
    "/lazer-epilasyon/tum-vucut-lazer-epilasyon": "tum-vucut-lazer.webp",
    "/igneli-epilasyon": "igneli-epilasyon.webp",
    "/cilt-bakimi": "cilt-bakimi.webp",
    "/cilt-bakimi/hydrafacial": "hydrafacial.webp",
    "/cilt-bakimi/erkek-cilt-bakimi": "erkek-cilt-bakimi.webp",
    "/cilt-bakimi/akne-bakimi": "akne-bakimi.webp",
    "/cilt-bakimi/leke-bakimi": "leke-bakimi.webp",
    "/cilt-bakimi/anti-aging": "anti-aging.webp",
    "/cilt-bakimi/cilt-analizi": "cilt-analizi.webp",
    "/bolgesel-incelme": "bolgesel-incelme.webp",
    "/bolgesel-incelme/g5-masaji": "g5-masaji.webp",
    "/kas-kirpik/kirpik-lifting": "kirpik-lifting.webp",
  };

  if (map[slug]) return `/images/services-premium/${map[slug]}`;
  if (slug.includes("kalici-makyaj")) return "/images/services-premium/leke-bakimi.webp";
  if (slug.includes("kas-kirpik")) return "/images/services-premium/kirpik-lifting.webp";
  if (slug.includes("tirnak")) return "/images/services-premium/anti-aging.webp";
  if (slug.includes("bolgesel-incelme")) return "/images/services-premium/bolgesel-incelme.webp";
  return "/images/services-premium/cilt-bakimi.webp";
}
