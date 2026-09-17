import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { levels, formats, audiences, EXTERNAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learning Levels",
  description:
    "A five-level learning ladder — Discovery, Fluency, Beginner, Intermediate and Advanced — designed as a stackable FinTech pathway.",
};

export default function LearningPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg" />
        <div className="glow glow-teal -left-20 -top-24 h-96 w-96 opacity-45" />

        <div className="relative mx-auto max-w-[1320px] px-5 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
          <Reveal>
            <SectionLabel>Learning model</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[15ch] text-balance text-navy">
              From quick discovery to <span className="text-teal">advanced specialisation</span>
            </h1>
            <p className="t-lead mt-8 max-w-xl text-ink-soft">
              The course architecture is designed as a clear learning ladder. Start at the
              level that matches you today, and stack upward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ladder */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4">
          {levels.map((level, i) => (
            <Reveal key={level.step} delay={i * 70}>
              <article className="group card grid grid-cols-1 gap-6 p-7 transition-colors duration-500 hover:border-teal/40 md:grid-cols-[70px_1fr_1fr_1fr] md:items-center md:p-8">
                <span className="font-display text-sm font-bold tracking-widest text-teal">
                  {level.step}
                </span>

                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                    {level.name}
                  </h2>
                  <span
                    aria-hidden
                    className="mt-4 block h-[4px] bg-teal transition-all duration-700 group-hover:opacity-80"
                    style={{ width: `${24 + i * 19}%` }}
                  />
                </div>

                <div>
                  <p className="t-eyebrow text-ink-faint">Commitment</p>
                  <p className="mt-2 font-display text-base font-bold tracking-tight text-navy">
                    {level.hours}
                  </p>
                </div>

                <div>
                  <p className="t-eyebrow text-ink-faint">Outcome</p>
                  <p className="mt-2 font-semibold text-ink">{level.outcome}</p>
                  <p className="mt-1 text-sm text-ink-soft">For {level.audience.toLowerCase()}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Formats */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionLabel>Formats</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
              Learn the way that <span className="text-teal">fits your week</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {formats.map((format, i) => (
              <Reveal key={format.name} delay={i * 80}>
                <article className="card h-full p-7">
                  <h3 className="t-h3 text-navy">{format.name}</h3>
                  <span aria-hidden className="mt-5 block h-[2px] w-10 bg-teal" />
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {format.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionLabel>Who learns with us</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            Built for <span className="text-teal">every kind of learner</span>
          </h2>
          <ul className="mt-12 flex flex-wrap gap-3">
            {audiences.map((audience) => (
              <li
                key={audience}
                className="rounded-full border border-line px-5 py-2.5 text-[0.9375rem] font-medium text-navy transition-colors duration-300 hover:border-teal hover:text-teal"
              >
                {audience}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="relative mx-auto flex max-w-[1320px] flex-col items-start gap-8 px-5 py-20 md:px-8 md:py-24 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="t-h2 max-w-[18ch] text-balance">Find your <span className="text-teal-bright">starting level</span></h2>
          <div className="flex flex-wrap gap-4">
            <Button href="/courses" variant="invert">
              Explore domains
            </Button>
            <Button href={EXTERNAL.catalogue} variant="ghost">
              Browse catalogue
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
