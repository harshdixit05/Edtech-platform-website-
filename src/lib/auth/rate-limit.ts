import "server-only";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { authAttempts } from "@/db/schema";

/**
 * Keys are HMAC'd with a server secret before storage, so the table holds no
 * raw IP or email addresses even though it is keyed by them.
 */
function keyHash(key: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set — see .env.example");
  return createHmac("sha256", secret).update(key).digest("hex");
}

/**
 * Best-effort client address. Only trusted because the app is expected to run
 * behind a proxy that overwrites these headers (Vercel, Cloudflare, nginx).
 * Behind an untrusted proxy this is spoofable, which is why limits are applied
 * per-identifier as well as per-IP, and why lockout lives on the user row.
 */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

/**
 * Sliding-window counter. Records the attempt when it is allowed, so callers
 * can simply check-and-consume in one step.
 */
export async function consumeAttempt(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const hashed = keyHash(key);
  const windowStart = new Date(Date.now() - windowMs);

  const [row] = await db()
    .select({ count: sql<number>`count(*)::int` })
    .from(authAttempts)
    .where(and(eq(authAttempts.keyHash, hashed), gte(authAttempts.attemptedAt, windowStart)));

  const used = row?.count ?? 0;
  if (used >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  await db().insert(authAttempts).values({ keyHash: hashed });
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Clears a key's history — called after a successful authentication. */
export async function clearAttempts(key: string): Promise<void> {
  await db().delete(authAttempts).where(eq(authAttempts.keyHash, keyHash(key)));
}

/** Housekeeping for a scheduled job. */
export async function purgeOldAttempts(olderThanMs = 24 * 60 * 60 * 1000): Promise<void> {
  await db()
    .delete(authAttempts)
    .where(lt(authAttempts.attemptedAt, new Date(Date.now() - olderThanMs)));
}

export const LIMITS = {
  loginPerIp: { limit: 20, windowMs: 15 * 60 * 1000 },
  loginPerAccount: { limit: 8, windowMs: 15 * 60 * 1000 },
  signupPerIp: { limit: 6, windowMs: 60 * 60 * 1000 },
  resetPerIp: { limit: 6, windowMs: 60 * 60 * 1000 },
  resetPerAccount: { limit: 4, windowMs: 60 * 60 * 1000 },
  /** Consecutive failures before the account itself is temporarily locked. */
  accountLockThreshold: 10,
  accountLockMs: 30 * 60 * 1000,
} as const;
