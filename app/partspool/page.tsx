import { getActiveListings } from "../_lib/partspool-data";
import BrowsePage from "./_components/BrowsePage";

export const metadata = {
  title: "PartsPool — FTC Wires",
  description: "Browse and request FTC parts from teams across Wisconsin.",
};

export const revalidate = 20;

export default async function PartsPoolPage() {
  const listings = await getActiveListings();
  return <BrowsePage listings={listings} />;
}
