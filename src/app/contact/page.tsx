import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with IntelliMindz Foundation.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 md:px-10 md:pt-24">
      <Reveal>
        <SectionLabel>Talk to IntelliMindz</SectionLabel>
        <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
          Let&rsquo;s talk.
        </h1>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-16 border-t border-line pt-16 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
                Email
              </h2>
              {/* Placeholder — replace with the Foundation's official contact address */}
              <p className="mt-2 font-serif text-2xl text-ink">
                hello@intellimindzfoundation.org
              </p>
            </div>
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
                For organizations
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                Building a program for your institution? Tell us about your
                learners and we&rsquo;ll get back within a few business days.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
