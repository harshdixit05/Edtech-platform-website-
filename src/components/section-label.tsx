export function SectionLabel({
  children,
  invert = false,
  className = "",
}: {
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`t-eyebrow flex items-center gap-3 ${
        invert ? "text-teal-bright" : "text-teal"
      } ${className}`}
    >
      <span aria-hidden className="h-[2px] w-7 bg-current" />
      {children}
    </p>
  );
}
