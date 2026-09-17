import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { BrandFigure } from "@/components/brand-figure";
import { PeopleIcon, BookIcon, ChartIcon, ShieldIcon, EmblemIcon } from "@/components/icons";
import { initiatives, alignmentPoints, ALIGNMENT_DISCLAIMER, pillars } from "@/lib/content";

const alignmentIcons = [PeopleIcon, BookIcon, ChartIcon, ShieldIcon];

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

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionLabel>Impact</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[16ch] text-navy">
              Contributing to India&rsquo;s{" "}
              <span className="text-teal">Digital Transformation</span>
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
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <div className="card px-6 py-12 md:px-10 md:py-14">
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
              {initiatives.map((item) => (
                <div key={item.name} className="px-5 py-8 text-center lg:py-0">
                  {/* Logo slot — drop an official mark in here if licensed to use it */}
                  <EmblemIcon className="mx-auto h-12 w-12 text-teal" />
                  <h2 className="mt-5 font-display text-[1.0625rem] font-bold tracking-tight text-navy">
                    {item.name}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* How we contribute */}
      <section className="bg-surface-3/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <h2 className="t-h2 mx-auto max-w-[24ch] text-balance text-center text-navy">
              Education as <span className="text-teal">public infrastructure</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 grid grid-cols-1 divide-y divide-white/15 overflow-hidden rounded-[var(--radius)] bg-navy md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {alignmentPoints.map((point, i) => {
                const Icon = alignmentIcons[i];
                return (
                  <div key={point} className="flex items-center gap-4 px-6 py-5">
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

      {/* Pillars recap */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <SectionLabel>Our commitments</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            What we work on, every day.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <article className="card card-lift h-full p-7">
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
            <Button href="/donate">Support our mission</Button>
            <Button href="/partnerships" variant="outline">
              Partner with us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
