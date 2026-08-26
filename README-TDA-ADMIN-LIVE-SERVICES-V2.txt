TDA Luxury — Admin Canlı Hizmetler Bağlantısı v2

Bu paket Hizmetler sayfasını admin panelindeki Supabase verilerine bağlar.

Canlı olarak admin'den yansıyacak alanlar:
- Hizmet adı
- Hizmet slug / bağlantısı
- Görsel
- Görsel pozisyonu
- Kısa açıklama
- Detaylı açıklama
- Fiyat
- Süre
- Öne çıkan hizmet seçimi
- Yayında / taslak durumu
- Sıralama
- Hizmetler sayfası hero başlığı
- Hero açıklaması
- Hero görseli
- Hero görsel pozisyonu
- Hizmetler sayfası ana buton metni ve bağlantısı
- Telefon
- WhatsApp numarası
- WhatsApp varsayılan mesajı
- Adres

Çalışma mantığı:
- Supabase'de yayınlanmış hizmetler varsa site bunları kullanır.
- Veritabanı boşsa mevcut site içeriği fallback olarak görünür.
- En fazla ilk 3 "featured" hizmet ana büyük kartlarda gösterilir.
- Diğer yayınlanmış hizmetler otomatik olarak "Diğer Uygulamalarımız" bölümüne gelir.

Kurulum:
1. ZIP'i tdaluxury proje klasörüne çıkarın.
2. components/ServicesCatalog.tsx üzerine yazılmasına izin verin.
3. Terminal:

git add .
git commit -m "Hizmetler sayfasini admin verilerine bagla"
git push origin main

Yayın sonrası:
https://tdaluxury.com.tr/hizmetler
Admin:
https://tdaluxury.com.tr/admin
