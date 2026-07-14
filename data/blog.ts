export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  intro: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  relatedServices: { label: string; href: string }[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "lazer-epilasyon-kac-seans",
    title: "Lazer Epilasyon Kaç Seansta Sonuç Verir?",
    excerpt: "Seans sayısını etkileyen bölge, kıl yapısı, cilt tonu ve düzenli uygulama faktörlerini sade biçimde öğrenin.",
    category: "Lazer Epilasyon",
    readTime: "7 dk",
    image: "/images/services-premium/lazer-epilasyon.webp",
    intro: "Lazer epilasyonda tek ve herkese uyan bir seans sayısı yoktur. Sağlıklı beklenti, kişisel değerlendirme ve düzenli uygulama planıyla kurulur.",
    datePublished: "2026-07-01",
    dateModified: "2026-07-12",
    keywords: ["Uşak lazer epilasyon", "lazer epilasyon kaç seans", "lazer epilasyon süreci"],
    relatedServices: [
      { label: "Lazer Epilasyon", href: "/lazer-epilasyon" },
      { label: "Kadın Lazer Epilasyon", href: "/lazer-epilasyon/kadin-lazer-epilasyon" },
      { label: "Erkek Lazer Epilasyon", href: "/lazer-epilasyon/erkek-lazer-epilasyon" },
    ],
    sections: [
      { heading: "Seans sayısını neler etkiler?", body: "Kılın kalınlığı, rengi, uygulama bölgesi, hormonal durum, cilt tonu ve seans aralıklarına uyum sonuç hızını etkileyebilir. Bu nedenle ilk değerlendirme, sürecin en önemli adımıdır." },
      { heading: "Neden düzenli devam etmek gerekir?", body: "Kıllar aynı anda aynı büyüme evresinde değildir. Uygulamalar bu döngüyü hedeflediği için planlanan aralıklara mümkün olduğunca düzenli uyulması gerekir." },
      { heading: "Bölgeye göre değişiklik olur mu?", body: "Yüz, koltuk altı, bacak, sırt ve göğüs gibi bölgeler farklı kıl yapısına ve büyüme döngüsüne sahip olabilir. Bu nedenle aynı kişinin farklı bölgelerinde bile seans planı değişebilir." },
      { heading: "Beklenti nasıl kurulmalı?", body: "Amaç tek seansta kusursuz sonuç değil, kontrollü ve sürdürülebilir bir azalma sürecidir. Kişiye özel takip, doğru beklenti yönetimini güçlendirir." },
    ],
  },
  {
    slug: "lazer-epilasyon-yazin-yapilir-mi",
    title: "Lazer Epilasyon Yazın Yapılır mı?",
    excerpt: "Yaz döneminde lazer epilasyon planlarken güneş maruziyeti, bronzluk ve bakım önerileri neden önemlidir?",
    category: "Lazer Epilasyon",
    readTime: "6 dk",
    image: "/images/services-premium/lazer-epilasyon.webp",
    intro: "Yaz aylarında lazer epilasyon planı oluşturulabilir; ancak güneş maruziyeti, bronzluk ve uygulama sonrası koruma daha dikkatli yönetilmelidir.",
    datePublished: "2026-07-03",
    dateModified: "2026-07-12",
    keywords: ["lazer epilasyon yazın yapılır mı", "Uşak lazer epilasyon", "yazın lazer"],
    relatedServices: [
      { label: "Lazer Epilasyon", href: "/lazer-epilasyon" },
      { label: "Yüz Lazer Epilasyon", href: "/lazer-epilasyon/yuz-lazer-epilasyon" },
    ],
    sections: [
      { heading: "Güneş maruziyeti neden önemlidir?", body: "Yoğun güneş, bronzluk ve cilt hassasiyeti uygulama planını etkileyebilir. İşlem öncesinde yakın dönem güneşlenme bilgisi mutlaka paylaşılmalıdır." },
      { heading: "Yazın hangi bölgeler daha kolay planlanır?", body: "Güneş görmeyen veya daha kolay korunabilen bölgeler yaz döneminde daha kontrollü planlanabilir. Yüz, kol ve bacak gibi açık bölgelerde koruma daha kritik hale gelir." },
      { heading: "Uygulama sonrasında ne yapılmalı?", body: "Güneş koruyucu kullanımı, doğrudan güneşten kaçınma ve uzman önerilerine uyma yaz döneminde konforlu süreç açısından önemlidir." },
    ],
  },
  {
    slug: "erkek-lazer-epilasyon",
    title: "Erkek Lazer Epilasyon Nasıl Planlanır?",
    excerpt: "Sırt, göğüs, omuz, ense ve sakal üstü bölgelerinde planlamanın temel adımlarını inceleyin.",
    category: "Erkek Bakımı",
    readTime: "6 dk",
    image: "/images/services-premium/erkek-lazer.webp",
    intro: "Erkek lazer epilasyonunda bölge seçimi, kıl yoğunluğu ve seans aralıkları kişiye göre belirlenmelidir.",
    datePublished: "2026-07-02",
    dateModified: "2026-07-12",
    keywords: ["Uşak erkek lazer epilasyon", "erkek lazer", "sırt lazer epilasyon"],
    relatedServices: [
      { label: "Erkek Lazer Epilasyon", href: "/lazer-epilasyon/erkek-lazer-epilasyon" },
      { label: "Lazer Epilasyon", href: "/lazer-epilasyon" },
      { label: "Erkek Cilt Bakımı", href: "/cilt-bakimi/erkek-cilt-bakimi" },
    ],
    sections: [
      { heading: "Hangi bölgeler tercih edilir?", body: "Sırt, omuz, göğüs, ense, boyun ve sakal üstü en sık değerlendirilen bölgelerdir. Uygulama planı kişinin ihtiyacına göre tek bölge veya kombinasyon olarak hazırlanabilir." },
      { heading: "İlk görüşmede ne değerlendirilir?", body: "Kıl yoğunluğu, cilt hassasiyeti, önceki uygulamalar ve beklenti konuşulur. Bu değerlendirme seans planının kişiselleştirilmesini sağlar." },
      { heading: "Bakım sonrası nelere dikkat edilir?", body: "Güneşten korunma, bölgeyi tahriş etmemek ve önerilen bakım talimatlarına uymak konforlu bir süreç açısından önemlidir." },
    ],
  },
  {
    slug: "hydrafacial-nedir",
    title: "Hydrafacial Nedir, Kimler İçin Uygundur?",
    excerpt: "Arındırma, nem ve canlı görünüm hedefleyen Hydrafacial bakımının temel aşamalarını keşfedin.",
    category: "Cilt Bakımı",
    readTime: "6 dk",
    image: "/images/services-premium/hydrafacial.webp",
    intro: "Hydrafacial, cildin ihtiyacına göre arındırma ve nem desteğini bir arada sunmayı hedefleyen profesyonel bir bakım yaklaşımıdır.",
    datePublished: "2026-07-04",
    dateModified: "2026-07-12",
    keywords: ["Uşak Hydrafacial", "Hydrafacial nedir", "Uşak cilt bakımı"],
    relatedServices: [
      { label: "Cilt Bakımı", href: "/cilt-bakimi" },
      { label: "Hydrafacial", href: "/cilt-bakimi/hydrafacial" },
      { label: "Cilt Analizi", href: "/cilt-bakimi/cilt-analizi" },
    ],
    sections: [
      { heading: "Bakımın temel amacı nedir?", body: "Cilt yüzeyindeki birikimi azaltmak, nem dengesini desteklemek ve daha canlı bir görünüm sağlamaktır. Uygulama kişisel cilt ihtiyacına göre şekillenir." },
      { heading: "Kimler tercih edebilir?", body: "Mat görünüm, kuruluk, yoğun sebum veya bakım rutini eksikliği yaşayan kişiler değerlendirme sonrasında uygun bulunabilir." },
      { heading: "Sonrasında ne yapılmalı?", body: "Güneş koruyucu kullanımı, cildi tahriş eden ürünlerden kısa süre uzak durmak ve önerilen ev bakım rutinine uymak faydalıdır." },
    ],
  },
  {
    slug: "cilt-bakimi-sonrasi-makyaj",
    title: "Cilt Bakımı Sonrası Makyaj Yapılır mı?",
    excerpt: "Profesyonel bakım sonrasında cildin dinlenmesi, makyaj ve aktif içerik kullanımı hakkında temel öneriler.",
    category: "Cilt Bakımı",
    readTime: "5 dk",
    image: "/images/services-premium/cilt-bakimi.webp",
    intro: "Cilt bakımı sonrasında cildin kısa süre dinlenmesine izin vermek, elde edilen konforu korumaya yardımcı olabilir.",
    datePublished: "2026-07-06",
    dateModified: "2026-07-12",
    keywords: ["cilt bakımı sonrası makyaj", "Uşak cilt bakımı", "cilt bakımı sonrası"],
    relatedServices: [
      { label: "Cilt Bakımı", href: "/cilt-bakimi" },
      { label: "Akne Bakımı", href: "/cilt-bakimi/akne-bakimi" },
      { label: "Leke Bakımı", href: "/cilt-bakimi/leke-bakimi" },
    ],
    sections: [
      { heading: "Aynı gün makyaj yapılmalı mı?", body: "Mümkünse yoğun fondöten ve kapatıcı kullanımını ertelemek, cildin rahatlamasına yardımcı olur. Uygulamanın içeriğine göre uzmanınız farklı öneri paylaşabilir." },
      { heading: "Aktif içerikler ne zaman kullanılmalı?", body: "Asitler, retinoidler ve güçlü peeling ürünleri bakım sonrasında hassasiyet oluşturabilir. Yeniden başlama zamanı uygulamaya ve cilt durumuna göre belirlenmelidir." },
      { heading: "Güneş koruyucu neden önemlidir?", body: "Bakım sonrasında düzenli güneş koruması, cilt konforunu ve bakım planını destekleyen temel adımlardan biridir." },
    ],
  },
  {
    slug: "microblading-mi-pudralama-kas-mi",
    title: "Microblading mi, Pudralama Kaş mı?",
    excerpt: "Doğal kıl efekti ile daha yumuşak dolgun görünüm arasındaki farkları karşılaştırın.",
    category: "Kalıcı Makyaj",
    readTime: "7 dk",
    image: "/images/services-premium/cilt-analizi.webp",
    intro: "İki uygulama da kaş görünümünü düzenlemeyi hedefler; ancak teknik, görünüm ve cilt tipine uygunluk açısından farklılaşır.",
    datePublished: "2026-07-05",
    dateModified: "2026-07-12",
    keywords: ["Uşak microblading", "pudralama kaş", "microblading mi pudralama mı"],
    relatedServices: [
      { label: "Microblading", href: "/kalici-makyaj/microblading" },
      { label: "Pudralama Kaş", href: "/kalici-makyaj/pudralama-kas" },
      { label: "Kalıcı Makyaj", href: "/kalici-makyaj" },
    ],
    sections: [
      { heading: "Microblading nasıl görünür?", body: "Kıl benzeri çizgilerle daha doğal bir kaş görünümü hedeflenir. Sonucun dengeli olması için yüz oranı ve mevcut kaş yapısı dikkate alınır." },
      { heading: "Pudralama kaş nasıl görünür?", body: "Daha yumuşak, gölgeli ve makyajlı bir etki oluşturur. Yoğunluk kişinin isteğine göre kontrollü biçimde ayarlanabilir." },
      { heading: "Karar nasıl verilir?", body: "Cilt tipi, mevcut kaş yoğunluğu ve istenen görünüm birlikte değerlendirilmelidir. En doğru seçim yüz yüze analiz sonrasında yapılır." },
    ],
  },
  {
    slug: "dudak-renklendirme-sonrasi-bakim",
    title: "Dudak Renklendirme Sonrası Bakım Rehberi",
    excerpt: "İlk günlerden iyileşme dönemine kadar dudak renklendirme sonrasında dikkat edilmesi gereken temel adımlar.",
    category: "Kalıcı Makyaj",
    readTime: "6 dk",
    image: "/images/services-premium/dudak-renklendirme.webp",
    intro: "Dudak renklendirme sonrasında iyileşme sürecini desteklemek için bölgeyi temiz tutmak ve verilen bakım önerilerine uymak gerekir.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-12",
    keywords: ["Uşak dudak renklendirme", "dudak renklendirme sonrası", "kalıcı makyaj bakım"],
    relatedServices: [
      { label: "Dudak Renklendirme", href: "/kalici-makyaj/dudak-renklendirme" },
      { label: "Kalıcı Makyaj", href: "/kalici-makyaj" },
    ],
    sections: [
      { heading: "İlk günlerde ne beklenir?", body: "Renk ilk günlerde daha yoğun görünebilir ve hafif hassasiyet yaşanabilir. İyileşme ilerledikçe görünüm yumuşar." },
      { heading: "Bölge nasıl korunmalı?", body: "Bölgeyi gereksiz temas, kabukları koparma ve uygun olmayan ürünlerden korumak gerekir. Uygulama sonrası verilen talimatlar önceliklidir." },
      { heading: "Renk ne zaman oturur?", body: "İyileşme süresi kişiden kişiye değişir. Nihai görünüm için ilk günlerdeki renge göre karar vermemek gerekir." },
    ],
  },
  {
    slug: "kirpik-lifting-kalicilik",
    title: "Kirpik Lifting Ne Kadar Kalıcıdır?",
    excerpt: "Kirpik yapısı, bakım alışkanlıkları ve uygulama sonrası dikkat edilmesi gerekenleri öğrenin.",
    category: "Kaş & Kirpik",
    readTime: "5 dk",
    image: "/images/services-premium/kirpik-lifting.webp",
    intro: "Kirpik lifting, doğal kirpiklere daha kıvrık ve belirgin bir görünüm kazandırmayı amaçlar.",
    datePublished: "2026-07-08",
    dateModified: "2026-07-12",
    keywords: ["Uşak kirpik lifting", "kirpik lifting kalıcılık", "kirpik lifting sonrası"],
    relatedServices: [
      { label: "Kirpik Lifting", href: "/kas-kirpik/kirpik-lifting" },
      { label: "Kaş ve Kirpik", href: "/kas-kirpik" },
    ],
    sections: [
      { heading: "Kalıcılığı ne belirler?", body: "Doğal kirpik döngüsü, kirpik yapısı ve bakım alışkanlıkları kalıcılık süresini etkiler. Her kişide aynı süre beklenmemelidir." },
      { heading: "İlk gün nelere dikkat edilir?", body: "Kirpikleri yoğun su, buhar ve yağlı ürünlerden korumak önemlidir. Uygulama sonrası verilen önerilere uymak görünümün korunmasına yardımcı olur." },
      { heading: "Ne zaman yenilenebilir?", body: "Kirpiklerin doğal yenilenme hızına göre tekrar zamanı değişir. Uzman değerlendirmesiyle uygun aralık belirlenebilir." },
    ],
  },
  {
    slug: "g5-masaji-nedir",
    title: "G5 Masajı Nedir?",
    excerpt: "Bölgesel bakım programlarında kullanılan G5 masajının hedeflerini ve planlama mantığını inceleyin.",
    category: "Vücut Bakımı",
    readTime: "5 dk",
    image: "/images/services-premium/g5-masaji.webp",
    intro: "G5 masajı, bölgesel bakım programlarında dolaşımı ve doku görünümünü desteklemeyi hedefleyen mekanik masaj uygulamasıdır.",
    datePublished: "2026-07-09",
    dateModified: "2026-07-12",
    keywords: ["Uşak G5 masajı", "G5 masajı nedir", "bölgesel bakım"],
    relatedServices: [
      { label: "G5 Masajı", href: "/bolgesel-incelme/g5-masaji" },
      { label: "Bölgesel İncelme", href: "/bolgesel-incelme" },
    ],
    sections: [
      { heading: "Hangi amaçlarla tercih edilir?", body: "Bölgesel bakım, doku görünümünün desteklenmesi ve kişisel programların tamamlayıcı adımı olarak planlanabilir." },
      { heading: "Kaç seans uygulanır?", body: "Seans sayısı ve sıklığı kişisel hedeflere, bölgeye ve değerlendirme sonucuna göre belirlenir. Tek bir standart plan yoktur." },
      { heading: "Kimler için uygun olmayabilir?", body: "Bazı sağlık durumlarında uygulama önerilmeyebilir. Bu nedenle işlem öncesi sağlık geçmişinin açıkça paylaşılması gerekir." },
    ],
  },
  {
    slug: "bolgesel-incelme-gercekci-beklenti",
    title: "Bölgesel İncelmede Gerçekçi Beklenti Nasıl Kurulur?",
    excerpt: "Bölgesel bakım uygulamalarının sınırları, yaşam tarzı ve kişiye özel planlamanın önemi hakkında temel bilgiler.",
    category: "Vücut Bakımı",
    readTime: "6 dk",
    image: "/images/services-premium/bolgesel-incelme.webp",
    intro: "Bölgesel incelme uygulamaları kilo verme tedavisi değildir; vücut görünümünü destekleyen bakım programları olarak değerlendirilmelidir.",
    datePublished: "2026-07-10",
    dateModified: "2026-07-12",
    keywords: ["Uşak bölgesel incelme", "bölgesel incelme", "bölgesel bakım"],
    relatedServices: [
      { label: "Bölgesel İncelme", href: "/bolgesel-incelme" },
      { label: "G5 Masajı", href: "/bolgesel-incelme/g5-masaji" },
    ],
    sections: [
      { heading: "Uygulamaların amacı nedir?", body: "Amaç belirli bölgelerde doku görünümünü ve bakım sürecini desteklemektir. Kilo verme veya tıbbi tedavi yerine geçmez." },
      { heading: "Yaşam tarzı neden önemlidir?", body: "Beslenme, hareket, uyku ve su tüketimi gibi alışkanlıklar bakım programının sürdürülebilirliğini etkiler." },
      { heading: "Seans planı nasıl oluşturulur?", body: "Bölge, hedef, sağlık geçmişi ve beklenti değerlendirildikten sonra kişiye özel bir program hazırlanır." },
    ],
  },

  {
    slug: "lazer-epilasyon-oncesi-hazirlik",
    title: "Lazer Epilasyon Öncesi Hazırlık Rehberi",
    excerpt: "Randevu öncesinde tıraş, güneş maruziyeti, ürün kullanımı ve sağlık bilgileri konusunda nelere dikkat edilmeli?",
    category: "Lazer Epilasyon",
    readTime: "7 dk",
    image: "/images/services-premium/lazer-epilasyon.webp",
    intro: "Doğru hazırlık, lazer epilasyon seansının daha kontrollü planlanmasına ve gereksiz hassasiyet riskinin azaltılmasına yardımcı olur.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    keywords: ["lazer epilasyon öncesi", "Uşak lazer epilasyon", "lazer öncesi tıraş"],
    relatedServices: [
      { label: "Lazer Epilasyon", href: "/lazer-epilasyon" },
      { label: "Kadın Lazer Epilasyon", href: "/lazer-epilasyon/kadin-lazer-epilasyon" },
      { label: "Erkek Lazer Epilasyon", href: "/lazer-epilasyon/erkek-lazer-epilasyon" },
    ],
    sections: [
      { heading: "Tıraş ne zaman yapılmalı?", body: "Uygulama yapılacak bölgenin jiletle kısaltılması çoğu planlamada tercih edilir; ağda ve cımbız gibi kökten alma yöntemleri ise uygulama sürecini etkileyebilir. Size verilen zamanlama önerisini izleyin." },
      { heading: "Güneş ve bronzluk bilgisi neden paylaşılmalı?", body: "Yakın dönem yoğun güneşlenme veya bronzlaşma cilt değerlendirmesini etkileyebilir. Bu bilgi seans öncesinde açıkça paylaşılmalıdır." },
      { heading: "Ürün ve ilaç bilgisi verilmeli mi?", body: "Cildi hassaslaştırabilecek ürünler, reçeteli ilaçlar ve yakın zamanda yapılan işlemler mutlaka bildirilmelidir. Uygunluk kararı gerektiğinde sağlık uzmanı görüşüyle desteklenir." },
      { heading: "Seans günü ne yapılmalı?", body: "Bölge temiz olmalı; parfüm, deodorant veya yoğun kozmetik ürün kullanımı konusunda merkezin önerilerine uyulmalıdır." },
    ],
  },
  {
    slug: "lazer-epilasyon-sonrasi-bakim",
    title: "Lazer Epilasyon Sonrası Bakım Nasıl Olmalı?",
    excerpt: "Seans sonrasında güneş, sıcak duş, spor, kozmetik ürünler ve cilt konforu için temel bakım adımları.",
    category: "Lazer Epilasyon",
    readTime: "7 dk",
    image: "/images/services-premium/lazer-epilasyon.webp",
    intro: "Lazer epilasyon sonrasında cildi tahrişten korumak ve verilen bakım önerilerine uymak, sürecin konforlu ilerlemesini destekler.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    keywords: ["lazer epilasyon sonrası", "lazer sonrası bakım", "Uşak lazer epilasyon"],
    relatedServices: [
      { label: "Lazer Epilasyon", href: "/lazer-epilasyon" },
      { label: "Yüz Lazer Epilasyon", href: "/lazer-epilasyon/yuz-lazer-epilasyon" },
    ],
    sections: [
      { heading: "İlk saatlerde ne beklenebilir?", body: "Geçici kızarıklık veya sıcaklık hissi oluşabilir. Bölgeyi kaşımamak, ovuşturmamak ve önerilen yatıştırıcı bakımı uygulamak önemlidir." },
      { heading: "Sıcak duş ve spor ne zaman yapılmalı?", body: "Aşırı sıcak duş, sauna ve yoğun terlemeye neden olan aktiviteler kısa süreli hassasiyeti artırabilir. Kişisel öneriye göre bekleme süresine uyulmalıdır." },
      { heading: "Güneş koruması nasıl olmalı?", body: "Açık bölgelerde doğrudan güneşten kaçınmak ve uygun güneş koruyucu kullanmak temel bakım adımlarındandır." },
      { heading: "Kıllar dökülürken müdahale edilmeli mi?", body: "Kılları cımbız veya ağdayla çekmek yerine doğal dökülme sürecinin beklenmesi önerilir. Seanslar arasında kökten alma yöntemleri kullanılmamalıdır." },
    ],
  },
  {
    slug: "lazer-epilasyon-acitir-mi",
    title: "Lazer Epilasyon Acıtır mı? Konforu Etkileyen Faktörler",
    excerpt: "Bölge, kıl yoğunluğu, cilt hassasiyeti ve soğutma sistemlerinin uygulama konforuna etkisini öğrenin.",
    category: "Lazer Epilasyon",
    readTime: "6 dk",
    image: "/images/services-premium/lazer-epilasyon.webp",
    intro: "Lazer epilasyon hissi kişiden kişiye ve bölgeden bölgeye değişir. Gerçekçi beklenti, kısa ön değerlendirme ve doğru ayarlarla kurulur.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    keywords: ["lazer epilasyon acıtır mı", "acısız lazer Uşak", "lazer epilasyon konfor"],
    relatedServices: [
      { label: "Lazer Epilasyon", href: "/lazer-epilasyon" },
      { label: "Tüm Vücut Lazer", href: "/lazer-epilasyon/tum-vucut-lazer-epilasyon" },
    ],
    sections: [
      { heading: "Hissedilen duygu nasıldır?", body: "Bazı kişiler hafif batma veya sıcaklık hissi tarif eder. Hassasiyet bölgeye, kıl yoğunluğuna ve kişisel ağrı eşiğine göre değişebilir." },
      { heading: "Hangi bölgeler daha hassas olabilir?", body: "Kılın yoğun olduğu veya cildin daha hassas olduğu bölgelerde his daha belirgin olabilir. Ayarların kişiye göre yapılması önemlidir." },
      { heading: "Soğutma sistemi ne sağlar?", body: "Uygun soğutma, cilt yüzeyindeki sıcaklık hissini azaltarak uygulama konforunu destekleyebilir; ancak tamamen hissiz bir işlem garantisi vermez." },
      { heading: "Rahatsızlık hissedilirse ne yapılmalı?", body: "Uygulama sırasında his mutlaka uzmanla paylaşılmalıdır. Gerekirse ayar ve uygulama hızı yeniden değerlendirilir." },
    ],
  },
  {
    slug: "cilt-analizi-neden-onemli",
    title: "Cilt Analizi Neden Önemlidir?",
    excerpt: "Cilt tipi, hassasiyet, yağ dengesi ve bakım hedefleri doğru analiz edilmeden neden tek tip bakım seçilmemeli?",
    category: "Cilt Bakımı",
    readTime: "6 dk",
    image: "/images/services-premium/cilt-analizi.webp",
    intro: "Cilt analizi, popüler bir işlem seçmek yerine cildin gerçek ihtiyacına göre bakım planı oluşturmanın ilk adımıdır.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    keywords: ["Uşak cilt analizi", "cilt analizi neden önemli", "kişiye özel cilt bakımı"],
    relatedServices: [
      { label: "Cilt Analizi", href: "/cilt-bakimi/cilt-analizi" },
      { label: "Cilt Bakımı", href: "/cilt-bakimi" },
    ],
    sections: [
      { heading: "Cilt tipi tek başına yeterli mi?", body: "Yağlı, kuru veya karma tanımı başlangıç noktasıdır; hassasiyet, bariyer durumu, aktif içerik kullanımı ve yaşam alışkanlıkları da değerlendirilmelidir." },
      { heading: "Yanlış bakım seçimi neye yol açabilir?", body: "Gereğinden güçlü veya ihtiyaca uymayan uygulamalar cilt konforunu bozabilir. Bu nedenle kontrollü ve aşamalı plan önemlidir." },
      { heading: "Ev bakım rutini nasıl şekillenir?", body: "Analiz sonucunda karmaşık ürün listeleri yerine temizleme, nemlendirme ve güneş koruması gibi temel adımlar cilt ihtiyacına göre düzenlenebilir." },
      { heading: "Ne zaman dermatoloğa yönlendirme gerekir?", body: "Aktif, ağrılı veya yaygın cilt sorunlarında güzellik bakımı yerine dermatoloji değerlendirmesi öncelikli olabilir." },
    ],
  },
  {
    slug: "akneye-egilimli-cilt-bakimi-hatalari",
    title: "Akneye Eğilimli Ciltlerde Sık Yapılan Bakım Hataları",
    excerpt: "Aşırı temizleme, sert peeling, yanlış ürün katmanlama ve güneş korumasını ihmal etmenin etkilerini inceleyin.",
    category: "Cilt Bakımı",
    readTime: "7 dk",
    image: "/images/services-premium/cilt-bakimi.webp",
    intro: "Akneye eğilimli ciltlerde daha fazla ürün veya daha sert temizlik her zaman daha iyi sonuç anlamına gelmez.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    keywords: ["akne cilt bakımı", "Uşak akne bakımı", "akne bakım hataları"],
    relatedServices: [
      { label: "Akne Bakımı", href: "/cilt-bakimi/akne-bakimi" },
      { label: "Cilt Analizi", href: "/cilt-bakimi/cilt-analizi" },
    ],
    sections: [
      { heading: "Cildi aşırı temizlemek", body: "Sık ve sert temizleme cilt bariyerini zorlayabilir. Nazik temizlik ve uygun sıklık daha sürdürülebilir bir yaklaşımdır." },
      { heading: "Birden fazla aktif içeriği aynı anda kullanmak", body: "Asit, retinoid ve peeling ürünlerini kontrolsüz biçimde üst üste kullanmak hassasiyeti artırabilir. Rutin kademeli kurulmalıdır." },
      { heading: "Sivilceleri sıkmak", body: "Sıkma ve kurcalama tahriş, iz ve leke görünümü riskini artırabilir. Aktif akne için dermatoloji desteği gerekebilir." },
      { heading: "Güneş korumasını ihmal etmek", body: "Güneş maruziyeti leke görünümünü belirginleştirebilir. Cilt tipine uygun güneş koruması bakım rutininin temelidir." },
    ],
  },
  {
    slug: "microblading-sonrasi-bakim",
    title: "Microblading Sonrası Bakım Rehberi",
    excerpt: "Kaş bölgesini koruma, kabuklanma süreci, renk değişimi ve rötuş dönemine ilişkin temel bakım önerileri.",
    category: "Kalıcı Makyaj",
    readTime: "7 dk",
    image: "/images/services-premium/cilt-analizi.webp",
    intro: "Microblading sonrasında ilk günlerde görünümün daha koyu olması ve iyileşme boyunca rengin değişmesi normal sürecin bir parçası olabilir.",
    datePublished: "2026-07-13",
    dateModified: "2026-07-13",
    keywords: ["microblading sonrası bakım", "Uşak microblading", "microblading iyileşme"],
    relatedServices: [
      { label: "Microblading", href: "/kalici-makyaj/microblading" },
      { label: "Pudralama Kaş", href: "/kalici-makyaj/pudralama-kas" },
      { label: "Kalıcı Makyaj", href: "/kalici-makyaj" },
    ],
    sections: [
      { heading: "İlk günlerde görünüm nasıldır?", body: "Renk başlangıçta daha yoğun ve çizgiler daha keskin görünebilir. İyileşme ilerledikçe görünüm yumuşar." },
      { heading: "Kabuklar koparılmalı mı?", body: "Kabukları koparmak pigment dağılımını ve cilt iyileşmesini olumsuz etkileyebilir. Bölge doğal şekilde iyileşmeye bırakılmalıdır." },
      { heading: "Su ve kozmetik teması nasıl yönetilir?", body: "Uygulama sonrası verilen süre boyunca yoğun su, buhar, makyaj ve uygunsuz ürün temasından kaçınılmalıdır." },
      { heading: "Rötuş ne zaman değerlendirilir?", body: "Nihai renk iyileşme tamamlandıktan sonra değerlendirilir. Rötuş ihtiyacı cilt tipi ve pigment tutulumuna göre belirlenir." },
    ],
  },

];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCategories() {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
