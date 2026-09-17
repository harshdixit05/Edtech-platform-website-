import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { LoginForm } from "@/components/login-form";
import { WaveField } from "@/components/wave-field";
import { EXTERNAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to continue your FinTech learning with Intellimindz Foundation.",
};

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-tint">
      <WaveField className="top-32" />

      <div className="relative mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-md">
          <Reveal>
            <h1 className="t-h2 text-center text-navy">
              Welcome <span className="text-teal">back</span>
            </h1>
            <p className="mt-3 text-center text-ink-soft">
              Sign in to continue your learning.
            </p>

            <div className="card mt-10 p-7 shadow-[0_24px_60px_-45px_rgba(15,23,56,0.5)] md:p-8">
              <LoginForm />
            </div>

            <p className="mt-6 text-center text-[0.9375rem] text-ink-soft">
              New here?{" "}
              <Link
                href={EXTERNAL.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-semibold text-navy"
              >
                Browse courses and enrol
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
