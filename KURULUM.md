# TDA Luxury Müşteri Paneli v1

Bu ZIP tam site değildir; mevcut `talha6413/tdaluxury` projesinin üzerine uygulanacak güncelleme paketidir.

## Kurulum

1. ZIP'i açın.
2. İçindeki `app`, `components` ve `supabase` klasörlerini mevcut projenin ana klasörüne kopyalayın.
3. Sorulduğunda `components/Nav.tsx` dosyasının üzerine yazılmasına izin verin.
4. Terminalde çalıştırın:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

5. GitHub'a gönderin:

```bash
git add .
git commit -m "Müşteri paneli temel modüllerini ekle"
git push origin main
```

Vercel otomatik deployment başlatacaktır.

## Supabase

`supabase/migrations/20260724_customer_portal.sql` dosyası müşteri profili, paket, ödeme, belge, fotoğraf ve bildirim tablolarını oluşturur. SQL'i Supabase SQL Editor üzerinden çalıştırmadan önce yedek alın.

## Bu sürümde çalışanlar

- `/musteri-paneli` premium ve mobil uyumlu arayüz
- Telefon giriş formu doğrulaması
- Beni hatırla kutusu
- Randevu, paket, ödeme, fotoğraf, belge, sadakat ve bildirim modül kartları
- Navigasyonda müşteri paneli ikonu
- Mobil menüde Müşteri Girişi bağlantısı
- SEO dışı güvenli müşteri paneli metadata ayarı
- Supabase temel tablo ve RLS şeması

## Henüz canlı servise bağlanmayanlar

Telefon OTP, gerçek müşteri kayıtları, ödeme sağlayıcısı, WhatsApp/SMS ve dosya depolama entegrasyonları servis anahtarları gerektirir. Arayüzde sahte veri veya sahte ödeme akışı kullanılmamıştır.
