"use server";

import { redirect } from "next/navigation";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db, isAuthConfigured } from "@/db";
import { emailVerificationTokens, passwordResetTokens, users } from "@/db/schema";
import { hashPassword, verifyPassword, fakeVerify } from "./password";
import { generateToken, hashToken, expiresIn, TOKEN_TTL } from "./tokens";
import { createSession, destroyAllSessions, destroyCurrentSession } from "./session";
import { clientIp, consumeAttempt, clearAttempts, LIMITS } from "./rate-limit";
import {
  loginSchema,
  requestResetSchema,
  resetPasswordSchema,
  signupSchema,
} from "./validation";
import { sendEmail, appUrl } from "@/lib/email";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: string;
};

const GENERIC_LOGIN_ERROR = "That email and password combination is not correct.";
const NOT_CONFIGURED =
  "Accounts are not connected on this deployment yet. The screens are here, but nothing can be stored.";
const RATE_LIMITED = "Too many attempts. Please wait a few minutes and try again.";

function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return fieldErrors;
}

/* ------------------------------------------------------------------ */
/* Sign up                                                             */
/* ------------------------------------------------------------------ */

export async function signupAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (!isAuthConfigured()) return { error: NOT_CONFIGURED };

  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const { name, email, password } = parsed.data;

  const ip = await clientIp();
  const ipLimit = await consumeAttempt(
    `signup:ip:${ip}`,
    LIMITS.signupPerIp.limit,
    LIMITS.signupPerIp.windowMs
  );
  if (!ipLimit.allowed) return { error: RATE_LIMITED };

  const existing = await db()
    .select({ id: users.id, name: users.name })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const confirmation = {
    success:
      "Check your email to continue. If an account can be created for this address, we have sent a link.",
  };

  if (existing.length > 0) {
    // Never confirm or deny that an address is registered. The inbox owner is
    // told instead, which also warns them about an unexpected signup attempt.
    await sendEmail({
      to: email,
      subject: "You already have an Intellimindz Foundation account",
      text: [
        `Hello ${existing[0]!.name},`,
        "",
        "Someone tried to create an account with this email address, but one already exists.",
        `If that was you, sign in here: ${appUrl("/login")}`,
        `If you have forgotten your password: ${appUrl("/forgot-password")}`,
        "",
        "If this was not you, no action is needed — no new account was created.",
      ].join("\n"),
    }).catch(() => undefined);

    return confirmation;
  }

  const passwordHash = await hashPassword(password);

  const [created] = await db()
    .insert(users)
    .values({ name, email, passwordHash })
    .returning({ id: users.id });

  if (!created) return { error: "We could not create that account. Please try again." };

  await issueVerificationEmail(created.id, email, name);

  return confirmation;
}

async function issueVerificationEmail(userId: string, email: string, name: string) {
  const token = generateToken();

  await db().insert(emailVerificationTokens).values({
    id: hashToken(token),
    userId,
    email,
    expiresAt: expiresIn(TOKEN_TTL.emailVerification),
  });

  await sendEmail({
    to: email,
    subject: "Confirm your email address",
    text: [
      `Hello ${name},`,
      "",
      "Confirm your email address to finish setting up your account:",
      appUrl(`/verify-email?token=${token}`),
      "",
      "This link can be used once and expires in 24 hours.",
      "If you did not sign up, you can ignore this message.",
    ].join("\n"),
  });
}

/* ------------------------------------------------------------------ */
/* Verify email                                                        */
/* ------------------------------------------------------------------ */

export async function verifyEmailToken(
  token: string
): Promise<{ ok: boolean; message: string }> {
  if (!isAuthConfigured()) {
    return { ok: false, message: NOT_CONFIGURED };
  }
  if (!token) return { ok: false, message: "That verification link is not valid." };

  const rows = await db()
    .select()
    .from(emailVerificationTokens)
    .where(eq(emailVerificationTokens.id, hashToken(token)))
    .limit(1);

  const record = rows.at(0);
  if (!record || record.expiresAt.getTime() <= Date.now()) {
    return {
      ok: false,
      message: "That verification link has expired or has already been used.",
    };
  }

  await db()
    .update(users)
    .set({ emailVerifiedAt: new Date(), updatedAt: new Date() })
    .where(eq(users.id, record.userId));

  // Single use: clear every outstanding token for this user.
  await db()
    .delete(emailVerificationTokens)
    .where(eq(emailVerificationTokens.userId, record.userId));

  return { ok: true, message: "Your email address is confirmed. You can sign in now." };
}

/* ------------------------------------------------------------------ */
/* Log in                                                              */
/* ------------------------------------------------------------------ */

