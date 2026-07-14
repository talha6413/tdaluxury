# Aşama 18.9 — Dönüşüm Optimizasyonu

Bu sürüm 18.8 performans paketinin devamıdır.

## Eklenenler

- WhatsApp, telefon, harita ve Instagram tıklama ölçümü
- Google Analytics 4 için özel dönüşüm eventleri
- Çerez onayı verilmeden ölçüm yapılmaması
- Randevu formunda telefon, hizmet ve KVKK onayı kontrolü
- WhatsApp mesajına kaynak sayfanın eklenmesi
- Randevu form gönderim eventinin ölçülmesi
- Daha açık güven ve gizlilik mesajları

## GA4 event adları

- `whatsapp_click`
- `phone_click`
- `map_click`
- `instagram_click`
- `appointment_form_submit`
- `assistant_whatsapp_click`
- `video_open`

GA4 içinde önemli event olarak işaretlenmesi önerilenler:

- `whatsapp_click`
- `phone_click`
- `appointment_form_submit`

## Ortam değişkeni

`.env.local` dosyasına gerçek GA4 kimliğini ekleyin:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
