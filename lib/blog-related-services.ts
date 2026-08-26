export type RelatedServiceLink = {
  label: string;
  href: string;
};

type BlogIdentity = {
  slug: string;
  title: string;
  category: string;
};

const add = (
  list: RelatedServiceLink[],
  label: string,
  href: string,
) => {
  if (!list.some((item) => item.href === href)) {
    list.push({ label, href });
  }
};

export function inferBlogRelatedServices({
  slug,
  title,
  category,
}: BlogIdentity): RelatedServiceLink[] {
  const haystack = `${slug} ${title} ${category}`.toLocaleLowerCase("tr-TR");
  const links: RelatedServiceLink[] = [];

  if (haystack.includes("iğneli") || haystack.includes("igneli")) {
    add(links, "İğneli Epilasyon", "/igneli-epilasyon");
  }

  if (haystack.includes("protez tırnak") || haystack.includes("protez-tirnak")) {
    add(links, "Protez Tırnak", "/tirnak/protez-tirnak");
    add(links, "Tırnak Hizmetleri", "/tirnak");
  } else if (haystack.includes("kalıcı oje") || haystack.includes("kalici-oje")) {
    add(links, "Kalıcı Oje", "/tirnak/kalici-oje");
    add(links, "Tırnak Hizmetleri", "/tirnak");
  } else if (haystack.includes("tırnak") || haystack.includes("tirnak")) {
    add(links, "Tırnak Hizmetleri", "/tirnak");
  }

  if (haystack.includes("ipek kirpik")) {
    add(links, "İpek Kirpik", "/kas-kirpik/ipek-kirpik");
    add(links, "Kaş ve Kirpik Hizmetleri", "/kas-kirpik");
  } else if (haystack.includes("kaş laminasyonu") || haystack.includes("kas-laminasyonu")) {
    add(links, "Kaş Laminasyonu", "/kas-kirpik/kas-laminasyonu");
    add(links, "Kaş ve Kirpik Hizmetleri", "/kas-kirpik");
  } else if (haystack.includes("kirpik lifting") || haystack.includes("kirpik-lifting")) {
    add(links, "Kirpik Lifting", "/kas-kirpik/kirpik-lifting");
    add(links, "Kaş ve Kirpik Hizmetleri", "/kas-kirpik");
  } else if (haystack.includes("kaş") || haystack.includes("kirpik") || haystack.includes("kas ")) {
    add(links, "Kaş ve Kirpik Hizmetleri", "/kas-kirpik");
  }

  if (haystack.includes("microblading")) {
    add(links, "Microblading", "/kalici-makyaj/microblading");
    add(links, "Kalıcı Makyaj", "/kalici-makyaj");
  } else if (haystack.includes("dudak renklendirme") || haystack.includes("dudak-renklendirme")) {
    add(links, "Dudak Renklendirme", "/kalici-makyaj/dudak-renklendirme");
    add(links, "Kalıcı Makyaj", "/kalici-makyaj");
  } else if (haystack.includes("kalıcı makyaj") || haystack.includes("kalici-makyaj") || haystack.includes("pudralama")) {
    add(links, "Kalıcı Makyaj", "/kalici-makyaj");
  }

  if (haystack.includes("hydrafacial")) {
    add(links, "Hydrafacial", "/cilt-bakimi/hydrafacial");
    add(links, "Cilt Bakımı", "/cilt-bakimi");
  } else if (haystack.includes("cilt analizi") || haystack.includes("cilt-analizi")) {
    add(links, "Cilt Analizi", "/cilt-bakimi/cilt-analizi");
    add(links, "Cilt Bakımı", "/cilt-bakimi");
  } else if (haystack.includes("akne")) {
    add(links, "Akne Bakımı", "/cilt-bakimi/akne-bakimi");
    add(links, "Cilt Bakımı", "/cilt-bakimi");
  } else if (haystack.includes("cilt bakım") || haystack.includes("cilt-bak")) {
    add(links, "Cilt Bakımı", "/cilt-bakimi");
  }

  if (haystack.includes("g5")) {
    add(links, "G5 Masajı", "/bolgesel-incelme/g5-masaji");
    add(links, "Bölgesel İncelme", "/bolgesel-incelme");
  } else if (haystack.includes("bölgesel") || haystack.includes("bolgesel") || haystack.includes("vücut bakım")) {
    add(links, "Bölgesel İncelme", "/bolgesel-incelme");
  }

  if (haystack.includes("erkek") && haystack.includes("lazer")) {
    add(links, "Erkek Lazer Epilasyon", "/lazer-epilasyon/erkek-lazer-epilasyon");
    add(links, "Lazer Epilasyon", "/lazer-epilasyon");
  } else if (haystack.includes("lazer epilasyon") || haystack.includes("lazer-epilasyon")) {
    add(links, "Lazer Epilasyon", "/lazer-epilasyon");
  }

  if (
    haystack.includes("güzellik salonu") ||
    haystack.includes("guzellik salonu") ||
    category.toLocaleLowerCase("tr-TR").includes("güzellik rehberi")
  ) {
    add(links, "Uşak Güzellik Salonu", "/usak-guzellik-salonu");
    add(links, "Tüm Hizmetler", "/hizmetler");
  }

  if (links.length === 0) {
    add(links, "Tüm Hizmetler", "/hizmetler");
  }

  return links.slice(0, 3);
}
