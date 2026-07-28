# TDA Luxury güvenlik ve ölçüm düzeltmeleri — 28 Temmuz 2026

- Google Tag Manager ve Google Ads yalnızca kullanıcı isteğe bağlı çerezleri kabul ettikten sonra yüklenir.
- Google Consent Mode varsayılanı `denied` olarak ayarlanmıştır.
- Google Maps iframe'i onay verilene kadar yüklenmez.
- Telefon tıklamalarını ayrıca doğrudan Google Ads'e gönderen ikinci dinleyici kaldırılmıştır; olaylar merkezi dönüşüm izleyiciden gider.
- Content-Security-Policy ve mevcut güvenlik başlıkları etkinleştirilmiştir.
- Çalışma saati tüm görünür alanlarda 09.00–19.30 olarak eşitlenmiştir.
- Sitemap yayın tarihi güncellenmiştir.
- Depoda gerçek service-role, PayTR veya OpenAI anahtarı bulunmamıştır; yalnızca ortam değişkeni referansları vardır.

## Yayın sonrası test

1. Çerezleri reddet: GTM/gtag/Google Maps isteği oluşmamalı.
2. Çerezleri kabul et: GTM ve Ads yüklenmeli, harita görünmeli.
3. Randevu gönderimi ve WhatsApp/telefon tıklamaları GTM Preview'da yalnızca bir kez görünmeli.
4. Müşteri A hesabıyla müşteri B dosya/işlem URL'lerine erişim denenmeli; Supabase RLS erişimi reddetmeli.
