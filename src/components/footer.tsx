import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    heading: "Foundation",
    links: [
      { href: "/about", label: "About" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/courses", label: "FinTech Courses" },
      { href: "/learning", label: "Learning Model" },
    ],
  },
  {
    heading: "Work with us",
    links: [{ href: "/partnerships", label: "Partnerships" }],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              A Section 8 company building a digitally literate, financially
              aware and future-ready India through accessible FinTech
              education.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} IntelliMindz Foundation. A Section 8 Company.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
