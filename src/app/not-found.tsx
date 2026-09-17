import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col items-start px-6 py-32 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-teal">404</p>
      <h1 className="mt-4 font-serif text-5xl text-ink md:text-6xl">Page not found.</h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
      >
        Back to home
      </Link>
    </section>
  );
}
