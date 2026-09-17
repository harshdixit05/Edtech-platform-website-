"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  requestPasswordResetAction,
  resetPasswordAction,
  type FormState,
} from "@/lib/auth/actions";
import { Field, SubmitButton, FormMessage } from "./form-parts";

export function ForgotPasswordForm() {
  const [state, action] = useActionState<FormState, FormData>(
    requestPasswordResetAction,
    {}
  );

  if (state.success) {
    return <FormMessage tone="success">{state.success}</FormMessage>;
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <FormMessage tone="error">{state.error}</FormMessage>}

      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        error={state.fieldErrors?.email}
      />

      <SubmitButton>Send reset link</SubmitButton>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action] = useActionState<FormState, FormData>(resetPasswordAction, {});

  if (state.success) {
    return (
      <div className="flex flex-col gap-5">
        <FormMessage tone="success">{state.success}</FormMessage>
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-navy px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-teal"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <FormMessage tone="error">{state.error}</FormMessage>}

      <input type="hidden" name="token" value={token} />

      <Field
        id="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        minLength={12}
        maxLength={128}
        hint="At least 12 characters."
        error={state.fieldErrors?.password}
      />

      <SubmitButton>Change password</SubmitButton>

      <p className="text-[0.8125rem] leading-relaxed text-ink-faint">
        Changing your password signs out every device currently using your account.
      </p>
    </form>
  );
}
