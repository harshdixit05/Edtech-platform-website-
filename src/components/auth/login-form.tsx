"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type FormState } from "@/lib/auth/actions";
import { Field, SubmitButton, FormMessage } from "./form-parts";

export function LoginForm() {
  const [state, action] = useActionState<FormState, FormData>(loginAction, {});

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

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="password" className="text-[0.875rem] font-medium text-navy">
            Password
          </label>
          <Link href="/forgot-password" className="link-underline text-[0.8125rem] text-ink-soft">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={128}
          aria-invalid={state.fieldErrors?.password ? true : undefined}
          className="mt-2 w-full rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 text-[0.9375rem] text-navy transition-colors placeholder:text-ink-faint focus:border-teal focus:outline-none"
        />
        {state.fieldErrors?.password && (
          <p className="mt-2 text-[0.8125rem] text-red-600">{state.fieldErrors.password}</p>
        )}
      </div>

      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
}
