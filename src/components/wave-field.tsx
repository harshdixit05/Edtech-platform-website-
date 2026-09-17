/**
 * Slow-flowing line field behind the hero. Pure SVG + CSS transforms, no JS
 * and no canvas: one layer drifts sideways on a seamless loop while its
 * wrapper swells gently up and down on a slower, offset timing, so the motion
 * never reads as a repeating cycle. Stops under prefers-reduced-motion.
 */

const layer = { y: 190, amp: 42, strokes: 9, gap: 7, driftSeconds: 48, swellSeconds: 11 };

/** One seamless sine-ish path repeated across a 2400-unit span. */
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
      <div
        className="wave-swell"
        style={{ animationDuration: `${layer.swellSeconds}s` }}
      >
        <div
          className="wave-layer"
          style={{ top: 0, animationDuration: `${layer.driftSeconds}s` }}
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
                  opacity={0.34 - i * 0.03}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
