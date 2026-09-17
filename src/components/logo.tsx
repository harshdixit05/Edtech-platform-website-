import Link from "next/link";

/**
 * Brand lockup, rebuilt as vector + live type so it stays crisp at any size
 * and inherits the loaded display font. Colours are the mark's own navy and
 * turquoise. Swap in an official asset at /public/logo.svg if one is issued.
 */

function Sparkle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`sparkle ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      fill="currentColor"
    >
      <path d="M12 0c.6 5.6 5.8 10.9 12 12-6.2 1.1-11.4 6.4-12 12-.6-5.6-5.8-10.9-12-12C6.2 10.9 11.4 5.6 12 0Z" />
    </svg>
  );
}

/** The circuit-mind glyph that closes the wordmark. */
export function MindGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden className={className} fill="none">
      {/* head */}
      <path
        d="M31.4 33.6V38a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-3.6A14 14 0 1 1 31.4 33.6Z"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* circuit */}
      <path
        d="M16.5 17h4.3v12M20.8 22.6h5.6M26.4 22.6v-5.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="14.2" cy="17" r="2.2" fill="currentColor" />
      <circle cx="28.6" cy="16.6" r="2.2" fill="currentColor" />
      <circle cx="20.8" cy="29.2" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className = "",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  const wordNavy = invert ? "text-white" : "text-navy";
  const sub = invert ? "text-white/70" : "text-navy/75";

  return (
    <Link
      href="/"
      aria-label="IntelliMindz Foundation, home"
      className={`group inline-flex flex-col ${className}`}
    >
      <span className="relative flex items-center leading-none">
        <Sparkle className="absolute -top-2 left-[52%] h-2.5 w-2.5 text-teal" />
        <Sparkle className="absolute -top-3.5 left-[60%] h-3.5 w-3.5 text-teal" delay={900} />
        <span
          className={`font-display text-[1.45rem] font-bold tracking-[-0.045em] ${wordNavy}`}
        >
          Intelli
        </span>
        <span className="font-display text-[1.45rem] font-bold tracking-[-0.045em] text-teal">
          mind
        </span>
        <MindGlyph className="-ml-[1px] h-[1.5rem] w-[1.5rem] text-teal transition-transform duration-500 group-hover:-translate-y-0.5" />
        <span className="-ml-[3px] font-display text-[1.45rem] font-bold tracking-[-0.045em] text-teal">
          z
        </span>
      </span>
      <span className={`mt-1 text-[0.58rem] font-semibold tracking-[0.42em] ${sub}`}>
        FOUNDATION
      </span>
    </Link>
  );
}
