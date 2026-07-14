# Aşama 20.9 — Teknik SEO Sağlamlaştırma

Bu sürümde:

- Sitemap tarihleri her istekte değişmek yerine gerçek içerik güncelleme tarihlerine bağlandı.
- Sayfa türlerine göre sitemap öncelikleri ve güncelleme sıklıkları düzenlendi.
- Eski Türkçe karakterli ve kısa URL'lerden canonical URL'lere kalıcı yönlendirmeler eklendi.
- Web manifest eklendi.
- Robots yapılandırması sadeleştirildi.
- `npm run seo:audit` komutu eklendi.
- SEO audit; tekrar eden slug/title, eksik hizmet rotası ve kritik SEO dosyalarını kontrol eder.

## Kontrol

```bash
npm install
npm run seo:audit
npm run typecheck
npm run lint
npm run build
```
