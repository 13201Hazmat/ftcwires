import { Resend } from "resend";
import "server-only";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function sendRequestNotification(opts: {
  to: string;
  listingTitle: string;
  requesterTeamNumber: string;
  message: string;
}) {
  if (!resend) return; // email disabled if no key

  const { to, listingTitle, requesterTeamNumber, message } = opts;

  try {
    await resend.emails.send({
      from: `PartsPool <${FROM}>`,
      to,
      subject: `New request for "${listingTitle}" — PartsPool`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="font-size: 18px;">New part request</h2>
          <p>Team #${requesterTeamNumber} wants to request your listing:</p>
          <p style="font-weight: 600; font-size: 16px;">${listingTitle}</p>
          ${
            message
              ? `<p style="background:#f4f4f5;padding:12px;border-radius:8px;font-style:italic;">"${message}"</p>`
              : ""
          }
          <p>
            <a href="${BASE_URL}/partspool/requests"
               style="display:inline-block;background:#000;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-size:14px;">
              View &amp; respond
            </a>
          </p>
          <p style="color:#888;font-size:12px;margin-top:24px;">
            Accept the request to share contact info and coordinate the exchange.
          </p>
        </div>
      `,
    });
  } catch (err) {
    // Don't fail the request if the email fails
    console.error("Resend email failed:", err);
  }
}
