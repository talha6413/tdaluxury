@echo off
chcp 65001 >nul
title TDA Luxury Müşteri Paneli Premium Güncelleme

echo.
echo ==========================================
echo TDA LUXURY MÜŞTERİ PANELİ PREMIUM v17
echo ==========================================
echo.

if not exist package.json (
  echo HATA: ZIP içeriğini package.json bulunan proje ana klasörüne çıkarın.
  pause
  exit /b 1
)

echo [1/4] TypeScript kontrolü...
call npm run typecheck
if errorlevel 1 goto error

echo [2/4] Lint kontrolü...
call npm run lint
if errorlevel 1 goto error

echo [3/4] Build kontrolü...
call npm run build
if errorlevel 1 goto error

echo [4/4] GitHub'a gönderiliyor...
git add components/customer/CustomerPortal.tsx components/customer/RealCustomerPortal.module.css
git commit -m "Musteri panelini premium ve mobil uyumlu hale getir"
git push origin main
if errorlevel 1 goto error

echo.
echo TAMAMLANDI. Vercel otomatik yayınlayacak.
pause
exit /b 0

:error
echo.
echo İşlem sırasında hata oluştu. Bu pencerenin ekran görüntüsünü gönderin.
pause
exit /b 1
