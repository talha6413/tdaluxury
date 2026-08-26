TDA Luxury — Tam Site Editörü / İlk Sürüm

Yeni adres:
  /admin/editor

Bu sürüm mevcut admin panelini silmez. Yanına yeni TDA Site Editörü ekler.

Yönetilebilen alanlar:
- Hizmetler ve alt hizmetler
- Hizmet görseli yükleme
- Fiyat, süre, sıra, öne çıkan ve yayın durumu
- Hizmet SEO başlığı/açıklaması
- Ana sayfa bölümleri
- Ana sayfa başlık, açıklama, buton ve görselleri
- Ana sayfa bölüm görünürlüğü ve sırası
- Page Content tablosundaki sayfalar
- Sayfa SEO alanları
- Header/Footer menüleri
- Menü sırası, görünürlüğü, bağlantıları
- İşletme adı, telefon, WhatsApp, Instagram, Google Maps
- Header CTA ve footer bilgileri
- Facebook/TikTok/YouTube alanları

Kurulum:
1. ZIP'i tdaluxury proje klasörüne çıkarın.
2. Dosyalar yeni olduğu için mevcut admin paneli bozulmaz.
3. VS Code terminalinde:

git add .
git commit -m "TDA tam site editorunu ekle"
git push origin main

4. Vercel build tamamlandıktan sonra:
   https://tdaluxury.vercel.app/admin/editor

Önemli:
Bu ilk sürüm mevcut Supabase tablolarını kullanır. Veritabanında yeni tablo kurmak gerekmez.
Bir alan canlı sitede hâlâ koddan geliyorsa, sonraki aşamada o frontend bölümünü Supabase'deki bu yönetim alanına bağlayacağız.
