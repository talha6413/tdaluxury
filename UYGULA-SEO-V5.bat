@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0UYGULA-SEO-V5.ps1"
if errorlevel 1 (
  echo.
  echo Yama uygulanamadi. Yukaridaki hatayi kontrol edin.
  pause
  exit /b 1
)
echo.
echo Tamam. Simdi terminalde npm run build calistirin.
pause
