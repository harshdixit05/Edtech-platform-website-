import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { CourseExplorer } from "@/components/course-explorer";
import { Marquee } from "@/components/marquee";
import { domains, formats, levels, EXTERNAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "FinTech Courses",
  description:
    "Ten FinTech domains — payments, AI in finance, cybersecurity, RegTech, blockchain, InsurTech, WealthTech and more — from Discovery to Advanced levels.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg" />
        <div className="glow glow-teal -right-24 -top-28 h-96 w-96 opacity-50" />

        <div className="relative mx-auto max-w-[1200px] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-20">
          <Reveal>
            <SectionLabel>Courses</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[14ch] text-balance text-navy">
              Ten domains. Five levels. One pathway.
            </h1>
            <p className="t-lead mt-8 max-w-xl text-ink-soft">
              Pick a domain, start where you are, and stack your way up. Free and paid
              programmes, self-paced, live or hybrid.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={EXTERNAL.catalogue}>Browse the full catalogue</Button>
              <Button href="/learning" variant="outline">
                See how levels work
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <Marquee
          items={[...levels.map((l) => l.name), "Free & Paid", "Self-paced", "Live", "Hybrid"]}
        />
      </section>

      {/* Explorer */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Explore by domain</SectionLabel>
              <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
                Choose where you want to build.
              </h2>
            </div>
            <p className="max-w-xs text-ink-soft">
              Select a domain to see what it covers and which levels are available.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14">
            <CourseExplorer />
          </div>
        </Reveal>
      </section>

      {/* All domains overview */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <SectionLabel>All categories</SectionLabel>
            <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
              The full FinTech map.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {domains.map((domain, i) => (
              <Reveal key={domain.slug} delay={i * 50}>
                <article className="card card-lift group h-full p-7">
                  <span className="t-eyebrow text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[1.0625rem] font-bold leading-tight tracking-tight text-navy">
                    {domain.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {domain.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <SectionLabel>How you learn</SectionLabel>
          <h2 className="t-h2 mt-6 max-w-[16ch] text-balance text-navy">
            Three formats, one standard.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {formats.map((format, i) => (
            <Reveal key={format.name} delay={i * 80}>
              <article className="card h-full p-7">
                <h3 className="t-h3 text-navy">{format.name}</h3>
                <span aria-hidden className="mt-5 block h-[2px] w-10 bg-teal" />
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {format.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-navy relative overflow-hidden">
        <div className="grid-bg grid-bg-invert" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-8 px-6 py-20 md:px-10 md:py-24 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="t-h2 max-w-[18ch] text-balance">
            Ready to find the right course?
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button href={EXTERNAL.catalogue} variant="invert">
              Browse the catalogue
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
