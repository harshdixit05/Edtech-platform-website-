import Image from "next/image";

/**
 * Framed image slot. Files live in /public/images — drop a replacement in
 * with the same filename and it appears here with no code change.
 */
export function BrandFigure({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-surface-2 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-ink/35 via-transparent to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-20 bg-teal"
      />
    </figure>
  );
}
