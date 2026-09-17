import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { insights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-language writing on FinTech, digital payments, open finance and AI in finance from Intellimindz Foundation.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const [lead, ...rest] = insights;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg" />
        <div className="glow glow-teal -right-24 -top-24 h-96 w-96 opacity-40" />

        <div className="relative mx-auto max-w-[1200px] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-20">
          <Reveal>
            <SectionLabel>Insights</SectionLabel>
            <h1 className="t-hero mt-7 max-w-[13ch] text-balance text-navy">
              FinTech, plainly written.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <article className="group border-t-2 border-navy pt-10">
            <div className="flex flex-wrap items-center gap-5">
              <span className="t-eyebrow text-teal">{lead.category}</span>
              <span className="text-sm text-ink-faint">{formatDate(lead.date)}</span>
            </div>
            <h2 className="t-h2 mt-6 max-w-[20ch] text-balance text-navy">{lead.title}</h2>
            <p className="t-lead mt-6 max-w-2xl text-ink-soft">{lead.excerpt}</p>
          </article>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80}>
              <article className="card card-lift h-full p-7">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="t-eyebrow text-teal">{article.category}</span>
                  <span className="text-sm text-ink-faint">{formatDate(article.date)}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-navy">
                  {article.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {article.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Placeholder editorial — replace with the Foundation's published writing */}
        <p className="mt-14 border-t border-line pt-6 text-[0.8125rem] text-ink-faint">
          More writing is published as programmes run.
        </p>
      </section>
    </>
  );
}
