"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const inputClass =
  "w-full rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 text-[0.9375rem] text-navy transition-colors placeholder:text-ink-faint focus:border-teal focus:outline-none";

/**
 * Front-end only. Wire handleSubmit to the learning platform's auth endpoint
 * (or redirect to it) before launch — nothing is submitted today.
 */
export function LoginForm() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="text-[0.875rem] font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="password" className="text-[0.875rem] font-medium text-navy">
            Password
          </label>
          <button
            type="button"
            onClick={() => setNotice(true)}
            className="link-underline text-[0.8125rem] text-ink-soft"
          >
            Forgot password?
          </button>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <button
        type="submit"
        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-navy px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-teal"
      >
        Sign in
        <span aria-hidden className="arrow-shift">
          →
        </span>
      </button>

      {notice && (
        <p
          role="status"
          className="rounded-[var(--radius-sm)] bg-surface-2 px-4 py-3 text-[0.875rem] text-ink-soft"
        >
          Accounts live on the course platform. Head to{" "}
          <a
            href="https://intellimindz.in"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-semibold text-navy"
          >
            intellimindz.in
          </a>{" "}
          to sign in or enrol.
        </p>
      )}
    </form>
  );
}
