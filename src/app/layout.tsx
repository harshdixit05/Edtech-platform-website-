import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://intellimindzfoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IntelliMindz Foundation — FinTech Education for a Digital India",
    template: "%s — IntelliMindz Foundation",
  },
  description:
    "IntelliMindz Foundation is a Section 8 company building a digitally literate, financially aware and future-ready India through accessible FinTech education.",
  openGraph: {
    title: "IntelliMindz Foundation — FinTech Education for a Digital India",
    description:
      "A Section 8 company building a digitally literate, financially aware and future-ready India through accessible FinTech education.",
    url: siteUrl,
    siteName: "IntelliMindz Foundation",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliMindz Foundation — FinTech Education for a Digital India",
    description:
      "A Section 8 company building a digitally literate, financially aware and future-ready India through accessible FinTech education.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
