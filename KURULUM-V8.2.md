# TDA Luxury Akıllı Stok Yönetimi v8.2

## Düzeltilen React 19 lint hataları
- Effect içinde doğrudan state güncellemesine yol açan ilk yükleme, zamanlayıcı ile ertelendi.
- Render sırasında kullanılan `Date.now()` kaldırıldı.
- Son kullanma tarihi hesabı, modül seviyesinde oluşturulan sabit referans zamanıyla yapılıyor.

## Kurulum
ZIP içeriğini projenin ana klasörüne çıkarın ve mevcut dosyaların üzerine yazın.

```bash
npm run typecheck
npm run lint
npm run build
```
