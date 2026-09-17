import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { insights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Editorial writing on FinTech, financial inclusion, policy and technology from IntelliMindz Foundation.",
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
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <SectionLabel>Insights</SectionLabel>
          <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
            Notes on FinTech, plainly written.
          </h1>
        </Reveal>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <Reveal>
            <article className="border-t border-line-strong pt-8">
              <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-teal">
                <span>{lead.category}</span>
                <span className="text-ink-soft">{formatDate(lead.date)}</span>
              </div>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {lead.excerpt}
              </p>
            </article>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 border-t border-line pt-14 md:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 80}>
                <article>
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-teal">
                    <span>{article.category}</span>
                  </div>
                  <p className="mt-2 text-xs text-ink-soft">{formatDate(article.date)}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug text-ink">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
