@echo off
chcp 65001 >nul
echo.
echo TDA Luxury AI Cilt Analizi kuruluyor...
echo.

git add .
git commit -m "AI cilt analizi ve kamera modulunu ekle"
git push origin main

echo.
echo Islem tamamlandi. Vercel yayinini 1-3 dakika bekleyin.
pause
