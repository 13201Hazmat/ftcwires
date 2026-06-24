import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../_lib/auth";
import { upsertTeam } from "../../_lib/partspool-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.team_number?.trim()) {
    return NextResponse.json({ error: "Team number is required" }, { status: 400 });
  }

  await upsertTeam({
    email: session.user.email,
    team_number: body.team_number.trim(),
    team_name: (body.team_name ?? "").trim(),
    location: (body.location ?? "").trim(),
  });

  return NextResponse.json({
    ok: true,
    team_number: body.team_number.trim(),
    team_name: (body.team_name ?? "").trim(),
    location: (body.location ?? "").trim(),
  });
}
