# TDA Luxury Personel ve Prim Yönetimi v9

## Özellikler
- Personel kartları
- Maaş, prim oranı ve aylık hedef
- Dönemsel hizmet/ürün cirosu
- İşlem adedi ve bonus kaydı
- Otomatik bordro hesaplama
- Bordroyu ödendi olarak işaretleme
- Mobil uyumlu yönetim ekranı

## Kurulum
ZIP içeriğini proje ana klasörüne çıkarın.

Supabase migration:
`supabase/migrations/20260724_staff_payroll_v9.sql`

Kontrol:
```bash
npm run typecheck
npm run lint
npm run build
```

Ekran:
`/yonetim-v2/personel`
