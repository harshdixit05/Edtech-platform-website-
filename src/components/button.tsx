import Link from "next/link";
import type { ComponentProps } from "react";

type BaseProps = {
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-offset-4";

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "bg-teal text-paper hover:bg-teal-deep",
  ghost:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...rest
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
