import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../_lib/auth";
import { getListingsByEmail } from "../../_lib/partspool-data";
import MyListingsClient from "../_components/MyListingsClient";

export const metadata = { title: "My Listings — PartsPool" };
export const dynamic = "force-dynamic";

export default async function MyListingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/partspool/login?next=/partspool/my-listings");
  }
  if (!session.user.teamNumber) {
    redirect("/partspool/onboarding?next=/partspool/my-listings");
  }

  const listings = await getListingsByEmail(session.user.email);

  return (
    <div className="min-h-screen px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My Listings</h1>
            <p className="mt-1 text-sm text-muted">{listings.length} listings</p>
          </div>
          <a
            href="/partspool/add"
            className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            + Add Part
          </a>
        </div>

        <MyListingsClient listings={listings} />
      </div>
    </div>
  );
}
