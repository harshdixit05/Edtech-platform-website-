import Link from "next/link";
import { Button } from "@/components/button";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { BrandFigure } from "@/components/brand-figure";
import { MindGlyph } from "@/components/logo";
import {
  pillars,
  initiatives,
  alignmentPoints,
  ALIGNMENT_DISCLAIMER,
  domains,
  levels,
  catalogueHighlights,
  supportPoints,
  DONATION_DISCLAIMER,
  EXTERNAL,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="grid-bg" />
        <div className="glow glow-teal -right-20 -top-24 h-[420px] w-[420px]" />
        <div className="glow glow-navy -left-40 top-40 h-[380px] w-[380px] opacity-40" />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>Not-for-profit FinTech Education</SectionLabel>
              <h1 className="t-hero mt-7 max-w-[15ch] text-balance text-navy">
                Empowering India through{" "}
                <span className="relative whitespace-nowrap text-teal">
                  FinTech
                  <svg
                    aria-hidden
                    viewBox="0 0 240 12"
                    className="absolute -bottom-2 left-0 w-full text-teal/45"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C60 3 180 3 238 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      className="draw-line"
                    />
                  </svg>
                </span>{" "}
                education
              </h1>
              <p className="t-lead mt-9 max-w-xl text-ink-soft">
                Intellimindz Foundation is a Section 8 Company committed to building a
                digitally literate, financially aware and future-ready India through
                accessible learning in financial technology and emerging digital finance.
              </p>
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Button href="/courses">Explore FinTech Courses</Button>
                <Button href="/support" variant="outline">
                  Support our mission
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative">
              <BrandFigure
                src="/images/hero.jpg"
                alt="A learner studying financial technology on a laptop"
                className="aspect-[4/3.2] w-full"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              <div className="absolute -bottom-7 -left-5 hidden bg-white p-5 shadow-[0_24px_60px_-30px_rgba(15,23,56,0.5)] sm:block">
                <div className="flex items-center gap-4">
                  <MindGlyph className="h-9 w-9 text-teal" />
                  <div>
                    <p className="font-display text-[1.0625rem] font-extrabold tracking-tight text-navy">
                      Section 8 Company
                    </p>
                    <p className="text-sm text-ink-soft">Not-for-profit, mission-first</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative border-y border-line bg-surface-2">
          <Marquee items={domains.map((d) => d.name)} />
        </div>
      </section>

      {/* ---------------- PILLARS ---------------- */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel>What we do</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[18ch] text-balance text-navy">
            Four commitments, one mission.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <article className="card-lift group h-full border border-transparent bg-white p-9">
                <span className="font-display text-sm font-extrabold tracking-widest text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-6 text-navy">{pillar.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- NATIONAL ALIGNMENT ---------------- */}
      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="glow glow-teal right-0 top-20 h-[380px] w-[380px] opacity-30" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <SectionLabel invert>National alignment</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[16ch] text-balance">
                  Contributing to India&rsquo;s digital transformation.
                </h2>
              </div>
              <p className="t-lead text-white/65">
                Our education and capacity-building objectives are aligned with the broader
                goals of key national initiatives.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {initiatives.map((item, i) => (
              <Reveal key={item.name} delay={i * 70}>
                <article className="group h-full bg-navy-ink p-8 transition-colors duration-500 hover:bg-navy">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-white">
                    {item.name}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-4 block h-[2px] w-8 bg-teal transition-all duration-500 group-hover:w-16"
                  />
                  <p className="mt-5 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {alignmentPoints.map((point) => (
                <li key={point} className="flex items-start gap-4 text-white/85">
                  <span aria-hidden className="mt-2 h-[6px] w-[6px] shrink-0 bg-teal" />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-14 max-w-3xl border-t border-line-invert pt-6 text-[0.8125rem] leading-relaxed text-white/45">
              {ALIGNMENT_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CATALOGUE ---------------- */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <BrandFigure
              src="/images/catalogue.jpg"
              alt="Learners comparing FinTech course options"
              className="aspect-[4/3] w-full"
            />
          </Reveal>

          <Reveal delay={120}>
            <SectionLabel>Course catalogue</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
              Discover courses by category, level and price.
            </h2>
            <p className="t-lead mt-7 max-w-lg text-ink-soft">
              Filter by category, level and audience, compare Free and Paid programmes, and
              enrol directly.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {catalogueHighlights.map((item) => (
                <li
                  key={item}
                  className="bg-white px-6 py-5 font-display text-[0.9375rem] font-bold tracking-tight text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={EXTERNAL.catalogue}>Browse the course catalogue</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DOMAINS ---------------- */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <SectionLabel>Learning ecosystem</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
                  A complete FinTech learning ecosystem.
                </h2>
              </div>
              <p className="max-w-sm text-ink-soft">
                Choose a domain, start at the right level, and build a stackable pathway.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {domains.slice(0, 8).map((domain, i) => (
              <Reveal key={domain.slug} delay={i * 60}>
                <Link
                  href={`/courses#${domain.slug}`}
                  className="card-lift group flex h-full flex-col border border-transparent bg-white p-8"
                >
                  <span className="t-eyebrow text-teal">{domain.short}</span>
                  <h3 className="mt-5 font-display text-[1.375rem] font-extrabold leading-tight tracking-tight text-navy">
                    {domain.name}
                  </h3>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {domain.description}
                  </p>
                  <span className="mt-7 flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                    View courses
                    <span aria-hidden className="arrow-shift">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12">
              <Button href="/courses" variant="outline">
                Explore categories
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- LEVELS ---------------- */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel>Learning ladder</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[18ch] text-balance text-navy">
            From quick discovery to advanced specialisation.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {levels.map((level, i) => (
            <Reveal key={level.step} delay={i * 60}>
              <article className="group grid grid-cols-1 items-baseline gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-surface-2 md:grid-cols-[80px_1.1fr_0.9fr_1fr] md:gap-8 md:px-4">
                <span className="font-display text-sm font-extrabold tracking-widest text-teal">
                  {level.step}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
                    {level.name}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-3 block h-[3px] bg-teal/70 transition-all duration-500"
                    style={{ width: `${20 + i * 18}%` }}
                  />
                </div>
                <p className="font-semibold text-navy">{level.hours}</p>
                <div>
                  <p className="text-ink-soft">{level.outcome}</p>
                  <p className="mt-1 text-sm text-ink-faint">{level.audience}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SUPPORT ---------------- */}
      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="glow glow-teal left-1/4 top-0 h-[400px] w-[400px] opacity-25" />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionLabel invert>Support our mission</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[14ch] text-balance">
              Help a learner move from potential to possibility.
            </h2>
            <p className="t-lead mt-7 max-w-lg text-white/65">
              Your contribution helps learners build practical, future-ready capabilities
              across FinTech, digital payments, AI in finance, cybersecurity and more.
            </p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {supportPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 font-semibold text-white">
                  <span aria-hidden className="h-[6px] w-[6px] bg-teal" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-11 flex flex-wrap gap-4">
              <Button href="/support" variant="invert">
                Contribute now
              </Button>
              <Button href="/partnerships" variant="ghost">
                Partner with us
              </Button>
            </div>

            <p className="mt-12 max-w-xl border-t border-line-invert pt-6 text-[0.8125rem] leading-relaxed text-white/45">
              {DONATION_DISCLAIMER}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <BrandFigure
              src="/images/support.jpg"
              alt="Learners in a FinTech capability-building session"
              className="aspect-[4/3.4] w-full"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
