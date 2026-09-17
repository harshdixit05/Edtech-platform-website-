"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/categories", label: "Categories" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact Us" },
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
          ? "border-b border-line bg-white/95 backdrop-blur-md"
          : "border-b border-line/60 bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-underline whitespace-nowrap text-[0.875rem] font-medium transition-colors ${
                pathname === link.href ? "text-teal" : "text-ink-soft hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-[var(--radius-sm)] border border-line-strong px-4 py-2.5 text-[0.875rem] font-semibold text-navy transition-colors duration-300 hover:border-teal hover:text-teal"
          >
            Login
          </Link>
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-navy px-5 py-2.5 text-[0.875rem] font-semibold text-white transition-colors duration-300 hover:bg-teal"
          >
            Explore Courses
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
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] xl:hidden"
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
        className={`overflow-hidden border-t bg-white transition-[max-height,border-color] duration-300 xl:hidden ${
          open ? "max-h-[620px] border-line" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col px-5 pb-6 pt-2" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b border-line py-3.5 text-lg font-semibold ${
                pathname === link.href ? "text-teal" : "text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              className="rounded-[var(--radius-sm)] border border-line-strong px-6 py-3.5 text-center text-[0.9375rem] font-semibold text-navy"
            >
              Login
            </Link>
            <Link
              href="/courses"
              className="rounded-[var(--radius-sm)] bg-navy px-5 py-3.5 text-center text-[0.9375rem] font-semibold text-white"
            >
              Explore Courses →
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
