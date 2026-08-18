"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock auth — real Supabase sign-in wires in here (see ISA Constraints).
    setTimeout(() => router.push("/home"), 400);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <HeadlineRule eyebrow="Welcome Back" title="Sign In" />
      <div className="flex flex-col gap-4">
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>
      <Link
        href="/reset-password"
        className="font-body -mt-2 self-end text-xs text-text-muted underline underline-offset-2 hover:text-primary"
      >
        Forgot password?
      </Link>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Signing In…" : "Sign In"}
      </Button>
      <p className="font-body text-center text-sm text-text-muted">
        New here?{" "}
        <Link href="/sign-up" className="text-primary underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </form>
  );
}
