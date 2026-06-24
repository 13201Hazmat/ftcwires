import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../_lib/auth";
import {
  getIncomingRequests,
  updateRequestStatus,
} from "../../../_lib/partspool-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (body.status !== "accepted" && body.status !== "declined") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Only the lender (recipient of the request) can change its status
  const incoming = await getIncomingRequests(session.user.email);
  const owned = incoming.find((r) => r.id === id);
  if (!owned) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await updateRequestStatus(id, body.status);
  return NextResponse.json({ ok: true });
}
