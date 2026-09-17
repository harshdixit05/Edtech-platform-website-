"use client";

import { useFormStatus } from "react-dom";

export const inputClass =
  "w-full rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 text-[0.9375rem] text-navy transition-colors placeholder:text-ink-faint focus:border-teal focus:outline-none aria-[invalid=true]:border-red-500";

export function Field({
  id,
  label,
  type = "text",
  error,
  hint,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className="text-[0.875rem] font-medium text-navy">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`mt-2 ${inputClass}`}
        {...rest}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.8125rem] text-ink-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.8125rem] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-navy px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-teal disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Working…" : children}
      {!pending && (
        <span aria-hidden className="arrow-shift">
          →
        </span>
      )}
    </button>
  );
}

export function FormMessage({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  const isError = tone === "error";
  return (
    <p
      role="status"
      aria-live="polite"
      className={`rounded-[var(--radius-sm)] px-4 py-3 text-[0.875rem] ${
        isError
          ? "bg-red-50 text-red-700"
          : "bg-surface-2 text-ink-soft"
      }`}
    >
      {children}
    </p>
  );
}
