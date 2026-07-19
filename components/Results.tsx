import PremiumResultsGallery, { fallbackResults } from "@/components/PremiumResultsGallery";
import { getManagedResults } from "@/lib/managed-content";

export default async function Results() {
  const items = await getManagedResults(fallbackResults);
  return <PremiumResultsGallery items={items} />;
}
