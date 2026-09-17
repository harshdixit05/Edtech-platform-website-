import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { BrandFigure } from "@/components/brand-figure";
import { pillars, audiences } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Intellimindz Foundation is a Section 8 Company building a digitally literate, financially aware and future-ready India through accessible FinTech education.",
};

const story = [
  {
    title: "What we are",
    body: "A Section 8 Company under the Companies Act — a not-for-profit structure for organisations working toward an educational or charitable objective. Income is applied to the mission, not distributed as profit.",
  },
  {
    title: "Why we exist",
    body: "India's financial system is going digital faster than financial literacy is keeping up. UPI, digital lending and open finance are everyday infrastructure — understanding how they work, and how to use them safely, is not yet.",
  },
  {
    title: "What we teach",
    body: "Financial technology and emerging digital finance: payments, AI in finance, data, cybersecurity, regulation, blockchain, sustainable finance, InsurTech and WealthTech.",
  },
  {
    title: "How we teach it",
    body: "A five-level ladder from Discovery to Advanced, in self-paced, live and hybrid formats, so a learner can start anywhere and keep stacking capability.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg" />
        <div className="glow glow-teal -right-24 -top-24 h-96 w-96 opacity-45" />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionLabel>About the Foundation</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[13ch] text-balance text-navy">
              A foundation, not a marketplace.
            </h1>
            <p className="t-lead mt-8 max-w-xl text-ink-soft">
              Intellimindz Foundation is a Section 8 Company committed to building a
              digitally literate, financially aware and future-ready India through
              accessible learning in financial technology and emerging digital finance.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <BrandFigure
              src="/images/catalogue.jpg"
              alt="Structured programme architecture across FinTech domains"
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-4">
          {story.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <article className="card grid grid-cols-1 gap-5 p-7 md:grid-cols-[280px_1fr] md:gap-10 md:p-8">
                <h2 className="font-display text-lg font-bold tracking-tight text-navy md:text-xl">
                  {item.title}
                </h2>
                <p className="max-w-2xl text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <SectionLabel>Our commitments</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[18ch] text-balance text-navy">
              Four commitments, one mission.
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
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <SectionLabel>Who we serve</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            Built for every kind of learner.
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

          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/courses">Explore FinTech Courses</Button>
            <Button href="/contact" variant="outline">
              Talk to us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
