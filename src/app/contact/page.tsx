import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { WaveField } from "@/components/wave-field";
import { PeopleIcon, BookIcon, ShieldIcon } from "@/components/icons";
import { EXTERNAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Intellimindz Foundation — course guidance for learners, programme design for organisations, and support enquiries.",
};

const routes = [
  {
    icon: BookIcon,
    title: "Learners",
    body: "Not sure which level to start at? Tell us your background and we will point you to the right course.",
    action: { label: "Browse the catalogue", href: EXTERNAL.catalogue, external: true },
  },
  {
    icon: PeopleIcon,
    title: "Organisations",
    body: "Building a programme for your institution, CSR mandate or community? Start with your learners.",
    action: { label: "See partnerships", href: "/partnerships", external: false },
  },
  {
    icon: ShieldIcon,
    title: "Supporters",
    body: "Questions about contributions, Section 80G exemption or how funds are applied.",
    action: { label: "About donating", href: "/donate", external: false },
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-tint">
        <WaveField className="-top-10" />

        <div className="relative mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[0.9375rem] text-ink-soft">Contact</p>
              <h1 className="t-hero mt-3 text-navy">
                Let&rsquo;s <span className="text-teal">talk</span>
              </h1>
              <p className="t-lead mt-5 text-ink-soft">
                Whether you are choosing a first course or designing a programme for a
                thousand learners, tell us what you need and we will come back within a few
                business days.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who is asking */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {routes.map((route, i) => {
              const Icon = route.icon;
              return (
                <Reveal key={route.title} delay={i * 70}>
                  <article className="card card-lift group flex h-full flex-col p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-teal">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="t-h3 mt-5 text-navy">{route.title}</h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {route.body}
                    </p>
                    <Link
                      href={route.action.href}
                      {...(route.action.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-6 flex items-center gap-2 text-[0.9375rem] font-semibold text-navy transition-colors group-hover:text-teal"
                    >
                      {route.action.label}
                      <span aria-hidden className="arrow-shift">
                        →
                      </span>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + direct details */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="flex flex-col gap-9 self-start rounded-[var(--radius)] bg-navy-ink p-8 text-white md:p-10">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                    Reach us directly
                  </h2>

                  <dl className="mt-8 space-y-7">
                    <div>
                      <dt className="text-[0.8125rem] uppercase tracking-[0.14em] text-white/45">
                        Email
                      </dt>
                      {/* Placeholder — replace with the Foundation's official address */}
                      <dd className="mt-2">
                        <a
                          href="mailto:hello@intellimindz.in"
                          className="link-underline text-[1.0625rem] font-semibold text-white"
                        >
                          hello@intellimindz.in
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[0.8125rem] uppercase tracking-[0.14em] text-white/45">
                        Response time
                      </dt>
                      <dd className="mt-2 text-[0.9375rem] text-white/75">
                        Within 2&ndash;3 business days
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[0.8125rem] uppercase tracking-[0.14em] text-white/45">
                        Organisation
                      </dt>
                      <dd className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
                        Intellimindz Foundation
                        <br />A Section 8 Company
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="border-t border-line-invert pt-6 text-[0.8125rem] leading-relaxed text-white/45">
                  Already enrolled? Course questions are answered fastest from inside the
                  learning platform.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card h-full p-8 md:p-10">
                <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                  Send a message
                </h2>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  Tell us who you are and what you need — everything else is optional.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
