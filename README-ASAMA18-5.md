# Aşama 18.5 — Yerel SEO ve NAP Güçlendirmesi

Bu sürümde:

- `/usak-guzellik-salonu` yerel SEO sayfası
- Uşak Merkez ve çevre ilçeler için doğal hizmet bölgesi sinyalleri
- Geliştirilmiş `BeautySalon` şeması
- Açılış saatleri, harita, telefon ve adres alanları
- Service alanlarının schema içinde güçlendirilmesi
- Footer'da yerel SEO sayfasına dahili bağlantı
- Sitemap'e yeni rota
- `.env.example` içinde açık adres ve harita ayar alanları

## Testler

```bash
npm run typecheck
npm run lint
npm run build
```

60 rota başarıyla üretildi.

## Yayın öncesi

`.env.local` dosyasında gerçek açık adresi doldurun:

```env
NEXT_PUBLIC_LEGAL_NAME=
NEXT_PUBLIC_ADDRESS_LABEL=
NEXT_PUBLIC_STREET_ADDRESS=
NEXT_PUBLIC_POSTAL_CODE=
NEXT_PUBLIC_MAPS_URL=
NEXT_PUBLIC_MAPS_EMBED_URL=
```

Yanlış adres yazmayın. Google İşletme Profili, web sitesi ve yapılandırılmış veride aynı NAP bilgileri kullanılmalıdır.
