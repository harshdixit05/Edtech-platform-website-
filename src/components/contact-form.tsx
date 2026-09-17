"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const inputClass =
  "w-full border-0 border-b border-line-strong bg-transparent py-3 text-base text-ink placeholder:text-ink-soft focus:border-teal focus:outline-none";

/**
 * Front-end only. Wire the onSubmit handler to a real endpoint
 * (email service, CRM, etc.) before launch.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border-t border-line-strong pt-8">
        <p className="font-serif text-2xl text-ink">Thank you.</p>
        <p className="mt-2 max-w-md text-base leading-relaxed text-ink-soft">
          We&rsquo;ve received your message and will respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            Name
          </label>
          <input id="name" name="name" type="text" required className={`mt-2 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            Email
          </label>
          <input id="email" name="email" type="email" required className={`mt-2 ${inputClass}`} />
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          I&rsquo;m reaching out as a
        </label>
        <select id="reason" name="reason" className={`mt-2 ${inputClass}`} defaultValue="learner">
          <option value="learner">Prospective learner</option>
          <option value="organization">Organization / partner</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`mt-2 resize-none ${inputClass}`}
        />
      </div>

      <button
        type="submit"
        className="self-start bg-teal px-6 py-3 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-teal-deep"
      >
        Send message
      </button>
    </form>
  );
}
