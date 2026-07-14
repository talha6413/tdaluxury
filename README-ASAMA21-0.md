# Aşama 21.0 — Yayın Öncesi Final Kontrol

Bu sürüm yeni tasarım yönü eklemez. Mevcut siteyi canlı yayına hazırlamak için kontrol ve doğrulama altyapısı ekler.

## Eklenenler

- `npm run preflight`: ortam değişkenleri ve kritik dosyaları kontrol eder.
- `npm run verify`: preflight, SEO audit, TypeScript, lint ve production build komutlarını sırayla çalıştırır.
- `/api/health`: sitenin çalıştığını dışarıdan kontrol etmek için sağlık endpoint'i.
- Metadata URL'leri artık merkezi `site.url` ayarını kullanır.
- `.env.production.example`: canlı ortamda doldurulması gereken gerçek bilgiler.

## Canlı Yayın Öncesi

1. `.env.production.example` dosyasını `.env.local` olarak kopyalayın.
2. Açık adres, harita, GA4 ve Search Console değerlerini doldurun.
3. Çalıştırın:

```bash
npm install
npm run verify
```

4. Yerelde kontrol edin:

```bash
npm run dev
```

5. Sağlık kontrolü:

```text
http://localhost:3000/api/health
```

## Kritik Not

Gerçek açık adres ve Google Maps bağlantıları girilmeden yerel SEO verileri tam güvenilir değildir. Site, Google İşletme Profili ve yapılandırılmış verideki işletme adı, adres ve telefon bilgileri birebir aynı olmalıdır.
