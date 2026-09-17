"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const inputClass =
  "w-full rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 text-[0.9375rem] text-navy transition-colors placeholder:text-ink-faint focus:border-teal focus:outline-none";

const labelClass = "text-[0.875rem] font-medium text-navy";

/**
 * Front-end only. Wire handleSubmit to a real endpoint (email service, CRM
 * or form backend) before launch.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-sm)] bg-surface-2 p-6" role="status">
        <p className="font-display text-lg font-bold tracking-tight text-navy">
          Thank you — message received.
        </p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          We will reply within two to three business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className={`mt-2 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reason" className={labelClass}>
            I am a
          </label>
          <select id="reason" name="reason" defaultValue="learner" className={`mt-2 ${inputClass}`}>
            <option value="learner">Learner</option>
            <option value="organisation">Organisation or partner</option>
            <option value="supporter">Supporter or donor</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            maxLength={120}
            className={`mt-2 ${inputClass}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          placeholder="What would you like to know?"
          className={`mt-2 resize-none ${inputClass}`}
        />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2 self-start rounded-[var(--radius-sm)] bg-navy px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-teal"
      >
        Send message
        <span aria-hidden className="arrow-shift">
          →
        </span>
      </button>
    </form>
  );
}
