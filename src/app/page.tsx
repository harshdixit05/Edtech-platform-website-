import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { WaveField } from "@/components/wave-field";
import { DomainShowcase } from "@/components/domain-showcase";
import { PeopleIcon, BookIcon, ChartIcon, ShieldIcon } from "@/components/icons";
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

const alignmentIcons = [PeopleIcon, BookIcon, ChartIcon, ShieldIcon];

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-tint">
        <WaveField className="top-24" />

        <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <Reveal>
            <p className="text-[0.9375rem] text-ink-soft">Not-for-profit FinTech education</p>
            <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(1.875rem,2.9vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy">
              Empowering India through{" "}
              <span className="text-teal md:whitespace-nowrap">FinTech education</span> for a
              digital tomorrow
            </h1>
            <p className="t-lead mt-6 max-w-xl text-ink-soft">
              Intellimindz Foundation is a Section 8 Company committed to building a
              digitally literate, financially aware and future-ready India through
              accessible learning in financial technology and emerging digital finance.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/courses">Explore FinTech Courses</Button>
              <Link
                href="/about"
                className="link-underline px-1 py-3 text-[0.9375rem] font-medium text-navy"
              >
                About the Foundation
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative">
              <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[0_34px_70px_-45px_rgba(15,23,56,0.55)]">
                <Image
                  src="/images/hero-crop.jpg"
                  alt="A learner studying at a laptop with a city skyline behind"
                  width={1200}
                  height={902}
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="h-auto w-full"
                />
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-y border-line bg-white">
        <Marquee items={domains.map((d) => d.name)} />
      </div>

      {/* ---------------- NATIONAL ALIGNMENT ---------------- */}
      <section className="bg-surface-3/40">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <div className="card px-5 py-12 md:px-8 md:py-14">
              <h2 className="t-h2 mx-auto max-w-[24ch] text-balance text-center text-navy">
                Contributing to India&rsquo;s{" "}
                <span className="text-teal">Digital Transformation</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
                Our education and capacity-building objectives are aligned with the broader
                goals of key national initiatives.
              </p>

              <div className="mt-12 grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
                {initiatives.map((item) => (
                  <div key={item.name} className="px-5 py-8 text-center lg:py-0">
                    <div className="flex h-16 items-center justify-center">
                      <Image
                        src={item.logo}
                        alt={`${item.name} logo`}
                        width={240}
                        height={130}
                        className="h-auto max-h-16 w-auto max-w-[170px] object-contain"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-[1.0625rem] font-bold tracking-tight text-navy">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-6 grid grid-cols-1 divide-y divide-white/15 overflow-hidden rounded-[var(--radius)] bg-navy md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {alignmentPoints.map((point, i) => {
                const Icon = alignmentIcons[i];
                return (
                  <div key={point} className="flex items-center gap-4 px-5 py-5">
                    <Icon className="h-6 w-6 shrink-0 text-teal-bright" />
                    <p className="text-[0.875rem] font-semibold leading-snug text-white">
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-[0.8125rem] leading-relaxed text-ink-faint">
              {ALIGNMENT_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PILLARS ---------------- */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <h2 className="t-h2 max-w-[26ch] text-navy">
            Four commitments,{" "}
            <span className="text-teal md:whitespace-nowrap">one mission</span>
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            What the Foundation works on, every day.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <article className="card card-lift h-full p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[0.8125rem] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="t-h3 mt-5 text-navy">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- LEARNING ECOSYSTEM ---------------- */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <h2 className="t-h2 max-w-[22ch] text-navy">
              A complete <span className="text-teal">FinTech learning ecosystem</span>
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Choose a domain, start at the right level, and build a stackable pathway.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12">
              <DomainShowcase />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CATALOGUE ---------------- */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="t-h2 max-w-[18ch] text-navy">
                  Discover courses by{" "}
                  <span className="text-teal">category, level and price</span>
                </h2>
                <p className="mt-4 max-w-lg text-ink-soft">
                  Filter by category, level and audience, compare Free and Paid programmes,
                  and enrol directly.
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
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <h2 className="t-h2 max-w-[26ch] text-navy">
              From quick discovery to{" "}
              <span className="text-teal">advanced specialisation</span>
            </h2>
            <p className="mt-4 text-ink-soft">
              The course architecture is designed as a clear learning ladder.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((level, i) => (
              <Reveal key={level.step} delay={i * 60}>
                <article className="card card-lift h-full p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[0.8125rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-bold tracking-tight text-navy">
                    {level.name}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] font-semibold text-teal">
                    {level.hours}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {level.outcome}
                  </p>
                  <p className="mt-3 text-[0.875rem] italic text-ink-faint">{level.audience}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10">
              <Link href="/courses" className="link-underline font-medium text-navy">
                See how the learning ladder works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SUPPORT ---------------- */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <div className="surface-navy relative overflow-hidden rounded-[var(--radius)] px-8 py-14 md:px-14 md:py-16">
              <div className="glow glow-teal -right-10 top-0 h-72 w-72 opacity-25" />
              <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="t-h2 max-w-[20ch]">
                    Help a learner move from{" "}
                    <span className="text-teal-bright">potential to possibility</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-white/65">
                    Your contribution helps learners build practical, future-ready
                    capabilities across FinTech, digital payments, AI in finance,
                    cybersecurity and more.
                  </p>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <Button href="/donate" variant="invert">
                      Contribute now
                    </Button>
                    <Button href="/partnerships" variant="ghost">
                      Partner with us
                    </Button>
                  </div>
                </div>

                <ul className="grid grid-cols-1 gap-3">
                  {supportPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-line-invert px-5 py-4 text-[0.9375rem] font-medium text-white/90"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="relative mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-white/45">
                {DONATION_DISCLAIMER}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
