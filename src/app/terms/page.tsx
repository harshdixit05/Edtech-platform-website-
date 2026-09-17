import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "IntelliMindz Foundation terms of use.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-24 md:px-10">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Terms of Use</h1>
      {/* Placeholder — replace with the Foundation's reviewed terms of use */}
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft">
        This page will host the terms governing use of this website and
        IntelliMindz Foundation&rsquo;s courses and programs. Final terms to
        be published here.
      </p>
    </section>
  );
}
