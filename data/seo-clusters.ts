import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

export type SeoCluster = {
  key: string;
  title: string;
  description: string;
  serviceSlugs: string[];
  blogSlugs: string[];
};

export const seoClusters: SeoCluster[] = [
  {
    key: "lazer-epilasyon",
    title: "Lazer Epilasyon Rehberi",
    description:
      "Seans planı, yaz dönemi, hazırlık, bakım ve kadın–erkek uygulama seçeneklerini birlikte inceleyin.",
    serviceSlugs: [
      "/lazer-epilasyon",
      "/lazer-epilasyon/kadin-lazer-epilasyon",
      "/lazer-epilasyon/erkek-lazer-epilasyon",
      "/lazer-epilasyon/yuz-lazer-epilasyon",
      "/lazer-epilasyon/tum-vucut-lazer-epilasyon",
      "/igneli-epilasyon",
    ],
    blogSlugs: [
      "lazer-epilasyon-kac-seans",
      "lazer-epilasyon-yazin-yapilir-mi",
      "lazer-epilasyon-oncesi-hazirlik",
      "lazer-epilasyon-sonrasi-bakim",
      "lazer-epilasyon-acitir-mi",
      "erkek-lazer-epilasyon",
    ],
  },
  {
    key: "cilt-bakimi",
    title: "Cilt Bakımı Bilgi Merkezi",
    description:
      "Cilt analizi, profesyonel bakım, akneye eğilim, Hydrafacial ve bakım sonrası rutin hakkında rehberler.",
    serviceSlugs: [
      "/cilt-bakimi",
      "/cilt-bakimi/cilt-analizi",
      "/cilt-bakimi/hydrafacial",
      "/cilt-bakimi/akne-bakimi",
      "/cilt-bakimi/leke-bakimi",
      "/cilt-bakimi/anti-aging",
      "/cilt-bakimi/erkek-cilt-bakimi",
    ],
    blogSlugs: [
      "hydrafacial-nedir",
      "cilt-bakimi-sonrasi-makyaj",
      "cilt-analizi-neden-onemli",
      "akneye-egilimli-cilt-bakimi-hatalari",
    ],
  },
  {
    key: "kalici-makyaj",
    title: "Kalıcı Makyaj Rehberi",
    description:
      "Microblading, pudralama kaş, dudak renklendirme ve işlem sonrası bakım içeriklerini keşfedin.",
    serviceSlugs: [
      "/kalici-makyaj",
      "/kalici-makyaj/microblading",
      "/kalici-makyaj/pudralama-kas",
      "/kalici-makyaj/dudak-renklendirme",
      "/kalici-makyaj/dipliner",
      "/kalici-makyaj/eyeliner",
    ],
    blogSlugs: [
      "microblading-mi-pudralama-kas-mi",
      "microblading-sonrasi-bakim",
      "dudak-renklendirme-sonrasi-bakim",
    ],
  },
  {
    key: "kas-kirpik",
    title: "Kaş ve Kirpik Rehberi",
    description:
      "Kirpik lifting, kaş laminasyonu, ipek kirpik ve kaş tasarımı hakkında temel bilgiler.",
    serviceSlugs: [
      "/kas-kirpik",
      "/kas-kirpik/kirpik-lifting",
      "/kas-kirpik/kas-laminasyonu",
      "/kas-kirpik/ipek-kirpik",
      "/kas-kirpik/altin-oran-kas-tasarimi",
      "/kas-kirpik/kas-alimi",
    ],
    blogSlugs: ["kirpik-lifting-kalicilik"],
  },
  {
    key: "vucut-bakimi",
    title: "Vücut Bakımı Rehberi",
    description:
      "G5 masajı, bölgesel bakım ve gerçekçi beklenti yönetimi hakkında kullanıcı odaklı içerikler.",
    serviceSlugs: [
      "/bolgesel-incelme",
      "/bolgesel-incelme/g5-masaji",
      "/bolgesel-incelme/lenf-drenaj",
    ],
    blogSlugs: ["g5-masaji-nedir", "bolgesel-incelme-gercekci-beklenti"],
  },
];

export function getClusterForService(serviceSlug: string) {
  return seoClusters.find((cluster) => cluster.serviceSlugs.includes(serviceSlug));
}

export function getClusterForBlog(blogSlug: string) {
  return seoClusters.find((cluster) => cluster.blogSlugs.includes(blogSlug));
}

export function getClusterBlogPosts(cluster: SeoCluster, excludeSlug?: string) {
  return cluster.blogSlugs
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
}

export function getClusterServices(cluster: SeoCluster, excludeSlug?: string) {
  return cluster.serviceSlugs
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
}
