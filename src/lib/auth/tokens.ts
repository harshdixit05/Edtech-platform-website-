import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

/** 256 bits of entropy, URL-safe. */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/**
 * Tokens are stored as their SHA-256 digest. A leaked database row is then
 * useless on its own, and lookups stay a single indexed primary-key hit.
 * SHA-256 is correct here (unlike for passwords) because the input already
 * carries full entropy and is not guessable.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time comparison for any digest-vs-digest check. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export const TOKEN_TTL = {
  emailVerification: 24 * 60 * 60 * 1000,
  passwordReset: 60 * 60 * 1000,
  session: 30 * 24 * 60 * 60 * 1000,
  /** Sessions past this age are re-issued with a fresh expiry. */
  sessionRenewAfter: 15 * 24 * 60 * 60 * 1000,
} as const;

export function expiresIn(ms: number): Date {
  return new Date(Date.now() + ms);
}
