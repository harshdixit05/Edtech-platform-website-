import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Intellimindz Foundation terms of use.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-24 md:px-10 md:py-32">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="t-h2 mt-6 text-navy">Terms of Use</h1>
      {/* Placeholder — replace with the Foundation's reviewed terms of use */}
      <p className="t-lead mt-10 max-w-2xl text-ink-soft">
        This page will host the terms governing use of this website and Intellimindz
        Foundation&rsquo;s courses and programmes. Final terms to be published here.
      </p>
    </section>
  );
}
