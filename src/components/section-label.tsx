export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.24em] text-teal ${className}`}
    >
      {children}
    </p>
  );
}
