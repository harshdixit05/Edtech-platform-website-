import { z } from "zod";

/**
 * Passwords: length is the control that matters, so the floor is 12 rather
 * than a composition rule. The ceiling exists because Argon2id hashes the
 * whole input — unbounded length is a cheap way to burn server CPU.
 */
const MIN_PASSWORD = 12;
const MAX_PASSWORD = 128;

/** Blocks the handful of passwords that dominate credential-stuffing lists. */
const BANNED = new Set([
  "password",
  "password1",
  "password123",
  "passw0rd123",
  "123456789012",
  "qwertyuiop123",
  "letmein12345",
  "iloveyou1234",
  "welcome12345",
  "adminadmin12",
  "intellimindz",
  "fintech12345",
]);

export const emailSchema = z
  .string()
  .trim()
  .min(3)
  .max(254)
  .email("Enter a valid email address")
  .transform((value) => value.toLowerCase());

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD, `Use at least ${MIN_PASSWORD} characters`)
  .max(MAX_PASSWORD, `Use at most ${MAX_PASSWORD} characters`)
  .refine((value) => !BANNED.has(value.toLowerCase()), {
    message: "That password is too common — choose something less guessable",
  });

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter your name")
  .max(80, "That name is too long");

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .refine(
    ({ email, password }) => {
      const local = email.split("@")[0] ?? "";
      return local.length < 4 || !password.toLowerCase().includes(local.toLowerCase());
    },
    { path: ["password"], message: "Your password should not contain your email" }
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password").max(MAX_PASSWORD),
});

export const requestResetSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z.object({
  token: z.string().min(10).max(200),
  password: passwordSchema,
});

/** Rough strength signal for the signup field — advisory only, never a gate. */
export function passwordStrength(password: string): 0 | 1 | 2 | 3 {
  if (password.length < MIN_PASSWORD) return 0;
  let score = 1;
  if (password.length >= 16) score++;
  if (/[^A-Za-z0-9]/.test(password) && /\d/.test(password)) score++;
  return Math.min(score, 3) as 0 | 1 | 2 | 3;
}
