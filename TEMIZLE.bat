@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo TDA Luxury - Public site temizligi baslatiliyor...
echo Musteri veritabani ve admin verileri SILINMEYECEK.
echo.

rmdir /s /q "app\musteri-paneli" 2>nul
rmdir /s /q "app\personel-paneli" 2>nul
rmdir /s /q "app\dijital-onam" 2>nul
rmdir /s /q "app\ai-cilt-analizi" 2>nul
rmdir /s /q "app\api\ai-skin-analysis" 2>nul

rmdir /s /q "components\customer" 2>nul
rmdir /s /q "components\staff" 2>nul
rmdir /s /q "components\ai" 2>nul

del /q "components\forms\DigitalConsent.tsx" 2>nul
del /q "components\forms\DigitalConsent.module.css" 2>nul

echo.
echo Temizlik tamamlandi.
echo.
echo Silinen public bolumler:
echo - Musteri paneli / girisi
echo - Personel paneli / girisi
echo - Dijital onam sayfasi
echo - AI cilt analizi sayfalari ve API'si
echo.
echo KALANLAR:
echo - Kurumsal web sitesi
echo - Hizmet ve SEO sayfalari
echo - Blog, galeri, sonuclar
echo - Randevu, WhatsApp, telefon
echo - Google Analytics / Ads
echo - Gizli admin / yonetim alani
echo.
pause
