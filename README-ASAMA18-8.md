# AŞAMA 18.8 — Core Web Vitals ve Performans

Bu sürüm Aşama 18.7 projesi üzerine hazırlanmıştır.

## Yapılanlar

- Hero bileşeni sunucu bileşenine dönüştürüldü; yalnızca video düğmesi hydrate edilir.
- Video modal kodu, kullanıcı butona basana kadar yüklenmez.
- Alt bar, hızlı iletişim paneli ve güzellik danışmanı tarayıcı boşta kaldığında yüklenir.
- Premium açılış yalnızca ana sayfada çalışır; diğer rotaların ilk yükünü etkilemez.
- Açılış ekranı tekrar ziyaretlerde gereksiz yere SSR çıktısında görünmez.
- Büyük salon JPEG görselleri daha küçük WebP dosyalarına dönüştürüldü.
- Instagram görsellerine düşük maliyetli kalite ve lazy-loading ayarları eklendi.
- Ekran altındaki bölümlerde `content-visibility` ile render maliyeti azaltıldı.
- Hareket azaltma tercihinde gereksiz animasyon maliyeti düşürüldü.

## Test

```bash
npm install
npm run typecheck
npm run lint
npm run build
```
