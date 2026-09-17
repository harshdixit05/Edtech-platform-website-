export function Marquee({ items, invert = false }: { items: string[]; invert?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee relative overflow-hidden py-6" aria-hidden>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center gap-10 px-10 text-[0.8125rem] font-bold uppercase tracking-[0.2em] ${
              invert ? "text-white/45" : "text-ink-faint"
            }`}
          >
            {item}
            <span className={invert ? "text-teal-bright" : "text-teal"}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
