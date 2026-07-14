import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TDA Luxury Uşak Güzellik Salonu",
    short_name: "TDA Luxury",
    description:
      "Uşak'ta lazer epilasyon, cilt bakımı, kalıcı makyaj ve premium güzellik hizmetleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#080706",
    theme_color: "#080706",
    lang: "tr",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
