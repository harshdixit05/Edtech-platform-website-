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
