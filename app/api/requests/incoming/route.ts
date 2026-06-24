import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../_lib/auth";
import { getIncomingRequests } from "../../../_lib/partspool-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requests = await getIncomingRequests(session.user.email);
  return NextResponse.json({ requests });
}
