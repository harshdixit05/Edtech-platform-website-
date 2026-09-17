import "server-only";
import { createHmac } from "node:crypto";

/**
 * The advisor is a separate Python service. The browser never talks to it
 * directly: requests go through this site's own server so that the service's
 * URL and shared token stay off the client, and so no CORS grant has to exist
 * for a public origin.
 */
export const advisorUrl = process.env.ADVISOR_API_URL?.replace(/\/$/, "") ?? "";
const advisorToken = process.env.ADVISOR_API_TOKEN ?? "";

/**
 * Both halves are required. A URL without a token would mean talking to the
 * service as an anonymous caller, which costs the per-visitor rate limiting —
 * the service only separates visitors for a caller it can authenticate.
 */
export function isAdvisorConfigured(): boolean {
  return Boolean(advisorUrl && advisorToken);
}

export function advisorHeaders(visitorKey: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${advisorToken}`,
    "X-Client-Id": visitorKey,
  };
}

/**
 * An opaque, stable-per-visitor rate-limiting key.
 *
 * The address is HMAC'd with the shared token rather than forwarded, so the
 * advisor can tell two visitors apart without ever handling anyone's IP. The
 * key changes if the token is rotated, which only resets rate-limit buckets.
 */
export function visitorKey(address: string): string {
  return createHmac("sha256", advisorToken).update(address).digest("hex").slice(0, 32);
}
