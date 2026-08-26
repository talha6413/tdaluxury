TDA Luxury — Vercel Build Fix v2

Son Vercel hatası:
components/ServicesCatalog.tsx
Type error: 'client' is possibly 'null'.

Bu sürüm Supabase client tipini async fonksiyona NonNullable parametre olarak geçirir.
Böylece TypeScript null hatası kesin olarak giderilir.

Kurulum:
1. ZIP'i tdaluxury proje klasörüne çıkarın.
2. components/ServicesCatalog.tsx üzerine yazılmasına izin verin.
3. Terminal:

git add .
git commit -m "Supabase client null TypeScript hatasini kesin duzelt"
git push origin main

Sonra ChatGPT'ye "kontrol et" yazın.
