# TDA Luxury v12 — WhatsApp Otomasyon Merkezi

## Yeni sayfa
`/yonetim-v2/whatsapp`

## Kurulum
ZIP içeriğini proje köküne çıkarın ve mevcut klasör yapısıyla birleştirin.

## Kontrol
```bash
npm run typecheck
npm run lint
npm run build
```

## Özellikler
- Mesaj kuyruğu
- WhatsApp Web üzerinden tek tık açma
- Gönderildi olarak işaretleme
- Mesaj iptali
- Hazır mesaj şablonları
- Şablon düzenleme
- Otomasyon kurallarını aktif/pasif yapma
- Müşteri seçerek mesaj hazırlama
- Gönderim durumu filtreleme
- Arama
- Mobil uyumlu görünüm

## Supabase
`whatsapp_automation_v12` migration'ı canlı projeye uygulanmıştır. SQL'i yeniden çalıştırmanız gerekmez.

## Not
Bu sürüm WhatsApp Web bağlantısı kullanır. Tam otomatik ve toplu gönderim için ileride resmi WhatsApp Business Platform entegrasyonu gerekir.
