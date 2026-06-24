import {
  getRows,
  appendRow,
  updateRowById,
  updateRowByColumn,
  deleteRowById,
  type Row,
} from "./sheets";
import { v4 as uuid } from "uuid";

/* =====================================================
 * Domain types
 * ===================================================== */
export type Listing = {
  id: string;
  title: string;
  category: string;
  quantity: number;
  condition: string;
  listing_type: "lend_for_exchange" | "donation";
  description: string;
  manufacturer: string;
  part_number: string;
  part_link: string;
  notes: string;
  photo_url: string;
  team_number: string;
  team_name: string;
  location: string;
  user_email: string;
  is_active: boolean;
  created_at: string;
};

export type RequestRecord = {
  id: string;
  listing_id: string;
  listing_title: string;
  lender_email: string;
  requester_email: string;
  requester_team_number: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
};

export type Team = {
  email: string;
  team_number: string;
  team_name: string;
  location: string;
  created_at: string;
};

function rowToListing(r: Row): Listing {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    quantity: Number(r.quantity) || 1,
    condition: r.condition,
    listing_type: (r.listing_type as Listing["listing_type"]) || "donation",
    description: r.description,
    manufacturer: r.manufacturer,
    part_number: r.part_number,
    part_link: r.part_link,
    notes: r.notes,
    photo_url: r.photo_url,
    team_number: r.team_number,
    team_name: r.team_name,
    location: r.location,
    user_email: r.user_email,
    is_active: r.is_active !== "FALSE" && r.is_active !== "false",
    created_at: r.created_at,
  };
}

function rowToRequest(r: Row): RequestRecord {
  return {
    id: r.id,
    listing_id: r.listing_id,
    listing_title: r.listing_title,
    lender_email: r.lender_email,
    requester_email: r.requester_email,
    requester_team_number: r.requester_team_number,
    message: r.message,
    status: (r.status as RequestRecord["status"]) || "pending",
    created_at: r.created_at,
  };
}

/* =====================================================
 * Listings
 * ===================================================== */
export async function getActiveListings(): Promise<Listing[]> {
  const rows = await getRows("listings");
  return rows
    .map(rowToListing)
    .filter((l) => l.is_active)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getListingById(id: string): Promise<Listing | null> {
  const rows = await getRows("listings");
  const found = rows.map(rowToListing).find((l) => l.id === id);
  return found ?? null;
}

export async function getListingsByEmail(email: string): Promise<Listing[]> {
  const rows = await getRows("listings");
  return rows
    .map(rowToListing)
    .filter((l) => l.user_email === email)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createListing(
  data: Omit<Listing, "id" | "created_at" | "is_active">
): Promise<Listing> {
  const id = uuid();
  const created_at = new Date().toISOString();
  await appendRow("listings", {
    id,
    title: data.title,
    category: data.category,
    quantity: String(data.quantity),
    condition: data.condition,
    listing_type: data.listing_type,
    description: data.description,
    manufacturer: data.manufacturer,
    part_number: data.part_number,
    part_link: data.part_link,
    notes: data.notes,
    photo_url: data.photo_url,
    team_number: data.team_number,
    team_name: data.team_name,
    location: data.location,
    user_email: data.user_email,
    is_active: "TRUE",
    created_at,
  });
  return { ...data, id, created_at, is_active: true };
}

export async function setListingActive(id: string, active: boolean): Promise<boolean> {
  return updateRowById("listings", id, { is_active: active ? "TRUE" : "FALSE" });
}

export async function deleteListing(id: string): Promise<boolean> {
  return deleteRowById("listings", id);
}

/* =====================================================
 * Teams
 * ===================================================== */
export async function getTeamByEmail(email: string): Promise<Team | null> {
  const rows = await getRows("teams");
  const found = rows.find((r) => r.email === email);
  if (!found) return null;
  return {
    email: found.email,
    team_number: found.team_number,
    team_name: found.team_name,
    location: found.location,
    created_at: found.created_at,
  };
}

export async function upsertTeam(team: Omit<Team, "created_at">): Promise<void> {
  const rows = await getRows("teams");
  const exists = rows.find((r) => r.email === team.email);
  if (exists) {
    await updateRowByColumn("teams", "email", team.email, {
      team_number: team.team_number,
      team_name: team.team_name,
      location: team.location,
    });
  } else {
    await appendRow("teams", {
      email: team.email,
      team_number: team.team_number,
      team_name: team.team_name,
      location: team.location,
      created_at: new Date().toISOString(),
    });
  }
}

/* =====================================================
 * Requests
 * ===================================================== */
export async function createRequest(
  data: Omit<RequestRecord, "id" | "created_at" | "status">
): Promise<RequestRecord> {
  const id = uuid();
  const created_at = new Date().toISOString();
  await appendRow("requests", {
    id,
    listing_id: data.listing_id,
    listing_title: data.listing_title,
    lender_email: data.lender_email,
    requester_email: data.requester_email,
    requester_team_number: data.requester_team_number,
    message: data.message,
    status: "pending",
    created_at,
  });
  return { ...data, id, created_at, status: "pending" };
}

export async function getIncomingRequests(email: string): Promise<RequestRecord[]> {
  const rows = await getRows("requests");
  return rows
    .map(rowToRequest)
    .filter((r) => r.lender_email === email)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getOutgoingRequests(email: string): Promise<RequestRecord[]> {
  const rows = await getRows("requests");
  return rows
    .map(rowToRequest)
    .filter((r) => r.requester_email === email)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function updateRequestStatus(
  id: string,
  status: RequestRecord["status"]
): Promise<boolean> {
  return updateRowById("requests", id, { status });
}
