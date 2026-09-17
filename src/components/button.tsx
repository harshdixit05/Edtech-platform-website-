import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "invert" | "ghost";

const base =
  "group inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-6 py-3.5 text-[0.9375rem] font-semibold transition-all duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-teal",
  outline: "border border-line-strong text-navy hover:border-teal hover:text-teal",
  invert: "bg-white text-navy hover:bg-teal hover:text-white",
  ghost: "border border-line-invert text-white hover:border-teal hover:text-teal",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  href,
  arrow = true,
  ...rest
}: {
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
} & ComponentProps<typeof Link>) {
  const external = typeof href === "string" && href.startsWith("http");

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {arrow && (
        <span aria-hidden className="arrow-shift">
          →
        </span>
      )}
    </Link>
  );
}
