export type RichServiceContent = {
  summary: string;
  suitability: string[];
  cautions: string[];
  preparation: string[];
  aftercare: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

export const richServiceContent: Record<string, RichServiceContent> = {
  "/kas-kirpik/altin-oran-kas-tasarimi": {
    summary: "Altın oran kaş tasarımı, yüzün genel oranları, göz yapısı ve doğal kaş hattı birlikte değerlendirilerek kaş formunun kişiye özel planlanmasıdır. Amaç tek tip kaş çizmek değil, yüz ifadesini sertleştirmeden dengeli ve bakımlı bir görünüm oluşturmaktır.",
    suitability: ["Kaş formunu belirginleştirmek isteyenler", "Yüz yapısına uygun profesyonel ölçüm isteyenler", "Asimetrik veya dağınık kaş görünümünü düzenlemek isteyenler"],
    cautions: ["Aktif cilt tahrişi veya açık yara varsa işlem ertelenebilir", "Yakın zamanda kaş bölgesine yapılan medikal işlemler paylaşılmalıdır", "Beklenti ve doğal kaş yapısı birlikte değerlendirilmelidir"],
    preparation: ["Kaşları işlem öncesinde aşırı inceltmeyin", "Kullandığınız aktif cilt ürünlerini belirtin", "Beğendiğiniz kaş örneklerini referans olarak getirebilirsiniz"],
    aftercare: ["İlk gün bölgeyi tahriş etmeyin", "Uzmanın önerdiği şekli korumak için evde rastgele alım yapmayın", "Düzenli bakım aralığını kişisel kaş çıkış hızınıza göre planlayın"],
    benefits: ["Yüz oranına uygun planlama", "Daha düzenli ve dengeli görünüm", "Doğal kaş yapısını koruyan yaklaşım"],
    faqs: [
      {question:"Altın oran kaş tasarımı ne kadar sürer?",answer:"Ölçüm, değerlendirme ve şekillendirme yöntemine göre süre değişir; çoğu randevu yaklaşık 30–60 dakika arasında planlanır."},
      {question:"Kaş şekli tamamen değişir mi?",answer:"Amaç yüzünüze yabancı bir form oluşturmak değil, mevcut kaş hattını daha dengeli hale getirmektir."},
      {question:"Erkeklere altın oran kaş tasarımı yapılır mı?",answer:"Evet. Erkeklerde doğal ve aşırı inceltilmemiş bir görünüm korunarak planlama yapılır."},
      {question:"Kaş alımı ile farkı nedir?",answer:"Standart kaş alımından farklı olarak ölçüm, yüz oranı ve simetri değerlendirmesi daha belirgin rol oynar."}
    ]
  },
  "/kas-kirpik/kas-alimi": {
    summary: "Profesyonel kaş alımı, yüz ifadesini değiştirmeden dağınık tüylerin kontrollü biçimde temizlenmesi ve doğal kaş hattının korunmasıdır. TDA Luxury’de kadın ve erkek danışanlar için yüz yapısına uygun şekillendirme yapılır.",
    suitability: ["Düzenli kaş bakımı isteyenler", "Doğal kaş hattını korumak isteyenler", "Kadın ve erkek danışanlar"],
    cautions: ["Aktif tahriş, yara veya yoğun hassasiyet varsa beklenebilir", "Retinoid veya güçlü peeling kullanımı paylaşılmalıdır", "Kaş bölgesine yakın zamanda işlem yapıldıysa bilgi verilmelidir"],
    preparation: ["Kaşları randevu öncesi evde almayın", "Cilt hassasiyetinizi belirtin", "İstediğiniz görünümü net biçimde paylaşın"],
    aftercare: ["İlk saatlerde bölgeyi ovuşturmayın", "Yoğun makyaj ve parfümlü ürünlerden kaçının", "Kızarıklık uzarsa uzmanla iletişime geçin"],
    benefits: ["Doğal ve temiz görünüm", "Yüz hattına uyum", "Kontrollü ve hijyenik uygulama"],
    faqs: [
      {question:"Kaş alımı ne sıklıkla yapılır?",answer:"Tüy çıkış hızına göre genellikle 2–4 haftalık aralıklar tercih edilir."},
      {question:"İple mi cımbızla mı alınır?",answer:"Cilt hassasiyeti, tüy yapısı ve istenen sonuca göre yöntem seçilebilir."},
      {question:"Erkek kaş alımı yapılıyor mu?",answer:"Evet. Doğal ve maskülen görünüm korunarak yalnızca ihtiyaç duyulan bölgeler düzenlenir."}
    ]
  },
  "/kalici-makyaj/microblading": {
    summary: "Microblading, kaş bölgesinde kıl görünümünü taklit eden ince çizgilerle daha dolgun ve düzenli bir kaş görünümü hedefleyen yarı kalıcı makyaj uygulamasıdır. Uygunluk; cilt tipi, mevcut kaş yapısı ve beklentiye göre değerlendirilir.",
    suitability: ["Seyrek kaş görünümünü desteklemek isteyenler", "Doğal kıl efekti arayanlar", "Kaş formunu daha düzenli görmek isteyenler"],
    cautions: ["Hamilelik, emzirme, aktif enfeksiyon veya bazı sağlık durumları mutlaka paylaşılmalıdır", "Yağlı ciltlerde pigment tutunumu farklı olabilir", "Kalıcı makyaj geçmişi varsa ön değerlendirme gerekir"],
    preparation: ["İşlem öncesinde kan sulandırıcı kullanımı için hekiminize danışın", "Kaş bölgesine peeling veya tahriş edici ürün uygulamayın", "Renk ve form beklentinizi açıkça paylaşın"],
    aftercare: ["Kabukları koparmayın", "İlk günlerde bölgeyi aşırı ıslatmayın", "Güneş, sauna ve yoğun terlemeden kaçının", "Rötuş ihtiyacı kişiye göre değerlendirilir"],
    benefits: ["Doğal kıl efekti", "Kişiye özel form ve renk", "Günlük kaş makyajını kolaylaştırma"],
    faqs: [
      {question:"Microblading ne kadar kalıcıdır?",answer:"Cilt tipi, bakım, güneş maruziyeti ve kullanılan teknik sonucu etkiler. Genellikle aylar içinde kademeli olarak solar ve kişiye göre tazeleme gerekebilir."},
      {question:"Microblading acıtır mı?",answer:"Hassasiyet kişiden kişiye değişir. Uygulama öncesinde konforu artırmaya yönelik hazırlık yapılabilir."},
      {question:"Rötuş gerekir mi?",answer:"İyileşme sonrası pigment tutunumu değerlendirilir; gerekiyorsa rötuş planlanır."},
      {question:"Yağlı ciltte yapılır mı?",answer:"Yapılabilir ancak kıl efekti daha hızlı dağılabilir. Pudralama gibi alternatifler değerlendirilir."}
    ]
  },
  "/kalici-makyaj/dudak-renklendirme": {
    summary: "Dudak renklendirme, dudak tonunu daha dengeli ve canlı göstermeyi hedefleyen yarı kalıcı makyaj uygulamasıdır. Renk seçimi doğal dudak tonu, cilt alt tonu ve beklentiye göre yapılır; işlem ruj etkisi vermek zorunda değildir.",
    suitability: ["Dudak tonunu daha dengeli görmek isteyenler", "Kontur görünümünü belirginleştirmek isteyenler", "Doğal ve bakımlı bir renk hedefleyenler"],
    cautions: ["Uçuk geçmişi mutlaka paylaşılmalıdır", "Aktif yara, enfeksiyon veya tahrişte işlem yapılmaz", "Hamilelik, emzirme ve ilaç kullanımı önceden belirtilmelidir"],
    preparation: ["Dudakları birkaç gün önceden düzenli nemlendirin", "Uçuk geçmişiniz varsa doktorunuza danışın", "İşlem günü dudakta çatlak veya açık yara olmamalıdır"],
    aftercare: ["Kabukları koparmayın", "İlk günlerde sıcak, acılı ve çok tuzlu gıdalara dikkat edin", "Dudakları önerilen ürünle nemli tutun", "İyileşme döneminde renk koyu başlayıp açılabilir"],
    benefits: ["Daha dengeli dudak tonu", "Kişiye özel renk seçimi", "Kontur görünümünü destekleme"],
    faqs: [
      {question:"Dudak renklendirme sonrası renk neden koyu görünür?",answer:"İlk günlerde pigment daha yoğun görünür. İyileşme tamamlandıkça renk yumuşar ve gerçek tonuna yaklaşır."},
      {question:"Uçuk çıkar mı?",answer:"Uçuk geçmişi olan kişilerde tetiklenme riski bulunabilir. İşlem öncesinde doktor önerisi alınmalıdır."},
      {question:"Ne kadar kalıcıdır?",answer:"Kişisel metabolizma, bakım ve güneş maruziyetine göre değişir; zamanla kademeli olarak solar."},
      {question:"Rötuş gerekiyor mu?",answer:"İyileşme sonrası renk eşitliği ve pigment tutunumu değerlendirilerek gerekirse rötuş planlanır."}
    ]
  },
  "/kalici-makyaj/dipliner": {
    summary: "Dipliner, kirpik diplerine yakın ince bir pigment uygulamasıyla göz hattını daha belirgin göstermeyi hedefler. Eyeliner’a göre daha doğal ve günlük kullanıma uygun bir sonuç sunabilir.",
    suitability: ["Kirpik diplerini belirginleştirmek isteyenler", "Her gün göz kalemi uygulamak istemeyenler", "Doğal ve ince bir göz hattı arayanlar"],
    cautions: ["Göz enfeksiyonu, aktif irritasyon veya yakın tarihli göz operasyonu varsa işlem ertelenir", "Lens kullanımı ve göz hassasiyeti paylaşılmalıdır", "Hamilelik ve emzirme döneminde değerlendirme gerekir"],
    preparation: ["İşlem günü lens yerine gözlük tercih edin", "Kirpik lifting veya ipek kirpik işlemlerini önceden belirtin", "Göz çevresine tahriş edici ürün uygulamayın"],
    aftercare: ["Göz çevresini ovuşturmayın", "İlk günlerde yoğun makyaj, sauna ve havuzdan kaçının", "Kabuklanma varsa koparmayın", "İyileşme tamamlanana kadar güneşten koruyun"],
    benefits: ["Kirpik diplerinde belirginlik", "Doğal ve ince görünüm", "Günlük makyaj süresini azaltma"],
    faqs: [
      {question:"Dipliner ile eyeliner farkı nedir?",answer:"Dipliner kirpik diplerine yakın ve daha ince uygulanır; eyeliner daha belirgin ve kuyruklu tasarlanabilir."},
      {question:"Gözler şişer mi?",answer:"Geçici hafif şişlik veya hassasiyet olabilir. Uzun süren veya artan şikâyette sağlık uzmanına danışılmalıdır."},
      {question:"Renk zamanla değişir mi?",answer:"Pigment zaman içinde solar. Cilt yapısı, bakım ve güneş maruziyeti renk görünümünü etkileyebilir."}
    ]
  },
  "/kas-kirpik/kirpik-lifting": {
    summary: "Kirpik lifting, doğal kirpikleri kökten uca doğru kıvırarak daha açık ve belirgin bir göz görünümü hedefleyen bakımdır. Takma kirpik eklenmez; mevcut kirpik yapısı şekillendirilir.",
    suitability: ["Düz veya aşağı yönlü kirpiklere sahip olanlar", "Maskara olmadan daha açık göz görünümü isteyenler", "Doğal kirpiklerini korumak isteyenler"],
    cautions: ["Göz enfeksiyonu, arpacık veya aktif hassasiyette işlem yapılmaz", "Çok zayıf veya kırılgan kirpiklerde uygunluk değerlendirilir", "Yakın tarihli göz operasyonu paylaşılmalıdır"],
    preparation: ["İşlem günü göz makyajı yapmayın", "Lens kullanıyorsanız çıkarın", "Kirpik serumu veya yağlı ürünleri işlem öncesi kullanmayın"],
    aftercare: ["İlk 24 saat kirpikleri ıslatmayın", "Buhar, sauna ve yoğun terlemeden kaçının", "Kirpikleri ovuşturmayın", "Yağ bazlı ürünleri sınırlayın"],
    benefits: ["Doğal kirpiklerde kıvrım", "Daha açık göz görünümü", "Maskara ihtiyacını azaltma"],
    faqs: [
      {question:"Kirpik lifting ne kadar kalıcıdır?",answer:"Kirpik büyüme döngüsüne bağlı olarak etkisi genellikle birkaç hafta devam eder."},
      {question:"Kirpiklere zarar verir mi?",answer:"Doğru ürün, süre ve teknikle uygulandığında risk azaltılır; aşırı sık tekrarlamamak önemlidir."},
      {question:"İpek kirpikle birlikte yapılır mı?",answer:"Genellikle aynı anda önerilmez. Hangi işlemin daha uygun olduğu beklentiye göre belirlenir."}
    ]
  },
  "/kas-kirpik/ipek-kirpik": {
    summary: "İpek kirpik uygulaması, doğal kirpiklere uygun uzunluk ve yoğunlukta tekli veya hacimli kirpiklerin eklenmesiyle daha belirgin bir göz görünümü oluşturur. Set seçimi doğal kirpik gücü ve istenen stile göre yapılır.",
    suitability: ["Daha uzun ve belirgin kirpik görünümü isteyenler", "Günlük maskara kullanımını azaltmak isteyenler", "Doğal veya hacimli set seçenekleri arayanlar"],
    cautions: ["Aktif göz enfeksiyonunda uygulama yapılmaz", "Alerji ve hassasiyet geçmişi paylaşılmalıdır", "Zayıf doğal kirpiklere aşırı ağır set uygulanmamalıdır"],
    preparation: ["Göz makyajsız gelin", "Lensleri çıkarın", "Yağ bazlı ürünleri işlem öncesinde kullanmayın"],
    aftercare: ["İlk 24 saat su ve buhardan koruyun", "Yağ bazlı temizleyicilerden kaçının", "Kirpikleri çekmeyin veya koparmayın", "Düzenli bakım randevusu planlayın"],
    benefits: ["Kişiye özel uzunluk ve yoğunluk", "Daha belirgin göz görünümü", "Farklı stil seçenekleri"],
    faqs: [
      {question:"İpek kirpik ne kadar dayanır?",answer:"Doğal kirpik döngüsü, bakım alışkanlığı ve kullanılan ürünlere göre süre değişir. Düzenli bakım gerekebilir."},
      {question:"Doğal kirpik dökülür mü?",answer:"Doğal kirpikler kendi döngüsünde dökülür. Aşırı ağır uygulama veya yanlış çıkarma hasar riskini artırabilir."},
      {question:"Nasıl çıkarılır?",answer:"Kirpikler çekilmemeli; profesyonel çözücü ile merkezde çıkarılmalıdır."}
    ]
  },
  "/bolgesel-incelme": {
    summary: "Bölgesel incelme uygulamaları, tek başına kilo verme yöntemi değildir. Amaç, beslenme ve hareket düzenini destekleyen bakım protokolleriyle belirli bölgelerde daha sıkı ve bakımlı bir görünüm hedeflemektir.",
    suitability: ["Belirli bölgelerde bakım desteği isteyenler", "Yaşam tarzı düzenine ek profesyonel destek arayanlar", "Gerçekçi ve düzenli bir program uygulayabilecek kişiler"],
    cautions: ["Hamilelik, ciddi dolaşım sorunları veya aktif sağlık problemleri paylaşılmalıdır", "Tıbbi kilo verme veya hastalık tedavisi yerine geçmez", "Uygunluk değerlendirmesi kişiye göre yapılır"],
    preparation: ["Sağlık geçmişinizi paylaşın", "Randevu öncesinde yeterli su tüketin", "Ağır öğünlerden hemen sonra gelmeyin"],
    aftercare: ["Su tüketimini sürdürün", "Dengeli beslenme ve hareket düzenini koruyun", "Sonuçları yalnızca tartı yerine ölçüm ve görünümle takip edin"],
    benefits: ["Kişiye özel bölge planlaması", "Masaj ve bakım desteği", "Düzenli takip ve ölçüm"],
    faqs: [
      {question:"Bölgesel incelme kilo verdirir mi?",answer:"Bu uygulamalar tek başına kilo verme yöntemi değildir. Sağlıklı yaşam düzenini destekleyici bakım olarak değerlendirilmelidir."},
      {question:"Kaç seans gerekir?",answer:"Bölge, hedef, yaşam tarzı ve kullanılan yönteme göre değişir. Ön değerlendirme sonrasında plan yapılır."},
      {question:"Sonuçlar kalıcı mı?",answer:"Yaşam tarzı değişmeden kalıcılık beklemek gerçekçi değildir. Beslenme, hareket ve düzenli bakım önemlidir."}
    ]
  },
  "/bolgesel-incelme/g5-masaji": {
    summary: "G5 masajı, ritmik mekanik masaj başlıklarıyla belirli bölgelerde dolaşım ve doku görünümünü desteklemek amacıyla uygulanan bakım yöntemidir. Zayıflama veya hastalık tedavisi olarak sunulmamalıdır.",
    suitability: ["Selülit görünümü için bakım desteği isteyenler", "Masaj temelli bölgesel bakım arayanlar", "Düzenli seans planına uyabilecek kişiler"],
    cautions: ["Varis, pıhtı riski, ciddi dolaşım problemi veya aktif ağrı varsa uygulanmamalıdır", "Hamilelik ve kronik hastalıklar mutlaka paylaşılmalıdır", "Morarmaya yatkın kişilerde basınç dikkatle ayarlanır"],
    preparation: ["Sağlık geçmişinizi paylaşın", "Yeterli su tüketin", "Uygulama bölgesinde açık yara olmamalıdır"],
    aftercare: ["Su tüketimini artırın", "Hafif hareketle dolaşımı destekleyin", "Aşırı hassasiyet veya morarmada merkeze bilgi verin"],
    benefits: ["Masajla doku görünümünü destekleme", "Bölgesel bakım planına eklenebilme", "Basıncın kişiye göre ayarlanması"],
    faqs: [
      {question:"G5 masajı zayıflatır mı?",answer:"Tek başına zayıflama yöntemi değildir. Bölgesel bakım ve doku görünümünü destekleme amacıyla uygulanır."},
      {question:"Acıtır mı?",answer:"Basınç kişiye göre ayarlanır. Hassasiyet olabilir ancak aşırı ağrı normal kabul edilmemelidir."},
      {question:"Kimlere uygulanmaz?",answer:"Dolaşım problemi, pıhtı riski, aktif enfeksiyon veya uygun olmayan sağlık durumlarında işlem yapılmaz."}
    ]
  },
  "/cilt-bakimi/hydrafacial": {
    summary: "Hydrafacial, vakumlu başlık ve serum adımlarıyla cilt yüzeyini arındırma, nem desteği sağlama ve daha canlı bir görünüm hedefleyen cihazlı bakım protokolüdür. Uygulama içeriği cilt ihtiyacına göre düzenlenmelidir.",
    suitability: ["Mat ve nemsiz cilt görünümü yaşayanlar", "Gözenek ve yüzey temizliği ihtiyacı olanlar", "Özel gün öncesi canlı görünüm isteyenler"],
    cautions: ["Aktif enfeksiyon, açık yara veya yoğun inflamasyonda uygulanmaz", "Rozasea ve ileri hassasiyette düşük yoğunluk değerlendirilir", "Kullanılan ilaçlar ve yakın tarihli işlemler paylaşılmalıdır"],
    preparation: ["Tahriş edici aktifleri birkaç gün önceden bırakma önerisi verilebilir", "Yoğun güneş yanığı olmamalıdır", "Cilt hassasiyetinizi belirtin"],
    aftercare: ["Güneş koruyucu kullanın", "Aynı gün yoğun peeling ve aktif ürünlerden kaçının", "Cildi nazikçe temizleyip nemlendirin"],
    benefits: ["Arındırma ve nem desteği", "Kişiye özel serum adımları", "Bakımlı ve canlı görünüm"],
    faqs: [
      {question:"Hydrafacial kaç seans yapılır?",answer:"Tek seanslık bakım olarak uygulanabilir; cilt ihtiyacına göre düzenli aralıklarla planlanabilir."},
      {question:"Her cilt tipine uygun mu?",answer:"Çoğu cilt tipi için uyarlanabilir ancak aktif hastalık ve yoğun hassasiyette ön değerlendirme gerekir."},
      {question:"İşlem sonrası kızarıklık olur mu?",answer:"Hafif ve kısa süreli kızarıklık olabilir. Yoğun veya uzun süren reaksiyonda uzmanla iletişime geçilmelidir."}
    ]
  },
  "/lazer-epilasyon/erkek-lazer-epilasyon": {
    summary: "Erkek lazer epilasyon; sırt, göğüs, omuz, ense, sakal üstü ve diğer bölgelerde kıl yoğunluğunu azaltmayı hedefleyen planlı uygulamadır. Kıl yapısı, ten rengi ve bölgeye göre cihaz ayarları kişiselleştirilmelidir.",
    suitability: ["Yoğun kıl görünümünü azaltmak isteyen erkekler", "Batık ve tıraş tahrişi yaşayanlar", "Sırt, göğüs, ense veya sakal üstü bölgesinde bakım isteyenler"],
    cautions: ["Aktif cilt enfeksiyonu, açık yara veya yoğun güneş yanığında işlem yapılmaz", "Işığa duyarlılık yapan ilaçlar paylaşılmalıdır", "Beyaz, gri ve çok açık kıllarda etkinlik sınırlı olabilir"],
    preparation: ["Kılları kökten almayın; jilet önerisine uyun", "Güneşlenme ve solaryumdan kaçının", "Kullandığınız ilaçları belirtin"],
    aftercare: ["Güneş koruyucu kullanın", "İlk gün sıcak duş, sauna ve yoğun spordan kaçının", "Bölgeyi tahriş etmeyin", "Seans aralıklarına uyun"],
    benefits: ["Yoğun kıl görünümünde azalma hedefi", "Batık ve tıraş tahrişini azaltmaya destek", "Bölgeye özel seans planı"],
    faqs: [
      {question:"Erkek lazer epilasyon kaç seans sürer?",answer:"Kıl yoğunluğu, bölge ve hormonal faktörlere göre değişir. Düzenli seans ve ara kontroller gerekir."},
      {question:"Sakal bölgesine yapılır mı?",answer:"Sakal üstü ve boyun gibi bölgeler değerlendirilebilir. Sakal çizgisi için dikkatli ve kontrollü planlama gerekir."},
      {question:"Sırt ve göğüs lazeri acıtır mı?",answer:"Hissedilen sıcaklık ve batma kişiden kişiye değişir. Soğutma ve uygun ayarlar konforu artırabilir."}
    ]
  }
};
