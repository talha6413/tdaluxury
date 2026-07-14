# TDA Luxury V1.0 — Canlı Yayın Rehberi

## 1. Ortam değişkenleri

`.env.production.example` içeriğini Vercel Project Settings → Environment Variables alanına ekleyin.

Canlı yayından önce ayrıca şu iki değeri tamamlayın:

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

## 2. Yerel final kontrol

```bash
npm install
npm run verify
```

## 3. Vercel yayını

1. Vercel hesabına giriş yapın.
2. **Add New → Project** seçin.
3. Projeyi GitHub üzerinden içe aktarın veya Vercel CLI kullanın.
4. Framework otomatik olarak **Next.js** seçilmelidir.
5. Ortam değişkenlerini ekleyin.
6. Deploy düğmesine basın.

## 4. Domain

Vercel → Settings → Domains bölümüne şunları ekleyin:

- `tdaluxury.com.tr`
- `www.tdaluxury.com.tr`

Ana domain olarak `www.tdaluxury.com.tr` kullanın.

## 5. Yayın sonrası kontrol

Aşağıdaki adresleri açın:

- `/`
- `/hizmetler`
- `/iletisim`
- `/randevu`
- `/sitemap.xml`
- `/robots.txt`
- `/api/health`

## 6. Google Search Console

Domain doğrulamasından sonra sitemap olarak şunu gönderin:

```text
https://www.tdaluxury.com.tr/sitemap.xml
```

## 7. Google Analytics 4

GA4 ölçüm kimliğini `NEXT_PUBLIC_GA_ID` değişkenine ekleyin. Çerez onayı olmadan ölçüm başlamaz.
