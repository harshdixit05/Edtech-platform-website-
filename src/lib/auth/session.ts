import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { and, eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { sessions, users, type User } from "@/db/schema";
import { generateToken, hashToken, expiresIn, TOKEN_TTL } from "./tokens";

const isProd = process.env.NODE_ENV === "production";

/**
 * The __Host- prefix tells the browser to reject the cookie unless it is
 * Secure, path=/ and has no Domain — which blocks subdomain overwrite attacks.
 * It requires HTTPS, so plain-HTTP local development uses the bare name.
 */
export const SESSION_COOKIE = isProd ? "__Host-imf_session" : "imf_session";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};

export type SessionUser = Pick<
  User,
  "id" | "email" | "name" | "role" | "emailVerifiedAt"
>;

export async function createSession(userId: string): Promise<void> {
  const token = generateToken();
  const expiresAt = expiresIn(TOKEN_TTL.session);
  const agent = (await headers()).get("user-agent")?.slice(0, 255) ?? null;

  await db().insert(sessions).values({
    id: hashToken(token),
    userId,
    expiresAt,
    userAgent: agent,
  });

  (await cookies()).set(SESSION_COOKIE, token, { ...cookieOptions, expires: expiresAt });
}

/**
 * Resolves the current user, or null. Deduplicated per request via React cache
 * so layouts, pages and actions share one database round trip.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const sessionId = hashToken(token);

  const rows = await db()
    .select({
      sessionId: sessions.id,
      expiresAt: sessions.expiresAt,
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      emailVerifiedAt: users.emailVerifiedAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))
    .limit(1);

  const row = rows.at(0);
  if (!row) return null;

  if (row.expiresAt.getTime() <= Date.now()) {
    await db().delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }

  // Rolling expiry: extend long-lived sessions that are still in active use.
  if (row.expiresAt.getTime() - Date.now() < TOKEN_TTL.session - TOKEN_TTL.sessionRenewAfter) {
    await db()
      .update(sessions)
      .set({ expiresAt: expiresIn(TOKEN_TTL.session) })
      .where(eq(sessions.id, sessionId));
  }

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    emailVerifiedAt: row.emailVerifiedAt,
  };
});

/** Ends the caller's own session. */
export async function destroyCurrentSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await db().delete(sessions).where(eq(sessions.id, hashToken(token)));
  }
  jar.delete(SESSION_COOKIE);
}

/** Ends every session for a user — used after a password change or reset. */
export async function destroyAllSessions(userId: string): Promise<void> {
  await db().delete(sessions).where(eq(sessions.userId, userId));
}

/** Housekeeping for a scheduled job; safe to call any time. */
export async function purgeExpiredSessions(): Promise<void> {
  await db().delete(sessions).where(and(lt(sessions.expiresAt, new Date())));
}
