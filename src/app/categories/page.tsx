import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { DomainShowcase } from "@/components/domain-showcase";
import { domains, EXTERNAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Ten FinTech categories — payments, AI in finance, data science, cybersecurity, RegTech, blockchain, sustainable finance, InsurTech and WealthTech.",
};

export default function CategoriesPage() {
  return (
    <>
      <section className="border-b border-line bg-tint">
        <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h1 className="t-hero max-w-[16ch] text-navy">
              Every <span className="text-teal">FinTech category</span> we teach
            </h1>
            <p className="t-lead mt-6 max-w-xl text-ink-soft">
              Ten domains, each taught from Discovery through to Advanced. Pick the one
              closest to the work you want to do.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={EXTERNAL.catalogue}>Browse the catalogue</Button>
              <Button href="/learning" variant="outline">
                See the levels
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full grid */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <h2 className="t-h2 max-w-[20ch] text-navy">
            The full <span className="text-teal">FinTech map</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => (
            <Reveal key={domain.slug} delay={i * 50}>
              <article className="card card-lift group flex h-full flex-col p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[0.8125rem] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-[1.0625rem] font-bold tracking-tight text-navy">
                  {domain.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {domain.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {domain.topics.slice(0, 3).map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-line px-3 py-1.5 text-[0.75rem] text-ink-soft"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link
                  href={EXTERNAL.catalogue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-2 text-[0.9375rem] font-semibold text-navy transition-colors group-hover:text-teal"
                >
                  See courses
                  <span aria-hidden className="arrow-shift">
                    →
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Explorer */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <h2 className="t-h2 max-w-[22ch] text-navy">
              Explore what each <span className="text-teal">domain covers</span>
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Select a category to see its topics and available levels.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12">
              <DomainShowcase />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
