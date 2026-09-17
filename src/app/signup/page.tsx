import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your Intellimindz Foundation account to start learning FinTech.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/account");

  return (
    <AuthShell
      title="Start"
      accent="learning"
      intro="Create an account to track your progress across courses."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="link-underline font-semibold text-navy">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
