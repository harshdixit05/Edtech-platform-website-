import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/button";
import { EXTERNAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[0.9375rem] text-ink-soft">Signed in as {user.email}</p>
          <h1 className="t-h2 mt-2 text-navy">
            Welcome, <span className="text-teal">{user.name.split(" ")[0]}</span>
          </h1>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-[var(--radius-sm)] border border-line-strong px-5 py-3 text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:border-teal hover:text-teal"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="card p-7">
          <h2 className="t-h3 text-navy">Your courses</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            Enrolments and progress will appear here once course tracking is connected.
          </p>
          <Link
            href={EXTERNAL.catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-5 inline-block text-[0.9375rem] font-semibold text-navy"
          >
            Browse the catalogue
          </Link>
        </article>

        <article className="card p-7">
          <h2 className="t-h3 text-navy">Account details</h2>
          <dl className="mt-4 space-y-3 text-[0.9375rem]">
            <div>
              <dt className="text-ink-faint">Name</dt>
              <dd className="font-medium text-navy">{user.name}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Email</dt>
              <dd className="font-medium text-navy">{user.email}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Role</dt>
              <dd className="font-medium capitalize text-navy">{user.role}</dd>
            </div>
          </dl>
        </article>

        <article className="card p-7">
          <h2 className="t-h3 text-navy">Security</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            Changing your password signs out every other device.
          </p>
          <Link
            href="/forgot-password"
            className="link-underline mt-5 inline-block text-[0.9375rem] font-semibold text-navy"
          >
            Change password
          </Link>
        </article>
      </div>

      {user.role !== "learner" && (
        <div className="mt-8 card border-teal/40 p-7">
          <h2 className="t-h3 text-navy">Staff access</h2>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
            Your account has the <span className="font-semibold text-navy">{user.role}</span>{" "}
            role. Staff tooling is not built yet — role-gated routes should check
            <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5 text-[0.8125rem]">
              user.role
            </code>
            server-side before rendering anything privileged.
          </p>
        </div>
      )}

      <div className="mt-12">
        <Button href="/courses" variant="outline">
          Explore courses
        </Button>
      </div>
    </section>
  );
}
