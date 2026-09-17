import Link from "next/link";
import { Button } from "@/components/button";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { SignatureMark } from "@/components/signature-mark";
import { FocusAreas } from "@/components/focus-areas";
import {
  featuredCourse,
  courses,
  learningStages,
  learningExperience,
  insights,
} from "@/lib/content";

const positioning = ["Payments", "Financial Inclusion", "Open Banking", "Lending", "RegTech"];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionLabel>IntelliMindz Foundation</SectionLabel>
          <h1 className="mt-6 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Empowering India through FinTech education.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            A Section 8 company building a digitally literate, financially
            aware and future-ready India — one learner at a time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/courses">Explore FinTech Courses</Button>
            <Button href="/partnerships" variant="ghost">
              Partner With Us
            </Button>
          </div>
        </div>

        <Reveal className="justify-self-center lg:justify-self-end" delay={150}>
          <SignatureMark className="h-auto w-full max-w-sm text-ink" />
        </Reveal>
      </section>

      {/* POSITIONING STRIP */}
      <section className="rule border-b border-line">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-10 gap-y-4 px-6 py-8 md:px-10">
          {positioning.map((item) => (
            <span
              key={item}
              className="text-xs font-medium uppercase tracking-[0.24em] text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Featured Course</SectionLabel>
              <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight text-ink md:text-5xl">
                {featuredCourse.name}
              </h2>
            </div>
            <Link href="/courses" className="link-underline text-sm text-ink">
              View all courses →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-[1fr_1fr]">
            <p className="text-lg leading-relaxed text-ink-soft">
              {featuredCourse.summary}
            </p>
            <dl className="grid grid-cols-3 gap-6 self-start text-sm md:justify-self-end">
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
          </div>
        </Reveal>

        <div className="mt-6 divide-y divide-line border-t border-line">
          {courses.slice(0, 4).map((course, i) => (
            <Reveal key={course.slug} delay={i * 60}>
              <Link
                href="/courses"
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-serif text-2xl text-ink transition-colors duration-300 group-hover:text-teal">
                  {course.name}
                </span>
                <span className="flex items-center gap-6 text-sm text-ink-soft">
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                  <span className="hidden sm:inline">{course.domain}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEARNING MODEL */}
      <section className="rule border-b border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <Reveal>
            <SectionLabel>The Learning Model</SectionLabel>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight text-ink md:text-5xl">
              Discover. Build. Apply. Lead.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {learningStages.map((stage, i) => (
              <Reveal key={stage.step} delay={i * 100}>
                <div className="border-t border-line-strong pt-6">
                  <span className="font-serif text-lg text-copper">{stage.step}</span>
                  <h3 className="mt-3 font-serif text-2xl text-ink">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {stage.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>Areas of Focus</SectionLabel>
              <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-ink md:text-5xl">
                FinTech, in depth.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
                We teach one field, deeply, rather than many fields,
                shallowly.
              </p>
            </div>
            <FocusAreas />
          </div>
        </Reveal>
      </section>

      {/* LEARNING EXPERIENCE */}
      <section className="rule border-y border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <Reveal>
            <SectionLabel>The Learning Experience</SectionLabel>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {learningExperience.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel>For Organizations</SectionLabel>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink md:text-5xl">
                Bring FinTech literacy to your institution.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
                We work with corporates, government bodies and community
                organizations to design and deliver FinTech capability
                programs.
              </p>
            </div>
            <Button href="/partnerships">Build a Program</Button>
          </div>
        </Reveal>
      </section>

      {/* ABOUT TEASER */}
      <section className="rule border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <SectionLabel>About IntelliMindz</SectionLabel>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                  A foundation, not a marketplace.
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-ink-soft">
                  IntelliMindz Foundation is a Section 8 company committed to
                  building a digitally literate, financially aware and
                  future-ready India through accessible learning in financial
                  technology and emerging digital finance.
                </p>
                <Link href="/about" className="link-underline mt-6 inline-block text-sm text-ink">
                  Read our story →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel>Insights</SectionLabel>
            <Link href="/insights" className="link-underline text-sm text-ink">
              All insights →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-2">
          {insights.slice(0, 2).map((article, i) => (
            <Reveal key={article.slug} delay={i * 100}>
              <Link href="/insights" className="group block">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-teal">
                  {article.category}
                </span>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-ink transition-colors duration-300 group-hover:text-teal">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {article.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="rule border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center md:px-10">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-serif text-4xl leading-tight text-ink md:text-6xl">
              Build the capability to shape India&rsquo;s digital finance
              future.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/courses">Explore FinTech Courses</Button>
              <Button href="/contact" variant="ghost">
                Talk to IntelliMindz
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
