"use client";

import { useState } from "react";
import type { Course } from "@/lib/content";

export function CourseList({ courses }: { courses: Course[] }) {
  const [openSlug, setOpenSlug] = useState<string>("");

  return (
    <div className="divide-y divide-line border-y border-line">
      {courses.map((course) => {
        const open = openSlug === course.slug;
        return (
          <div key={course.slug}>
            <button
              type="button"
              onClick={() => setOpenSlug(open ? "" : course.slug)}
              aria-expanded={open}
              className="flex w-full flex-col gap-3 py-7 text-left sm:flex-row sm:items-center sm:justify-between"
            >
              <span
                className={`font-serif text-2xl transition-colors duration-300 md:text-3xl ${
                  open ? "text-teal" : "text-ink"
                }`}
              >
                {course.name}
              </span>
              <span className="flex items-center gap-6 text-sm text-ink-soft">
                <span>{course.level}</span>
                <span>{course.duration}</span>
                <span className="hidden md:inline">{course.domain}</span>
                <span
                  aria-hidden
                  className={`flex h-7 w-7 shrink-0 items-center justify-center border border-line-strong text-base transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </span>
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] pb-8 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
                  {course.summary}
                </p>
                <ul className="mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {course.outline.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink">
                      <span aria-hidden className="text-copper">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
