import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { CourseList } from "@/components/course-list";
import { featuredCourse, courses } from "@/lib/content";

export const metadata: Metadata = {
  title: "FinTech Courses",
  description:
    "Foundation to advanced courses in digital payments, financial inclusion, open banking, lending and RegTech — taught for the Indian context.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <SectionLabel>Courses</SectionLabel>
          <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
            FinTech courses, built for where India is headed.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Foundation to advanced. Every course is built around a single
            question: what does this look like in practice?
          </p>
        </Reveal>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <Reveal>
            <SectionLabel>Featured</SectionLabel>
            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                {featuredCourse.name}
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft">
                {featuredCourse.summary}
              </p>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {featuredCourse.outline.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink">
                  <span aria-hidden className="text-copper">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-8 flex flex-wrap gap-10 text-sm">
              <div>
                <dt className="text-ink-soft">Level</dt>
                <dd className="mt-1 font-medium text-ink">{featuredCourse.level}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Duration</dt>
                <dd className="mt-1 font-medium text-ink">{featuredCourse.duration}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Domain</dt>
                <dd className="mt-1 font-medium text-ink">{featuredCourse.domain}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <Reveal>
          <SectionLabel>All Courses</SectionLabel>
        </Reveal>
        <div className="mt-6">
          <CourseList courses={courses} />
        </div>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 py-20 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-lg font-serif text-3xl leading-tight text-ink md:text-4xl">
            Not sure where to start? Talk to us.
          </h2>
          <Button href="/contact" variant="ghost">
            Talk to IntelliMindz
          </Button>
        </div>
      </section>
    </>
  );
}
