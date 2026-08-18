"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(undefined);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 size={32} className="text-primary" aria-hidden />
        <h1 className="font-display uppercase tracking-tight text-2xl">
          Check Your Email
        </h1>
        <p className="font-body text-sm text-text-muted">
          If an account exists for {email}, a reset link is on its way.
        </p>
        <Link
          href="/sign-in"
          className="font-body mt-2 text-sm text-primary underline underline-offset-2"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <HeadlineRule eyebrow="Reset Password" title="Forgot It?" />
      <p className="font-body -mt-2 text-sm text-text-muted">
        Enter your email and we&apos;ll send a link to reset your password.
      </p>
      <Field
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
      <Button type="submit" size="lg">
        Send Reset Link
      </Button>
      <Link
        href="/sign-in"
        className="font-body text-center text-sm text-text-muted underline underline-offset-2 hover:text-primary"
      >
        Back to sign in
      </Link>
    </form>
  );
}
