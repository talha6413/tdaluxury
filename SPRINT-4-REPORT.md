# Sprint 4 — Performans ve Görsel Yükleme

- Ana Hero arka planı CSS background yerine `next/image` ile öncelikli yüklenecek şekilde taşındı.
- Hero için `fetchPriority="high"`, `priority` ve doğru `sizes` tanımlandı.
- Blog liste görsellerine responsive `sizes` ve kontrollü kalite değerleri eklendi.
- Hakkımızda ve Kampanyalar görsellerindeki eksik `sizes` ayarları tamamlandı.
- Kullanılmayan JPEG salon kopyaları kaldırıldı; WebP sürümleri korundu.
- `npm run assets:audit` komutu eklendi.
- `npm run verify` zincirine asset denetimi dahil edildi.
