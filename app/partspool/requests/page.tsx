import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../_lib/auth";
import {
  getIncomingRequests,
  getOutgoingRequests,
} from "../../_lib/partspool-data";
import RequestsClient from "../_components/RequestsClient";

export const metadata = { title: "Requests — PartsPool" };
export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/partspool/login?next=/partspool/requests");
  }
  if (!session.user.teamNumber) {
    redirect("/partspool/onboarding?next=/partspool/requests");
  }

  const [incoming, outgoing] = await Promise.all([
    getIncomingRequests(session.user.email),
    getOutgoingRequests(session.user.email),
  ]);

  return (
    <div className="min-h-screen px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Requests</h1>
        <RequestsClient incoming={incoming} outgoing={outgoing} />
      </div>
    </div>
  );
}
