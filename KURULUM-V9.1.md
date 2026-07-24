# TDA Luxury Personel CSS Build Fix v9.1

ZIP içeriğini proje köküne çıkarın ve mevcut dosyanın üzerine yazılmasına izin verin.

Düzeltilen dosya:
`components/platform/StaffManagement.module.css`

Düzeltme:
- `table`, `th`, `td` gibi global seçiciler `.tableWrap` altında yerelleştirildi.
- Next.js/Turbopack `Selector "th" is not pure` build hatası giderildi.
- TSX dosyasında değişiklik gerekmez.

Kontrol:
```bash
npm run typecheck
npm run lint
npm run build
```
