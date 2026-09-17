import Link from "next/link";
import Image from "next/image";

/** Official brand mark. Replace /public/images/logoint.png to update it. */
export function Logo({
  className = "",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Intellimindz Foundation, home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={invert ? "/images/logoint-white.png" : "/images/logoint.png"}
        alt="Intellimindz Foundation"
        width={262}
        height={71}
        priority
        quality={95}
        className="h-10 w-auto md:h-11"
      />
    </Link>
  );
}

/** Circuit-mind glyph from the mark, used as a standalone accent. */
export function MindGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden className={className} fill="none">
      <path
        d="M31.4 33.6V38a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-3.6A14 14 0 1 1 31.4 33.6Z"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
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
