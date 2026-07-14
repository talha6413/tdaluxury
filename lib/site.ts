export const site = {
  name: "TDA Luxury",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "TDA Luxury",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.tdaluxury.com.tr",
  phoneDisplay: "0536 665 10 64",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905366651064",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://www.instagram.com/tdaluxuryusak",
  address: process.env.NEXT_PUBLIC_ADDRESS_LABEL || "Fatih Mahallesi, Yavuz Sultan Selim Caddesi No: 10/B, 64300 Merkez/Uşak",
  streetAddress: process.env.NEXT_PUBLIC_STREET_ADDRESS || "Fatih Mahallesi, Yavuz Sultan Selim Caddesi No: 10/B",
  postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || "64300",
  addressLocality: "Uşak Merkez",
  addressRegion: "Uşak",
  addressCountry: "TR",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    "https://www.google.com/maps/place/TDA+Luxury+G%C3%BCzellik+Salonu+U%C5%9Fak/@38.6415326,29.3987024,18z",
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_MAPS_EMBED_URL ||
    "https://www.google.com/maps?q=TDA%20Luxury%20U%C5%9Fak&output=embed",
  openingHours: [
    { day: "Monday", opens: "09:00", closes: "19:30" },
    { day: "Tuesday", opens: "09:00", closes: "19:30" },
    { day: "Wednesday", opens: "09:00", closes: "19:30" },
    { day: "Thursday", opens: "09:00", closes: "19:30" },
    { day: "Friday", opens: "09:00", closes: "19:30" },
    { day: "Saturday", opens: "09:00", closes: "19:30" },
  ],
  serviceAreas: [
    "Uşak Merkez",
    "Banaz",
    "Eşme",
    "Ulubey",
    "Sivaslı",
    "Karahallı",
  ],
};

export const waUrl = (
  text = "Merhaba, TDA Luxury hizmetleri hakkında bilgi almak ve randevu oluşturmak istiyorum."
) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
