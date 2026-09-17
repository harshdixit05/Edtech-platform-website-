import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "IntelliMindz Foundation privacy policy.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-24 md:px-10">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Privacy Policy</h1>
      {/* Placeholder — replace with the Foundation's reviewed privacy policy */}
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft">
        This page will host IntelliMindz Foundation&rsquo;s privacy policy,
        covering what information is collected through this site, how it is
        used, and how learners and partners can exercise their data rights.
        Final policy text to be published here.
      </p>
    </section>
  );
}
