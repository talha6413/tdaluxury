# TDA Luxury Canlı Yönetim Dashboard v4

Bu paket, `/yonetim-v2` ekranındaki örnek rakamları kaldırır ve mevcut Supabase tablolarına bağlar.

## Gösterilen canlı veriler
- Bugünkü tahsilat
- Aylık tahsilat
- Aylık gider
- Net sonuç
- Bugünkü randevular
- Onay bekleyen randevular
- Aktif ve yeni müşteriler
- Aktif paketler
- Paketlerden kalan alacak
- Son 7 günlük gelir/gider grafiği
- Son eklenen müşteriler

## Kurulum
ZIP içindeki `components` klasörünü proje köküne çıkarın ve dosyaların üzerine yazılmasına izin verin.

```bash
npm run typecheck
npm run lint
npm run build
```

Ardından:

```bash
git add .
git commit -m "Yönetim dashboardunu canlı Supabase verilerine bağla"
git push origin main
```

## Yetki
Dashboard, mevcut Supabase RLS politikalarına göre veri okur. Yönetici hesabı oturum açmamışsa veya yetkili değilse ekranda güvenli yetki uyarısı gösterilir.


## Fixed sürüm
React `set-state-in-effect` lint hatası giderildi.
