# TDA Luxury v11.1 — Yapay Zekâ İşletme Asistanı

## Kurulum
ZIP içeriğini proje köküne çıkarın.

## Yeni sayfa
`/yonetim-v2/asistan`

## Kontrol
```bash
npm run typecheck
npm run lint
npm run build
```

## Özellikler
- Bu ay tahsilat, gider ve net kazanç
- Bugünkü randevular
- Personel ciro sıralaması
- Aktif paket borçları
- Son 30 günlük yeni müşteri
- En yüksek gider kategorisi
- Doğal dil benzeri soru-cevap
- Salt okunur çalışma: veritabanına kayıt eklemez veya silmez

Bu sürüm harici yapay zekâ API anahtarı gerektirmez. Sorular güvenli niyet eşleştirme ile yorumlanır.


## v11.1 düzeltmeleri
- `money()` artık `number | string | null | undefined` kabul eder.
- Tüm finansal hesaplamalar güvenli biçimde sayıya çevrilir.
- `reduce()` dönüş tipleri açıkça `number` olarak tanımlandı.
- Personel, borç ve gider hesaplamalarında `NaN` koruması eklendi.
- UUID üretiminde tarayıcı uyumluluk fallback'i eklendi.
