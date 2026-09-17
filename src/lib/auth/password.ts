import "server-only";
import { hash, verify } from "@node-rs/argon2";

/**
 * 2 is Algorithm.Argon2id. The library declares that enum as an ambient const
 * enum, which TypeScript cannot inline under isolatedModules, so the value is
 * written out and asserted against the produced digest in the test suite.
 */
const ARGON2ID = 2;

/**
 * OWASP Password Storage Cheat Sheet, Argon2id baseline:
 * m = 19 MiB, t = 2, p = 1.
 */
const options = {
  algorithm: ARGON2ID,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

/**
 * A real Argon2id digest of a value no user can supply. Verifying against this
 * when an account does not exist keeps login timing flat, so responses cannot
 * be used to tell registered addresses from unregistered ones.
 */
let dummyHashPromise: Promise<string> | undefined;

function dummyHash() {
  dummyHashPromise ??= hash(
    "not-a-real-password-8f2b41d6e7c94a05b1d3f8e2c7a64901",
    options
  );
  return dummyHashPromise;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, options);
}

export async function verifyPassword(
  digest: string,
  password: string
): Promise<boolean> {
  try {
    return await verify(digest, password, options);
  } catch {
    // Malformed digest — treat as a failed login, never as a pass.
    return false;
  }
}

/** Burn equivalent CPU time for an address with no account. */
export async function fakeVerify(password: string): Promise<void> {
  try {
    await verify(await dummyHash(), password, options);
  } catch {
    /* ignore */
  }
}
