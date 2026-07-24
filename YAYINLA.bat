@echo off
chcp 65001 >nul
echo TDA Luxury Hizmetler sayfasi kuruluyor...
git add app/hizmetler/page.tsx components/ServicesCatalog.tsx components/ServicesCatalog.module.css public/images/services-reference
git commit -m "Hizmetler sayfasini referans tasarima birebir gecir"
git push origin main
echo.
echo Yayin gonderildi. Vercel tamamlandiginda sayfa canliya gececek.
pause
