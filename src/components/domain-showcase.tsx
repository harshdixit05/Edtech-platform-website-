"use client";

import { useState } from "react";
import Link from "next/link";
import { domains, levels, EXTERNAL } from "@/lib/content";

export function DomainShowcase() {
  const [activeSlug, setActiveSlug] = useState(domains[0].slug);
  const active = domains.find((d) => d.slug === activeSlug) ?? domains[0];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(240px,0.8fr)_1.2fr] lg:gap-16">
      {/* Tabs */}
      <div>
        <ul className="border-l border-line">
          {domains.slice(0, 8).map((domain) => {
            const selected = domain.slug === activeSlug;
            return (
              <li key={domain.slug}>
                <button
                  type="button"
                  onClick={() => setActiveSlug(domain.slug)}
                  aria-current={selected}
                  className={`-ml-px flex w-full items-center gap-3 border-l-2 py-3.5 pl-5 pr-3 text-left text-[0.9375rem] transition-colors duration-300 ${
                    selected
                      ? "border-teal font-semibold text-teal"
                      : "border-transparent text-ink-soft hover:text-navy"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      selected ? "bg-teal" : "bg-transparent"
                    }`}
                  />
                  {domain.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Panel */}
      <div className="card p-8 shadow-[0_20px_50px_-40px_rgba(15,23,56,0.4)] md:p-10">
        <div key={active.slug} className="animate-[fadeIn_.4s_ease-out]">
          <h3 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
            {active.name}
          </h3>
          <p className="mt-3 max-w-lg text-ink-soft">{active.description}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {active.topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-surface-2 px-4 py-3.5 text-[0.9375rem] font-medium text-navy"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
                {topic}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-ink-faint">Levels</span>
            {levels.map((level) => (
              <span
                key={level.name}
                className="rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-ink-soft"
              >
                {level.name}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-7">
            <Link
              href={EXTERNAL.catalogue}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-navy px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-teal"
            >
              See courses
              <span aria-hidden className="arrow-shift">
                →
              </span>
            </Link>
            <Link href="/courses" className="link-underline text-[0.9375rem] font-medium text-navy">
              All categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
