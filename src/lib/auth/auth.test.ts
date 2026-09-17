import { describe, expect, it } from "vitest";
import { generateToken, hashToken, safeEqual, expiresIn, TOKEN_TTL } from "./tokens";
import { hashPassword, verifyPassword } from "./password";
import { signupSchema, loginSchema, passwordStrength } from "./validation";

describe("tokens", () => {
  it("generates unguessable, unique tokens", () => {
    const tokens = new Set(Array.from({ length: 200 }, generateToken));
    expect(tokens.size).toBe(200);
    // 32 raw bytes in base64url
    expect(generateToken()).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("stores tokens only as a stable digest", () => {
    const token = generateToken();
    expect(hashToken(token)).toHaveLength(64);
    expect(hashToken(token)).toBe(hashToken(token));
    expect(hashToken(token)).not.toBe(token);
    expect(hashToken(generateToken())).not.toBe(hashToken(token));
  });

  it("compares digests without leaking length mismatches", () => {
    const digest = hashToken("abc");
    expect(safeEqual(digest, digest)).toBe(true);
    expect(safeEqual(digest, hashToken("abd"))).toBe(false);
    expect(safeEqual(digest, "short")).toBe(false);
  });

  it("expires reset links well before verification links", () => {
    expect(TOKEN_TTL.passwordReset).toBeLessThan(TOKEN_TTL.emailVerification);
    expect(expiresIn(1000).getTime()).toBeGreaterThan(Date.now());
  });
});

describe("password hashing", () => {
  it("produces a verifiable Argon2id digest", async () => {
    const digest = await hashPassword("a-perfectly-fine-passphrase");
    expect(digest.startsWith("$argon2id$")).toBe(true);
    expect(await verifyPassword(digest, "a-perfectly-fine-passphrase")).toBe(true);
    expect(await verifyPassword(digest, "a-perfectly-fine-passphras")).toBe(false);
  }, 20_000);

  it("salts, so identical passwords hash differently", async () => {
    const [a, b] = await Promise.all([
      hashPassword("identical-password-here"),
      hashPassword("identical-password-here"),
    ]);
    expect(a).not.toBe(b);
  }, 20_000);

  it("rejects a malformed digest instead of throwing", async () => {
    expect(await verifyPassword("not-a-hash", "whatever")).toBe(false);
  });
});

describe("validation", () => {
  it("normalises email casing and whitespace", () => {
    const parsed = signupSchema.parse({
      name: "Asha Rao",
      email: "  Asha.Rao@Example.COM ",
      password: "correct-horse-battery",
    });
    expect(parsed.email).toBe("asha.rao@example.com");
  });

  it("requires at least twelve characters", () => {
    const result = signupSchema.safeParse({
      name: "Asha Rao",
      email: "asha@example.com",
      password: "short1!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects common passwords", () => {
    const result = signupSchema.safeParse({
      name: "Asha Rao",
      email: "asha@example.com",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a password containing the email local part", () => {
    const result = signupSchema.safeParse({
      name: "Asha Rao",
      email: "ashatheanalyst@example.com",
      password: "ashatheanalyst2026",
    });
    expect(result.success).toBe(false);
  });

  it("caps password length so hashing cannot be used to burn CPU", () => {
    const result = signupSchema.safeParse({
      name: "Asha Rao",
      email: "asha@example.com",
      password: "x".repeat(2000),
    });
    expect(result.success).toBe(false);
  });

  it("does not impose the length floor when signing in", () => {
    expect(
      loginSchema.safeParse({ email: "asha@example.com", password: "old-short" }).success
    ).toBe(true);
  });

  it("scores password strength for the signup hint", () => {
    expect(passwordStrength("short")).toBe(0);
    expect(passwordStrength("twelvechars1")).toBe(1);
    expect(passwordStrength("sixteencharacters")).toBe(2);
    expect(passwordStrength("sixteencharacters1!")).toBe(3);
  });
});
