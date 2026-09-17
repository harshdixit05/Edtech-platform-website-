type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PeopleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...base}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.4 5.4a3.2 3.2 0 0 1 0 5.4M17.6 14.4A6.2 6.2 0 0 1 21.2 20" />
    </svg>
  );
}

export function BookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...base}>
      <path d="M3 4.8h6a3 3 0 0 1 3 3V20a2.6 2.6 0 0 0-2.6-2.6H3Z" />
      <path d="M21 4.8h-6a3 3 0 0 0-3 3V20a2.6 2.6 0 0 1 2.6-2.6H21Z" />
    </svg>
  );
}

export function ChartIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...base}>
      <path d="M3.5 20.5V4" />
      <path d="M3.5 20.5H21" />
      <path d="M7.5 16.5v-4M12 16.5V8M16.5 16.5v-6.5" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...base}>
      <path d="M12 3.2 20 6v6c0 4.4-3.3 7.6-8 8.8-4.7-1.2-8-4.4-8-8.8V6Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </svg>
  );
}

export function EmblemIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} fill="none">
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.8" opacity="0.35" />
      <circle cx="24" cy="24" r="9.5" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <circle cx="24" cy="24" r="3.4" fill="currentColor" />
      <path
        d="M24 7v6M24 35v6M7 24h6M35 24h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
