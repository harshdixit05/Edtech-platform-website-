"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const inputClass =
  "w-full border-0 border-b-2 border-line bg-transparent py-3.5 text-[1.0625rem] font-medium text-navy transition-colors placeholder:text-ink-faint focus:border-teal focus:outline-none";

const labelClass = "t-eyebrow text-ink-faint";

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
      <div className="border-t-2 border-teal pt-9">
        <p className="font-display text-3xl font-extrabold tracking-tight text-navy">
          Thank you.
        </p>
        <p className="mt-3 max-w-md text-ink-soft">
          We&rsquo;ve received your message and will respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={`mt-2 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={`mt-2 ${inputClass}`} />
        </div>
      </div>

      <div>
        <label htmlFor="reason" className={labelClass}>
          I&rsquo;m reaching out as a
        </label>
        <select id="reason" name="reason" defaultValue="learner" className={`mt-2 ${inputClass}`}>
          <option value="learner">Learner</option>
          <option value="organisation">Organisation or partner</option>
          <option value="supporter">Supporter / donor</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
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
        className="group inline-flex items-center gap-2.5 self-start bg-navy px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-teal"
      >
        Send message
        <span aria-hidden className="arrow-shift">
          →
        </span>
      </button>
    </form>
  );
}
