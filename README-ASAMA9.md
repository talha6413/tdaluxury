# Aşama 9 — Yayın Hazırlığı ve Yasal Sayfalar

Bu sürümde:

- Google Analytics için opsiyonel ortam değişkeni entegrasyonu
- Google Search Console doğrulama alanı
- Klavye erişimi için “Ana içeriğe geç” bağlantısı
- Gizlilik Politikası
- Çerez Politikası
- KVKK Aydınlatma Metni
- Footer yasal bağlantıları ve telif satırı
- Sitemap’e yeni sayfaların eklenmesi

## Ortam değişkenleri

`.env.local` oluşturup ihtiyacın olan alanları doldur:

```env
NEXT_PUBLIC_SITE_URL=https://www.tdaluxury.com.tr
NEXT_PUBLIC_WHATSAPP_NUMBER=905366651064
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/tdaluxuryusak
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

Google Analytics kullanmayacaksan `NEXT_PUBLIC_GA_ID` boş kalabilir.

## Test sonucu

- `npm run typecheck` başarılı
- `npm run lint` başarılı
- `npm run build` başarılı
- 55 rota üretildi

## Yayından önce

KVKK metnindeki işletme unvanı, açık adres ve başvuru kanalını gerçek bilgilerle tamamla.
