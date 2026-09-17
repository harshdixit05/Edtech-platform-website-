import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "IntelliMindz Foundation is a Section 8 company building a digitally literate, financially aware and future-ready India through FinTech education.",
};

const pillars = [
  {
    title: "What we are",
    body: "A Section 8 company under the Companies Act — a not-for-profit legal structure built for organizations working toward a social, educational or charitable objective. Income is applied to our mission, not distributed as profit.",
  },
  {
    title: "Why we exist",
    body: "India's financial system is going digital faster than financial literacy is keeping up. UPI, digital lending and open banking are now everyday infrastructure — but understanding how they work, and how to use them safely, is not.",
  },
  {
    title: "What we teach",
    body: "FinTech, specifically — digital payments, financial inclusion, open banking, digital lending, RegTech and the security fundamentals that hold it all together. One field, taught in depth.",
  },
  {
    title: "Who we serve",
    body: "Students and early-career professionals building a foundation in digital finance, working professionals reskilling into FinTech, and community members building basic financial and digital literacy.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <SectionLabel>About IntelliMindz Foundation</SectionLabel>
          <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
            A foundation, not a marketplace.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            We exist to make FinTech education accessible to every learner
            India&rsquo;s digital finance transformation will touch.
          </p>
        </Reveal>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="flex flex-col gap-16">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 60}>
                <div className="grid grid-cols-1 gap-4 border-t border-line-strong pt-6 lg:grid-cols-[280px_1fr]">
                  <h2 className="font-serif text-3xl text-ink">{pillar.title}</h2>
                  <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <Reveal>
            <SectionLabel>What Makes the Model Different</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
              Built for India&rsquo;s financial system, not a generic one.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Every course is grounded in the rails learners will actually
              use — UPI, Aadhaar-enabled systems, Account Aggregator — and
              follows a single applied journey: Discover, Build, Apply, Lead.
              No course ends at theory.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 py-20 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-lg font-serif text-3xl leading-tight text-ink md:text-4xl">
            Start with a course, or start a conversation.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button href="/courses">Explore FinTech Courses</Button>
            <Button href="/contact" variant="ghost">
              Talk to IntelliMindz
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
