# TDA Luxury Canlı Randevu Yönetimi v6

Bu sürüm `/yonetim-v2/randevular` ekranındaki örnek listeyi gerçek Supabase randevu yönetimiyle değiştirir.

## Özellikler
- Gün bazlı canlı takvim
- Önceki gün / sonraki gün / bugün
- Randevu arama ve durum filtresi
- Yeni randevu oluşturma
- Müşteri, hizmet, personel ve oda seçimi
- Hizmet süresinden otomatik dakika önerisi
- Personel ve oda çakışma kontrolü
- Randevu durumunu doğrudan değiştirme
- Bekliyor, onaylı, tamamlandı, iptal ve gelmedi durumları
- Gerçek Supabase verileri

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
git commit -m "Canlı randevu yönetimi ve çakışma kontrolünü ekle"
git push origin main
```

## Yetki
Randevu ekleme ve durum değiştirme işlemleri mevcut Supabase RLS politikalarına göre yalnızca yetkili personel veya yönetici hesaplarında çalışır.
