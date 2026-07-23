TDA Luxury — Hizmetler Görsel ve Yerleşim Düzeltmesi

Düzeltilen sorunlar:
- Hizmetlerimiz başlığının menünün altına girmesi engellendi.
- Hero alanına güvenli üst boşluk eklendi.
- Öne çıkan hizmet sekmeleri birbirinden ayrıldı.
- Bozuk/kırpılmış paket görselleri kaldırıldı.
- Görseller artık lib/service-media.ts üzerinden sitenin gerçek görsellerinden yüklenir.
- Görsellerde object-fit: cover ve doğru oran kullanılır.
- Alt hizmet görselleri de aynı sistemden yüklenir.
- Mobil ve tablet yerleşimi düzeltildi.

Kurulum:
1. ZIP'i tdaluxury proje klasörüne çıkarın.
2. components/ServicesCatalog.tsx ve components/ServicesCatalog.module.css üzerine yazılmasına izin verin.
3. VS Code terminalinde:

git add .
git commit -m "Hizmetler görsellerini ve üst yerleşimi düzelt"
git push origin main
