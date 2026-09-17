"use client";

import { useState } from "react";
import { focusAreas } from "@/lib/content";

export function FocusAreas() {
  const [openKey, setOpenKey] = useState(focusAreas[0].key);

  return (
    <div className="divide-y divide-line border-y border-line">
      {focusAreas.map((area) => {
        const open = openKey === area.key;
        return (
          <div key={area.key}>
            <button
              type="button"
              onClick={() => setOpenKey(open ? "" : area.key)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`font-serif text-2xl transition-colors duration-300 md:text-4xl ${
                  open ? "text-teal" : "text-ink"
                }`}
              >
                {area.title}
              </span>
              <span
                aria-hidden
                className={`flex h-8 w-8 shrink-0 items-center justify-center border border-line-strong text-lg transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-xl text-base leading-relaxed text-ink-soft">
                  {area.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
