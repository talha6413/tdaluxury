export type Service = { title:string; slug:string; description:string; keyword:string; parent?:string };
export const services: Service[] = [
  {
    "title": "Lazer Epilasyon",
    "slug": "/lazer-epilasyon",
    "keyword": "uşak lazer epilasyon",
    "description": "Uşak'ta kişiye özel değerlendirme ile lazer epilasyon sürecini, seans planını ve dikkat edilmesi gerekenleri öğrenin."
  },
  {
    "title": "Kadın Lazer Epilasyon",
    "slug": "/lazer-epilasyon/kadin-lazer-epilasyon",
    "keyword": "kadın lazer epilasyon uşak",
    "description": "Koltuk altı, bacak, bikini ve yüz bölgeleri için kadın lazer epilasyon hakkında detaylı bilgi alın.",
    "parent": "/lazer-epilasyon"
  },
  {
    "title": "Erkek Lazer Epilasyon",
    "slug": "/lazer-epilasyon/erkek-lazer-epilasyon",
    "keyword": "erkek lazer epilasyon uşak",
    "description": "Sırt, göğüs, ense, omuz ve sakal üstü bölgeler için erkek lazer epilasyon sürecini inceleyin.",
    "parent": "/lazer-epilasyon"
  },
  {
    "title": "Yüz Lazer Epilasyon",
    "slug": "/lazer-epilasyon/yuz-lazer-epilasyon",
    "keyword": "yüz lazer epilasyon uşak",
    "description": "Çene, üst dudak, favori ve yüz bölgesi için lazer epilasyon hakkında merak edilenleri öğrenin.",
    "parent": "/lazer-epilasyon"
  },
  {
    "title": "Tüm Vücut Lazer Epilasyon",
    "slug": "/lazer-epilasyon/tum-vucut-lazer-epilasyon",
    "keyword": "tüm vücut lazer epilasyon uşak",
    "description": "Tüm vücut lazer epilasyon planlaması, seans mantığı ve bölge kombinasyonları hakkında bilgi alın.",
    "parent": "/lazer-epilasyon"
  },
  {
    "title": "İğneli Epilasyon",
    "slug": "/igneli-epilasyon",
    "keyword": "uşak iğneli epilasyon",
    "description": "İnce, açık renkli veya bölgesel tüyler için iğneli epilasyon hakkında detaylı bilgi ve süreç rehberi."
  },
  {
    "title": "Cilt Bakımı",
    "slug": "/cilt-bakimi",
    "keyword": "uşak cilt bakımı",
    "description": "Cilt ihtiyacına göre planlanan profesyonel cilt bakımı uygulamalarını ve bakım süreçlerini keşfedin."
  },
  {
    "title": "Hydrafacial",
    "slug": "/cilt-bakimi/hydrafacial",
    "keyword": "hydrafacial uşak",
    "description": "Nem, arındırma ve daha canlı bir görünüm hedefleyen Hydrafacial sürecini adım adım inceleyin.",
    "parent": "/cilt-bakimi"
  },
  {
    "title": "Erkek Cilt Bakımı",
    "slug": "/cilt-bakimi/erkek-cilt-bakimi",
    "keyword": "erkek cilt bakımı uşak",
    "description": "Erkek cildine özel temizlik, dengeleme ve bakım uygulamaları hakkında bilgi alın.",
    "parent": "/cilt-bakimi"
  },
  {
    "title": "Akne Bakımı",
    "slug": "/cilt-bakimi/akne-bakimi",
    "keyword": "akne cilt bakımı uşak",
    "description": "Akneye eğilimli ciltler için profesyonel bakım süreci, hedefler ve bakım sonrası öneriler.",
    "parent": "/cilt-bakimi"
  },
  {
    "title": "Leke Bakımı",
    "slug": "/cilt-bakimi/leke-bakimi",
    "keyword": "leke bakımı uşak",
    "description": "Cilt tonu eşitsizliği ve leke görünümü için bakım odaklı uygulama sürecini keşfedin.",
    "parent": "/cilt-bakimi"
  },
  {
    "title": "Anti Aging Cilt Bakımı",
    "slug": "/cilt-bakimi/anti-aging",
    "keyword": "anti aging uşak",
    "description": "Daha canlı ve bakımlı bir görünüm için anti-aging cilt bakım yaklaşımımızı inceleyin.",
    "parent": "/cilt-bakimi"
  },
  {
    "title": "Cilt Analizi",
    "slug": "/cilt-bakimi/cilt-analizi",
    "keyword": "cilt analizi uşak",
    "description": "Cilt tipinizi ve ihtiyaçlarınızı anlamaya yardımcı profesyonel cilt analizi sürecini öğrenin.",
    "parent": "/cilt-bakimi"
  },
  {
    "title": "Bölgesel İncelme",
    "slug": "/bolgesel-incelme",
    "keyword": "uşak bölgesel incelme",
    "description": "Bölgesel incelme hedefiyle uygulanan destekleyici bakım yöntemlerini ve kişiye özel planlamayı keşfedin."
  },
  {
    "title": "G5 Masajı",
    "slug": "/bolgesel-incelme/g5-masaji",
    "keyword": "g5 masajı uşak",
    "description": "G5 masajı nedir, kimler için uygundur ve süreç nasıl planlanır sorularının yanıtları burada.",
    "parent": "/bolgesel-incelme"
  },
  {
    "title": "Lenf Drenaj",
    "slug": "/bolgesel-incelme/lenf-drenaj",
    "keyword": "lenf drenaj uşak",
    "description": "Lenf drenaj süreci, hedefleri ve destekleyici bakım avantajları hakkında bilgi alın.",
    "parent": "/bolgesel-incelme"
  },
  {
    "title": "Kalıcı Makyaj",
    "slug": "/kalici-makyaj",
    "keyword": "uşak kalıcı makyaj",
    "description": "Kaş, eyeliner, dipliner ve dudak renklendirme dâhil kalıcı makyaj uygulamalarını keşfedin."
  },
  {
    "title": "Microblading",
    "slug": "/kalici-makyaj/microblading",
    "keyword": "microblading uşak",
    "description": "Doğal kaş görünümüne odaklanan microblading uygulaması hakkında detaylı rehber.",
    "parent": "/kalici-makyaj"
  },
  {
    "title": "Pudralama Kaş",
    "slug": "/kalici-makyaj/pudralama-kas",
    "keyword": "pudralama kaş uşak",
    "description": "Daha yumuşak geçişli kaş görünümü için pudralama kaş sürecini inceleyin.",
    "parent": "/kalici-makyaj"
  },
  {
    "title": "Dipliner",
    "slug": "/kalici-makyaj/dipliner",
    "keyword": "dipliner uşak",
    "description": "Kirpik diplerini belirginleştiren dipliner uygulaması hakkında süreç ve bakım bilgileri.",
    "parent": "/kalici-makyaj"
  },
  {
    "title": "Kalıcı Eyeliner",
    "slug": "/kalici-makyaj/eyeliner",
    "keyword": "kalıcı eyeliner uşak",
    "description": "Kalıcı eyeliner ile daha belirgin göz görünümü için süreç, bakım ve merak edilenler.",
    "parent": "/kalici-makyaj"
  },
  {
    "title": "Dudak Renklendirme",
    "slug": "/kalici-makyaj/dudak-renklendirme",
    "keyword": "dudak renklendirme uşak",
    "description": "Dudak renklendirme uygulaması, iyileşme süreci ve sonuç beklentileri hakkında detaylar.",
    "parent": "/kalici-makyaj"
  },
  {
    "title": "Kaş ve Kirpik Hizmetleri",
    "slug": "/kas-kirpik",
    "keyword": "kaş kirpik uşak",
    "description": "Kirpik lifting, ipek kirpik, kaş laminasyonu ve altın oran kaş tasarımı hizmetlerimizi keşfedin."
  },
  {
    "title": "Kirpik Lifting",
    "slug": "/kas-kirpik/kirpik-lifting",
    "keyword": "kirpik lifting uşak",
    "description": "Kirpik lifting uygulaması, kalıcılık süresi ve bakım önerilerini inceleyin.",
    "parent": "/kas-kirpik"
  },
  {
    "title": "Kaş Laminasyonu",
    "slug": "/kas-kirpik/kas-laminasyonu",
    "keyword": "kaş laminasyonu uşak",
    "description": "Kaş laminasyonu ile düzenli ve hacimli kaş görünümü için süreç rehberi.",
    "parent": "/kas-kirpik"
  },
  {
    "title": "Altın Oran Kaş Tasarımı",
    "slug": "/kas-kirpik/altin-oran-kas-tasarimi",
    "keyword": "altın oran kaş tasarımı uşak",
    "description": "Yüz oranına uyumlu kaş tasarımı için altın oran kaş tasarımı sürecini inceleyin.",
    "parent": "/kas-kirpik"
  },
  {
    "title": "Kaş Alımı",
    "slug": "/kas-kirpik/kas-alimi",
    "keyword": "kaş alımı uşak",
    "description": "Yüz hattına uyumlu profesyonel kaş alımı ve şekillendirme hizmeti hakkında bilgi alın.",
    "parent": "/kas-kirpik"
  },
  {
    "title": "İpek Kirpik",
    "slug": "/kas-kirpik/ipek-kirpik",
    "keyword": "ipek kirpik uşak",
    "description": "İpek kirpik uygulaması, kullanım süresi ve bakım önerileri hakkında detaylı içerik.",
    "parent": "/kas-kirpik"
  },
  {
    "title": "Tırnak Hizmetleri",
    "slug": "/tirnak",
    "keyword": "tırnak hizmetleri uşak",
    "description": "Protez tırnak, kalıcı oje, manikür ve pedikür hizmetlerimizi tek sayfada inceleyin."
  },
  {
    "title": "Protez Tırnak",
    "slug": "/tirnak/protez-tirnak",
    "keyword": "protez tırnak uşak",
    "description": "Protez tırnak uygulaması, kullanım süresi ve bakım önerileri hakkında bilgi alın.",
    "parent": "/tirnak"
  },
  {
    "title": "Kalıcı Oje",
    "slug": "/tirnak/kalici-oje",
    "keyword": "kalıcı oje uşak",
    "description": "Uzun ömürlü ve bakımlı görünüm için kalıcı oje uygulamasını keşfedin.",
    "parent": "/tirnak"
  },
  {
    "title": "Manikür",
    "slug": "/tirnak/manikur",
    "keyword": "manikür uşak",
    "description": "El bakımı, tırnak şekillendirme ve profesyonel manikür hizmetimiz hakkında detaylar.",
    "parent": "/tirnak"
  },
  {
    "title": "Pedikür",
    "slug": "/tirnak/pedikur",
    "keyword": "pedikür uşak",
    "description": "Ayak bakımı ve profesyonel pedikür hizmeti hakkında süreç ve bakım bilgileri.",
    "parent": "/tirnak"
  }
];
export const serviceBySlug = (slug:string)=>services.find(s=>s.slug===slug)!;
