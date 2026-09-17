import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Intellimindz Foundation.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg" />
      <div className="glow glow-teal -left-24 -top-24 h-96 w-96 opacity-40" />

      <div className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="t-hero mt-7 text-navy">Let&rsquo;s talk.</h1>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 border-t border-line pt-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex flex-col gap-11">
              <div>
                <p className="t-eyebrow text-ink-faint">Email</p>
                {/* Placeholder — replace with the Foundation's official address */}
                <a
                  href="mailto:hello@intellimindz.in"
                  className="link-underline mt-3 inline-block font-display text-xl font-bold tracking-tight text-navy"
                >
                  hello@intellimindz.in
                </a>
              </div>
              <div>
                <p className="t-eyebrow text-ink-faint">Learners</p>
                <p className="mt-3 max-w-xs text-ink-soft">
                  Not sure which level to start at? Tell us your background and we&rsquo;ll
                  point you to the right course.
                </p>
              </div>
              <div>
                <p className="t-eyebrow text-ink-faint">Organisations</p>
                <p className="mt-3 max-w-xs text-ink-soft">
                  Building a programme for your institution or CSR mandate? Tell us about
                  your learners.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
