import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { learningStages, learningExperience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learning Model",
  description:
    "How IntelliMindz Foundation teaches FinTech: Discover, Build, Apply, Lead — an applied, India-specific learning journey.",
};

const stageDetail = [
  "We start with the system, not the tool — how money actually moves before we touch a dashboard.",
  "Every concept is followed immediately by a hands-on exercise modelled on real financial workflows.",
  "Learners complete a project using real data, real constraints and real trade-offs.",
  "The course ends when the capability leaves the room — into a workplace, a community, a next step.",
];

export default function LearningPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <SectionLabel>Learning Model</SectionLabel>
          <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
            Discover. Build. Apply. Lead.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            A four-stage journey, used across every course, from financial
            literacy foundations to advanced credit analytics.
          </p>
        </Reveal>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="flex flex-col gap-16">
            {learningStages.map((stage, i) => (
              <Reveal key={stage.step} delay={i * 80}>
                <div className="grid grid-cols-1 gap-4 border-t border-line-strong pt-6 lg:grid-cols-[80px_1fr]">
                  <span className="font-serif text-3xl text-copper">{stage.step}</span>
                  <div>
                    <h2 className="font-serif text-3xl text-ink md:text-4xl">
                      {stage.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                      {stageDetail[i]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <Reveal>
            <SectionLabel>What Every Course Includes</SectionLabel>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {learningExperience.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 py-20 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-lg font-serif text-3xl leading-tight text-ink md:text-4xl">
            See the model applied in a real course.
          </h2>
          <Button href="/courses">Explore FinTech Courses</Button>
        </div>
      </section>
    </>
  );
}
