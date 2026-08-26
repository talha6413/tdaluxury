import type { RichServiceContent } from "@/data/service-content";

/**
 * Ana service-content dosyasında özel içerik bulunmayan kritik sayfalar için
 * özgün ve yerel SEO odaklı içerik katmanı.
 *
 * ServicePage mevcut richServiceContent'i öncelikli kullanır; bu dosya yalnızca
 * eksik sayfalarda devreye girer.
 */
export const primaryServiceContent: Record<string, RichServiceContent> = {
  "/igneli-epilasyon": {
    summary:
      "İğneli epilasyon, her kıl köküne tek tek uygulama yapılan ve özellikle lazerin sınırlı yanıt verebildiği açık renkli, beyaz veya tekil kıllarda değerlendirilebilen bir epilasyon yöntemidir. TDA Luxury Uşak’ta uygulama alanı, kıl yapısı ve cilt hassasiyeti ön görüşmede değerlendirilerek kişiye özel seans planı oluşturulur.",
    suitability: [
      "Açık renkli, beyaz veya lazerin sınırlı gördüğü kılları bulunanlar",
      "Çene, yüz veya küçük alanlarda tekil ve inatçı kılları olanlar",
      "Küçük bölgelerde kıl köklerinin tek tek çalışılmasını isteyenler",
      "Uygunluğu ön değerlendirme ile belirlenen kadın ve erkek danışanlar",
    ],
    cautions: [
      "Aktif enfeksiyon, açık yara veya yoğun cilt tahrişi bulunan bölgelerde uygulama ertelenebilir",
      "Kalp pili veya önemli sağlık öyküsü bulunan kişiler durumu uygulama öncesinde paylaşmalıdır",
      "Kullanılan ilaçlar, cilt tedavileri ve yakın tarihli işlemler ön görüşmede belirtilmelidir",
      "Uygulama sonrası geçici kızarıklık veya hassasiyet oluşabileceği bilinmelidir",
    ],
    preparation: [
      "Uygulanacak kılları randevu öncesinde kökten almayın",
      "Bölgeye tahriş edici peeling veya yoğun aktif içerik uygulamayın",
      "Kullandığınız ilaç ve cilt ürünlerini ön görüşmede paylaşın",
      "İşlem alanının temiz ve erişilebilir olmasını sağlayın",
    ],
    aftercare: [
      "Bölgeyi ilk saatlerde ovuşturmayın ve tahriş etmeyin",
      "Uzmanın önerdiği süre boyunca yoğun sıcak, sauna ve havuzdan kaçının",
      "Güneşe açık bölgelerde uygun güneş korumasına dikkat edin",
      "Uzun süren veya artan olağandışı reaksiyonlarda sağlık profesyoneline danışın",
    ],
    benefits: [
      "Kıl köklerinin tek tek ve kontrollü çalışılması",
      "Açık renkli veya tekil kıllarda değerlendirilebilmesi",
      "Küçük ve hassas bölgelerde kişiye özel planlama",
      "Seans ilerlemesinin bölge bazında takip edilebilmesi",
    ],
    faqs: [
      {
        question: "Uşak’ta iğneli epilasyon hangi kıllar için tercih edilir?",
        answer:
          "Özellikle açık renkli, beyaz, gri veya lazerin sınırlı yanıt verdiği tekil kıllarda değerlendirilebilir. Uygunluk kıl ve cilt yapısına göre belirlenir.",
      },
      {
        question: "İğneli epilasyon kaç seans sürer?",
        answer:
          "Kıl sayısı, uygulama alanı, kıl döngüsü ve düzenli katılıma göre değişir. Herkes için geçerli sabit bir seans sayısı vermek doğru değildir.",
      },
      {
        question: "İğneli epilasyon yüzde uygulanabilir mi?",
        answer:
          "Çene, üst dudak ve yüzün uygun bölgelerinde uygulanabilir; ancak cilt hassasiyeti ve kıl yapısı önceden değerlendirilmelidir.",
      },
      {
        question: "İğneli epilasyon sonrası kızarıklık normal mi?",
        answer:
          "Kısa süreli kızarıklık ve hassasiyet görülebilir. Bakım önerilerine uyulması önemlidir; uzun süren veya artan reaksiyonlarda sağlık profesyoneline danışılmalıdır.",
      },
    ],
  },

  "/bolgesel-incelme": {
    summary:
      "Bölgesel incelme, belirli vücut bölgelerinde daha sıkı ve dengeli bir görünüm hedefleyen destekleyici estetik bakım uygulamalarının kişiye özel planlanmasıdır. TDA Luxury Uşak’ta G5 masajı ve lenf drenaj gibi seçenekler kişinin hedefi, yaşam tarzı ve uygulamaya uygunluğu birlikte değerlendirilerek planlanır. Bu uygulamalar kilo verme tedavisi yerine geçmez ve sonuçlar kişiden kişiye değişebilir.",
    suitability: [
      "Karın, bel, basen veya bacak gibi bölgelerde görünüm odaklı bakım isteyenler",
      "Düzenli yaşam tarzını profesyonel bakım ile desteklemek isteyenler",
      "G5 masajı veya lenf drenaj hakkında kişisel değerlendirme almak isteyenler",
      "Gerçekçi beklentiyle düzenli bakım planına uyabilecek kişiler",
    ],
    cautions: [
      "Hamilelik, aktif dolaşım problemi, varis, pıhtı öyküsü veya ciddi sağlık durumları mutlaka paylaşılmalıdır",
      "Ağrılı, kızarık, enfekte veya açık yara bulunan alanlarda uygulama yapılmamalıdır",
      "Bölgesel bakım kilo verme veya tıbbi tedavi yerine geçmez",
      "Sağlık durumu konusunda tereddüt varsa uygulama öncesinde hekime danışılmalıdır",
    ],
    preparation: [
      "Ön görüşmede hedeflediğiniz bölgeyi ve beklentinizi açıkça paylaşın",
      "Düzenli kullandığınız ilaçları ve sağlık geçmişinizi belirtin",
      "Randevu öncesinde aşırı ağır öğünlerden kaçınmak konfor sağlayabilir",
      "Uygulama planının tek seans değil süreç olarak değerlendirilmesine hazırlıklı olun",
    ],
    aftercare: [
      "Su tüketimi ve günlük hareket konusunda size verilen önerilere uyun",
      "Uygulama bölgesinde olağandışı ağrı veya hassasiyet gelişirse bilgi verin",
      "Seansları önerilen aralıklarda sürdürün",
      "Sonucu yalnızca tartı ile değil, bölgesel görünüm ve kişisel hedeflerle değerlendirin",
    ],
    benefits: [
      "Hedef bölgeye göre kişiye özel bakım planı",
      "G5 ve lenf drenaj gibi seçeneklerin tek çatı altında değerlendirilmesi",
      "Düzenli takip ve gerçekçi beklenti yönetimi",
      "Uşak Merkez’de yüz yüze ön görüşme ve süreç takibi",
    ],
    faqs: [
      {
        question: "Bölgesel incelme kilo verdirir mi?",
        answer:
          "Bölgesel bakım uygulamaları kilo verme tedavisi değildir. Amaç belirli bölgelerde görünümü ve bakım sürecini desteklemektir; beslenme, hareket ve kişisel özellikler sonucu etkiler.",
      },
      {
        question: "Uşak’ta bölgesel incelme için hangi uygulamalar yapılıyor?",
        answer:
          "TDA Luxury’de kişinin ihtiyacına göre G5 masajı ve lenf drenaj gibi destekleyici bakım seçenekleri değerlendirilebilir.",
      },
      {
        question: "Kaç seans gerekir?",
        answer:
          "Hedef bölge, uygulama türü ve kişisel özelliklere göre değişir. Ön görüşmeden sonra gerçekçi bir bakım planı oluşturulur.",
      },
      {
        question: "Bölgesel incelme herkese uygulanabilir mi?",
        answer:
          "Hayır. Sağlık geçmişi, uygulama bölgesi ve kişisel durum değerlendirilmelidir. Bazı durumlarda uygulama ertelenebilir veya sağlık profesyoneli görüşü istenebilir.",
      },
    ],
  },

  "/bolgesel-incelme/g5-masaji": {
    summary:
      "G5 masajı, ritmik mekanik masaj başlıklarıyla belirli vücut bölgelerinde bakım ve görünüm desteği sağlamayı hedefleyen bir uygulamadır. TDA Luxury Uşak’ta uygulama basıncı ve bölge seçimi kişisel hassasiyet, hedef alan ve ön değerlendirmeye göre planlanır; tek başına kilo verme yöntemi olarak sunulmaz.",
    suitability: [
      "Bacak, basen, karın veya bel bölgesinde destekleyici bakım isteyenler",
      "Düzenli vücut bakım programına mekanik masaj eklemek isteyenler",
      "Kişisel hassasiyetine göre kontrollü basınçla uygulama isteyenler",
    ],
    cautions: [
      "Belirgin varis, pıhtı öyküsü, aktif damar problemi veya ciddi dolaşım sorunu paylaşılmalıdır",
      "Hamilelikte ve aktif enfeksiyon/açık yara bulunan bölgelerde uygulama uygun olmayabilir",
      "Kolay morarma, kan sulandırıcı kullanımı veya yoğun hassasiyet önceden belirtilmelidir",
    ],
    preparation: [
      "Sağlık geçmişinizi ve düzenli kullandığınız ilaçları paylaşın",
      "Uygulama bölgesinde ağrı, yara veya yeni işlem varsa belirtin",
      "Rahat kıyafetlerle gelmek uygulama sonrası konfor sağlayabilir",
    ],
    aftercare: [
      "Geçici hassasiyet oluşursa bölgeyi zorlamayın",
      "Su tüketimi ve günlük hareket konusunda verilen önerilere uyun",
      "Yoğun morarma veya beklenmeyen ağrı olursa salonla iletişime geçin",
    ],
    benefits: [
      "Hedef bölgeye göre ayarlanabilen mekanik masaj",
      "Kişisel hassasiyete göre basınç planlaması",
      "Bölgesel bakım programına destekleyici uygulama seçeneği",
    ],
    faqs: [
      {
        question: "G5 masajı zayıflatır mı?",
        answer:
          "G5 masajı kilo verme tedavisi değildir. Bölgesel bakım ve görünüm hedeflerini destekleyen bir uygulama olarak değerlendirilmelidir.",
      },
      {
        question: "G5 masajı acıtır mı?",
        answer:
          "Basınç hissi kişiden kişiye değişir. Uygulama şiddeti kişisel hassasiyete göre ayarlanmalıdır; rahatsızlık hissedildiğinde uzman bilgilendirilmelidir.",
      },
      {
        question: "G5 hangi bölgelere uygulanır?",
        answer:
          "Uygunluk değerlendirmesine göre bacak, basen, karın ve bel gibi bölgelerde planlanabilir.",
      },
    ],
  },

  "/bolgesel-incelme/lenf-drenaj": {
    summary:
      "Lenf drenaj odaklı estetik bakım, ritmik ve kontrollü uygulamalarla vücut bakım rutinini desteklemeyi hedefler. TDA Luxury Uşak’ta uygulama, kişinin sağlık öyküsü ve hedef bölgesi değerlendirilerek planlanır. Tıbbi lenfödem tedavisinin veya hekim değerlendirmesinin yerine geçmez.",
    suitability: [
      "Vücut bakım rutinini kontrollü bir uygulamayla desteklemek isteyenler",
      "G5 dışındaki daha farklı bir bakım seçeneğini değerlendirmek isteyenler",
      "Ön görüşme sonrasında uygulamaya uygun bulunan danışanlar",
    ],
    cautions: [
      "Tanılı lenfödem, kalp-damar hastalığı, pıhtı öyküsü veya ciddi dolaşım problemi varsa hekim görüşü alınmalıdır",
      "Aktif enfeksiyon, ateş veya açık yara bulunan durumlarda uygulama ertelenmelidir",
      "Hamilelik ve önemli sağlık durumları mutlaka önceden paylaşılmalıdır",
    ],
    preparation: [
      "Sağlık geçmişinizi eksiksiz paylaşın",
      "Uygulama amacınızı ve hedef bölgenizi ön görüşmede belirtin",
      "Doktor takibinde olduğunuz bir durum varsa uygulama öncesinde görüş alın",
    ],
    aftercare: [
      "Size verilen günlük hareket ve sıvı tüketimi önerilerine uyun",
      "Olağandışı ağrı, şişlik veya rahatsızlıkta sağlık profesyoneline başvurun",
      "Bakım planını kişisel ihtiyaca göre sürdürün",
    ],
    benefits: [
      "Kişiye özel ve kontrollü uygulama planı",
      "Vücut bakım rutinine destekleyici seçenek",
      "Uygunluk değerlendirmesiyle daha güvenli süreç yönetimi",
    ],
    faqs: [
      {
        question: "Lenf drenaj ne için yapılır?",
        answer:
          "Estetik bakım kapsamında vücut bakım rutinini desteklemek amacıyla değerlendirilebilir. Tıbbi bir rahatsızlığın tedavisi olarak sunulmaz.",
      },
      {
        question: "Lenf drenaj herkese uygun mu?",
        answer:
          "Hayır. Özellikle kalp-damar, pıhtı, aktif enfeksiyon veya tanılı lenf sistemi hastalıklarında sağlık profesyoneli değerlendirmesi gerekebilir.",
      },
      {
        question: "Uşak’ta lenf drenaj için ön görüşme gerekiyor mu?",
        answer:
          "Evet. TDA Luxury’de sağlık öyküsü, hedef bölge ve beklenti değerlendirilerek uygunluk hakkında bilgi verilir.",
      },
    ],
  },

  "/kas-kirpik": {
    summary:
      "Kaş ve kirpik hizmetleri, yüz ifadesini doğal yapıyı koruyarak daha düzenli ve belirgin göstermeyi hedefleyen uygulamaları bir araya getirir. TDA Luxury Uşak’ta kirpik lifting, ipek kirpik, kaş laminasyonu, altın oran kaş tasarımı ve profesyonel kaş alımı; mevcut kıl-kirpik yapısı ve istenen görünüme göre ayrı ayrı planlanır.",
    suitability: [
      "Kaş formunu yüz hatlarına göre düzenlemek isteyenler",
      "Doğal kirpiklerde kıvrım ve belirginlik isteyenler",
      "İpek kirpik ile daha yoğun kirpik görünümü hedefleyenler",
      "Kaş laminasyonu veya profesyonel şekillendirme hakkında bilgi almak isteyenler",
    ],
    cautions: [
      "Göz çevresinde aktif enfeksiyon, arpacık veya belirgin irritasyon varsa kirpik işlemleri ertelenmelidir",
      "Kaş bölgesinde açık yara veya yoğun tahriş varsa işlem yapılmamalıdır",
      "Alerji öyküsü, göz hassasiyeti ve yakın tarihli işlemler önceden paylaşılmalıdır",
    ],
    preparation: [
      "Kirpik işlemi günü göz makyajı ve yağlı ürün kullanmayın",
      "Kaşlarınızı randevudan hemen önce evde şekillendirmeyin",
      "İstediğiniz görünümü doğal, belirgin veya yoğun gibi açık biçimde tarif edin",
    ],
    aftercare: [
      "Seçilen uygulamanın ilk 24 saat bakım kurallarına uyun",
      "Kaş ve kirpikleri gereksiz yere ovuşturmayın",
      "Uzmanın önerdiği bakım aralığını takip edin",
    ],
    benefits: [
      "Tek sayfadan farklı kaş ve kirpik seçeneklerini karşılaştırma",
      "Yüz ve göz yapısına göre kişisel planlama",
      "Doğal görünümden daha belirgin stile kadar farklı seçenekler",
      "Uşak Merkez’de aynı salonda bakım ve takip",
    ],
    faqs: [
      {
        question: "Kirpik lifting mi ipek kirpik mi daha uygun?",
        answer:
          "Kirpik lifting mevcut kirpiği kıvırır; ipek kirpik ise ek kirpiklerle yoğunluk ve uzunluk oluşturur. Tercih doğal kirpik yapısı ve beklenen görünüme göre değişir.",
      },
      {
        question: "Kaş laminasyonu ile kaş tasarımı aynı mı?",
        answer:
          "Hayır. Laminasyon kaş tellerinin yön ve görünümünü düzenlemeye odaklanırken, kaş tasarımı yüz oranına göre form belirlemeyi içerir.",
      },
      {
        question: "Uşak’ta kaş ve kirpik randevusu nasıl alınır?",
        answer:
          "TDA Luxury randevu sayfasından gün ve saat seçebilir veya WhatsApp üzerinden istediğiniz uygulamayı belirterek bilgi alabilirsiniz.",
      },
    ],
  },

  "/tirnak": {
    summary:
      "Tırnak hizmetleri, el ve ayak bakımından daha uzun süreli estetik uygulamalara kadar farklı ihtiyaçları kapsar. TDA Luxury Uşak’ta protez tırnak, kalıcı oje, manikür ve pedikür; doğal tırnak yapısı, günlük kullanım alışkanlıkları ve istenen görünüm dikkate alınarak planlanır.",
    suitability: [
      "Daha düzenli ve bakımlı tırnak görünümü isteyenler",
      "Protez tırnak veya kalıcı oje seçeneklerini değerlendirenler",
      "Profesyonel manikür ve pedikür bakımı isteyenler",
      "Günlük kullanımına uygun uzunluk ve form konusunda destek isteyenler",
    ],
    cautions: [
      "Tırnak çevresinde aktif enfeksiyon, mantar şüphesi, açık yara veya belirgin iltihap varsa işlem ertelenmelidir",
      "Alerji veya önceki jel/akrilik ürün reaksiyonları uygulama öncesinde paylaşılmalıdır",
      "Tırnak plağında ciddi hasar veya ağrı varsa sağlık profesyoneli değerlendirmesi gerekebilir",
    ],
    preparation: [
      "Randevu öncesinde tırnakları aşırı kısaltmayın",
      "Varsa önceki ürün veya uygulama sorunlarını belirtin",
      "İstediğiniz form, uzunluk ve renk için örnek görsel getirebilirsiniz",
    ],
    aftercare: [
      "Tırnakları sert yüzeyleri açmak veya kazımak için kullanmayın",
      "Bakım ve yenileme aralıklarını uygulama türüne göre takip edin",
      "Kalkma veya kırılma olduğunda ürünü evde zorlayarak sökmeyin",
      "El ve tırnak çevresini düzenli nemlendirin",
    ],
    benefits: [
      "Protez tırnak, kalıcı oje, manikür ve pedikürü tek merkezde değerlendirme",
      "Günlük kullanıma göre form ve uzunluk seçimi",
      "Bakım aralıkları hakkında düzenli bilgilendirme",
      "Uşak Merkez’de randevulu ve hijyen odaklı hizmet",
    ],
    faqs: [
      {
        question: "Protez tırnak ile kalıcı oje arasındaki fark nedir?",
        answer:
          "Protez tırnak doğal tırnağa uzunluk veya yapı kazandırabilir; kalıcı oje ise çoğunlukla mevcut doğal tırnak üzerinde uzun süreli renk ve parlaklık sağlar.",
      },
      {
        question: "Kalıcı oje ne kadar dayanır?",
        answer:
          "Tırnak uzama hızı, günlük kullanım ve bakım alışkanlıklarına göre değişir. Düzenli bakım aralığı kişiye göre planlanır.",
      },
      {
        question: "Uşak’ta manikür ve pedikür randevusu nasıl alınır?",
        answer:
          "TDA Luxury randevu sayfasından gün ve saat seçebilir veya WhatsApp üzerinden hizmeti belirterek randevu talebi bırakabilirsiniz.",
      },
    ],
  },
};
