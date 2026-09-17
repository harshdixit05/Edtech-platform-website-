"use client";

import { useState } from "react";
import Link from "next/link";
import { domains, levels, EXTERNAL } from "@/lib/content";

export function CourseExplorer() {
  const [activeSlug, setActiveSlug] = useState(domains[0].slug);
  const active = domains.find((d) => d.slug === activeSlug) ?? domains[0];

  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-[minmax(280px,0.85fr)_1.15fr]">
      {/* Category rail */}
      <div className="bg-white">
        <ul>
          {domains.map((domain) => {
            const selected = domain.slug === activeSlug;
            return (
              <li key={domain.slug} id={domain.slug} className="scroll-mt-28">
                <button
                  type="button"
                  onClick={() => setActiveSlug(domain.slug)}
                  aria-current={selected}
                  className={`group flex w-full items-center justify-between gap-4 border-b border-line px-6 py-5 text-left transition-colors duration-300 ${
                    selected ? "bg-navy" : "hover:bg-surface-2"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className={`h-[2px] transition-all duration-500 ${
                        selected ? "w-8 bg-teal" : "w-3 bg-line-strong group-hover:w-6"
                      }`}
                    />
                    <span
                      className={`font-display text-[1.0625rem] font-bold tracking-tight ${
                        selected ? "text-white" : "text-navy"
                      }`}
                    >
                      {domain.name}
                    </span>
                  </span>
                  <span
                    className={`t-eyebrow shrink-0 ${
                      selected ? "text-teal-bright" : "text-ink-faint"
                    }`}
                  >
                    {domain.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail panel */}
      <div className="flex flex-col justify-between bg-white p-8 md:p-12">
        <div key={active.slug} className="animate-[fadeIn_.45s_ease-out]">
          <p className="t-eyebrow text-teal">{active.short}</p>
          <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-[2.5rem]">
            {active.name}
          </h3>
          <p className="t-lead mt-5 max-w-lg text-ink-soft">{active.description}</p>

          <ul className="mt-9 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {active.topics.map((topic) => (
              <li
                key={topic}
                className="flex items-center gap-3 bg-white px-5 py-4 text-[0.9375rem] font-semibold tracking-tight text-navy"
              >
                <span aria-hidden className="h-[5px] w-[5px] shrink-0 bg-teal" />
                {topic}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <p className="t-eyebrow text-ink-faint">Available levels</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {levels.map((level) => (
                <span
                  key={level.name}
                  className="border border-line px-3.5 py-2 text-[0.8125rem] font-semibold tracking-tight text-ink-soft"
                >
                  {level.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center gap-6">
          <Link
            href={EXTERNAL.catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-navy px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-teal"
          >
            See {active.name} courses
            <span aria-hidden className="arrow-shift">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="link-underline text-[0.9375rem] font-semibold text-navy"
          >
            Ask about this domain
          </Link>
        </div>
      </div>
    </div>
  );
}
