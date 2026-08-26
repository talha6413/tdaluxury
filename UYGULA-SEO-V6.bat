@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0UYGULA-SEO-V6.ps1"
if errorlevel 1 (
  echo.
  echo SEO V6 uygulanamadi. Yukaridaki hatayi kontrol edin.
  pause
  exit /b 1
)
echo.
echo Tamam. Simdi npm run build calistirin.
pause
