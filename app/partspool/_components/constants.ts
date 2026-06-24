export const CATEGORIES = [
  "Motors",
  "Electronics",
  "Structural",
  "GoBILDA",
  "REV Robotics",
  "Miscellaneous",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS: Record<string, string> = {
  new: "New",
  like_new: "Like New",
  good: "Good",
  fair: "Fair",
};

export const LISTING_TYPES: Record<string, string> = {
  lend_for_exchange: "Exchange",
  donation: "Donation",
};

/**
 * Convert a Google Drive share link into a directly-displayable image URL.
 * Accepts the common formats:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?id=FILE_ID
 * Falls back to returning the original string (e.g. a plain image URL).
 */
export function driveImageUrl(link: string, size = 1000): string {
  if (!link) return "";
  let fileId = "";

  const fileMatch = link.match(/\/file\/d\/([^/]+)/);
  if (fileMatch) fileId = fileMatch[1];

  if (!fileId) {
    const idMatch = link.match(/[?&]id=([^&]+)/);
    if (idMatch) fileId = idMatch[1];
  }

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  }

  // Not a Drive link — assume it's already a usable image URL
  return link;
}
