"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => router.push("/onboarding"), 400);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <HeadlineRule eyebrow="Get Started" title="Create Account" />
      <div className="flex flex-col gap-4">
        <Field
          label="Name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          hint={!errors.password ? "At least 8 characters." : undefined}
        />
      </div>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Creating Account…" : "Create Account"}
      </Button>
      <p className="font-body text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </form>
  );
}
