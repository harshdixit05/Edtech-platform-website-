"use client";

import { useActionState, useState } from "react";
import { signupAction, type FormState } from "@/lib/auth/actions";
import { passwordStrength } from "@/lib/auth/validation";
import { Field, SubmitButton, FormMessage } from "./form-parts";

const strengthLabels = ["Too short", "Weak", "Good", "Strong"] as const;
const strengthColors = ["bg-line-strong", "bg-amber-400", "bg-teal", "bg-teal"] as const;

export function SignupForm() {
  const [state, action] = useActionState<FormState, FormData>(signupAction, {});
  const [password, setPassword] = useState("");
  const score = passwordStrength(password);

  if (state.success) {
    return <FormMessage tone="success">{state.success}</FormMessage>;
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <FormMessage tone="error">{state.error}</FormMessage>}

      <Field
        id="name"
        label="Full name"
        autoComplete="name"
        required
        maxLength={80}
        error={state.fieldErrors?.name}
      />

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
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          minLength={12}
          maxLength={128}
          hint="At least 12 characters. A memorable phrase beats a short, complicated word."
          error={state.fieldErrors?.password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {password.length > 0 && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-1 flex-1 gap-1" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-full flex-1 rounded-full ${
                    i < score ? strengthColors[score] : "bg-line"
                  }`}
                />
              ))}
            </div>
            <span className="text-[0.75rem] text-ink-faint">{strengthLabels[score]}</span>
          </div>
        )}
      </div>

      <SubmitButton>Create account</SubmitButton>

      <p className="text-[0.8125rem] leading-relaxed text-ink-faint">
        By creating an account you agree to our{" "}
        <a href="/terms" className="link-underline text-ink-soft">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="link-underline text-ink-soft">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
