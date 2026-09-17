import "server-only";

type Mail = { to: string; subject: string; text: string };

const from = process.env.EMAIL_FROM ?? "Intellimindz Foundation <noreply@intellimindz.in>";

/**
 * Sends through Resend when configured. Without an API key it logs instead, so
 * local development works and a misconfigured deploy fails loudly in logs
 * rather than silently swallowing verification links.
 */
export async function sendEmail({ to, subject, text }: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY not set — message not delivered.\n  to: ${to}\n  subject: ${subject}\n  body:\n${text}`
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!response.ok) {
    // Logged without the body, which can echo the recipient address.
    console.error(`[email] delivery failed with status ${response.status}`);
    throw new Error("Email delivery failed");
  }
}

export function appUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return `${base}${path}`;
}
