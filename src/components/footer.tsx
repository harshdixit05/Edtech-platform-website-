import Link from "next/link";
import { Logo } from "./logo";
import { EXTERNAL } from "@/lib/content";

const columns = [
  {
    heading: "Learn",
    links: [
      { href: "/courses", label: "FinTech Courses" },
      { href: "/learning", label: "Learning Levels" },
      { href: EXTERNAL.catalogue, label: "Course Catalogue" },
    ],
  },
  {
    heading: "Foundation",
    links: [
      { href: "/about", label: "About" },
      { href: "/impact", label: "Impact" },
      { href: "/insights", label: "Insights" },
    ],
  },
  {
    heading: "Engage",
    links: [
      { href: "/support", label: "Support Us" },
      { href: "/partnerships", label: "Partnerships" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="surface-navy relative overflow-hidden">
      <div className="grid-bg grid-bg-invert opacity-60" />
      <div className="glow glow-teal -left-32 top-10 h-72 w-72 opacity-25" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo invert />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/60">
              A Section 8 Company building a digitally literate, financially aware and
              future-ready India through accessible FinTech education.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="t-eyebrow text-teal">{col.heading}</h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="link-underline text-[0.9375rem] font-medium text-white/85 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-invert pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Intellimindz Foundation · A Section 8 Company</p>
          <div className="flex gap-7">
            <Link href="/privacy" className="link-underline hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
