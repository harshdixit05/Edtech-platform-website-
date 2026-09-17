import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Partner with IntelliMindz Foundation to bring FinTech and digital finance literacy to your organization or community.",
};

const partners = [
  {
    title: "Corporates & CSR",
    description:
      "Fund or co-design FinTech literacy programs as part of your CSR mandate under the Companies Act.",
  },
  {
    title: "Government & Public Bodies",
    description:
      "Deliver digital finance literacy at scale through district, state or national initiatives.",
  },
  {
    title: "NGOs & Community Organizations",
    description:
      "Bring structured FinTech curriculum to the communities you already serve.",
  },
  {
    title: "Academic Institutions",
    description:
      "Add applied FinTech modules alongside existing commerce, finance or computer science programs.",
  },
];

const process = [
  {
    step: "01",
    title: "Understand",
    description: "We start with your learners, not our catalog — who they are and what they need.",
  },
  {
    step: "02",
    title: "Design",
    description: "A program is scoped around outcomes, timeline and delivery format.",
  },
  {
    step: "03",
    title: "Deliver",
    description: "Practitioner-led sessions, applied projects and measurable milestones.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <SectionLabel>Partnerships</SectionLabel>
          <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
            Bring FinTech literacy to your organization.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            As a Section 8 company, we design and deliver FinTech capability
            programs with corporates, government bodies, NGOs and academic
            institutions.
          </p>
          <div className="mt-10">
            <Button href="/contact">Build a Program</Button>
          </div>
        </Reveal>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <Reveal>
            <SectionLabel>Who We Work With</SectionLabel>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {partners.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <h2 className="font-serif text-2xl text-ink">{p.title}</h2>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <Reveal>
            <SectionLabel>How It Works</SectionLabel>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <div className="border-t border-line-strong pt-6">
                  <span className="font-serif text-lg text-copper">{step.step}</span>
                  <h3 className="mt-3 font-serif text-2xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 py-20 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-lg font-serif text-3xl leading-tight text-ink md:text-4xl">
            Tell us about your learners. We&rsquo;ll design around them.
          </h2>
          <Button href="/contact">Talk to IntelliMindz</Button>
        </div>
      </section>
    </>
  );
}
