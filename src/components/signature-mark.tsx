/**
 * Recurring visual signature: a ledger/network grid of nodes and
 * connecting lines, standing in for the data rails of digital finance.
 * Used at varying scale across hero, section dividers and the footer.
 */
export function SignatureMark({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 40, y: 40 },
    { x: 160, y: 24 },
    { x: 260, y: 90 },
    { x: 120, y: 140 },
    { x: 220, y: 200 },
    { x: 60, y: 220 },
    { x: 300, y: 180 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 0],
    [3, 4],
    [3, 5],
    [4, 6],
    [2, 4],
  ];

  return (
    <svg
      viewBox="0 0 340 260"
      className={className}
      role="img"
      aria-label="Abstract network diagram representing digital finance infrastructure"
    >
      <g stroke="var(--color-line-strong)" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 4 ? 6 : 4}
          fill={i === 4 ? "var(--color-copper)" : "var(--color-teal)"}
          opacity={i === 4 ? 1 : 0.85}
        />
      ))}
    </svg>
  );
}
