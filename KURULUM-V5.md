# TDA Luxury Gerçek Müşteri Yönetimi v5

Bu paket örnek müşteri listesini kaldırır ve gerçek Supabase kayıtlarına bağlar.

## Yeni özellikler
- Gerçek müşteri listesi
- Ad, telefon ve e-posta ile arama
- Aktif/pasif filtreleme
- Yeni müşteri kartı oluşturma
- Son randevu, kalan seans ve borç özeti
- Her müşteri için ayrı detay sayfası
- Randevu geçmişi
- Paket ve seans takibi
- Ödeme hareketleri
- Onam belgeleri
- Fotoğraf kayıtları
- Profil ve personel notları

## Yeni adres
`/yonetim-v2/musteriler/[musteri-id]`

## Kurulum
ZIP içindeki `app` ve `components` klasörlerini proje köküne çıkarın.

```bash
npm run typecheck
npm run lint
npm run build
```

Ardından:

```bash
git add .
git commit -m "Gerçek müşteri yönetimi ve müşteri kartını ekle"
git push origin main
```

## Güvenlik
Bu ekranlar mevcut Supabase RLS yetkilerine bağlıdır. Yönetici/personel oturumu olmadan müşteri verileri okunamaz veya eklenemez.


## Fixed sürüm
Supabase untyped client nedeniyle oluşan `never[]` insert TypeScript hatası giderildi.
