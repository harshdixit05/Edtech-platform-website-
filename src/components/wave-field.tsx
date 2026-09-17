/**
 * Slow-flowing line field behind the hero. Pure SVG + CSS transform, no JS,
 * no canvas — three layers drifting at different speeds so the motion never
 * loops visibly. Stops entirely under prefers-reduced-motion.
 */

const layers = [
  { y: 120, amp: 34, strokes: 7, gap: 7, duration: 42, opacity: 0.5 },
  { y: 210, amp: 46, strokes: 9, gap: 6, duration: 58, opacity: 0.38 },
  { y: 310, amp: 28, strokes: 6, gap: 8, duration: 34, opacity: 0.3 },
];

/** One seamless sine-ish path repeated twice across a 2400-unit span. */
function wavePath(y: number, amp: number) {
  const seg = (x: number) =>
    `C ${x + 100} ${y - amp}, ${x + 200} ${y + amp}, ${x + 300} ${y} ` +
    `C ${x + 400} ${y - amp}, ${x + 500} ${y + amp}, ${x + 600} ${y}`;
  return `M 0 ${y} ${seg(0)} ${seg(600)} ${seg(1200)} ${seg(1800)}`;
}

export function WaveField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {layers.map((layer, li) => (
        <div
          key={li}
          className="wave-layer"
          style={{
            top: 0,
            animationDuration: `${layer.duration}s`,
            animationDirection: li % 2 ? "reverse" : "normal",
            opacity: layer.opacity,
          }}
        >
          <svg
            viewBox="0 0 2400 420"
            preserveAspectRatio="none"
            className="h-[520px] w-full md:h-[620px]"
          >
            <g fill="none" stroke="var(--color-teal)" strokeWidth="1">
              {Array.from({ length: layer.strokes }).map((_, i) => (
                <path
                  key={i}
                  d={wavePath(layer.y + i * layer.gap, layer.amp - i * 1.5)}
                  opacity={0.55 - i * 0.05}
                />
              ))}
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
