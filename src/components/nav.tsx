"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/learning", label: "Learning" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/90 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-underline text-sm ${
                pathname === link.href ? "text-teal" : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/contact" className="link-underline text-sm text-ink-soft hover:text-ink">
            Talk to IntelliMindz
          </Link>
          <Link
            href="/courses"
            className="border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Explore FinTech Courses
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t transition-[max-height,border-color] duration-300 lg:hidden ${
          open ? "max-h-[420px] border-line" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 bg-paper px-6 py-4" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 text-base ${
                pathname === link.href ? "text-teal" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
            <Link href="/contact" className="text-sm text-ink-soft">
              Talk to IntelliMindz
            </Link>
            <Link
              href="/courses"
              className="border border-ink px-5 py-3 text-center text-sm font-medium text-ink"
            >
              Explore FinTech Courses
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
