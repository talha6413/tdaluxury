# TDA Luxury V1.0 — Sprint 1 Raporu

## Yapılanlar

- Next.js görsel kalite yapılandırmasına kullanılan değerler eklendi: 72, 75, 80, 85, 90, 95, 100.
- TypeScript denetimi çalıştırıldı ve geçti.
- ESLint denetimi çalıştırıldı ve geçti.
- SEO audit çalıştırıldı: 33 hizmet, 16 blog yazısı doğrulandı.
- Preflight kontrolü geçti; yalnızca canlı ortam için `.env.local` uyarısı mevcut.
- Production build tamamlandı; 71 statik sayfa başarıyla üretildi.
- Eski aşama README dosyaları ve geçici TypeScript build cache dosyası temizlendi.

## Doğrulanan komutlar

```bash
npm run preflight
npm run seo:audit
npm run typecheck
npm run lint
npm run build
```

## Canlı yayın öncesi kalan zorunlu işlem

`.env.example` dosyasını `.env.local` olarak kopyalayıp gerçek GA4 ve Search Console değerlerini ekleyin. İşletme adresi, telefon ve çalışma saatleri mevcut ayarlarda korunmuştur.
