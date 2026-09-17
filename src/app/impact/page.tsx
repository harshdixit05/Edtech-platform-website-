import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { BrandFigure } from "@/components/brand-figure";
import { initiatives, alignmentPoints, ALIGNMENT_DISCLAIMER, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "How Intellimindz Foundation's education and capacity-building objectives align with Digital India, Skill India, Startup India and Atmanirbhar Bharat.",
};

export default function ImpactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg" />
        <div className="glow glow-teal -right-24 -top-24 h-96 w-96 opacity-45" />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionLabel>Impact</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[14ch] text-balance text-navy">
              Contributing to India&rsquo;s digital transformation.
            </h1>
            <p className="t-lead mt-8 max-w-xl text-ink-soft">
              Our education and capacity-building objectives are aligned with the broader
              goals of key national initiatives.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <BrandFigure
              src="/images/impact.jpg"
              alt="Abstract diagram of learning reach across communities"
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Initiatives */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-px border border-line bg-line">
          {initiatives.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <article className="group grid grid-cols-1 gap-5 bg-white p-8 transition-colors duration-500 hover:bg-surface-2 md:grid-cols-[80px_1fr_1.4fr] md:items-center md:p-10">
                <span className="font-display text-sm font-extrabold tracking-widest text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
                  {item.name}
                </h2>
                <p className="text-ink-soft">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="glow glow-teal right-10 top-10 h-80 w-80 opacity-25" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <SectionLabel invert>How we contribute</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[18ch] text-balance">
              Education as public infrastructure.
            </h2>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
            {alignmentPoints.map((point, i) => (
              <Reveal key={point} delay={i * 70}>
                <li className="flex h-full items-start gap-5 bg-navy-ink p-8 transition-colors duration-500 hover:bg-navy">
                  <span className="font-display text-sm font-extrabold tracking-widest text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-bold leading-snug tracking-tight text-white">
                    {point}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <p className="mt-14 max-w-3xl border-t border-line-invert pt-6 text-[0.8125rem] leading-relaxed text-white/45">
            {ALIGNMENT_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Pillars recap */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <SectionLabel>Our commitments</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            What we work on, every day.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <article className="card-lift h-full border border-transparent bg-white p-8">
                <h3 className="t-h3 text-navy">{pillar.title}</h3>
                <span aria-hidden className="mt-5 block h-[2px] w-10 bg-teal" />
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/support">Support our mission</Button>
            <Button href="/partnerships" variant="outline">
              Partner with us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
