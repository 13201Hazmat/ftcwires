import { google } from "googleapis";
import "server-only";

/* =====================================================
 * Google Sheets data layer
 * Each tab is treated as a table with a header row.
 * Rows are returned as objects keyed by header name.
 * ===================================================== */

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;

export const TABS = {
  listings: [
    "id",
    "title",
    "category",
    "quantity",
    "condition",
    "listing_type",
    "description",
    "manufacturer",
    "part_number",
    "part_link",
    "notes",
    "photo_url",
    "team_number",
    "team_name",
    "location",
    "user_email",
    "is_active",
    "created_at",
  ],
  requests: [
    "id",
    "listing_id",
    "listing_title",
    "lender_email",
    "requester_email",
    "requester_team_number",
    "message",
    "status",
    "created_at",
  ],
  teams: ["email", "team_number", "team_name", "location", "created_at"],
} as const;

export type TabName = keyof typeof TABS;
export type Row = Record<string, string>;

function getAuth() {
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

/** Ensure a tab exists with the right header row. Called lazily before reads/writes. */
async function ensureTab(tab: TabName) {
  const sheets = getSheets();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const exists = meta.data.sheets?.some((s) => s.properties?.title === tab);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: tab } } }],
      },
    });
  }

  // Ensure header row exactly matches the expected schema. If it's missing,
  // outdated, or shifted, rewrite it so every column lines up with TABS.
  const headers = TABS[tab] as unknown as string[];
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!1:1`,
  });
  const current = res.data.values?.[0] ?? [];
  const matches =
    current.length === headers.length &&
    headers.every((h, i) => current[i] === h);

  if (!matches) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${tab}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }
}

/** Read all data rows from a tab as objects keyed by header. */
export async function getRows(tab: TabName): Promise<Row[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: tab,
  });
  const values = res.data.values ?? [];
  if (values.length < 2) return [];
  // Key by the canonical schema (positional) — writes call ensureTab, which
  // keeps the physical header row aligned to TABS, so column positions are authoritative.
  const headers = TABS[tab] as unknown as string[];
  return values.slice(1).map((row) => {
    const obj: Row = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
}

/** Append a row built from an object (missing keys become empty strings). */
export async function appendRow(tab: TabName, data: Row): Promise<void> {
  await ensureTab(tab);
  const sheets = getSheets();
  const headers = TABS[tab];
  const row = headers.map((h) => data[h] ?? "");

  // Get current row count to find the next empty row
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A:A`,
  });
  const nextRow = (res.data.values?.length ?? 1) + 1;

  // Insert directly at the next row
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A${nextRow}`,
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

/** Find the 1-based sheet row number of a record matching a value in a given column. */
async function findRowNumber(
  tab: TabName,
  value: string,
  column = "id"
): Promise<number | null> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: tab,
  });
  const values = res.data.values ?? [];
  const headers = values[0] ?? [];
  const col = headers.indexOf(column);
  if (col === -1) return null;
  for (let i = 1; i < values.length; i++) {
    if (values[i][col] === value) return i + 1; // 1-based, header is row 1
  }
  return null;
}

/** Patch fields of a row identified by an arbitrary column match. */
export async function updateRowByColumn(
  tab: TabName,
  column: string,
  value: string,
  patch: Row
): Promise<boolean> {
  await ensureTab(tab);
  const rowNumber = await findRowNumber(tab, value, column);
  if (!rowNumber) return false;

  const sheets = getSheets();
  const headers = TABS[tab];
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!${rowNumber}:${rowNumber}`,
  });
  const current = res.data.values?.[0] ?? [];
  const merged = headers.map((h, i) => (h in patch ? patch[h] : current[i] ?? ""));
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A${rowNumber}`,
    valueInputOption: "RAW",
    requestBody: { values: [merged] },
  });
  return true;
}

/** Patch specific fields of a row identified by its `id`. */
export async function updateRowById(
  tab: TabName,
  id: string,
  patch: Row
): Promise<boolean> {
  await ensureTab(tab);
  const rowNumber = await findRowNumber(tab, id);
  if (!rowNumber) return false;

  const sheets = getSheets();
  const headers = TABS[tab];
  // Read current row, apply patch, write back
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!${rowNumber}:${rowNumber}`,
  });
  const current = res.data.values?.[0] ?? [];
  const merged = headers.map((h, i) => {
    if (h in patch) return patch[h];
    return current[i] ?? "";
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A${rowNumber}`,
    valueInputOption: "RAW",
    requestBody: { values: [merged] },
  });
  return true;
}

/** Delete a row identified by its `id`. */
export async function deleteRowById(tab: TabName, id: string): Promise<boolean> {
  await ensureTab(tab);
  const sheets = getSheets();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheet = meta.data.sheets?.find((s) => s.properties?.title === tab);
  const sheetId = sheet?.properties?.sheetId;
  if (sheetId == null) return false;

  const rowNumber = await findRowNumber(tab, id);
  if (!rowNumber) return false;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: rowNumber - 1, // 0-based
              endIndex: rowNumber,
            },
          },
        },
      ],
    },
  });
  return true;
}
