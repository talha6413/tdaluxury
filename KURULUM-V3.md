# TDA Luxury Gerçek Müşteri Paneli v3

Bu paketi mevcut proje klasörünün üzerine çıkarın.

## Değişen dosyalar
- `components/customer/CustomerPortal.tsx`
- Yeni: `components/customer/RealCustomerPortal.module.css`
- Yeni: `lib/supabase-browser.ts`

## Kontrol
```bash
npm run typecheck
npm run lint
npm run build
```

## GitHub
```bash
git add .
git commit -m "Müşteri panelini gerçek Supabase verilerine bağla"
git push origin main
```

## Supabase telefon OTP
Supabase Dashboard:
Authentication → Providers → Phone

Telefon sağlayıcısı ve SMS servisiniz etkinleştirilmeden gerçek SMS gönderilmez.

## Müşteri eşleştirme
Giriş yapan Supabase kullanıcısının kimliği `customers.auth_user_id` alanına yazılmalıdır.
Müşteri paneli yalnızca eşleşen müşterinin RLS ile izin verilen kayıtlarını gösterir.

## Vercel ortam değişkenleri
Aşağıdakilerin Production, Preview ve Development ortamlarında bulunduğunu kontrol edin:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`


## TypeScript düzeltmesi
Bu fixed sürüm, Supabase istemcisinde Database tipleri tanımlı olmadığında
`customer` kaydının `never` olarak çıkarılması sorununu düzeltir.
