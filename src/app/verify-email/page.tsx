import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormMessage } from "@/components/auth/form-parts";
import { verifyEmailToken } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Confirm your email",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = await verifyEmailToken(token ?? "");

  return (
    <AuthShell title="Email" accent="confirmation">
      <div className="flex flex-col gap-6">
        <FormMessage tone={result.ok ? "success" : "error"}>{result.message}</FormMessage>

        {result.ok ? (
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-navy px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-teal"
          >
            Sign in
          </Link>
        ) : (
          <Link
            href="/signup"
            className="link-underline text-center text-[0.9375rem] font-semibold text-navy"
          >
            Start again
          </Link>
        )}
      </div>
    </AuthShell>
  );
}
