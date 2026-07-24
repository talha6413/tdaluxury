# TDA Luxury Finans ve Kasa Yönetimi v7.1

## Özellikler

- Günlük ve aylık kasa görünümü
- Toplam gelir, gider ve net kasa
- Nakit, kart/POS ve havale dağılımı
- Gerçek Supabase `payments` kayıtları
- Gerçek Supabase `expenses` kayıtları
- Yeni ödeme alma
- Yeni gider ekleme
- Müşteri seçimi
- Paket borcuna ödeme bağlama
- Paket kalan borcunu otomatik güncelleme
- Fazla tahsilatı engelleme
- Cari ve alacak listesi
- Tek tıkla borç tahsil etme
- Arama ve ödeme yöntemi filtresi

## Kurulum

ZIP içindeki `app` ve `components` klasörlerini proje köküne çıkarın.

```bash
npm run typecheck
npm run lint
npm run build
```

Hata yoksa:

```bash
git add .
git commit -m "Finans kasa ve cari yönetimini ekle"
git push origin main
```

Ekran adresi:

`/yonetim-v2/finans`

Bu modül mevcut `payments`, `expenses`, `customer_packages` ve `customers`
tablolarını kullanır. Yeni migration gerektirmez.


## v7.1 Düzeltmesi
- `BadgeTurkishLira` ikonu kaldırıldı.
- Yerine daha geniş sürüm uyumluluğu için `DollarSign` kullanıldı.
