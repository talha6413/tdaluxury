# TDA Luxury — Sprint 5 Release Candidate QA

Bu sprint, tasarımı değiştirmeden V1.0 yayın adayının otomatik kalite kontrolünü güçlendirir.

## Eklenenler

- `npm run smoke:audit`
- Production sunucusunu geçici olarak başlatan otomatik rota testi
- 16 kritik rota/asset kontrolü
- Ana sayfa title ve canonical kontrolü
- Güvenlik başlıkları kontrolü
- Eski `/microblading` adresinin yönlendirme testi
- `npm run verify` zincirine production smoke testi

## Komutlar

```bash
npm install
npm run verify
```

`verify` sırasıyla preflight, SEO, iç bağlantı, asset, TypeScript, ESLint, production build ve smoke test çalıştırır.

## Doğrulama sonucu

- Preflight: geçti (yalnızca `.env.local` uyarısı)
- SEO audit: 33 hizmet, 16 blog
- İç bağlantı audit: 104 referans, 65 rota
- Asset audit: 600 KB üzeri görsel yok; video toplamı 6.80 MB
- TypeScript: geçti
- ESLint: geçti
- Production build: 71/71 sayfa
- Smoke audit: 16 kritik rota ve güvenlik/SEO başlıkları geçti

## Bağımlılık notu

`npm audit --omit=dev`, Next.js'in kullandığı PostCSS için 3 orta seviye uyarı gösteriyor. 13 Temmuz 2026 itibarıyla npm raporunda uygulanabilir otomatik düzeltme bulunmuyor. Yüksek veya kritik seviye açık raporlanmadı. Next.js/PostCSS güncellemeleri takip edilmelidir.
