# TDA Luxury Online Ödeme v15

Bu paket müşteri paneline PayTR iFrame online ödeme altyapısını ekler.
Veritabanı migrationı canlı Supabase projesine uygulanmıştır.

## Kurulum

ZIP içeriğini proje köküne çıkarın ve dosyaların üzerine yazılmasına izin verin.

## Vercel ortam değişkenleri

PayTR hesabı açıldıktan sonra şu değişkenleri ekleyin:

```env
PAYTR_MERCHANT_ID=
PAYTR_MERCHANT_KEY=
PAYTR_MERCHANT_SALT=
PAYTR_TEST_MODE=1
SUPABASE_SERVICE_ROLE_KEY=
```

PayTR mağaza panelindeki Bildirim URL:

```text
https://tdaluxury.com.tr/api/payments/callback
```

## Kontrol

```bash
npm run typecheck
npm run lint
npm run build
```

PayTR bilgileri eklenmeden ödeme butonu güvenli biçimde bilgilendirme mesajı verir.
Kart bilgileri uygulama sunucusunda saklanmaz.
