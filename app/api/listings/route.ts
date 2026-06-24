import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../_lib/auth";
import {
  getActiveListings,
  getListingsByEmail,
  createListing,
} from "../../_lib/partspool-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mine = searchParams.get("mine");

  if (mine === "true") {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const listings = await getListingsByEmail(session.user.email);
    return NextResponse.json({ listings });
  }

  const listings = await getActiveListings();
  return NextResponse.json({ listings });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.teamNumber) {
    return NextResponse.json(
      { error: "Complete onboarding first" },
      { status: 403 }
    );
  }

  const body = await request.json();

  // Validation
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Part name is required" }, { status: 400 });
  }
  if (!body.category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }
  if (!body.condition) {
    return NextResponse.json({ error: "Condition is required" }, { status: 400 });
  }
  if (!body.photo_url?.trim()) {
    return NextResponse.json({ error: "A photo link is required" }, { status: 400 });
  }
  if (body.listing_type !== "lend_for_exchange" && body.listing_type !== "donation") {
    return NextResponse.json({ error: "Invalid listing type" }, { status: 400 });
  }

  const listing = await createListing({
    title: body.title.trim(),
    category: body.category,
    quantity: Number(body.quantity) || 1,
    condition: body.condition,
    listing_type: body.listing_type,
    description: body.description?.trim() ?? "",
    manufacturer: body.manufacturer?.trim() ?? "",
    part_number: body.part_number?.trim() ?? "",
    part_link: body.part_link?.trim() ?? "",
    notes: body.notes?.trim() ?? "",
    photo_url: body.photo_url.trim(),
    team_number: session.user.teamNumber,
    team_name: session.user.teamName ?? "",
    location: session.user.location ?? "",
    user_email: session.user.email,
  });

  return NextResponse.json({ listing }, { status: 201 });
}
