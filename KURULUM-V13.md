# TDA Luxury v13 — Müşteri Portalı 2.0

## Kurulum
ZIP içeriğini proje köküne çıkarın ve mevcut dosyanın üzerine yazılmasına izin verin.

Değişen dosya:
`components/customer/CustomerPortal.tsx`

## Yeni giriş sistemi
- E-posta ve şifreyle giriş
- Müşteri hesabı oluşturma
- Salonda kayıtlı telefonla müşteri kartını otomatik eşleştirme
- Şifremi unuttum
- Şifre yenileme
- Güvenli oturum
- Mevcut müşteri paneli verileri korunur

## Supabase
`customer_portal_v13` migration'ı canlı projeye uygulanmıştır. SQL'i tekrar çalıştırmayın.

## Önemli Supabase ayarı
Supabase Dashboard > Authentication > URL Configuration bölümünde:

Site URL:
`https://tdaluxury.com.tr`

Redirect URLs:
- `https://tdaluxury.com.tr/musteri-paneli`
- `https://*.vercel.app/musteri-paneli`
- `http://localhost:3000/musteri-paneli`

Email provider açık olmalıdır:
Authentication > Providers > Email

## Kontrol
```bash
npm run typecheck
npm run lint
npm run build
```
