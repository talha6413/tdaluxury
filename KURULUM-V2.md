# TDA Luxury Ultimate v2 — Kurulum

Bu ZIP, mevcut `tdaluxury` projesinin üzerine uygulanacak güncelleme paketidir.

## 1. Yedek alın
```bash
git add .
git commit -m "V2 öncesi yedek"
git push origin main
```

## 2. ZIP'i proje köküne çıkarın
`app`, `components`, `lib`, `public` ve `supabase` klasörleri proje köküyle birleşmelidir.

Mevcut dosyanın üzerine yazılması istenirse:
- `components/Nav.tsx` için izin verin.
- V1 müşteri paneli zaten yüklüyse dosyaların güncellenmesine izin verin.

## 3. Kontrol
```bash
npm install
npm run typecheck
npm run lint
npm run build
```

## 4. GitHub
```bash
git add .
git commit -m "TDA Luxury Ultimate v2 platformunu ekle"
git push origin main
```

## 5. Supabase
Supabase SQL Editor içinde sırasıyla çalıştırın:
1. `supabase/migrations/20260724_customer_portal.sql`
2. `supabase/migrations/20260724_platform_v2.sql`

SQL çalıştırılmadan arayüz sayfaları açılır ancak kayıtlar örnek verilerle görünür.

## 6. Yeni adresler
- `/musteri-paneli`
- `/yonetim-v2`
- `/yonetim-v2/musteriler`
- `/yonetim-v2/randevular`
- `/yonetim-v2/finans`
- `/yonetim-v2/stok`
- `/personel-paneli`
- `/dijital-onam`
- `/ai-cilt-analizi`

## 7. Entegrasyon anahtarları
`.env.example.v2` içeriğini `.env.local` dosyanıza, mevcut değerleri silmeden ekleyin.

Ödeme, SMS, WhatsApp ve AI işlemleri anahtar olmadan gerçek servis çağrısı yapmaz.

## Güvenlik notu
Bu paket yönetim ekranlarının çalışan arayüzünü ve veritabanı şemasını sağlar. Canlı müşteri verisi toplamadan önce:
- Supabase Auth rol kontrolü,
- ayrıntılı RLS politikaları,
- KVKK metinlerinin hukuk kontrolü,
- ödeme sağlayıcısı callback doğrulaması
tamamlanmalıdır.
