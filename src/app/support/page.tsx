import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { BrandFigure } from "@/components/brand-figure";
import { supportPoints, DONATION_DISCLAIMER } from "@/lib/content";

export const metadata: Metadata = {
  title: "Support Our Mission",
  description:
    "Support accessible FinTech education in India. Contributions to Intellimindz Foundation are eligible for tax exemption under Section 80G, subject to applicable provisions.",
};

const uses = [
  {
    title: "Course access",
    description: "Free and subsidised programme access for learners who need it.",
  },
  {
    title: "Learning materials",
    description: "Curriculum development, applied projects and practitioner-led sessions.",
  },
  {
    title: "Community programmes",
    description: "Digital financial literacy work with schools, colleges and communities.",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="glow glow-teal -left-20 top-0 h-[420px] w-[420px] opacity-30" />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionLabel invert>Support our mission</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[13ch] text-balance">
              Help a learner move from potential to possibility.
            </h1>
            <p className="t-lead mt-8 max-w-xl text-white/65">
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
              {/* Placeholder — point this at the Foundation's payment gateway */}
              <Button href="/contact" variant="invert">
                Contribute now
              </Button>
              <Button href="/partnerships" variant="ghost">
                Institutional giving
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <BrandFigure
              src="/images/support.jpg"
              alt="Steps rising to represent a learner's progression"
              className="aspect-[4/3.4] w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Where it goes */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <SectionLabel>Where contributions go</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            Straight into learning.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {uses.map((use, i) => (
            <Reveal key={use.title} delay={i * 80}>
              <article className="card card-lift h-full p-7">
                <span className="font-display text-sm font-bold tracking-widest text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-6 text-navy">{use.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {use.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-3xl border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-ink-faint">
            {DONATION_DISCLAIMER}
          </p>
        </Reveal>
      </section>
    </>
  );
}
