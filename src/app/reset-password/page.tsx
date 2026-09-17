import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-forms";
import { FormMessage } from "@/components/auth/form-parts";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <AuthShell
      title="Choose a new"
      accent="password"
      footer={
        <Link href="/login" className="link-underline font-semibold text-navy">
          Back to sign in
        </Link>
      }
    >
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <FormMessage tone="error">
          That reset link is incomplete. Request a new one from the{" "}
          <Link href="/forgot-password" className="link-underline font-semibold">
            forgot password
          </Link>{" "}
          page.
        </FormMessage>
      )}
    </AuthShell>
  );
}