export async function loginAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (!isAuthConfigured()) return { error: NOT_CONFIGURED };

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const { email, password } = parsed.data;
  const ip = await clientIp();

  const ipLimit = await consumeAttempt(
    `login:ip:${ip}`,
    LIMITS.loginPerIp.limit,
    LIMITS.loginPerIp.windowMs
  );
  if (!ipLimit.allowed) return { error: RATE_LIMITED };

  const accountLimit = await consumeAttempt(
    `login:email:${email}`,
    LIMITS.loginPerAccount.limit,
    LIMITS.loginPerAccount.windowMs
  );
  if (!accountLimit.allowed) return { error: RATE_LIMITED };

  const rows = await db().select().from(users).where(eq(users.email, email)).limit(1);
  const user = rows.at(0);

  if (!user) {
    // Same work as a real verification, so timing cannot reveal which
    // addresses are registered.
    await fakeVerify(password);
    return { error: GENERIC_LOGIN_ERROR };
  }

  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    return { error: RATE_LIMITED };
  }

  const valid = await verifyPassword(user.passwordHash, password);

  if (!valid) {
    const failures = user.failedLoginCount + 1;
    await db()
      .update(users)
      .set({
        failedLoginCount: failures,
        lockedUntil:
          failures >= LIMITS.accountLockThreshold
            ? expiresIn(LIMITS.accountLockMs)
            : user.lockedUntil,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return { error: GENERIC_LOGIN_ERROR };
  }

  if (!user.emailVerifiedAt) {
    return {
      error: "Confirm your email address first — check your inbox for the link we sent.",
    };
  }

  await db()
    .update(users)
    .set({ failedLoginCount: 0, lockedUntil: null, updatedAt: new Date() })
    .where(eq(users.id, user.id));

  await clearAttempts(`login:email:${email}`);
  await createSession(user.id);

  redirect("/account");
}

/* ------------------------------------------------------------------ */
/* Log out                                                             */
/* ------------------------------------------------------------------ */

export async function logoutAction(): Promise<void> {
  await destroyCurrentSession();
  redirect("/login");
}

/* ------------------------------------------------------------------ */
/* Password reset                                                      */
/* ------------------------------------------------------------------ */

export async function requestPasswordResetAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (!isAuthConfigured()) return { error: NOT_CONFIGURED };

  const parsed = requestResetSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const { email } = parsed.data;
  const ip = await clientIp();

  const ipLimit = await consumeAttempt(
    `reset:ip:${ip}`,
    LIMITS.resetPerIp.limit,
    LIMITS.resetPerIp.windowMs
  );
  if (!ipLimit.allowed) return { error: RATE_LIMITED };

  const accountLimit = await consumeAttempt(
    `reset:email:${email}`,
    LIMITS.resetPerAccount.limit,
    LIMITS.resetPerAccount.windowMs
  );

  // Identical response whether or not the address exists.
  const confirmation = {
    success: "If that address has an account, a reset link is on its way.",
  };

  if (!accountLimit.allowed) return confirmation;

  const rows = await db()
    .select({ id: users.id, name: users.name })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = rows.at(0);
  if (!user) return confirmation;

  const token = generateToken();
  await db().insert(passwordResetTokens).values({
    id: hashToken(token),
    userId: user.id,
    expiresAt: expiresIn(TOKEN_TTL.passwordReset),
  });

  await sendEmail({
    to: email,
    subject: "Reset your password",
    text: [
      `Hello ${user.name},`,
      "",
      "Use this link to choose a new password:",
      appUrl(`/reset-password?token=${token}`),
      "",
      "The link can be used once and expires in one hour.",
      "If you did not ask for this, ignore the message — your password will not change.",
    ].join("\n"),
  });

  return confirmation;
}

export async function resetPasswordAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (!isAuthConfigured()) return { error: NOT_CONFIGURED };

  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const { token, password } = parsed.data;

  const rows = await db()
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.id, hashToken(token)),
        isNull(passwordResetTokens.usedAt),
        gt(passwordResetTokens.expiresAt, new Date())
      )
    )
    .limit(1);

  const record = rows.at(0);
  if (!record) {
    return { error: "That reset link has expired or has already been used." };
  }

  const passwordHash = await hashPassword(password);

  await db()
    .update(users)
    .set({
      passwordHash,
      failedLoginCount: 0,
      lockedUntil: null,
      // Holding a live reset link proves inbox control, so confirm the address.
      emailVerifiedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, record.userId));

  await db()
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, record.id));

  // Anyone holding a session opened with the old password is signed out.
  await destroyAllSessions(record.userId);

  return { success: "Your password has been changed. You can sign in with it now." };
}
