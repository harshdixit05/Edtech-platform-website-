import { WaveField } from "@/components/wave-field";

export function AuthShell({
  title,
  accent,
  intro,
  children,
  footer,
}: {
  title: string;
  accent?: string;
  intro?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-tint">
      <WaveField className="top-40" />

      <div className="relative mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-md">
          <h1 className="t-h2 text-center text-navy">
            {title} {accent && <span className="text-teal">{accent}</span>}
          </h1>
          {intro && <p className="mt-3 text-center text-ink-soft">{intro}</p>}

          <div className="card mt-9 p-7 shadow-[0_24px_60px_-45px_rgba(15,23,56,0.5)] md:p-8">
            {children}
          </div>

          {footer && (
            <div className="mt-6 text-center text-[0.9375rem] text-ink-soft">{footer}</div>
          )}
        </div>
      </div>
    </section>
  );
}
