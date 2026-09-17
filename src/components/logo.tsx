import Link from "next/link";

/**
 * Typographic wordmark placeholder — swap for the final brand mark asset
 * when it is supplied. Built from the type system only, no raster image.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex flex-col leading-none ${className}`}
      aria-label="IntelliMindz Foundation, home"
    >
      <span className="flex items-baseline gap-[2px] font-serif text-[1.5rem] tracking-tight text-ink">
        Intelli
        <span className="text-teal">Mindz</span>
        <span
          aria-hidden
          className="ml-[3px] mb-[2px] inline-block h-[5px] w-[5px] rounded-full bg-copper transition-transform duration-300 group-hover:scale-125"
        />
      </span>
      <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-ink-soft">
        Foundation
      </span>
    </Link>
  );
}
