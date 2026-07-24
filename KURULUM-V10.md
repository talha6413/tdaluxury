# TDA Luxury Fotoğraf ve Öncesi/Sonrası Yönetimi v10

## İçerik
- Müşteri bazlı işlem albümleri
- Öncesi, sonrası, süreç ve diğer fotoğraf türleri
- Özel Supabase Storage bucket
- Bir saatlik güvenli imzalı fotoğraf adresleri
- Öncesi/sonrası yan yana karşılaştırma
- Müşteri ve işlem bazlı filtreleme
- Fotoğraf silme ve arşiv yenileme
- Mobil uyumlu yönetim ekranı

## Kurulum
ZIP içeriğini proje ana klasörüne çıkarın.

Supabase migration:
`supabase/migrations/20260724_customer_photos_v10.sql`

Kontrol:
```bash
npm run typecheck
npm run lint
npm run build
```

Ekran:
`/yonetim-v2/fotograflar`
