# TDA Luxury Fotoğraf Yönetimi v10.1

1. Bu klasörün içeriğini proje kök dizinine kopyalayın.
2. Supabase migration daha önce ChatGPT tarafından canlı projeye uygulanmıştır. SQL'i tekrar çalıştırmak zorunlu değildir.
3. Kontrol komutları:

```bash
npm run typecheck
npm run lint
npm run build
```

Ekran: `/yonetim-v2/fotograflar`

Yeni özellikler:
- Çoklu fotoğraf yükleme
- Sürükle bırak
- Tarayıcı tarafında büyük JPEG/PNG/WEBP sıkıştırma
- Öncesi/sonrası kaydırmalı karşılaştırma
- Eski `category` alanı ile v10.1 `photo_type` alanı uyumluluğu
- Mobil galeri ve modal düzenlemeleri
