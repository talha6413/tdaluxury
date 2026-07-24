# TDA Luxury Stok CSS Build Fix v8.3

ZIP içeriğini proje köküne çıkarın ve mevcut dosyanın üzerine yazılmasına izin verin.

Düzeltilen dosya:
`components/platform/StockManagement.module.css`

Düzeltme:
- `table`, `th`, `td` gibi global CSS Module seçicileri `.tableWrap` sınıfı altında yerelleştirildi.
- Next.js/Turbopack `Selector "th" is not pure` build hatası giderildi.

Kontrol:
```bash
npm run typecheck
npm run lint
npm run build
```
