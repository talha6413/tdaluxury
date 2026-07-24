# TDA Luxury Akıllı Stok Yönetimi v8

## İçerik
- `/yonetim-v2/stok` canlı stok ekranı
- Ürün kartı oluşturma
- Barkod, ürün kodu, marka, kategori ve raf takibi
- Stok giriş/çıkış, fire, iade ve sayım düzeltmesi
- Kritik stok ve 30 gün içinde son kullanma tarihi uyarıları
- Depo maliyet değeri
- Tedarikçi yönetimi
- Supabase tablo, RLS ve otomatik stok güncelleme trigger'ı

## Kurulum
1. ZIP içindeki klasörleri projenin ana dizinine kopyalayın.
2. Supabase Dashboard > SQL Editor bölümünü açın.
3. `supabase/migrations/20260724_inventory_v8.sql` dosyasının tamamını çalıştırın.
4. Terminalde aşağıdaki komutları çalıştırın:

```bash
npm run typecheck
npm run lint
npm run build
```

5. GitHub'a gönderin:

```bash
git add .
git commit -m "Akilli stok ve depo yonetimi v8"
git push origin main
```

## Canlı adres
`/yonetim-v2/stok`

## Not
`adjustment` hareketi girilen miktarı pozitif sayım farkı olarak ekler. Negatif sayım farkı için `out` hareketini kullanın.
