"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/learning", label: "Learning" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support Us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
        scrolled || open
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-underline text-[0.9375rem] font-semibold tracking-tight transition-colors ${
                pathname === link.href ? "text-teal" : "text-ink hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/contact"
            className="link-underline text-[0.9375rem] font-semibold tracking-tight text-ink-soft hover:text-navy"
          >
            Contact
          </Link>
          <Link
            href="/courses"
            className="group bg-navy px-6 py-3.5 text-[0.9375rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-teal"
          >
            Explore FinTech Courses{" "}
            <span aria-hidden className="arrow-shift">
              →
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`h-[2px] w-7 bg-navy transition-transform duration-300 ${
              open ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-7 bg-navy transition-transform duration-300 ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t bg-white transition-[max-height,border-color] duration-300 lg:hidden ${
          open ? "max-h-[480px] border-line" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b border-line py-4 text-xl font-bold tracking-tight ${
                pathname === link.href ? "text-teal" : "text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border-b border-line py-4 text-xl font-bold tracking-tight text-navy"
          >
            Contact
          </Link>
          <Link
            href="/courses"
            className="mt-6 bg-navy px-6 py-4 text-center text-base font-semibold text-white"
          >
            Explore FinTech Courses →
          </Link>
        </nav>
      </div>
    </header>
  );
}
