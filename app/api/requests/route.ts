import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../_lib/auth";
import { getListingById, createRequest } from "../../_lib/partspool-data";
import { sendRequestNotification } from "../../_lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.teamNumber) {
    return NextResponse.json({ error: "Complete onboarding first" }, { status: 403 });
  }

  const body = await request.json();
  const listing = await getListingById(body.listing_id);
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  // Can't request your own listing
  if (listing.user_email === session.user.email) {
    return NextResponse.json(
      { error: "You can't request your own listing" },
      { status: 400 }
    );
  }

  const req = await createRequest({
    listing_id: listing.id,
    listing_title: listing.title,
    lender_email: listing.user_email,
    requester_email: session.user.email,
    requester_team_number: session.user.teamNumber,
    message: (body.message ?? "").trim(),
  });

  // Fire-and-forget email notification
  await sendRequestNotification({
    to: listing.user_email,
    listingTitle: listing.title,
    requesterTeamNumber: session.user.teamNumber,
    message: req.message,
  });

  return NextResponse.json({ request: req }, { status: 201 });
}
