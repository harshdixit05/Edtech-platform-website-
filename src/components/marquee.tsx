export function Marquee({ items, invert = false }: { items: string[]; invert?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee relative overflow-hidden py-5" aria-hidden>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center gap-8 px-8 text-[0.8125rem] font-medium ${
              invert ? "text-white/40" : "text-ink-faint"
            }`}
          >
            {item}
            <span className={`text-[0.5rem] ${invert ? "text-teal-bright/70" : "text-teal/60"}`}>
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
