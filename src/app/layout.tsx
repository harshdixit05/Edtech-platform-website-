import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://intellimindz.in";
const description =
  "Intellimindz Foundation is a Section 8 Company committed to building a digitally literate, financially aware and future-ready India through accessible learning in financial technology and emerging digital finance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Intellimindz Foundation — FinTech Education for a Digital Tomorrow",
    template: "%s — Intellimindz Foundation",
  },
  description,
  keywords: [
    "FinTech education",
    "digital payments",
    "financial literacy India",
    "Section 8 Company",
    "AI in finance",
    "cybersecurity in finance",
  ],
  openGraph: {
    title: "Intellimindz Foundation — FinTech Education for a Digital Tomorrow",
    description,
    url: siteUrl,
    siteName: "Intellimindz Foundation",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellimindz Foundation — FinTech Education for a Digital Tomorrow",
    description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Intellimindz Foundation",
  description,
  url: siteUrl,
  areaServed: "IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <AnnouncementBar />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
