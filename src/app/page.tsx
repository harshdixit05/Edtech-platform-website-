import Link from "next/link";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { WaveField } from "@/components/wave-field";
import { DomainShowcase } from "@/components/domain-showcase";
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
      <section className="relative overflow-hidden bg-tint">
        <WaveField className="top-10" />

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 text-center md:px-10 md:py-32">
          <Reveal>
            <p className="text-[0.9375rem] text-ink-soft">
              Not-for-profit FinTech education
            </p>
            <h1 className="t-hero mx-auto mt-5 max-w-[20ch] text-navy">
              Empowering India through{" "}
              <span className="text-teal">FinTech education</span>{" "}
              <span className="md:whitespace-nowrap">for a digital tomorrow</span>
            </h1>
            <p className="t-lead mx-auto mt-7 max-w-2xl text-ink-soft">
              Intellimindz Foundation is a Section 8 Company committed to building a
              digitally literate, financially aware and future-ready India.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/courses">Explore FinTech Courses</Button>
              <Link
                href="/about"
                className="link-underline px-2 py-3 text-[0.9375rem] font-medium text-navy"
              >
                About the Foundation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-y border-line bg-white">
        <Marquee items={domains.map((d) => d.name)} />
      </div>

      {/* ---------------- PILLARS ---------------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="t-h2 mx-auto max-w-[20ch] text-balance text-center text-navy">
            Four commitments, one mission
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <article className="card card-lift h-full p-7">
                <span className="text-[0.8125rem] font-semibold text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-4 text-navy">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- LEARNING ECOSYSTEM (interactive) ---------------- */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="t-h2 mx-auto max-w-[22ch] text-balance text-center text-navy">
              A complete FinTech learning ecosystem
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-center text-ink-soft">
              Choose a domain, start at the right level, and build a stackable pathway.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-14">
              <DomainShowcase />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CATALOGUE ---------------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="t-h2 max-w-[18ch] text-balance text-navy">
                  Discover courses by category, level and price
                </h2>
                <p className="mt-5 max-w-lg text-ink-soft">
                  Filter by category, level and audience, compare Free and Paid
                  programmes, and enrol directly.
                </p>
                <div className="mt-8">
                  <Button href={EXTERNAL.catalogue}>Browse the course catalogue</Button>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {catalogueHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-surface-2 px-5 py-4 text-[0.9375rem] font-medium text-navy"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- LEVELS ---------------- */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="t-h2 mx-auto max-w-[24ch] text-balance text-center text-navy">
              From quick discovery to advanced specialisation
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((level, i) => (
              <Reveal key={level.step} delay={i * 60}>
                <article className="card card-lift h-full p-6">
                  <span className="text-[0.8125rem] font-semibold text-teal">
                    {level.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold tracking-tight text-navy">
                    {level.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink">{level.hours}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {level.outcome}
                  </p>
                  <p className="mt-3 border-t border-line pt-3 text-[0.8125rem] text-ink-faint">
                    {level.audience}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link href="/learning" className="link-underline font-medium text-navy">
                See how the learning model works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- NATIONAL ALIGNMENT ---------------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="t-h2 mx-auto max-w-[22ch] text-balance text-center text-navy">
            Contributing to India&rsquo;s digital transformation
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-ink-soft">
            Our education and capacity-building objectives are aligned with the broader
            goals of key national initiatives.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {initiatives.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <article className="card card-lift h-full p-6">
                <h3 className="font-display text-[1.0625rem] font-bold tracking-tight text-navy">
                  {item.name}
                </h3>
                <span aria-hidden className="mt-3 block h-[2px] w-7 rounded bg-teal" />
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {alignmentPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-3xl text-center text-[0.8125rem] leading-relaxed text-ink-faint">
            {ALIGNMENT_DISCLAIMER}
          </p>
        </Reveal>
      </section>

      {/* ---------------- SUPPORT ---------------- */}
      <section className="border-t border-line bg-surface-2">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="surface-navy relative overflow-hidden rounded-[var(--radius)] px-8 py-14 text-center md:px-16 md:py-20">
              <div className="glow glow-teal left-1/2 top-0 h-72 w-72 -translate-x-1/2 opacity-25" />
              <div className="relative">
                <h2 className="t-h2 mx-auto max-w-[20ch] text-balance">
                  Help a learner move from potential to possibility
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-white/65">
                  Your contribution helps learners build practical, future-ready
                  capabilities across FinTech, digital payments, AI in finance,
                  cybersecurity and more.
                </p>

                <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3">
                  {supportPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-[0.9375rem] text-white/85"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button href="/support" variant="invert">
                    Contribute now
                  </Button>
                  <Button href="/partnerships" variant="ghost">
                    Partner with us
                  </Button>
                </div>

                <p className="mx-auto mt-10 max-w-xl text-[0.8125rem] leading-relaxed text-white/45">
                  {DONATION_DISCLAIMER}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
