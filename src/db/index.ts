import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Lazily created so the app can be built and statically rendered without a
 * database reachable. Reused across hot reloads and serverless invocations.
 */
const globalForDb = globalThis as unknown as {
  __imfSql?: ReturnType<typeof postgres>;
};

/**
 * Accounts need a database to store in and a secret to key the rate limiter
 * with. Missing either one means the account screens render their forms but
 * cannot complete, so callers degrade rather than throw.
 *
 * Both are checked together because a half-configured deployment — a database
 * but no secret — otherwise fails deep inside the rate limiter with an
 * unhandled error rather than an explanation.
 */
export function isAuthConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.AUTH_SECRET);
}

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set — see .env.example");
  }
  globalForDb.__imfSql ??= postgres(url, {
    max: 1,
    idle_timeout: 20,
    // Connection poolers (PgBouncer in transaction mode) reject prepared statements.
    prepare: false,
  });
  return globalForDb.__imfSql;
}

let cached: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function db() {
  cached ??= drizzle(client(), { schema });
  return cached;
}

export { schema };
