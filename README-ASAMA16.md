# Aşama 16 — Yayın Güvenliği, Çerez Onayı ve Performans

Bu sürümde:

- Google Analytics yalnızca kullanıcı analitik çerezlere onay verirse yüklenir.
- Premium görünümlü çerez tercih paneli eklendi.
- Çerez politikası bağlantısı eklendi.
- Güvenlik başlıkları eklendi.
- Next.js `X-Powered-By` başlığı kapatıldı.
- Görseller için AVIF/WebP tercihleri etkinleştirildi.
- Yerel görsel ve video dosyalarına uzun süreli önbellek başlığı eklendi.
- Gzip/Brotli sunucu sıkıştırması için Next.js compression açık tutuldu.

## Ortam değişkenleri

`.env.local` dosyasına canlı değerleri ekleyin:

```env
NEXT_PUBLIC_SITE_URL=https://www.tdaluxury.com.tr
NEXT_PUBLIC_WHATSAPP_NUMBER=905366651064
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/tdaluxuryusak
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxx
```

GA4 kimliği boş bırakılırsa Analytics yüklenmez.
