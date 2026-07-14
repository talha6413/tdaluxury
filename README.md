# TDA Luxury — Layout Performance Patch

Bu paket yalnızca iki dosya içerir:

- `app/layout.tsx`
- `components/ClientOnlyGlobalWidgets.tsx`

## Ne değişti?

İlk yüklemede zorunlu olmayan şu istemci bileşenleri dinamik olarak ayrıldı:

- FloatingContactDock
- GlobalMobileBookingBar
- CookieConsent
- ConversionTracker
- Analytics

Böylece root layout daha az istemci JavaScript'iyle başlar.

## Kurulum

ZIP içindeki `app` ve `components` klasörlerini mevcut proje kök klasörüne sürükleyin ve dosya değişimini onaylayın.

Sonra terminali yeniden başlatın:

```bash
Ctrl + C
npm run build
npm run start
```

Lighthouse testini `npm run dev` yerine production sunucusunda yapın:

```text
http://localhost:3000
```

Not: Bu patch yalnızca layout yükünü azaltır. Performance 51 puanının tamamını tek başına çözmez; ana sayfa bileşenleri ayrıca incelenmelidir.
