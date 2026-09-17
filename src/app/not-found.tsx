import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg" />
      <div className="glow glow-teal -right-20 -top-20 h-80 w-80 opacity-40" />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-start px-5 py-32 md:px-8 md:py-40">
        <p className="t-eyebrow text-teal">404</p>
        <h1 className="t-hero mt-6 text-navy">Page not found.</h1>
        <p className="t-lead mt-7 max-w-md text-ink-soft">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/courses" variant="outline">
            Explore courses
          </Button>
        </div>
      </div>
    </section>
  );
}
