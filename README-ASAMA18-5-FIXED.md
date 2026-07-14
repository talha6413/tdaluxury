# Aşama 18.5 — Yerel SEO (Düzeltilmiş)

Bu sürümde yön değiştirilmedi. Aşama 18.4 tam proje paketi temel alındı ve yalnızca yerel SEO katmanı eklendi.

## Önemli düzeltme

Proje Tailwind CSS kullanmıyor. Önceki 18.5 sayfası Tailwind utility sınıflarıyla yazıldığı için düz metin görünüyordu. Bu sürüm tamamen projenin mevcut özel CSS mimarisine göre yeniden yazıldı.

## Eklenenler

- `/usak-guzellik-salonu`
- Uşak Merkez ve çevre ilçeler için yerel SEO sinyalleri
- BeautySalon, Service, FAQ ve Breadcrumb şemaları
- Footer iç bağlantısı
- Sitemap rotası
- `.env.example` işletme bilgisi alanları

## Test

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```
