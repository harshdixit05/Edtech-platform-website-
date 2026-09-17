import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Partner with Intellimindz Foundation — CSR collaborations, academic partnerships, community programmes and institutional FinTech capability building.",
};

const partners = [
  {
    title: "Corporates & CSR",
    description:
      "Fund or co-design FinTech literacy programmes as part of your CSR mandate under the Companies Act.",
  },
  {
    title: "Academic institutions",
    description:
      "Add applied FinTech modules alongside commerce, finance, management or computer science programmes.",
  },
  {
    title: "Government & public bodies",
    description:
      "Deliver digital finance literacy at scale through district, state or national programmes.",
  },
  {
    title: "NGOs & community organisations",
    description: "Bring structured FinTech curriculum to the communities you already serve.",
  },
];

const process = [
  {
    step: "01",
    title: "Understand",
    description: "We start with your learners, not our catalogue — who they are and what they need.",
  },
  {
    step: "02",
    title: "Design",
    description: "A programme scoped around outcomes, timeline, level and delivery format.",
  },
  {
    step: "03",
    title: "Deliver",
    description: "Practitioner-led sessions, applied projects and clear milestones.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg" />
        <div className="glow glow-teal -left-20 -top-24 h-96 w-96 opacity-45" />

        <div className="relative mx-auto max-w-[1320px] px-5 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
          <Reveal>
            <SectionLabel>Partnerships</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[14ch] text-balance text-navy">
              Build FinTech capability, <span className="text-teal">together</span>
            </h1>
            <p className="t-lead mt-8 max-w-xl text-ink-soft">
              We collaborate with academia, industry and ecosystem partners to design and
              deliver FinTech education where it is needed most.
            </p>
            <div className="mt-10">
              <Button href="/contact">Build a programme</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionLabel>Who we work with</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            Four kinds of <span className="text-teal">partner</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {partners.map((partner, i) => (
            <Reveal key={partner.title} delay={i * 70}>
              <article className="card card-lift h-full p-7">
                <h3 className="t-h3 text-navy">{partner.title}</h3>
                <span aria-hidden className="mt-5 block h-[2px] w-10 bg-teal" />
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                  {partner.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="glow glow-teal right-0 top-10 h-80 w-80 opacity-25" />

        <div className="relative mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionLabel invert>How it works</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[16ch] text-balance">Three steps to a <span className="text-teal-bright">programme</span></h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 80}>
                <article className="h-full rounded-[var(--radius)] border border-line-invert bg-navy p-7 transition-colors duration-500 hover:border-teal/50">
                  <span className="font-display text-sm font-bold tracking-widest text-teal">
                    {step.step}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 flex flex-wrap gap-4">
              <Button href="/contact" variant="invert">
                Talk to us
              </Button>
              <Button href="/donate" variant="ghost">
                Support the mission
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
